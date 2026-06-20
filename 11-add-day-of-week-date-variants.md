# Add Day of Week Date Variants

Building upon the context-aware foundations of the weekday and weekend checks, I tackled Bug 0004 and Bug 0005, which wanted support for specific named days of the week (like "Tuesday").

The trick here was providing an engine flexible enough to match variations like "Tue", "tues", "tuesday", or "Tuesday" without generating a massive, fragile matrix of cascading string comparisons.

## Architectural Approach & Logic Modification

By leveraging the architecture established in previous bugfixes, the problem elegantly collapsed down to a simple, truncated substring comparison.

1. Truncation and the Three-Letter Contract
As prescribed by Bug 0005, the parser should only evaluate the first three letters of a day-of-week marker. Because we already instantiate a safe, completely lowercased copy of the configuration token (lc_date_token), names like "Tuesday", "tues", or "Tue" all uniformly boil down to starting with "tue".

2. Implementation in the Matching Loop
I introduced a canonical array of lowercased, 3-letter weekday abbreviations matching the exact index order of the standard C tm_wday structure (0 = sun, 1 = mon, etc.).

Inside `is_date_match()`, I dropped in a loop that utilizes bounded string evaluation (strncmp) up to 3 characters:

```c
// Bug 0004 & 0005: Match the first 3 letters of named days of the week
const char *weekdays[] = {"sun", "mon", "tue", "wed", "thu", "fri", "sat"};
for (int i = 0; i < 7; i++) {
    if (strncmp(date_token, weekdays[i], 3) == 0) {
        return (today->wday == i);
    }
}
```

## Why This Design Scales Cleanly

• No Extra Tokenizing: By utilizing strncmp with a fixed length of 3, the code safely ignores extra trailing characters (like the "s" in "tues" or the "sday" in "tuesday") without allocating more memory or needing extra string splits.

• Immediate Short-Circuit: The loop runs instantly right after the ambient keyword checks (daily, weekday, weekend). If a named day is detected and matches the system's current day index, it returns true immediately.

## Behavior Verification

To test the multi-variant parsing behavior, I updated my ~/.calendar with a series of highly mismatched weekday entries:

```text
Tuesday	Weekly team synchronization sync
tues	Rotate production security logs
Tue     Water office plants
```

### Execution Environment Context (e.g., Tuesday)
When running the compiled binary on a Tuesday, the system clock flags today->wday as 2.

The lowercased tokens ("tuesday", "tues", "tue") are compared against our static structure array. All three extract an identical strncmp match on index 2 ("tue"), causing the utility to successfully output the comprehensive log list:

```bash
$ calendar
Weekly team synchronization sync
Rotate production security logs
Water office plants
```

Okay, we're almost to version 1, and a couple of weeks of real test usage.  Just one more feature to add.
