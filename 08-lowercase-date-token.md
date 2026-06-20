# Comparing a Lowercase Date Token

In preparation for comparing the date token to things like `Daily`, `tuesday` or `WeekEnd`, I need to make all comparisons case-independent.  I choose lowercase.  Here's what changed.

First, I wrote a routine to convert every character in a passed string pointer t0 lowercase:

```c
/**
 * @brief Converts a string to lowercase in-place.
 */
void lowercase_string(char *str)
{
    if (!str) return;
    for (int i = 0; str[i]; i++) {
        str[i] = (char)tolower((unsigned char)str[i]);
    }
}
```

Then I integrated that logic into `parse_calendar_line`:

```c
    // Bug 0005: Create a copy of the date token and make it lowercase for easy comparison
    char *lc_date_token = strdup(date_token);
    if (lc_date_token == NULL) return false;
    lowercase_string(lc_date_token);

    if (is_date_match(lc_date_token, today)) {
        if (debug_mode) {
            printf("Date: %-10s | Event: %s\n", date_token, desc_token);
        } else {
            printf("%s\n", desc_token);
        }
        free(lc_date_token);
        return true;
    }
```

Note that I didn't have to change `is_date_match` just yet, because I haven't added any tokens that might have inconsistent case.  It feels like the right thing to do to get this capability working before starting to use alpha date tokens that give the user discretion about case.

Compiled, tested, and as far as I know, works fine.
