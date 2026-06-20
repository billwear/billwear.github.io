# Implement "daily" Date Variant Parsing

As part of the ongoing refinement of my Unix calendar utility, I needed to address a clear gap in how recurring events are handled. Specifically, **Bug 0002** highlighted that the utility had no mechanism to recognize the keyword `daily`. Without this, users had to explicitly map out discrete calendar dates or wildcards, even for items that should appear on every single active checklist or daily summary.

To fix this, I updated the parsing engine to treat `daily` as a global match rule that bypasses traditional calendar structure constraints.

---

## Architectural Approach & Logic Modification

The primary challenge was ensuring that any variation of the word (such as `Daily`, `DAILY`, or `daily`) would evaluate successfully without requiring duplicate checks or bloated conditional statements. 

Because I previously implemented **Bug 0005** (which standardizes the incoming `date_token` into a completely lowercase copy called `lc_date_token`), I was able to build this feature directly into the core date comparison engine using a single clean string evaluation.

### How the Code Was Modified

I updated the matching engine within `is_date_match()` to intercept the string token immediately before it attempts standard numeric `sscanf` formatting.

```c
/**
 * @brief Evaluates an isolated date token against the current system date.
 * Handles: mm/dd/yyyy, mm/dd, "mm *" (entire month), dd (specific day), and "daily"
 */
bool is_date_match(const char *date_token, const DateContext *today)
{
    // Bug 0002: Check for the "daily" string variant
    if (strcmp(date_token, "daily") == 0) {
        return true;
    }

    int item1 = 0, item2 = 0, item3 = 0;
    int tokens_found = sscanf(date_token, "%d/%d/%d", &item1, &item2, &item3);
    
    // ... rest of the traditional date evaluation logic remains intact ...

## Why This Placement Matters

1. Short-Circuit Evaluation: By running strcmp at the top of is_date_match, the application avoids running expensive token scanning (sscanf) or character finding (strchr) operations on an purely alphabetic keyword.

2. Deterministic Returns: Returning true instantly guarantees that the associated event token (desc_token) will pass validation in parse_calendar_line and print cleanly to standard output, matching the tool's core philosophy.

3. Safety Fallthrough: If the token isn't "daily", execution drops directly into the legacy structural blocks (mm/dd/yyyy, mm/dd, wildcards, or precise day integers) without impacting baseline utility behavior.

## Behavior Verification

With this change compiled, .calendar configuration sheets can now incorporate permanent ambient tasks alongside standard calendar markers:

```text
daily	Standup meeting with the engineering group at 09:30 AM
06/20	Submit the Q2 deliverable roadmap report
```

When executing calendar, the utility correctly translates the current execution environment context and produces both scheduled line matches and the catch-all ambient items automatically:

```bash
$ ./calendar
Standup meeting with the engineering group at 09:30 AM
Submit the Q2 deliverable roadmap report
```
