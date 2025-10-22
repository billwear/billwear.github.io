<style>
body {background-color: linen;}
<style>
# 04 · Convenience Functions

    
## Why these exist

They’re tiny utilities that save real time: run a shell command into a temp buffer, draw quick ASCII boxes, jump to your init, and drop timestamps.

## Code

```
(defun my/bangin (command)
  "Run shell COMMAND and show result in a buffer."
  (interactive (list (read-shell-command "Shell command: " nil 'shell-command-history)))
  (let* ((out (shell-command-to-string command))
         (buf (get-buffer-create "*Shell Output*")))
    (with-current-buffer buf
      (let ((inhibit-read-only t))
        (erase-buffer)
        (insert out)
        (special-mode)))
    (display-buffer buf)))

(defun my/draw-ascii-box-around-region (start end)
  "Draw ASCII box around selected region."
  (interactive)
  (let* ((lines (split-string (buffer-substring start end) "\n"))
         (max-len (apply #'max (mapcar #'length lines)))
         (border (concat "+" (make-string (+ max-len 2) ?-) "+")))
    (insert (concat border "\n"
                    (mapconcat (lambda (line) (format "| %-*s |" max-len line)) lines "\n")
                    "\n" border "\n"))))

(defun my/edit-init () (interactive) (find-file user-init-file))

(defun my/insert-date-and-time () (interactive) (insert (format-time-string "%Y-%m-%d %H:%M:%S (%s)")))

(defun my/insert-time-and-epoch () (interactive) (insert (format-time-string "%H:%M (%s)")))

(defun my/uncapitalize-region (start end)
  (interactive "r")
  (let ((text (buffer-substring start end)))
    (delete-region start end)
(insert (downcase text))))
```

**CC BY-NC 2025 stormrider**
