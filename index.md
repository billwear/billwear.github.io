# Walking through the C language

What do these books have in common? 

 - The K&R whitebook
 - The UNIX Programming Environment
 - The C Standard Library
 - Advanced Programming in the UNIX Environment 

Well, a couple of things:

 - They're all good books on the C language and how to use it in a UNIX/Linux OS.
 - They're just about all you need to thoroughly learn C programming under UNIX/Linux.
 - They're not the best starting point for really learning C.

I have programmed in C for years, but now that I've retired, I'm trying to get scary good.  I plan to walk all four of those books, but first I want to actually *do* something significant in C and learn by knockabout education.  Then the books will make more sense and I can learn some of the theory I've missed out on during my career.

## The BSD calendar program

I'm starting by trying to build *my* version of the BSD calendar program.  I'm not looking at their code at all, just trying to create a similar program, including a great deal of additional functionality that the original program doesn't include.  I don't even have a good inventory of what all that functionality actually is right now, except that I think the calendar CLI program can approximate a lot of the stuff that **Emacs org-mode** will do, and even some of the stuff it won't do (weekdays/weekends, 3rd Wednesday, etc.). 

I'm keeping the code in my [stdlin.h](https://github.com/billwear/stdlin.h), you can also watch it evolve from there.

Here are the steps so far, in order:

1. [Get a C program up and running](c-program-up-and-running.md): Basic stuff you have to do before you can run C.  Assumes a MacBook Pro, but you can use anything, really -- just know that some of the loading instructions will be different.

2. [Build a robust stub program](02-building-a-stub-for-calendar.md): Just me doing what I've been doing for about 50 years, building a framework that minimizes stupid before coding said stupid.

3. [Add code to tokenize the input lines for parsing](03-stream-tokens-and-string-tokenization.md): It feels a lot more effective to pull two tokens, one before the tab (the "when" token) and one after the tab (the "what to do" token).

4. [Match basic calendar dates](04-matching-basic-dates.md): Time to start working on the actual *application* logic: How do we parse out mm/dd/yyyy, mm/dd, dd, and dd?

5. [Do an architectural audit](05-architectural-audit.md): I made three mistakes up to this point, one forgetful, one lazy, and one because I was careless.  Time to fix those as best I can.