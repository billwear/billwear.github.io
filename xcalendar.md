# NAME

xcalendar - list today\'s reminders

# SYNOPSIS

**xcalendar**

# DESCRIPTION

A simple analogue of the BSD calendar utility.

The code for calendar is difficult to compile on modern hardware, due to
antiquated libraries. While not as fully-featured as the original, it
gets the job done, and adds one glaring omission from the original.

# CALENDAR FILE

A file named **.calendar** must be present in your home directory. Every
line consists of a date indicator, followed by a tab and a reminder
message. Date indicators may consist of the following:

**May 16**

:   A capitalized month name followed by the day of that month.

**05/16**

:   A month/day pair (American style).

**05-16**

:   A month-day pair (also American style).

**Thursday**

:   A spelled out day name.

**Thu**

:   A three-letter day name abbreviation. **daily** The lowercase word
    \"daily.\" Items marked with this will appear every day.

# INSTALLATION

Copy the script from the GitHub repository to your \$PATH, typically
/usr/local/bin.

# AUTHOR

William Orian Wear (Bill Wear)
