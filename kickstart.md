Up: [Home](README.md) | *Kickstart* | Next: [foo](foo.md)

I like organic development -- that is, just start where you are and see where it goes -- so that's my plan here. First, I need a fully-functional Emacs running on my phone.

There are options; here are three:

- ssh into a rented server someplace; did this for awhile, but requires the Internet and costs money. -1.

- an emacs native app for android; there are some, but they are immature. -1.

 * Emacs on Termux on Android; supports a Dropbox API I can use to back up files. +1.

There are more, but I want to avoid analysis paralysis.

# Bringing up Emacs

After installing Termux on my Android phone, I started with:

```nohighlight
pkg install emacs
```

Next, I started Emacs, by typing this at the Termux command line:

```nohighlight
emacs
```

This will bring up a fullscreen Emacs window:

![Screenshot_20240529_145428_Termux.jpg](https://github.com/billwear/billwear.github.io/assets/18288776/c910abad-987b-40a1-8353-d7788f8b5931)

Note that this doesn't work as a *background* process on Termux, that is, you can't type:

```nohighlight
emacs &
```

in the Termux command line and expect it to work.  

Okay, let's just start typing. 
