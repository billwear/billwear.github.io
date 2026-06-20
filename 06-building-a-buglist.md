# Building a BUGS.md buglist

I've got the spec, and from time to time I'll keep it updated, but that's not so interesting to me right now.  Instead, I'm going to build a "buglist" (`BUGS.md`).  Yeah, it's gonna have bughancements.  Get over it.

## Basic things that don't work (well)

Here's a quick list of things that don't work well with version 0.4.0:

* The output still looks like it's in test mode.  I need to make this output verbose with a `-d` flag, and print the expected calendar output -- just a list of active reminders -- if no flag is given.
* The output doesn't handle `daily` items, things that I'd do basically every day.  I've sort of faked that with my current output by using `<current month number> *` as the date, but that only works until the end of the month.  I need it to just return everything that has a `daily` marker.
* The output doesn't handle `weekday` items or `weekend` items.
* The output doesn't handle days of the week, like `Tue`, `tues`, `tuesday`, or `Tuesday`.
* I can make the processing a lot easier by converting the date field to lower case before parsing -- reduces the number of things I have to check and make the program more robust.
* The output doesn't handle things like `3rd Wednesday`.  For example, that's the day my social security check comes, so that's important.

Let me sort of codify these into a bug list:

```text
Bug Number :: Bug Text
---------------------------------------
0001 :: default output is test (debug) output; add -d flag for test output, and use standard calendar output with no flag.  standard calendar output is just a list of active reminders that are relevant to today.
---------------------------------------
0002 :: code doesn't parse the date variant "daily" which should always print the reminder output for that line.
---------------------------------------
0003 :: code doesn't parse the date variants "weekday" and "weekend" which should print "weekday" lines on monday through friday, and "weekend" lines on saturday and sunday.
---------------------------------------
0004 :: the output doesn't handle days of the week like "Tue", "tues", "tuesday", or "Tuesday".
---------------------------------------
0005 :: the parser is required to handle different cases when decoding some date formats; the date token should be made lowercase before the date parser has to act, so that a reduced set of comparisons will work; also, the parser should only compare the first three letters of the current day of the week to the date token when looking for day of week markers.
---------------------------------------
0006 :: the code doesn't handle ordinal days of the week (e.g., "3rd wednesday").
---------------------------------------
```

There are certainly more things I'll want to add, but this should give me a much better set of improvements.
