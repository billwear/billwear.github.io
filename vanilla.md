# vanilla

so I'm a big fan of the organic style of doing stuff, that is, just start where you are and see where it goes. that's what I'm doing here. 

first, I need to be able to run emacs on my Android phone. there are certainly more options than these that I considered:

 * ssh into a rented server someplace, like Digital Ocean. did this for awhile, but requires me to be online, and costs money every month. -1.

 * there's an emacs native app for android, but it seems like it's not ready for prime time yet.  -1.

 * termux on Android with the emacs pkg installed. termux has a dropbox api I can already use to back up files. +1.

I know there are more. I don't care at this point, analysis paralysis ain't my thing.

# emacs on termux on Android, oh my

(had to be done, sorry). so I started with:

```bash
pkg install emacs
```

then I fired up emacs:

![Screenshot_20240528_150835_Termux.jpg](https://github.com/billwear/billwear.github.io/assets/18288776/abfef089-88f1-4d0b-953c-0076e105b47d)

nevermind that my extra keys look like this:

![Screenshot_20240528_151849_Termux.jpg](https://github.com/billwear/billwear.github.io/assets/18288776/c3e58cc2-3233-46c3-9671-0f180cbee088)

I'll just deal with Ctrl keys until I get tired of them or adapt. I'm betting on adapt. so let's get started with emacs, yeah!

## foo.org

as I write this, I'm on vacation after a long overseas engineering meeting that my company puts on every six months. just seemed like the time. I have a few days, and I have emacs with org mode. let's redesign everything at once, what the heck. 

I open up a file called "foo.org" in the default termux directory (whatever, for now, anyway). might as well use org mode to do some personal timing studies for 2-3 days and see if there's anything I should change:

```bash
* emacs
* hygiene
* meds
* reno
* dressing
* my cat
* my wife
* family
* ...
```

then, since I was working on emacs, I started the org clock (C-c C-x C-t) to keep time. for those who haven't used this before, it creates a log book for the org outline item, with a clock entry, like this:

```bash
* emacs
:LOGBOOK:
CLOCK: [2024-05-24 Fri 14:07]
:END:
```

*[learn more about the org clock](https://orgmode.org/manual/The-clock-table.html)*

and off I went.

## some words about time studies 

