<style>
body {background-color: linen;}
<style>
# 06 · Org Settings & Agenda
    
## Readable agendas

Prefix formats show times neatly; entry snippets give context. Habit columns keep streaks visible.

## Code

```
(setq org-agenda-prefix-format '((agenda . "%?-02t ") (todo . "") (tags . " %i %-12:c") (search . " %i %-12:c")))
(setq org-agenda-start-with-entry-text t
      org-agenda-entry-text-maxlines 8
      org-agenda-span 3
      org-habit-graph-column 32
      org-habit-following-days 3
      org-habit-preceding-days 3)

(setq org-modules '(ol-bbdb ol-bibtex ol-docview ol-doi ol-eww ol-gnus org-habit ol-info ol-irc ol-mhe ol-rmail ol-w3m))

(use-package org
  :hook ((org-mode . org-indent-mode)
         (org-mode . visual-line-mode))
  :custom
  (org-agenda-compact-blocks t)
  (org-agenda-show-habits t)
  (org-agenda-span 'day)
  (org-directory "~/usr/org/")
  (org-hide-emphasis-markers t)
  (org-log-done 'time)
  (org-log-into-drawer t)
(org-startup-folded 'overview))
```

**CC BY-NC 2025 stormrider**
