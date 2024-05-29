[Up](README.md) | *Kickstart* | Next: [foo](foo.md)

Building organically, running Emacs on Android is priority one. so I'm a big fan of the organic style of doing stuff, that is, just start where you are and see where it goes. that's what I'm doing here. 

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

at certain points in my life, I used to think of myself as the "quintessential" engineer, which is kinda lame, since that "q" word only became a real word when I was, like, 20. anyway, I would get this idea that I could track all my time and then get really efficient and better. 

there are a couple of issues with this. first, it takes a lot of overhead to track your time. second, you get in the flow of things and forget to clock out of task one and into task two. so I eventually decided that I only need to do this from time to time, when I feel like I'm out of balance. 

iow, don't try this at home.

## things I learned

I love to sit with my cat in my lap late at night, and it's very important to her, also. she mostly just sleeps, but every one on awhile she reaches up and grabs my t-shirt, asking for pets.  I'm usually holding my phone in one hand, scrolling social media, so it's easy to Multitasking.

we recently bought an old house (my wife's grandmother's house, a quarter mile away on the 80 acres where most of the family lives). we're trying to renovate it so we can get into it.  that's kinda a britcom of it's own, but it consumes most early evenings, Saturdays, and days off. so I set aside all hope of meaningful hobbies until we're moved in and done renovating. 

big mistake. I can still do a lot of my hobbies from my phone, especially since I had no clue how much time I was vegetating every night. +1

also, I wasn't being particularly careful about my sleep. I'd go to bed whenever, get up late, rush thru getting ready, and watch the trash and laundry and scattered stuff build up until I just had to stop and do it. I can adjust my bedtime just a little, get up just a little earlier, and do housework at lunchtime. +1

and finally, I can put an evening cap on the reno at about 8:15-8:30pm. that means my 84yo FIL who loves renovation won't wear himself out, and we get some balance back in our lives. +1

ftr, here's the clocktable that got me to this point:

```bash
* clocktable
#+BEGIN: clocktable :scope file :maxlevel 1
#+CAPTION: Clock summary at [2024-05-26 Sun 18:50]
| Headline     |      Time |
|--------------+-----------|
| *Total time* | *3d 3:25* |
|--------------+-----------|
| birdie's     |     10:19 |
| family       |      6:44 |
| baby         |      6:11 |
| social media |      4:14 |
| insomnia     |      3:01 |
| eating       |      2:02 |
| church       |      2:17 |
| sharan       |      2:19 |
| prep         |      1:13 |
| sleeping     |   1d 7:33 |
| time mgmt    |      1:16 |
| waking up    |      1:40 |
| emacs        |      0:53 |
| hygiene      |      0:39 |
| housework    |      0:41 |
| journaling   |      0:20 |
| planning     |      0:03 |
#+END:
```

in the spirit of my earlier warning, notice that time management is really high for a three-day span. you can't track time very often without getting a distorted picture. 

## revelations about emacs on Android 

it may not seem like much, but I learned a few things about using emacs on Android:

* I wasn't using the interface properly. I started out using the standard emacs control keys to move the cursor, and it was slow and error-prone. then I got a bright idea: I'll add the termux arrow keys to the extra keys! faster, and has autorepeat, but still error prone. then it hit me that I could just place point with my finger. then I started learning all sorts of touch movements that termux supports (and by extension, emacs on termux). a whole bunch of dominoes fell when I figured this out. 

* I have some (good?) habits, like saving every so often or recentering the text. Control sequences aren't as efficient on the phone as they are on a keyboard, although it'll be nice to have normal pinkies again. Also, termux doesn't recognize the ```Shift``` key in the same way that a laptop does.  I customized the termux extra keys by adding function keys and assigning frequently-used keystrokes, like this:

```bash
(global-set-key (kbd "<f1>") 'org-agenda-list)
(global-set-key (kbd "C-<f1>") 'org-demote-subtree)
(global-set-key (kbd "M-<f1>") 'org-promote-subtree)
(global-set-key (kbd "C-x <f1>") 'org-cycle-global)
(global-set-key (kbd "<f2>") 'delete-other-windows)
(global-set-key (kbd "C-<f2>") 'balance-windows)
(global-set-key (kbd "M-<f2>") 'split-window-below)
(global-set-key (kbd "C-x <f2>") 'split-window-right)
(global-set-key (kbd "<f4>") 'save-buffer)
(global-set-key (kbd "C-<f4>") 'find-file)
```

I also modified the termux extra keys to give me a head start at collapsing keystrokes:

```bash
extra-keys = [['ESC','CTRL','ALT','TAB','/','-','HOME','END'],['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12']]
```

the resultant extra-key bar looks like this:

![Screenshot_20240528_163213_Termux.jpg](https://github.com/billwear/billwear.github.io/assets/18288776/4d236c77-be87-4259-a83e-b178a48f2c87)

* I also discovered that the menu bar on emacs on termux is useless, because off-by-one error, and text selection needs a shortcut method better than

```bash
C-a C-spacebar C-u-<try and guess how many lines>
C-n or C-p to correct location
miss the Ctrl key and start over
```

but I don't have a good fix yet. 