# 08 · Keybindings Tour & Keys Help

## Global keys, grouped

* **F1/F2:** Keys help; jump to today’s journal
* **C-c m …:** A personal leader for daily actions (Org, shell, git, timestamps)
* **Windows:** `C-c m 1` and `C-c m 5` to focus/balance

## Code

```
(global-set-key (kbd "<f1>") 'my/show-keys-help)
(global-set-key (kbd "<f2>") 'my/journal-today)
(global-set-key (kbd "<S-f2>") 'my/journal-emologent-now)
(global-set-key (kbd "C-c c D") 'my/mark-done-and-reset-agenda)
(global-set-key (kbd "C-c m a") 'org-agenda)
(global-set-key (kbd "C-c m c") 'org-capture)
(global-set-key (kbd "C-c m 1") 'delete-other-windows)
(global-set-key (kbd "C-c m 5") 'balance-windows)
(global-set-key (kbd "C-c m f") 'dired-sidebar-toggle-sidebar)
(global-set-key (kbd "C-c m i") (lambda () (interactive) (find-file "~/.emacs")))
(global-set-key (kbd "C-c m d") 'my/insert-date-and-time)
(global-set-key (kbd "C-c m t") 'my/insert-time-and-epoch)
(global-set-key (kbd "C-c m F") 'my/git-force-push-home)
(global-set-key (kbd "C-c m g") 'my/grep-thru-homedir)
(global-set-key (kbd "C-c m M") 'my/show-message-buffer)
(global-set-key (kbd "C-c m P") 'commit-homedir-if-needed)
(global-set-key (kbd "C-c m p") 'home-git-pull)
(global-set-key (kbd "C-c m q") 'my/qrepl)
(global-set-key (kbd "C-c m S") 'my/insert-seasonal-header)
(global-set-key (kbd "C-c m s") 'my/insert-shell-command-results)
(global-set-key (kbd "C-c m x") 'my/draw-ascii-box-around-region)
      (global-set-key (kbd "C-c m u") 'my/uncapitalize-region)
      ```

**CC BY-NC 2025 stormrider**
