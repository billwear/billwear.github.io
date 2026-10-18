#!/usr/bin/env bash
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HLS_BIN="${1:-$SCRIPT_DIR/hls}"
SANDBOX_DIR="/tmp/hls_test_$$"

RED="\033[1;31m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
RESET="\033[0m"

PASS_COUNT=0
FAIL_COUNT=0

cleanup() {
    rm -rf "$SANDBOX_DIR"
}
trap cleanup EXIT INT TERM

if [[ ! -x "$HLS_BIN" ]]; then
    echo -e "${RED}[ERROR]${RESET} Binary '$HLS_BIN' not executable or missing."
    exit 1
fi

echo -e "${BLUE}=== Initializing Advanced Test Sandbox at ${SANDBOX_DIR} ===${RESET}"
mkdir -p "$SANDBOX_DIR"
cd "$SANDBOX_DIR"

# 1. Base Payload Files
dd if=/dev/zero of=small.txt bs=500 count=1 status=none 2>/dev/null || dd if=/dev/zero of=small.txt bs=500 count=1
dd if=/dev/zero of=medium.bin bs=1048576 count=12 status=none 2>/dev/null || dd if=/dev/zero of=medium.bin bs=1m count=12
dd if=/dev/zero of=large.iso bs=1048576 count=64 status=none 2>/dev/null || dd if=/dev/zero of=large.iso bs=1m count=64

# 2. Touch Timestamps
touch -t 202401011000 old_file.log
touch -t 202606151200 newer_file.log

# 3. Executables & Dotfiles
touch test_script.sh && chmod 755 test_script.sh
touch .secret_config
mkdir .hidden_dir

# 4. Links & Special Files
ln -s small.txt valid_link
ln -s non_existent.txt broken_link
mkfifo my_pipe

# 5. Tree Subfolders
mkdir -p tree_parent/sub_branch
touch tree_parent/sub_branch/leaf.txt

# 6. Sparse File Construction (Truncate/seek creates a logical gap)
python3 -c '
with open("sparse_file.img", "wb") as f:
    f.seek(10 * 1024 * 1024)
    f.write(b"\0")
' 2>/dev/null || truncate -s 10M sparse_file.img 2>/dev/null || true

# 7. Magic Byte Files
printf "#!/bin/sh\necho hi\n" > script_sample.sh
printf "%%PDF-1.4\nsome content\n" > sample_doc.pdf

# 8. Extended Attribute Staging
if [[ "$(uname)" == "Darwin" ]]; then
    xattr -w com.sample.site "hls_demo" small.txt 2>/dev/null || true
else
    setfattr -n user.sample_site -v "hls_demo" small.txt 2>/dev/null || true
fi

# 9. Local Temporary Git Sandbox
git init -q
git config user.name "HLS Test"
git config user.email "test@test.com"
git add small.txt
echo "change" >> small.txt
touch untracked.log

echo -e "${BLUE}=== Commencing Verification Suite ===${RESET}\n"

report_assertion() {
    local caller_line="${BASH_LINENO[0]}"
    local test_name="$1"
    local passed="$2"
    local detail="$3"

    if [[ "$passed" -eq 1 ]]; then
        printf "  %-44s [%bPASS%b]\n" "$test_name" "$GREEN" "$RESET"
        ((PASS_COUNT++))
    else
        printf "  %-44s [%bFAIL%b] (line %s) -> %s\n" \
               "$test_name" "$RED" "$RESET" "$caller_line" "$detail"
        ((FAIL_COUNT++))
    fi
}

# Core Standard Tests
cond=0; out=$("$HLS_BIN")
if [[ "$out" != *".secret_config"* && "$out" == *"small.txt"* ]]; then cond=1; fi
report_assertion "Default excludes dotfiles" "$cond" "Dotfile leaked into output"

cond=0; out=$("$HLS_BIN" -a)
if [[ "$out" == *".secret_config"* && "$out" == *".hidden_dir"* ]]; then cond=1; fi
report_assertion "Flag -a reveals hidden files" "$cond" "Dotfiles missed"

cond=0; out=$("$HLS_BIN" -F)
if [[ "$out" == *"tree_parent/"* && "$out" == *"valid_link@"* && "$out" == *"test_script.sh*"* && "$out" == *"my_pipe|"* ]]; then cond=1; fi
report_assertion "Flag -F classifies special types" "$cond" "One or more markers missing"

# Sorting Integrity
clean_out=$("$HLS_BIN" -l -S | perl -pe 's/\e\[[0-9;]*[a-zA-Z]//g')
large_pos=$(echo "$clean_out" | awk '$NF == "large.iso" {print NR; exit}')
med_pos=$(echo "$clean_out"   | awk '$NF == "medium.bin" {print NR; exit}')
small_pos=$(echo "$clean_out" | awk '$NF == "small.txt" && $0 !~ /->/ {print NR; exit}')
cond=0
if [[ "${large_pos:-0}" -gt 0 && "${med_pos:-0}" -gt 0 && "${small_pos:-0}" -gt 0 && "$large_pos" -lt "$med_pos" && "$med_pos" -lt "$small_pos" ]]; then
    cond=1
fi
report_assertion "Flag -S sorts descending by size" "$cond" "Size order mismatch"

# Extended Systems Features
cond=0; out=$("$HLS_BIN" -G)
if [[ "$out" == *"M"* && "$out" == *"?"* ]]; then cond=1; fi
report_assertion "Flag -G detects Git status badges" "$cond" "Working tree states missing"

cond=0; out=$("$HLS_BIN" -l -s)
if [[ "$out" == *"sparse"* || "$out" == *"blk"* ]]; then cond=1; fi
report_assertion "Flag -s inspects disk block allocation" "$cond" "Block analytics omitted"

cond=0; out=$("$HLS_BIN" -M)
if [[ "$out" == *"script text"* && "$out" == *"PDF document"* ]]; then cond=1; fi
report_assertion "Flag -M sniffs file magic bytes" "$cond" "File signatures missing"

cond=0; out=$("$HLS_BIN" -T)
if [[ "$out" == *"├──"* || "$out" == *"└──"* ]]; then cond=1; fi
report_assertion "Flag -T renders tree hierarchy" "$cond" "Box-drawing characters missing"

cond=0; out=$("$HLS_BIN" -l -@)
if [[ "$out" == *"@"* ]]; then cond=1; fi
report_assertion "Flag -@ enumerates extended attributes" "$cond" "Xattr indicators missing"

# Results
echo ""
echo -e "${BLUE}=== Summary ===${RESET}"
echo -e "  Passed: ${GREEN}${PASS_COUNT}${RESET}"
echo -e "  Failed: ${RED}${FAIL_COUNT}${RESET}"
echo -e "  Total:  $((PASS_COUNT + FAIL_COUNT))"

if [[ $FAIL_COUNT -eq 0 ]]; then
    echo -e "\n${GREEN}ALL SYSTEMS NOMINAL!${RESET}"
    exit 0
else
    echo -e "\n${RED}TEST FAILURES DETECTED.${RESET}"
    exit 1
fi
