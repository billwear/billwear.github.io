# Step 2: Architecture and the Stub Program

Decent software begins with a stub. This one's no different.  I want to set up the logical flow before writing the "business" logic.  Helps me run rock-solid from day one. 

---

## 1. Architectural Blueprint

Before bending code, I need to understand how data flows through the tool. This one feels like a linear, predictable lifecycle: initialization, stream processing, parsing, and cleanup.

By isolating the line-parsing logic into a discrete predicate function, I can decouple data extraction from I/O operations, adhering to the principle of single responsibility (aka, keep it simple).

---

## 2. The Calendar Skeleton (`calendar.c`)

Below is the architectural stub for my modern calendar utility. It introduces formal C99 boolean types, handles dynamic path resolution safely via the environment, and stubs out the parsing engine with clear verification paths.  Yeah, I know, who talks like that, and who does this for hobby code, right? Well, me, for one.

```c
/**
 * @file calendar.c
 * @brief A modern unix utility to parse and display calendar events.
 * * This stub establishes the core execution lifecycle, environment handling,
 * and memory boundaries for the calendar stream processor.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/* Forward Declarations */
bool parse_calendar_line(const char *line_buffer);

/**
 * @brief Evaluates an isolated line from the calendar stream.
 * @param line_buffer Constant pointer to the raw line string.
 * @return true if the line matches target specifications, false otherwise.
 */
bool parse_calendar_line(const char *line_buffer)
{
    if (line_buffer == NULL) {
        return false;
    }

    // TODO: Implement formal specification parsing algorithm.
    // For this architectural stub, we accept all non-empty lines.
    return (strlen(line_buffer) > 0);
}

int main(void)
{
    // 1. Environment and Path Resolution
    const char *home_dir = getenv("HOME");
    if (home_dir == NULL) {
        fprintf(stderr, "Fatal: HOME environment variable is undefined.\n");
        return EXIT_FAILURE;
    }

    const char *target_suffix = "/.calendar";
    
    // Compute exact buffer allocation length to prevent truncation or overflow vulnerabilities
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

    // 2. Stream Initialization
    FILE *stream_ptr = fopen(file_path, "r");    
    if (stream_ptr == NULL) {
        perror("Fatal: Unable to open target calendar stream");
        free(file_path);
        return EXIT_FAILURE;
    }

    // 3. The Core Processing Loop
    char *current_line = NULL;
    size_t allocated_capacity = 0;
    
    // POSIX getline safely manages dynamic buffer scaling during ingestion
    while (getline(&current_line, &allocated_capacity, stream_ptr) != -1) {
        if (parse_calendar_line(current_line)) {
            // Echo verified lines to stdout
            printf("%s", current_line);
        }
    }

    // 4. Resource Decommissioning
    free(current_line);
    free(file_path);
    fclose(stream_ptr);

    return EXIT_SUCCESS;
}
```

## 3. The Automation Layer (Makefile)

If I can help it, I never compile manually. Instead, I use a Makefile.  Here's how I loaded my first Makefile for this project:

```makefile
# Compiler configuration
CC      := clang
CFLAGS  := -std=c99 -Wall -Wextra -Wpedantic -Wshadow -O2
TARGET  := calendar
SRC     := calendar.c

.PHONY: all clean run

# Default target
all: $(TARGET)

$(TARGET): $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET)

# Convenience target to execute immediately
run: $(TARGET)
	./$(TARGET)

# Purge build artifacts cleanly
clean:
	rm -f $(TARGET)
```

## 4. Verification and Execution Workflow

To verify that the infrastructure is functioning correctly, I need some mocks. Let me generate dummy data inside the `~/.calendar` file.

### Seed Test Data
I can run the following commands in my terminal to initialize my local `~/.calendar` file with a couple of mock records:

```bash
printf "06/20\tSystem Architecture Review\n" > ~/.calendar
printf "07/04\tIndependence Day Holiday\n" >> ~/.calendar
```

### Build and Run

If I did this right, I can now leverage the automation layer to compile and execute the system seamlessly:

```bash
make run
```

### Expected Architectural Output

Because the stub algorithm currently accepts any line with a length greater than zero, the application should process the file stream perfectly. I say "should" because the purpose of this automated testing is to block stupid mistakes at every level.

```
06/20   System Architecture Review
07/04   Independence Day Holiday
```

With the environment safely handling errors, memory safely clean, and the file processing pipeline validated, the skeleton is ready. In the next stage, I need to start *slowly and methodically* replacing the simplistic stub logic inside parse_calendar_line with the text-parsing algorithms I want.

## 5: Implementing Version Control Flags and Changelog Management

As a codebase evolves, knowing the exact version of the binary executing in production becomes critical. Hardcoding string literals deep within application code is a classic (and very bone-headed) anti-pattern. Instead, I want to inject version metadata dynamically at compilation time using preprocessor macros via the compilation toolchain.

This stage introduces standard UNIX CLI version flags (`-v`, `--version`) and establishes a formal repository tracking system.

---

### Automated Metadata Pipeline

