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
