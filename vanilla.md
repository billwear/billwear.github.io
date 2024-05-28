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