Rather than manually updating a version string inside my C files every time I update, the compilation layer handles it. The source code references a macro name, and the `Makefile` assigns its value.


This keeps my binary perfectly synchronized with my deployment or version control tags without requiring source code modifications.

---

### Updated Calendar Utility (`calendar.c`)

First, I need to update the source to capture the standard command-line arguments `argc` and `argv` in `main`. If a user queries the version flag, the utility should handle it instantly, bypassing file operations and exiting cleanly.  Again with the "should."  *Always* test.

```c
/**
 * @file calendar.c
 * @brief A modern unix utility to parse and display calendar events.
 * * Incorporates runtime CLI parameter evaluations and build-time version injection.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/* Global Version Boundary - Injected via Compiler CFLAGS */
#ifndef CALENDAR_VERSION
#define CALENDAR_VERSION "0.1.0-dev"  // Fallback if compilation layer doesn't inject it
#endif

/* Forward Declarations */
bool parse_calendar_line(const char *line_buffer);
void display_version(void);

/**
 * @brief Outputs the current application version and build metadata.
 */
void display_version(void)
{
    printf("calendar utility version %s\n", CALENDAR_VERSION);
    printf("Compiled on %s at %s\n", __DATE__, __TIME__);
}

/**
 * @brief Evaluates an isolated line from the calendar stream.
 */
bool parse_calendar_line(const char *line_buffer)
{
    if (line_buffer == NULL) {
        return false;
    }
    return (strchr(line_buffer, '\t') != NULL);
}

int main(int argc, char *argv[])
{
    // 1. Evaluate Command Line Interface (CLI) Arguments
    if (argc > 1) {
        if (strcmp(argv[1], "-v") == 0 || strcmp(argv[1], "--version") == 0) {
            display_version();
            return EXIT_SUCCESS;
        }
    }

    // 2. Environment and Path Resolution
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

    // 3. Stream Initialization
    FILE *stream_ptr = fopen(file_path, "r");    
    if (stream_ptr == NULL) {
        perror("Fatal: Unable to open target calendar stream");
        free(file_path);
        return EXIT_FAILURE;
    }

    // 4. The Core Processing Loop
    char *current_line = NULL;
    size_t allocated_capacity = 0;
    
    while (getline(&current_line, &allocated_capacity, stream_ptr) != -1) {
        if (parse_calendar_line(current_line)) {
            printf("%s", current_line);
        }
    }

    // 5. Resource Decommissioning
    free(current_line);
    free(file_path);
    fclose(stream_ptr);

    return EXIT_SUCCESS;
}
```

### Injecting Version Metadata via the Makefile

I modified the build automation file to track a project-wide version variable (VERSION). I can then use the -D flag to define a macro definition name directly inside the compiler environment.

#### Updated Makefile:

```bash
# Project Information
VERSION := 1.0.0

# Compiler configuration
CC      := clang
CFLAGS  := -std=c99 -Wall -Wextra -Wpedantic -Wshadow -O2
CFLAGS  += -DCALENDAR_VERSION='"$(VERSION)"' # Injecting version string macro

TARGET  := calendar
SRC     := calendar.c

.PHONY: all clean run version

all: $(TARGET)

$(TARGET): $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

# Quick validation target
version: $(TARGET)
	./$(TARGET) --version

clean:
	rm -f $(TARGET)
```

### Repository Changelog (CHANGELOG.md)

A clear history of revisions keeps the project manageable, especially for forgetful minds like mine. I'm like the haiku that ends, "The river has moved on," so I created a file named CHANGELOG.md in the root of GitHub repo project to record the engineering milestones using the standard Keep a Changelog architecture.

```
# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-17

### Added
- Integrated standard Unix command line interface version flags (`-v`, `--version`).
- Created dynamic compilation pipeline in the `Makefile` to inject semantic version tags automatically via macro expansions (`-DCALENDAR_VERSION`).
- Implemented `display_version` function tracking build environment compilation timestamps (`__DATE__`, `__TIME__`).

### Changed
- Migrated standard single line evaluation placeholder logic inside `parse_calendar_line` to search explicitly for standard tab delimiters (`\t`).

---

## [0.2.0] - 2026-06-04

### Added
- Created foundational input stream architecture using safe POSIX `getline` allocations.
- Resolved execution target pathways dynamically using host environment variables (`getenv("HOME")`).
- Implemented precise dynamic runtime memory sizing via empty `snprintf` metric calls to suppress potential stack corruption vectors.
- Configured automated automation controls (`Makefile`) tracking modern static compilation parameters.

### Added
- Initialized core code repository workspace.
- Added foundational proof-of-concept compilation tests using basic "Hello World" outputs.
```

## Verification and Compilation Check

I executed these build automation commands to confirm that the macro value is moving correctly from the Makefile down into the runtime logic.

### Compiled and Verified Flag:

```bash
make version
```

### Expected Output:

```bash
./calendar --version
calendar utility version 1.0.0
Compiled on Jun 17 2026 at 17:31:05
```

This version indicator *should* eliminate confusion about whether my current local binary incorporates your latest enhancements or bugs. My repository feels better organized with the history is clearly mapped.
