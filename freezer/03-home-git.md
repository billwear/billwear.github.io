<style>
body {background-color: linen;}
</style>
# 03 · Auto‑sync Home Repo (home‑git)
    
## What this does

Automatically saves buffers under `~`, commits, pulls with rebase/autostash, and pushes on a timer and at exit. It quietly keeps your dotfiles in sync across machines.

## Code

```
(require 'subr-x)

(defgroup home-git nil "Auto-commit for homedir Git repo." :group 'tools)
(defcustom home-git-root (expand-file-name "~") "root dir of homedir repository." :type 'directory)
(defvar home-git--timer nil "Timer for periodic git commits.")

(defun home-git--in-repo-p (dir)
  (eq 0 (call-process "git" nil nil nil "-C" dir "rev-parse" "--is-inside-work-tree")))

(defun home-git--dirty-p (dir)
  (let* ((buf (generate-new-buffer " *home-git-status*"))
         (exit (call-process "git" nil buf nil "-C" dir "status" "--porcelain")))
    (unwind-protect (and (eq exit 0)
                         (with-current-buffer buf
                           (goto-char (point-min))
                           (not (string-empty-p (string-trim (buffer-string))))))
      (kill-buffer buf))))

(defun commit-homedir-if-needed ()
  (interactive)
  (let ((dir home-git-root))
    (unless (home-git--in-repo-p dir)
      (message "[home-git] %s is not a Git repo; skipping." dir)
      (cl-return-from commit-homedir-if-needed nil))
    (save-some-buffers t (lambda () (when-let ((f (buffer-file-name)))
                                (string-prefix-p (file-truename dir) (file-truename f)))))
    (when (home-git--dirty-p dir)
      (let ((msg (format "homedir: %s @ %s" (system-name) (format-time-string "%Y-%m-%d %H:%M:%S"))))
        (unless (eq 0 (call-process "git" nil nil nil "-C" dir "add" "-A"))
          (user-error "[home-git] git add failed"))
        (let ((commit-exit (call-process "git" nil nil nil "-C" dir "commit" "-m" msg)))
          (when (not (eq commit-exit 0))
            (message "[home-git] nothing to commit; skipping push.")))
        (call-process "git" nil nil nil "-C" dir "pull" "--rebase" "--autostash")
        (let ((push-exit (call-process "git" nil nil nil "-C" dir "push")))
          (message (if (eq push-exit 0) "[home-git] pushed." "[home-git] push failed; check M-x magit-status.")))))))

(add-hook 'kill-emacs-hook #'commit-homedir-if-needed)

(defun home-git-start-timer (&optional minutes)
  (let* ((m (prefix-numeric-value (or minutes 10)))
         (sec (* 60 (max 1 m))))
    (when (timerp home-git--timer) (cancel-timer home-git--timer))
    (setq home-git--timer (run-at-time 60 sec #'commit-homedir-if-needed))
    (message "[home-git] timer armed: every %d minute(s)." m)))

(defun home-git-stop-timer ()
  (when (timerp home-git--timer)
    (cancel-timer home-git--timer)
    (setq home-git--timer nil)
    (message "[home-git] timer disarmed.")))

(home-git-start-timer 10)

(defun home-git--has-remote-p (dir)
  (eq 0 (call-process "git" nil nil nil "-C" dir "remote" "get-url" "origin")))

(defun home-git-pull (&optional quiet)
  (interactive)
  (let ((dir home-git-root))
    (cond
     ((not (home-git--in-repo-p dir)) (unless quiet (message "[home-git] %s is not a Git repo; skipping." dir)))
     ((not (home-git--has-remote-p dir)) (unless quiet (message "[home-git] no 'origin' remote; skipping pull.")))
     (t (call-process "git" nil nil nil "-C" dir "fetch" "--prune")
        (let ((exit (call-process "git" nil nil nil "-C" dir "pull" "--rebase" "--autostash")))
          (unless quiet (message (if (eq exit 0) "[home-git] pulled." "[home-git] pull failed.")))) t))))

(defun home-git-sync-at-startup ()
  (home-git-pull 'quiet)
  (home-git-start-timer 10))

(add-hook 'emacs-startup-hook (lambda () (run-at-time 5 nil #'home-git-sync-at-startup)))
```

**CC BY-NC 2025 stormrider**
