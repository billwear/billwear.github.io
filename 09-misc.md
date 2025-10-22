<style>
body {background-color: linen;}
</style>
# 09 · Encoding, Backups, and QoL

## Quality‑of‑life defaults

* Column numbers, delete‑selection, gentle line wrapping
* UTF‑8 everything
* Backups redirected to a single directory

## Code

```
(column-number-mode)
(delete-selection-mode 1)
(global-visual-line-mode t)
(setq fill-column 10000
      auto-save-no-message t
      native-comp-async-report-warnings-errors nil
      ediff-restore-window-configuration t)

(prefer-coding-system 'utf-8)
(set-keyboard-coding-system 'utf-8)
(set-language-environment "UTF-8")
(set-selection-coding-system 'utf-8)
(set-terminal-coding-system 'utf-8)

(setq backup-directory-alist `(("." . , "~/var/backup/autosaves")))

(require 'package)
(require 'use-package)
(use-package magit)
(use-package dired-sidebar)
(use-package vterm)
(use-package yaml)
```

**CC BY-NC 2025 stormrider**
