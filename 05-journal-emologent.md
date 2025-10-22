<style>
body {background-color: linen;}
<style>
# 05 · Journal + Emologent

## What this gives you

A daily `.org` file per date, with quick commands to open today’s file and drop a structured “emologent” block.

## Code

```
(defcustom my/journal-root "~/var/log" :type 'directory)
(defcustom my/journal-weather-cmd "curl -s 'https://wttr.in?format=1'" :type 'string)

(defun my/journal--today-path ()
  (let* ((y (format-time-string "%Y"))
         (d (format-time-string "%Y-%m-%d"))
         (dir (expand-file-name (concat y "/") (file-name-as-directory my/journal-root))))
    (expand-file-name (concat d ".org") dir)))

(defun my/journal--ensure-file ()
  (let* ((path (my/journal--today-path))
         (was-new (not (file-exists-p path))))
    (make-directory (file-name-directory path) t)
    (when was-new
      (with-temp-file path
        (insert "# -*- mode: org; -*-\n* personal journal of stormrider\n")))
    (cons path was-new)))

(defun bw/insert-emologent () (interactive)
  (let ((date (format-time-string "%Y-%m-%d %a %H:%M")))
    (insert (format "* emologent [%s]\n- mood: \n- energy: \n- mental wx: \n- loop: \n- gravity: \n- pivot: \n\n" date))))

(defun my/journal-today () (interactive)
  (let* ((res (my/journal--ensure-file))
         (path (car res)))
    (find-file path)
    (message "journal updated: %s" path)))

(defun my/journal-emologent-now () (interactive)
  (let* ((res (my/journal--ensure-file))
         (path (car res)))
    (find-file path)
(insert "*** emologent\n\n- mood: \n- energy: \n- mental wx: \n- loop: \n- gravity: \n- pivot: \n\n")))
```

**CC BY-NC 2025 stormrider**
