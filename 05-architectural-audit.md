# Step 5: The Architectural Audit — Hardening My Process and Fixing Debt

I realized I needed to stop, take a breath, and look at my code. In the rush to get things running, I let my enthusiasm outpace my discipline. I piled up some structural debt, skipped a feature I promised, and got way too loose with my version numbering (calling an unrefined architectural stub "Version 1.0" was a bit embarrassing). 

So, I’m pausing feature development to run an audit on my process, fix my tracking history, and solve a tricky string parsing problem I completely brushed past.

---

## 1. The Audit Matrix

I broke down exactly where I got sloppy so I can fix it systematically:

| What I Found | The Symptom | The Debt | The Fix |
| :--- | :--- | :--- | :--- |
| **01: Feature Drift** | I claimed I supported the monthly wildcard (`mm`), but I skipped it. | No source-of-truth spec to check my work against. | Write the parsing logic and create a formal **System Specification**. |
| **02: Version Inflation** | I slapped version `1.0.0` on a skeleton program. | Broke Semantic Versioning rules, making tracking useless. | Drop the project back to a pre-release baseline (`0.4.0`). |
| **03: Document Decay** | I skipped updating my changelog across multiple steps. | Missing context makes future debugging a nightmare. | Reconstruct my timeline honestly. |

---

## 2. Refining the Parser: Differentiating Days vs. Months

I discovered a major logical flaw in my last version. If the user passes a single number like `02`, my `sscanf` logic couldn't tell if that meant "February" or "the 2nd day of the month." 

To solve this without making the file layout messy, I decided to establish a clear structural convention:

* `02\t` (a number followed immediately by a tab) means **the 2nd day of every month**.
* `02 *\t` (a number followed by a space, an asterisk, and the tab delimiter) means **every day in February**.

I updated `is_date_match` to scan the raw token for that trailing `*` to explicitly split these two behaviors apart.

### The Corrected Code (`calendar.c`)

```c
/**
 * @file calendar.c
 * @brief A modern unix utility to parse and display calendar events.
 */

/* Feature Test Macro for POSIX extensions */
#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h>

#ifndef CALENDAR_VERSION
#define CALENDAR_VERSION "0.4.0"
#endif

typedef struct {
    int day;
    int month;
    int year;
} DateContext;

/* Forward Declarations */
bool parse_calendar_line(char *line_buffer, const DateContext *today);
bool is_date_match(const char *date_token, const DateContext *today);

/**
 * @brief Evaluates an isolated date token against the current system date.
 * Handles: mm/dd/yyyy, mm/dd, "mm *" (entire month), and dd (specific day)
 */
bool is_date_match(const char *date_token, const DateContext *today)
{
    int item1 = 0, item2 = 0, item3 = 0;
    int tokens_found = sscanf(date_token, "%d/%d/%d", &item1, &item2, &item3);

    if (tokens_found == 3) {
        // Format: mm/dd/yyyy
        return (item1 == today->month && item2 == today->day && item3 == today->year);
    } 
    
    if (tokens_found == 2) {
        // Format: mm/dd
        return (item1 == today->month && item2 == today->day);
    } 
    
    if (tokens_found == 1) {
        // I need to check if this is a month wildcard (e.g., "06 *") or a day wildcard ("18")
        if (strchr(date_token, '*') != NULL) {
            // Found an asterisk, so item1 represents an entire month
            return (item1 == today->month);
        }
        
        // No asterisk, so it defaults to matching the specific day of the month
        return (item1 == today->day);
    }

    return false;
}

bool parse_calendar_line(char *line_buffer, const DateContext *today)
{
    if (line_buffer == NULL) return false;
    line_buffer[strcspn(line_buffer, "\r\n")] = '\0';

    // Destructively tokenize the line using the tab character
    char *date_token = strtok(line_buffer, "\t");
    char *desc_token = strtok(NULL, "\t");

    if (date_token == NULL || desc_token == NULL) {
        return false;
    }

    if (is_date_match(date_token, today)) {
        printf("Date: %-10s | Event: %s\n", date_token, desc_token);
        return true;
    }

    return false;
}

int main(int argc, char *argv[])
{
    if (argc > 1) {
        if (strcmp(argv[1], "-v") == 0 || strcmp(argv[1], "--version") == 0) {
            printf("calendar utility version %s\n", CALENDAR_VERSION);
            return EXIT_SUCCESS;
        }
    }

    time_t raw_time = time(NULL);
    struct tm *time_info = localtime(&raw_time);
    if (time_info == NULL) {
        fprintf(stderr, "Fatal: Could not retrieve local system time.\n");
        return EXIT_FAILURE;
    }

    DateContext today = {
        .day   = time_info->tm_mday,
        .month = time_info->tm_mon + 1,
        .year  = time_info->tm_year + 1900
    };

    const char *home_dir = getenv("HOME");
    if (home_dir == NULL) {
        fprintf(stderr, "Fatal: HOME environment variable is undefined.\n");
        return EXIT_FAILURE;
    }

    const char *target_suffix = "/.calendar";
    int path_length = snprintf(NULL, 0, "%s%s", home_dir, target_suffix);
    if (path_length < 0) return EXIT_FAILURE;

    char *file_path = malloc((size_t)path_length + 1);
    if (file_path == NULL) return EXIT_FAILURE;
    snprintf(file_path, (size_t)path_length + 1, "%s%s", home_dir, target_suffix);

    FILE *stream_ptr = fopen(file_path, "r");    
    if (stream_ptr == NULL) {
        perror("Fatal: Unable to open target calendar stream");
        free(file_path);
        return EXIT_FAILURE;
    }

    char *current_line = NULL;
    size_t allocated_capacity = 0;
    
    while (getline(&current_line, &allocated_capacity, stream_ptr) != -1) {
        parse_calendar_line(current_line, &today);
    }

    free(current_line);
    free(file_path);
    fclose(stream_ptr);

    return EXIT_SUCCESS;
}
```

