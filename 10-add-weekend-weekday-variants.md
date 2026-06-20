# Add "weekday" and "weekend" date variants

Building upon the daily ambient task engine, I needed to implement a way to differentiate between standard workweeks and weekend rest days (Bug 0003). Hardcoding explicit dates or even numerical day offsets would break the minimalist, clean styling of the .calendar file. The logical path forward was to introduce the native keywords weekday and weekend.

To achieve this without bloating the evaluation stack, I needed to expose the system calendar's day-of-the-week tracker to our internal parsing context.

## Architectural Approach & Logic Modification

The standard C time subsystem (struct tm) natively tracks the day of the week via tm_wday, representing Sunday as 0 through Saturday as 6.

I expanded the utility's core DateContext structure to retain this metric at initialization, making it instantly available to the downstream tokenizer.

1. Extending the Context Model

I added the `.wday` member variable to the structured type blueprint:

```c
typedef struct {
    int day;
    int month;
    int year;
    int wday; /* Day of the week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday */
} DateContext;
```

Inside main, this is smoothly bound during the initial system clock handshake:

```c
DateContext today = {
    .day   = time_info->tm_mday,
    .month = time_info->tm_mon + 1,
    .year  = time_info->tm_year + 1900,
    .wday  = time_info->tm_wday // Saved to support weekday/weekend tracking
};
```

2. Evaluating Day Bounds

With the lowercase token engine established in our previous iteration, I intercepted "weekday" and "weekend" strings at the top of is_date_match(). This allows us to perform instant boolean range evaluations on the execution date's index:

```c
// Bug 0003: Check for "weekday" (Monday through Friday: 1 to 5)
if (strcmp(date_token, "weekday") == 0) {
    return (today->wday >= 1 && today->wday <= 5);
}

// Bug 0003: Check for "weekend" (Sunday or Saturday: 0 or 6)
if (strcmp(date_token, "weekend") == 0) {
    return (today->wday == 0 || today->wday == 6);
}
```

## Behavior Verification

To confirm the context matching, I appended the following dynamic lines to the active tracking file:

```text
weekday	check the mail
weekend	work on home renovation
```

### Environment A: Execution During the Workweek (e.g., Wednesday)

The context evaluates today->wday within the 1-5 bracket. The runtime cleanly isolates the appropriate notification:

```bash
$ calendar
check the mail
```

### Environment B: Execution During the Weekend (e.g., Saturday)

The context detects today->wday == 6, dropping the workweek block and asserting the rest-day variant:

```bash
$ calendar
work on home renovation
```

Done and done.
