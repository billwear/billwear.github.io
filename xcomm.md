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
