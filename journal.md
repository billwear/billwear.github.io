[home](README.md) ~ [andromacs](andromacs.md) ~ [geek](geekcode.md) ~ [org](orgmode.md) ~ [credo](credo.md) ~ [arcana](arcana.md) ~ [networks](networking.md) ~ [blog](blogroll.md)

-----

## journals on a phone

I've been keeping a journal since I started using Unix five decades ago:

![Screenshot_20240529_152703_Termux.jpg](https://github.com/billwear/billwear.github.io/assets/18288776/b181b7d3-bb85-405e-b9b7-124c5fd67437)

This one I started today, while blogging this entry. You can see it's in org-mode, with a pretty standard template. It took quite a few keystrokes in Emacs to get this loaded, and I learned a few things. 

## Lesson 1: Touch
*Prioritze the Android interface over Emacs key chords, where possible.*

I found myself using the standard Emacs cursor key chords to get around. *Duh*. All I really have to do is touch the screen, and maybe sometimes use a C-f or C-b when I'm right on the edge of the screen. 

## Lesson 2: Slow down
*Master predictive text by showing down the swipe just a smidgen.*

I've always been awkward with swipe-typing because I go just a little too fast, hence a little too sloppy, with my swyping. Given that I've made a committed decision to stick with the phone, I'm forced to slow down just a bit and pause more carefully over the letters. In the end, it's far  faster than finger-punching each letter. Just takes practice and a little more mindful attention, which I need to practice anyway. 

## Lesson 3: Speed-saving
*Create a Termux extra key for saving a buffer, since I reflexively do it after every few paragraphs.*

On the laptop, I'm used to hitting the  ```save-buffer``` keychord with my left hand fairly often:

```nohighlight
C-x C-s
```

On the phone, there are no keychords, instead amounting to four separate finger punches:

```nohighlight
CTRL
x
CTRL
s
```

That's going to slow me down, so I'll add *F1* to the Termux extra keys by creating ```~/.termux/termux.properties``` like this:

```nohighlight
extra-keys = [['ESC','TAB','CTRL','ALT','-','UP','DOWN','F1']]
```

which gives me this Termux view:

![Screenshot_20240529_155734_Termux.jpg](https://github.com/billwear/billwear.github.io/assets/18288776/eb942f49-5fd3-415e-9aa2-c954750f97a3)

Next, I create a ```.emacs``` file with one line, mapping ```save-buffer``` to F1:

```nohighlight
(global-set-key (kbd "<f1>") 'save-buffer)
```

Now I can just press **F1** on the Termux extra key bar whenever I feel the need to save. It should become muscle memory fairly quickly. 


