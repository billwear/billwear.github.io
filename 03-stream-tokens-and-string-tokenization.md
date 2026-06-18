# Step 3: Stream Tokens and String Tokenization

Now that the architectural skeleton and memory boundaries are verified, I need to replace the basic line-echo routine with a real data extraction engine. In C, raw string data from a file stream is just an array of bytes. To turn those bytes into usable information, I have to slice them into logical segments called **tokens**.

For the calendar utility, I'm going to assume for now that a valid line contains two structural tokens: a **Date/Pattern Token** and a **Description Token**, isolated by a literal tab delimiter (`\t`).

---

## The Mechanics of Tokenization

In standard C, the classic tool for splitting strings is `strtok` (string token). However, `strtok` modifies the original string by destructively overwriting the delimiter characters with null terminators (`\0`). 

Understanding this destructive behavior is vital for proper memory management. Because the pointer returns data directly inside the existing line buffer, we do not need to allocate new memory for our tokens, keeping our utility incredibly fast and lightweight.

---

## The Tokenized Utility (`calendar.c`)

I need to upgrade `parse_calendar_line`. Instead of merely checking for the presence of a tab, it will actively isolate the date component and the description component, formatting them cleanly for standard output.

```c
/**
 * @file calendar.c
 * @brief A modern unix utility to parse and display calendar events.
 * * Implements string tokenization and structural field extraction.
 */

/* feature test macro to expose POSIX extensions like getline on Linux */
#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/* Global Version Boundary */
#ifndef CALENDAR_VERSION
#define CALENDAR_VERSION "0.3.0-dev"
#endif

/* Forward Declarations */
bool parse_calendar_line(char *line_buffer);

/**
 * @brief Parses and extracts tokens from a calendar stream line.
 * * @warning This function is destructive to the input string buffer 
 * as it introduces null-terminators via tokenization.
 * * @param line_buffer Mutable pointer to the raw line string.
 * @return true if the line was successfully tokenized into valid fields.
 */
bool parse_calendar_line(char *line_buffer)
{
    if (line_buffer == NULL) {
        return false;
    }

    // Strip trailing newline characters added by getline()
    line_buffer[strcspn(line_buffer, "\r\n")] = '\0';

    // 1. Extract the primary token (Date/Pattern)
    char *date_token = strtok(line_buffer, "\t");
    if (date_token == NULL) {
        return false; // No tab delimiter found, skip line
    }

    // 2. Extract the secondary token (Event Description)
    char *desc_token = strtok(NULL, "\t");
    if (desc_token == NULL) {
        return false; // Malformed line (date present, but no description)
    }

    // 3. Output formatted data fields cleanly
    printf("Date: %-8s | Event: %s\n", date_token, desc_token);
    return true;
}

int main(int argc, char *argv[])
{
    if (argc > 1) {
        if (strcmp(argv[1], "-v") == 0 || strcmp(argv[1], "--version") == 0) {
            printf("calendar utility version %s\n", CALENDAR_VERSION);
            return EXIT_SUCCESS;
        }
    }

    const char *home_dir = getenv("HOME");
    if (home_dir == NULL) {
        fprintf(stderr, "Fatal: HOME environment variable is undefined.\n");
        return EXIT_FAILURE;
    }

    const char *target_suffix = "/.calendar";
    int path_length = snprintf(NULL, 0, "%s%s", home_dir, target_suffix);
    if (path_length < 0) {
        fprintf(stderr, "Fatal: Path metric calculation failed.\n");
        return EXIT_FAILURE;
    }

    char *file_path = malloc((size_t)path_length + 1);
    if (file_path == NULL) {
        perror("Fatal: Insufficient memory for runtime path allocation");
        return EXIT_FAILURE;
    }
    snprintf(file_path, (size_t)path_length + 1, "%s%s", home_dir, target_suffix);

    FILE *stream_ptr = fopen(file_path, "r");    
    if (stream_ptr == NULL) {
        perror("Fatal: Unable to open target calendar stream");
        free(file_path);
        return EXIT_FAILURE;
    }

    char *current_line = NULL;
    size_t allocated_capacity = 0;
    
    // Note: We are passing current_line directly. 
    // It is mutable, allowing parse_calendar_line to safely tokenize it.
    while (getline(&current_line, &allocated_capacity, stream_ptr) != -1) {
        parse_calendar_line(current_line);
    }

    free(current_line);
    free(file_path);
    fclose(stream_ptr);

    return EXIT_SUCCESS;
}
```

## Verification and Execution

The test seeding tool chain uses a reliable literal tab delimiter (\t), I can compile and test the new extraction logic immediately.

### Execution:

```bash
make run
```
### Expected Output

The updated tokenization formatting engine prints out structural fields cleanly aligned:

```
Date: 06/20    | Event: System Architecture Review
Date: 07/04    | Event: Independence Day Holiday
```

With Step 3 complete, I'm not just streaming raw text anymore; I'm parsing fields. In Step 4, I can look at taking that date string token and evaluating it.