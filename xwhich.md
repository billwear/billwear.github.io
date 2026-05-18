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
