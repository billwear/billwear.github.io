# Add ordinal days of the week in any month

To put the final touches on our relative and recurring date handling engine, I tackled Bug 0006. While standard numeric days, days of the week, and ambient tags like weekday are highly useful, complex schedules often depend on ordinal patterns within a specific month—such as a monthly team retrospective scheduled for the "3rd Wednesday" or structural cleanups on the "1st Monday".

To implement this, I needed an elegant way to evaluate where the current calendar day falls inside its relative week-of-the-month bracket.

## Architectural Approach & Logic Modification

The core challenge was parsing a string pattern like "3rd wednesday" on the fly without building a heavyweight natural language processing parser. By taking advantage of our pre-lowercased lc_date_token, we can extract everything we need with simple string inspection and integer math.

1. The Integer Division Trick

Determining which instance of a weekday today belongs to requires looking at the current day number (today->day). We can calculate the instance index dynamically using integer division:

• Days 1 to 7 return 1 (1st instance of that weekday)

• Days 8 to 14 return 2 (2nd instance of that weekday)

• Days 15 to 21 return 3 (3rd instance of that weekday)

• Days 22 to 28 return 4 (4th instance of that weekday)

• Days 29 to 31 return 5 (5th instance of that weekday)

2. Implementation in the Parsing Engine

I dropped an early string inspection hook at the top of is_date_match(). If a configuration token starts with a digit, contains a valid ordinal modifier suffix (st , nd , rd , th ), and is followed by a weekday match string, it enters the ordinal logic block:

```c
// Bug 0006: Check for Ordinal Weekdays (e.g., "1st mon", "3rd wednesday")
if (isdigit((unsigned char)date_token[0])) {
    int ordinal = date_token[0] - '0';
    if (ordinal >= 1 && ordinal <= 5 && (strstr(date_token, "st ") || 
        strstr(date_token, "nd ") || strstr(date_token, "rd ") || strstr(date_token, "th "))) {
        
        // Find the start of the weekday name after the space boundary
        const char *day_part = strchr(date_token, ' ');
        if (day_part != NULL) {
            day_part++; // Move past the space character
            
            const char *weekdays[] = {"sun", "mon", "tue", "wed", "thu", "fri", "sat"};
            for (int i = 0; i < 7; i++) {
                if (strncmp(day_part, weekdays[i], 3) == 0) {
                    // Check if current system day matches this weekday index
                    if (today->wday == i) {
                        // Check if today is the correct N-th instance of this weekday
                        int current_ordinal_instance = ((today->day - 1) / 7) + 1;
                        return (current_ordinal_instance == ordinal);
                    }
                }
            }
        }
    }
}
```

## Behavior Verification

To confirm the new parsing rules, I populated the tracking configuration with a mix of monthly recurring intervals:

```text
1st mon	Perform routine server snapshot backups
3rd wednesday	Monthly engineering retrospective sync
```

### Execution Scenario: Third Wednesday of the Month

Imagine running the utility on a Wednesday where the calendar day is June 17th.

1. The execution runtime maps today->wday to 3 (Wednesday).

2. The tokenizer intercepts "3rd wednesday", parsing out the target ordinal integer 
3 and verifying the "wed" weekday match.

3. The engine computes the current day instance: ((17 - 1) / 7) + 1 = (16 / 7) + 1 = 2 + 1 = 3.

Because the calculated instance matches our parsed rule parameter exactly, the constraint is satisfied, printing the target event alert cleanly to stdout:

```bash
$ calendar
Monthly engineering retrospective sync
```

Okay. That's enough to call version 1.0.  I'm sure I will think of more things, but already, this code can do more **practical** things than the original BSD calendar program.  Two weeks of using it -- with notes -- should give me a good list of next actions for the program.
