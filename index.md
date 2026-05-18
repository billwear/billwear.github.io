# [Fifty-two years of *nix CLI](https://github.com/billwear/cli-improved/)

---

# NAME

xcalendar - list today\'s reminders

# SYNOPSIS

**xcalendar**

# DESCRIPTION

A simple analogue of the BSD calendar utility.

The code for calendar is difficult to compile on modern hardware, due to
antiquated libraries. While not as fully-featured as the original, it
gets the job done, and adds one glaring omission from the original.

# CALENDAR FILE

A file named **.calendar** must be present in your home directory. Every
line consists of a date indicator, followed by a tab and a reminder
message. Date indicators may consist of the following:

**May 16**

:   A capitalized month name followed by the day of that month.

**05/16**

:   A month/day pair (American style).

**05-16**

:   A month-day pair (also American style).

**Thursday**

:   A spelled out day name.

**Thu**

:   A three-letter day name abbreviation. **daily** The lowercase word
    \"daily.\" Items marked with this will appear every day.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# AUTHOR

William Orian Wear (Bill Wear)

[calendar source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/calendar) | [calendar manpage](https://github.com/billwear/cli-improved/blob/main/man/calendar.1) | [calendar PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/calendar.pdf)

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

[comm source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/comm) | [comm manpage](https://github.com/billwear/cli-improved/blob/main/man/comm.1) | [comm PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/comm.pdf)

---

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

[mkdir source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/mkdir.zshrc) | [mkdir manpage](https://github.com/billwear/cli-improved/blob/main/man/mkdir.1) | [mkdir PDF manual page]()

---

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

[xdate source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/xdate) | [xdate manpage](https://github.com/billwear/cli-improved/blob/main/man/xdate.1) | [xdate PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/xdate.pdf)

# NAME

xclear - clear the terminal screen and purge scrollback buffer

# SYNOPSIS

**xclear**

# DESCRIPTION

A high-fidelity replacement for the standard **clear** utility.

Standard **clear** only moves the terminal cursor to the top line of the
window, leaving historical command output intact within the scrollback
buffer. This refined version visually clears the screen and immediately
executes hardware-level ANSI escape sequences to flush the terminal
emulator\'s scrollback memory entirely.

# ESCAPE SEQUENCES

The tool relies on the following low-level terminal controls via
**printf**:

**\\033c**

:   Resets the terminal device state to its default settings.

**\\033\[3J**

:   Purges the entire visible and invisible scrollback history from the
    host terminal.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# AUTHOR

William Orian Wear (Bill Wear)
# NAME

xcomm - compare two sorted files line-by-line (fail-safe version)

# SYNOPSIS

**xcomm** *\<file1\>* *\<file2\>*

# DESCRIPTION

A robust, protective wrapper for the standard **comm** utility.

The native system **comm** requires both input files to be lexically
sorted prior to execution. If unsorted inputs are provided, the system
binary fails silently, emitting incomplete or corrupted matching data
without warning.

This refined version runs defensive checks on the inputs using **sort
-C**. If either file is found to be unsorted, it leverages shell process
substitution to sort the streams dynamically on the fly, guaranteeing
accurate comparison results while leaving the original files on the disk
untouched.

# TECHNICAL NOTES

**Defensive Checking:**

:   The script uses **sort -C** to audit the files. This check is fast
    and computationally inexpensive, ensuring that already-sorted files
    suffer zero performance penalty.

**Memory Efficiency:**

:   By using bash process substitution **\<()**, sorted data streams are
    piped directly into the **comm** execution block via anonymous named
    pipes. This avoids the frcition of creating, tracking, and clearing
    out temporary files on the disk.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# DIAGNOSTICS

Returns the exit status of the underlying **comm** command, or 1 if the
incorrect number of file arguments is passed.

# AUTHOR

William Orian Wear (Bill Wear)
# NAME

xdate - print a long date string to stdout.

# SYNOPSIS

**xdate** \[*OPTION*\]\...

# DESCRIPTION

**xdate** prints a long date string that includes the normal date
output, the epoch number, and information about the days of the year.
For example:

Sat May 16 13:04:20 CDT 2026, 1778954660; Day 136 of 365; 229 days
remain.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# AUTHOR

William Orian Wear (Bill Wear)
# NAME

xman2pdf - compile raw roff manual pages into high-fidelity PDFs

# SYNOPSIS

**xman2pdf** *\<path_to_manpage_file\>*

# DESCRIPTION

**xman2pdf** is an automation utility that ingests a raw UNIX manual
source file (**roff** format) and compiles it into a universally
accessible PDF document.

The tool automatically handles filename parsing, extracts the base
utility name, ensures the destination directory exists, and invokes the
system compiler layout engine to generate a pristine, cross-platform
publication format matching classic UNIX manual conventions.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# DEPENDENCIES

This script relies directly on the **groff** document formatting system.
It must be installed and available in the current environment\'s
**\$PATH**.

**Checking for Groff:**

:   You can verify its presence using your refined visibility tool:
    *which groff*

**MacOS Installation:**

:   If missing on a Mac environment, install it via Homebrew: *brew
    install groff*

# DIAGNOSTICS

Returns 0 on successful compilation. Returns 1 if no input file is
specified, or if the underlying **groff** compiler encounters an
execution error.

# AUTHOR

William Orian Wear (Bill Wear)
# NAME

xmkdir - make directories with automatic creation of intermediate
directories.

# SYNOPSIS

**xmkdir** */directory/path/as/desired*

# DESCRIPTION

**mkdir** creates a directory, including any non-existent intermediate
directories included in the supplied pathname. If the intermediate
directories already exist, they are unchanged.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# AUTHOR

William Orian Wear (Bill Wear)
# NAME

xpwd - print name of current/working directory (smart-link version)

# SYNOPSIS

**xpwd** \[*OPTION*\]\...

# DESCRIPTION

Print the full filename of the current working directory.

This version is a \"reduced-friction\" wrapper designed to identify
symbolic link paths. If the logical path (where you think you are)
differs from the physical path (where the disk says you are), it
displays both joined by an arrow.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# NOTES

If no symbolic link is detected, the script transparently executes the
standard system **/bin/pwd**.

# AUTHOR

William Orian Wear (Bill Wear)
# NAME

xwhich - locate a command and identify its type

# SYNOPSIS

**xwhich** \[*NAME*\]\...

# DESCRIPTION

A high-visibility replacement for the standard **which** utility.

Standard **which** often fails to report shell aliases and functions,
creating a \"blind spot\" for the user. This refined version utilizes
the shell\'s internal **type -a** mechanism to provide a complete audit
of how a command name is resolved.

# ADVANTAGES

- **Visibility:** Identifies if a command is an alias, a function, or a
  binary on the disk.

- **Completeness:** Lists all occurrences of the name in the user\'s
  **\$PATH**, not just the first one.

- **Orderly:** Displays results in the order of precedence used by the
  current shell.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# AUTHOR

William Orian Wear (Bill Wear)
