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
