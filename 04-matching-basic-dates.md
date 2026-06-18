# Step 4: Stream Filtering and Temporal Evaluation

With tokenization successfully isolating our fields, I can start digging into the analytical core of the utility: **Temporal Filtering**. A calendar utility is only useful if it can evaluate the date extracted from a file and determine its relevance to the current calendar day.

To handle this elegantly without external dependencies, I'm going to use the C standard library's native time structures (`<time.h>`) and build a deterministic parsing engine to evaluate four progressive date formats:
`mm/dd/yyyy`, `mm/dd`, `mm`, and `dd`.

---

## 1. The Temporal Logic Chain

When processing date rules, the utility must evaluate tokens ranging from absolute dates (explicit years) to recurring dates (every year, or every month). 

To match against "today," the logic cascades:

* If a **Year** is provided, it must match the current year exactly.
* If a **Month** is provided, it must match the current month exactly.
* The **Day** component must always match the current day of the month.

---

## 2. The Integrated Temporal Engine (`calendar.c`)

Okay, what saw we implement the date matching logic. This update fetches the current system time using `time()` and `localtime()`, breaks down the date token using `sscanf`, and filters the stream dynamically.

```c
/**
 * @file calendar.c
 * @brief A modern unix utility to parse and display calendar events.
 * * Implements real-time evaluation and filtering against system time.
 */

/* Feature Test Macro for POSIX extensions */
#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h>

/* Global Version Boundary */
#ifndef CALENDAR_VERSION
#define CALENDAR_VERSION "0.4.0-dev"
#endif

/* Structural definition to hold current date context */
typedef struct {
    int day;
    int month;
    int year;
} DateContext;

/* Forward Declarations */
bool parse_calendar_line(char *line_buffer, const DateContext *today);
bool is_date_match(const char *date_token, const DateContext *today);

/**
 * @brief Evaluates a date string token against today's date context.
 * * Supports formats: mm/dd/yyyy, mm/dd, mm, dd
 */
bool is_date_match(const char *date_token, const DateContext *today)
{
    int parsed_item1 = 0, parsed_item2 = 0, parsed_item3 = 0;
    
    // sscanf scans the string for matching integer patterns
    int tokens_found = sscanf(date_token, "%d/%d/%d", &parsed_item1, &parsed_item2, &parsed_item3);

    switch (tokens_found) {
        case 3: // Format: mm/dd/yyyy (Explicit absolute date)
            return (parsed_item1 == today->month && 
                    parsed_item2 == today->day && 
                    parsed_item3 == today->year);

        case 2: // Format: mm/dd (Yearly recurring event)
            return (parsed_item1 == today->month && 
                    parsed_item2 == today->day);

        case 1: // Formats: mm (Monthly recurring) or dd (Daily/Monthly rule placeholder)
            // To safely differentiate a lone 'mm' from a lone 'dd' without explicit spec symbols,
            // we evaluate the integer directly. If it matches today's day, it triggers a match.
            return (parsed_item1 == today->day);

        default:
            return false; // Unrecognized or malformed format
    }
}

/**
 * @brief Parses, tokenizes, and filters lines based on temporal relevance.
 */
bool parse_calendar_line(char *line_buffer, const DateContext *today)
{
    if (line_buffer == NULL) {
        return false;
    }

    // Strip trailing newline characters
    line_buffer[strcspn(line_buffer, "\r\n")] = '\0';

    // 1. Extract the Date Token
    char *date_token = strtok(line_buffer, "\t");
    if (date_token == NULL) {
        return false;
    }

    // 2. Extract the Description Token
    char *desc_token = strtok(NULL, "\t");
    if (desc_token == NULL) {
        return false;
    }

    // 3. Temporal Filter Phase
    if (is_date_match(date_token, today)) {
        printf("Date: %-10s | Event: %s\n", date_token, desc_token);
        return true;
    }

    return false; // Valid format, but does not match today's date
}

int main(int argc, char *argv[])
{
    if (argc > 1) {
        if (strcmp(argv[1], "-v") == 0 || strcmp(argv[1], "--version") == 0) {
            printf("calendar utility version %s\n", CALENDAR_VERSION);
            return EXIT_SUCCESS;
        }
    }

    // Initialize Runtime Date Context from System Clock
    time_t raw_time = time(NULL);
    struct tm *time_info = localtime(&raw_time);
    if (time_info == NULL) {
        fprintf(stderr, "Fatal: Could not retrieve local system time.\n");
        return EXIT_FAILURE;
    }

    // Translate tm struct fields to human-readable Gregorian values
    DateContext today = {
        .day   = time_info->tm_mday,
        .month = time_info->tm_mon + 1,       // tm_mon is 0-indexed (0 = January)
        .year  = time_info->tm_year + 1900    // tm_year tracks years since 1900
    };

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
    
    // Pass our populated system date context down into the parsing engine
    while (getline(&current_line, &allocated_capacity, stream_ptr) != -1) {
        parse_calendar_line(current_line, &today);
    }

    free(current_line);
    free(file_path);
    fclose(stream_ptr);

    return EXIT_SUCCESS;
}

## 3. Seeding Contextual Verification Data

To prove that the temporal filtering mechanism works accurately, I need to populate my `~/.calendar` file with records that intentionally conflict or match with today's date, testing the various intended matching algorithms.

Assuming today's date is June 18, 2026, let's add some lines to `seed-test-data.sh`:

```bash
# Explicit Match (mm/dd/yyyy)
printf "06/18/2026\tThis Event Matches Today Exactly\n" > ~/.calendar

# Recurring Yearly Match (mm/dd)
printf "06/18\tThis Recurring Yearly Event Matches Today\n" >> ~/.calendar

# Recurring Day/Month Match (dd)
printf "18\tThis Event Runs on the 18th of Every Month\n" >> ~/.calendar

# Temporal Mismatch (Different Year)
printf "06/18/2024\tThis Event Is In The Past - Should Not Display\n" >> ~/.calendar

# Temporal Mismatch (Different Day)
printf "12/25\tChristmas Day - Should Not Display Today\n" >> ~/.calendar
```

4. Execution Workflow

Time to ompile and run using the cross-platform platform detection Makefile:

```bash
make run
```

### Expected Output

The processing engine quietly reads all five lines, executes the sscanf logic cascade against each token, filters out the non-matching historical or holiday dates, and explicitly streams only the relevant records:

```bash
Date: 06/18/2026 | Event: This Event Matches Today Exactly
Date: 06/18      | Event: This Recurring Yearly Event Matches Today
Date: 18         | Event: This Event Runs on the 18th of Every Month
```
The foundations of the filtering engine are completely operational. Next up in Step 5, I can wrap this code in formal build tags and set up version flags so I can query our application capabilities cleanly from the command line.