## 3. Creating My Guardrails: The Specification (SPEC.md)
To keep myself from guessing or cutting corners down the road, I wrote a formal specification. If it's not documented here, it doesn't go into the code.

```
# Calendar Utility Functional Specification

This spec dictates exactly how the calendar parsing engine must behave.

## 1. Stream Format
* File location must live at `~/.calendar`.
* Valid lines require a date token, a literal tab character (`\t`), and a description.
* Anything else gets silently dropped.

## 2. The Token Matching Rules
Assuming today is **June 18, 2026**:

| Format | Example | My Evaluation Rule | Does it Match Today? |
| :--- | :--- | :--- | :--- |
| **Absolute Date** | `06/18/2026` | Matches month, day, and year exactly. | **MATCH** |
| **Yearly Recurring** | `06/18` | Matches month and day; skips the year check. | **MATCH** |
| **Monthly Wildcard** | `06 *` | Matches if the number matches the current month and has a trailing `*`. | **MATCH** (All June events) |
| **Daily Recurring** | `18` | Matches if a single number with no `*` matches the current day of the month. | **MATCH** (Every 18th) |
| **Mismatch** | `06/18/2024` | Fails because the explicit year parameter is in the past. | **DISCARD** |
```

## 4. Reconstructing My History (CHANGELOG.md)

I went back and cleaned up my changelog so it actually reflects the real milestones of this project, dropping my version back to 0.4.0 where it belongs.

```
# Changelog

## [0.4.0] - 2026-06-18
### Fixed
- Fixed the single-token collision by introducing the `mm *\t` syntax for full-month matches vs `dd\t` for day matches.
- Reset the project version to `0.4.0` to respect semantic versioning.

### Added
- Created `SPEC.md` to protect myself from forgetting my own layout rules.

## [0.3.0] - 2026-06-17
### Added
- Integrated `<time.h>` to pull local system time dynamically.
- Used `sscanf` cascades to extract integers from tokens.

## [0.2.0] - 2026-06-04
### Added
- Built the file processing engine using POSIX `getline`.
- Added conditional `uname` checks to the Makefile for Mac/Linux portability.

## [0.1.0] - 2026-06-01
### Added
- Initialized project directory structure and basic "Hello World" build targets.
```

## 5. Testing the Fixes

I updated my Makefile variable to track the real semantic version:

```
VERSION := 0.4.0
```

Then I loaded up my ~/.calendar file with additional test cases to confirm my new * syntax worked perfectly:

```bash
# Seeding tests for June 18th
printf "06/18/2026\tAbsolute Match\n" > ~/.calendar
printf "06/18\tYearly Match\n" >> ~/.calendar
printf "18\tDay 18 Match\n" >> ~/.calendar
printf "06 *\tFull Month June Match\n" >> ~/.calendar
printf "06\tDay 06 Match" >> ~/.calendar
printf "02 *\tFebruary Wildcard - Should Hide\n" >> ~/.calendar
```

Let's give it a try: 

```bash
make run
```

### My Output

```
Date: 06/18/2026 | Event: Absolute Match
Date: 06/18      | Event: Yearly Match
Date: 18         | Event: Day 18 Match
Date: 06 *       | Event: Full Month June Match
```
Everything parses perfectly without colliding. My technical debt is paid, my docs are tight, and I'm ready to move onto Step 6, which I'll document in a couple of weeks: dogfooding the software for a while before upgrading it.  This way, I can make better decisions about future features and their priority.