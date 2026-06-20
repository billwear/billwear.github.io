# Fixing Bug 0001: Test Output vs. Production Output

When I run calendar now, here's the kind of output I get:

```text
Date: 6 *        | Event: check laundry
Date: 6 *        | Event: sweep
Date: 6 *        | Event: refill baby's water
```

This is great for debugging, but it isn't what a CLI user expects:

```text
check laundry
sweep
refill baby's water
```

Still, the debug output is useful.  What can I do here?  Well, in the spec, I suggested that I add an option `-d` that will produce the first listing, so that calendar lines can be debugged.  Without it, the code produces the more standard output in listing two.

Here's what changed. First, I added a debug option to main():

```c
    bool debug_mode = false;

    if (argc > 1) {
        if (strcmp(argv[1], "-v") == 0 || strcmp(argv[1], "--version") == 0) {
            printf("calendar utility version %s\n", CALENDAR_VERSION);
            return EXIT_SUCCESS;
        } else if (strcmp(argv[1], "-d") == 0) {
            debug_mode = true;
        }
    }
```

Second, I added a new conditional to the `is_date_match` conditional in `parse_calendar_line`:

```c
    if (is_date_match(date_token, today)) {
        if (debug_mode) {
            printf("Date: %-10s | Event: %s\n", date_token, desc_token);
        } else {
            printf("%s\n", desc_token);
        }
        return true;
    }
```

Basically, if we're in debug mode, print both the date string and the reminder message, with labels.  If not, just print the reminder message like the standard calendar program does.

Simple. Easy. One down, more to go.
