# NAME

clear - clear the terminal screen and purge scrollback buffer

# SYNOPSIS

**clear**

# DESCRIPTION

A high-fidelity replacement for the standard **clear** utility.

Standard **clear** only moves the terminal cursor to the top line of the
window, leaving historical command output intact within the scrollback
buffer. This refined version visually clears the screen and immediately
executes hardware-level ANSI escape sequences to flush the terminal
emulator\'s scrollback memory entirely.

# THE FUNCTION

This manual entry documents the following shell function and alias
configuration:

    clear() {
        /usr/bin/clear
        printf '\033c\033[3J'
    }
    alias cls='clear'

# ESCAPE SEQUENCES

The tool relies on the following low-level terminal controls via
**printf**:

**\\033c**

:   Resets the terminal device state to its default settings.

**\\033\[3J**

:   Purges the entire visible and invisible scrollback history from the
    host terminal.

# ADVANTAGES

- **Cognitive Reset:** Guarantees a truly blank canvas when shifting
  contexts, preventing accidental scrolling into stale data.

- **Error Tolerance:** Intercepts the Windows-style **cls** command to
  maintain workflow velocity across heterogeneous environments.

# INSTALLATION

Add the function and alias directly to your **.bashrc** or
**.functions** file. Because it is loaded as a shell function, it
naturally shadows the standard binary located at **/usr/bin/clear**.

# AUTHOR

William Orian Wear (Bill Wear)
