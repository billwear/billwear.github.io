# [Fifty-two years of *nix CLI](https://github.com/billwear/cli-improved/)

## calendar
All the `calendar` C code I can find is brittle and highly system-dependent.  Nevermind, the core functionality is really just a simple script.

### The implementation
```bash
#!/bin/zsh
date '+%A, %B %e, %Y'
echo '---'
todate=$(date +"%b %e|%m/%d|%m-%d|%a|%A")
grep -E "^($todate)|^daily" ~/.calendar | cut -s -f 2-
```

### Toolmaker's notes
This implementation allows me to use most of the date formats (including "Tuesday"), and adds a "daily" date indicator to let me put all my habits in here.  Four lines of shell code doing the core work of 1400 lines or so of C.  I like that trade.

[calendar source on GitHub]() | [calendar manpage]() | [calendar PDF manual page]()

---

## clear

Out of the box, `clear` is a cheat; it just runs the terminal buffer up so you don't see it.  On modern, scroll-aware terminals, this can lead to confusion.  This `.zsh` function still executes the standard system clear, but follows it with hardware-level ANSI escape sequences (`\033c` and `\033[3J`) that reset the terminal and clear the scroll buffer.  It also clears the screen when you accidentally type the Windows variant, `cls`.

### The implementation

```bash
clear() {
    # Execute system clear
    /usr/bin/clear 
    # Send ANSI escape codes to reset terminal and purge scrollback buffer
    printf '\033c\033[3J'
}

# Catch muscle-memory errors from cross-platform workflows
alias cls='clear'
```

[clear source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/clear.bashrc) | [clear manpage](https://github.com/billwear/cli-improved/blob/main/man/clear.1) | [clear PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/clear.pdf)

---

## comm

The `comm` utility is a great tool for comparing two files line-by-line. It just has a prerequisite that it shouldn't: you have to first sort the files in lexical order.  That's an easy fix, as seen below.

### The implementation
```bash
#!/bin/bash

# Ensure two files are passed
if [[ $# -ne 2 ]]; then
    echo "Usage: comm <file1> <file2>"
    exit 1
fi

FILE1="$1"
FILE2="$2"

# Check if file1 is sorted lexically
sort -C "$FILE1" 2>/dev/null
SORTED1=$?

# Check if file2 is sorted lexically
sort -C "$FILE2" 2>/dev/null
SORTED2=$?

# If both are sorted, run standard comm. Otherwise, sort on the fly.
if [[ $SORTED1 -eq 0 && $SORTED2 -eq 0 ]]; then
    /usr/bin/comm "$FILE1" "$FILE2"
elif [[ $SORTED1 -ne 0 && $SORTED2 -eq 0 ]]; then
    /usr/bin/comm <(sort "$FILE1") "$FILE2"
elif [[ $SORTED1 -eq 0 && $SORTED2 -ne 0 ]]; then
    /usr/bin/comm "$FILE1" <(sort "$FILE2")
else
    /usr/bin/comm <(sort "$FILE1") <(sort "$FILE2")
fi
```

[comm source on GitHub]() | [comm manpage]() | [comm PDF manual page]()
## man2pdf

Standard UNIX manual source files (`roff`) are hard to read without a man parser.  `man2pdf` will convert manual pages to PDF for easier portability. All of the functions here have both a man page (**command**.1) and a PDF manual page (**command**.pdf), kept in separate directories in the repository.

Note: This requires that you install groff, which is not a default package.

#### The implementation
```bash
#!/bin/bash

# Ensure an input file was provided
if [[ -z "$1" ]]; then
    echo "Usage: man2pdf <path_to_manpage_file>"
    exit 1
fi

MAN_FILE="$1"
FILENAME=$(basename "$MAN_FILE")
BASE_NAME="${FILENAME%.*}"

# Ensure the output directory exists
mkdir -p man-pdf

# Compile the roff file directly to a pristine PDF
if groff -man -Tpdf "$MAN_FILE" > "man-pdf/${BASE_NAME}.pdf"; then
    echo "Success: Generated man-pdf/${BASE_NAME}.pdf"
else
    echo "Error: Failed to compile $MAN_FILE"
    exit 1
fi
```

[man2pdf source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/man2pdf) | [man2pdf manpage](https://github.com/billwear/cli-improved/blob/main/man/man2pdf.1) | [man2pdf PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/man2pdf.pdf)

---

## mkdir
Make directories with automatic creation of intermediate directories. This `zsh` function creates a directory, including any non-existent intermediate directories included in the supplied pathname.  If the intermediate directories already exist, they are unchanged.

### The implementation
```bash
mkdir() {
    # We inject -p right at the start. 
    # Any subsequent flags passed by the user (like -m 755) will override or complement it.
    command mkdir -p "$@"
}
```
## pwd
Standard `pwd` is path blind: it doesn't warn you about symbolic links.  Easy enough to fix.

This wrapper compares the logical (-L) and physical (-P). Only when they differ, it displays the full chain with a visual indicator (=>). Otherwise no difference.

### The implementation
```bash
#!/bin/bash

# Capture logical and physical paths
DASHLPATH=$(pwd -L)
DASHPPATH=$(pwd -P)

# If paths differ, show the link chain; otherwise, run standard pwd
if [[ $DASHLPATH != $DASHPPATH ]]; then 
  echo $DASHLPATH "=>" $DASHPPATH
else
  /bin/pwd
fi
```

[pwd source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/pwd) | [pwd manpage](https://github.com/billwear/cli-improved/blob/main/man/pwd.1) | [pwd PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/pwd.pdf)

---

## which
Standard `which` only searches for executable binaries located on your `$PATH`, ignoring aliases, et al.  You get better results from substituting a `type -a` for the command, allowing you to see every version of a given command in the order they're called.

### The implementation

```bash
which() {
    # Force the shell to audit the command name completely
    type -a "$@"
}
```

### Toolmaker's notes
**Substitution**: Using the internal shell builtin `type -a` is faster and more accurate than spawning an external binary like `/usr/bin/which`. It asks the current shell directly how it intends to execute a command. 

**Finding all versions**: If you have multiple versions of a tool installed (e.g., a system version and a homebrew version), this function lists all of them in order, rather than stopping at the first match. 

**Functions take priority**: Because this is declared as a function, the shell naturally prioritizes it over the system binary without requiring you to destructively overwrite or modify your local path configuration.  I won't repeat this again, but it applies to everywhere I've chosen a function over a script.

[which source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/which.bashrc) | [which manpage](https://github.com/billwear/cli-improved/blob/main/man/which.1) | [which PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/which.pdf)

---


## xdate
`xdate` prints a long date string that includes the normal date output, the epoch number, and information about the days of the year. For example:
    Sat May 16 13:04:20 CDT 2026, 1778954660; Day 136 of 365; 229 days remain.

### The implementation
```bash
#!/bin/zsh
y=$(date +%Y) 
d=$(date +%-j) 
t=$(( (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 366 : 365 )) 
echo "$(date '+%a %b %d %H:%M:%S %Z %Y, %s'); Day $d of $t; $((t - d)) days remain."
```
