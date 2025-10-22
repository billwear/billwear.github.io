# 07 · Ivy, Counsel, Which‑Key, Theme

## Completion & discovery

**Ivy** accelerates selection; **Counsel** adds rich commands; **Which‑Key** teaches keymaps in place.

## Code

```
(use-package ivy
  :init (ivy-mode 1)
  :config
  (setq ivy-use-virtual-buffers t
        ivy-count-format "(%d/%d) "
        ivy-wrap t
        ivy-re-builders-alist '((t . ivy--regex-plus))
        ivy-height 15
        ivy-fixed-height-minibuffer t
        ivy-initial-inputs-alist nil
        ivy-format-function #'ivy-format-function-arrow)
  :bind (("C-c v" . ivy-resume)
         ("C-x b" . ivy-switch-buffer)))

(use-package counsel
  :after ivy
  :bind (("M-x" . counsel-M-x)
         ("C-x C-f" . counsel-find-file)
         ("C-x C-r" . counsel-recentf)
         ("C-c f" . counsel-fzf)
         ("C-c g" . counsel-git)
         ("C-c k" . counsel-rg)
         ("C-c l" . counsel-locate))
  :custom
  (counsel-preselect-current-file t)
  (counsel-find-file-ignore-regexp (regexp-opt '(".git/" ".DS_Store" "node_modules/")))
  :config (counsel-mode 1))

(use-package ivy-rich :init (ivy-rich-mode 1) :config (setq ivy-rich-path-style 'abbrev))
(use-package ivy-prescient :after (ivy prescient) :config (ivy-prescient-mode 1))

(use-package which-key
  :custom
  (which-key-popup-type 'side-window)
  (which-key-side-window-location 'bottom)
  :config (which-key-mode 1))

(load-theme 'abyss t)

(custom-theme-set-faces
 'user
 '(org-level-1 ((t (:foreground "#FFB3BA" :weight bold))))
 '(org-level-2 ((t (:foreground "#FFDFBA" :weight bold))))
 '(org-level-3 ((t (:foreground "#FFFFBA" :weight bold))))
 '(org-level-4 ((t (:foreground "#BAFFC9" :weight bold))))
 '(org-level-5 ((t (:foreground "#BAE1FF" :weight bold))))
 '(org-level-6 ((t (:foreground "#D5BAFF" :weight bold))))
'(org-level-7 ((t (:foreground "#FFBAED" :weight bold)))))
```

**CC BY-NC 2025 stormrider**
