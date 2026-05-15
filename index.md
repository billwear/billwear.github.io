### Fifty-two years of Unix CLI

[What is this site all about?](https://github.com/billwear/cli-improved/)

---

#### pwd (The link-smart version)
Standard pwd often suffers from "path-blindness." When you are working in environments that rely heavily on symbolic links—like complex development builds or nested cloud directories—it is easy to lose track of where you logically are versus where the files physically exist. Standard output only gives you one or the other, forcing you to run extra commands to verify your actual location.

This wrapper automatically compares the logical path (-L) and the physical path (-P). If they differ, it displays the full chain with a visual indicator (=>). If the paths are identical, it stays transparent and executes the system default, keeping your terminal output clean.

##### The implementation
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

### which (The visibility version)
The standard system which utility has a massive, often frustrating blind spot: it only searches for executable binaries located on your $PATH. If you have a custom shell function or an alias intercepting a command name in your current session, standard which will ignore it completely and point to the binary on the disk. This creates "path-blindness" and leads to the "Wrong Tool" syndrome, where you think you are running one version of a tool, but a hidden configuration is actually running another.

By shadowing the binary with a native shell function that utilizes type -a, we force the shell to reveal its entire command-resolution chain. This version acts as a true environment audit, identifying if a command is an alias, a shell builtin, a function, or a file on the disk, and listing them all in their exact order of execution precedence.

#### The implementation

```bash
which() {
    # Force the shell to audit the command name completely
    type -a "$@"
}
```

#### Toolmaker's notes
**Substitution**: Using the internal shell builtin `type -a` is faster and more accurate than spawning an external binary like `/usr/bin/which`. It asks the current shell directly how it intends to execute a command. 

**Finding all versions**: If you have multiple versions of a tool installed (e.g., a system version and a homebrew version), this function lists all of them in order, rather than stopping at the first match. 

**Functions take priority**: Because this is declared as a function, the shell naturally prioritizes it over the system binary without requiring you to destructively overwrite or modify your local path configuration.  I won't repeat this again, but it applies to everywhere I've chosen a function over a script.

[which source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/which.bashrc) | [which manpage](https://github.com/billwear/cli-improved/blob/main/man/which.1) | [which PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/which.pdf)

---

### clear (clean slate version)

The standard `clear` utility is visually deceptive. It moves the terminal cursor to the top of the window, but leaves all your old command output intact in the terminal's scrollback buffer. A quick flick of the mouse wheel reveals the old clutter, failing to provide a true, distraction-free reset when you need to switch tasks or clear your cognitive space.

This function overrides the default behavior. It executes the standard system clear, but immediately follows it with hardware-level ANSI escape sequences (`\033c` and `\033[3J`) that flush the scrollback buffer entirely from the terminal emulator’s memory. It forces a genuine, pristine blank slate.

#### The implementation

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

#### Toolmaker's notes
**Removing clutter**: When switching contexts, like moving from a messy compilation log to a clean Git workflow, a partial clear leaves historical noise in your field of vision if you scroll up. This function guarantees that the only history present is the history of your current task.  Command history using the arrow key isn't affected.

**Countering bad habits**: Adding the `cls` alias removes the operational friction of an accidental cross-platform keystroke, keeping your momentum moving forward without error interrupts.

[clear source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/clear.bashrc) | [clear manpage](https://github.com/billwear/cli-improved/blob/main/man/clear.1) | [clear PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/clear.pdf)

---

### man2pdf (manpage prettifier)

Standard UNIX manual source files (`roff`) are highly structured and elegant, but they are difficult to read in a standard web browser without a specialized terminal wrapper or local rendering setup. Expecting a potential user to clone a repository and manually run complex compiler commands just to view documentation creates unnecessary operational friction.

A local automation script that compiles raw `roff` files into standard, high-fidelity PDFs. By leveraging the system's underlying document formatting engine, it instantly outputs perfectly formatted documents that match the classic, iconic UNIX manual layout, ensuring your project's documentation is universally accessible via any standard web browser.  Note that sometimes some inconsequential errors pop up, depending on the version of `groff` you're using, but so far, it hasn't affected the quality of the output.

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

#### Toolmaker's notes
**Self-Documenting Architecture**: Rather than treating repository maintenance as an out-of-band chore, this tool internalizes the build process. Anyone cloning the repository inherits the exact same toolchain used to generate and maintain the project's outward-facing assets.

**Dependency Awareness** The tool leans explicitly on the standard system groff layout engine. To ensure smooth execution across varied developer environments (like a bare-bones macOS setup), it documents its environmental prerequisites explicitly within its own manual entry.

[man2pdf source on GitHub](https://github.com/billwear/cli-improved/blob/main/bin/man2pdf) | [man2pdf manpage](https://github.com/billwear/cli-improved/blob/main/man/man2pdf.1) | [man2pdf PDF manual page](https://github.com/billwear/cli-improved/blob/main/man-pdf/man2pdf.pdf)
