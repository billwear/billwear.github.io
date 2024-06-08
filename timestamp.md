[home](README.md) ~ [andromacs](andromacs.md) ~ [geek](geekcode.md) ~ [org](orgmode.md) ~ [credo](credo.md) ~ [arcana](arcana.md) ~ [networks](networking.md) ~ [blog](blogroll.md)

-----

## timestamping ideas

Since I'm editing my journal, I should create an easy way to add a timestamp. I can always look at the clock, translate to 24-hour time, and type in a second-level org heading, but there's gotta be an easier way for this very frequent operation. 

First, I'll need a little Emacs lisp function to handle it for me, something like this:

```nohighlight
(defun org-add-timestamp-heading ()
  (interactive)
  (goto-char (point-max))
    (insert "\n** " (format-time-string "%H:%M ") ""))
```

Next, I also need to tie that to an extra key, I. this case, F2, added to .emacs:

```nohighlight
(global-set-key (kbd "<f1>") 'save-buffer)
```

And with just a little effort, we have a way to add journal entries.

*ultimately, i decided to switch to org-roam, because it does a whole lot of stuff for you, but i never throw things away.*




