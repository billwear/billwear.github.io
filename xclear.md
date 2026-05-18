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
