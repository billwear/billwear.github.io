| < | v | > |
| :--- | :---: | ---: |
| [Journal](journal.md.md) | **Timestamp** | [Promote](promote.md) |

Since I'm editing my journal, I should create an easy way to add a timestamp. I can always look at the clock, translate to 24-hour time, and type in a second-level org heading, but there's gotta be an easier way for this very frequent operation. 

First, I'll need a little Emacs lisp function to handle it for me, something like this:

```nohighlight
(defun org-add-timestamp-heading ()
  (interactive)
  (goto-char (point-max))
    (insert "\n** " (format-time-string "%H:%M ") ""))
```

Next, I also need to tie that to an extra key:



