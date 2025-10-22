<style>
body {background-color: linen;}
<style>
# 01 · UI Basics & Startup
    
```
(setq user-full-name "William Wear"
      user-email-address "williamowear@gmail.com")

(add-to-list 'default-frame-alist '(fullscreen . maximized))
(setq inhibit-startup-screen t)
(setq frame-resize-pixelwise t
      window-resize-pixelwise t
      x-stretch-cursor t)

(set-face-attribute 'default nil :height 200)

(menu-bar-mode -1)
(tool-bar-mode -1)
(setq ring-bell-function #'ignore)

(windmove-default-keybindings 'control)
(setq windmove-create-window t)

;; (global-display-line-numbers-mode t)

(setq confirm-kill-emacs nil
      confirm-kill-processes nil)

(setq initial-scratch-message "scratch buffer")

(setq my/init-start-time (current-time))
```

## Comfort defaults

* Readable default font size (`:height 200` ≈ 20px)
* Disable menu/tool bars; silence the bell
* **Windmove** with Ctrl+Arrow keys to move between windows
* Skip the “Are you sure?” prompts on exit and process kills
* Shorten the scratch message; record init start time for profiling later

**CC BY-NC 2025 stormrider**
