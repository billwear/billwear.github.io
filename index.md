# Learning C all over again

*Preamble: There's already lots of code here, and if all goes well, there will be a whole lot more.  Just bear with me for a few scrolls while I tell you how I got here and where I'm trying to go.*

---

When my dad was about 70, I was trying to introduce him to some new technology.

"No thanks," he said firmly.  "I'm too old to learn anything new."

That hit me like a brick. In that moment, I resolved that I would *never* be that way.  Ever.

So here I am at 67.5, trying to *actually* learn C, a programming language I've used extensively throughout my career.  I've written lots of production code, and for many years maintained some really complicated code that others had written. I learned how to use it on-the-fly, on the job, in real pressure situations.

And yet I don't really feel like I *know* the language all that well.  Complex pointers. Casting. The standard library.  I have a working acquaintance.  If somebody showed up in my life today and wanted to pay me significant money to write some kind of a scientific or business program in C, I would definitely take the work.  And I would get it done to everyone's complete satisfaction.

But knowing how to produce working, reliable code in C is very different from really grokking the language, libraries, and capabilities. When I retired at the end of October, 2025 -- ostensibly by choice, but in reality, the job was going away -- it hit me that I'd been programming and documenting C for about 53 years, since I was fourteen.  In all that time, I never, ever, *really* learned it.  

## Yard sale find

Our church youth were having a yard sale.  Right up front was a mattress cover that fit my bed, in the same color as my favorite sheet set.  I picked it up and handed the youth pastor a $20.

"Are you sure?"

"Yeah, I'd probably have to pay that elsewhere; plus, it's a donation."

"Well, tell you what, I'll accept it, but wander around here and see if there's anything else you want.  You can certainly take it for just this donation."

Okay, so I wandered around the gym, which was packed with all kinds of things.  Costume jewelry. Tons of coffee mugs.  Old briefcases. An expresso machine.  You name it.

Under the edge of a table was a forlorn box of books.  Some white ones were turned upside down on top.  Since I have been known to collect books that I never get around to reading, I picked them up and turned them over. Lo and behold, here were nearly pristine original copies of:  

 - "The C Programming Language" (the K&R whitebook)
 - "The UNIX Programming Environment"
 - "The C Standard Library"

I started to put them back, but then remembered that I already had the unoffical "fourth book" in this series in my bookshelf at home, never actually opened: "Advanced Programming in the UNIX Environment."  I took them home, read through them that night, and then kinda set them on a shelf.

Remember that this happened at church.  Things that happen at church *appear* to have some divine intervention associated.  Remember, I said *appear*.

## Competing with AI

Well, a couple of things happened after this.  First, my seven-month campaign to find a job, freelance or otherwise, was going exactly nowhere.  Recently, I learned that 185,000 other people are in the same boat.  Companies are not hiring because they're using AI instead.  I'm going to withhold my opinion on that for the moment.  For the moment.

During the early second week of June, 2026, I was lamenting this out loud, probably saying questioning divine providence.  Right at that moment, "The Standard C Library" caught my eye, because it was slipping off the shelf where I'd haphazardly thrown it.  Didn't get there in time to keep it from falling, but picked it up and started to read it.

Realized within ten pages that I was in a little over my depth.  I could kinda follow, but not well enough to really connect with some of the things being said.

"Well, maybe I do need to learn this," I said, out loud, to no one in particular except the cat.  She just stared at me, but that's mostly what she does, anyway.  I picked up "The UNIX Programming Environment."  Likewise, a few things in the early chapters were just unfamiliar enough to make me uncomfortable.  "The C Programming Language" seemed like a really boring read early on, but again, there were a couple of nuances I had to think about.  Didn't even crack APUE.

That's the moment I realized two things:

 - They're all good books on the C language and how to use it in a UNIX/Linux OS.
 - They're just about all you need to thoroughly learn C programming under UNIX/Linux -- but *not quite*.

In short, they're amazing books, but they're not the best starting point for getting an advanced understanding of C.  At least, not for a longtime C programmer, who's done a lot of high-performance hardware level and OS coding.  When I say it that way, it sounds like I'm a C genius, but I'm absolutely, depressingly average.  And I want that to change, even if I never write another line of C for money.

Not that I'm against getting money for it, just so you know.

## The BSD calendar program

I realized I'd need something dear to my heart to get this party started.  My favorite toy has always been the BSD calendar program.  Anytime I learned a new language -- and I've gotten paid to write seemingly-hard production code in FORTRAN, C, C++, Python, PHP, PERL, and BASIC -- I always learned it by reproducing the BSD calendar program.

Okay, that works.

So I'm starting my advanced personal learning by trying to build *my* version of the BSD calendar program.  I'm not looking at their code at all, just trying to create a similar program, including a great deal of additional functionality that the original program doesn't include.  I don't even have a good inventory of what all that functionality actually is right now, except that I think the calendar CLI program can approximate a lot of the stuff that **Emacs org-mode** will do, and even some of the stuff it won't do (e.g., weekdays/weekends, 3rd Wednesday).

## Some logistics

I'm keeping the code in my [Learning C all over again](https://github.com/billwear/learning-c-all-over-again/) repo.  You can watch it evolve from there, and you can also follow this website for the play-by-play.

## The TOC

Rather than just jumping on my horse and riding madly in all directions (credit to someone called Stephen Leacock), I decided to take this in what some might call baby steps.  Call 'em what you want.  I don't care.  I'm just trying to do this clean fist, as the Morse code enthusaists would say.

Here's the informal TOC -- which grows from day to day -- so far:

1. [Get a C program up and running](c-program-up-and-running.md): Basic stuff you'd have to do before you can run C.  This explanation assumes a MacBook Pro, because that's what I got for a retirement present, but you can use anything, really -- just know that some of the loading instructions will be different.  If you're here to learn C programming, you can probably figure it out, but if you're confused, I'm okay if you [email me](mailto:wowear@gmail.com). 

2. [Build a robust stub program](02-building-a-stub-for-calendar.md): Just me doing what I've been doing for about 50 years, building a framework that minimizes stupid before coding said stupid.  You'll see that I've learned only a *little* about modern development, because all the places I worked either didn't care about these methods, or had someone to do it for you.

3. [Add code to tokenize the input lines for parsing](03-stream-tokens-and-string-tokenization.md): It feels a lot more effective to pull two tokens, one before the tab (the "when" token) and one after the tab (the "what to do" token).  That really feels like an important first step.

4. [Match basic calendar dates](04-matching-basic-dates.md): Time to start working on the actual *application* logic: How do we parse out mm/dd/yyyy, mm/dd, dd, and dd?

5. [Do an architectural audit](05-architectural-audit.md): I made three mistakes up to this point, one forgetful, one lazy, and one because I was careless.  Time to fix those as best I can.  Probably need to do that every four or five bumps, TBH.