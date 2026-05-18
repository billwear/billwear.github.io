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
