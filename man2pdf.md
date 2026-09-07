**man2pdf** converts a manpage file to pdf. 

you have to go find the manpage file, it doesn't work by piping `man` into it.

here's the code:

```
#!/bin/zsh

# Ensure an input file was provided
if [[ -z "$1" ]]; then
    echo "Usage: man2pdf <path_to_manpage_file>"
    echo "Example: man2pdf man/clear.1"
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

MIT License. Use as you will.
