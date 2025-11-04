<style>
body {background-color: linen;}
</style>
# 02 · Package Archives & use‑package

## Why this bootstrap?

`use-package` makes package declarations readable and puts config next to install logic. The archive list covers GNU, org, and the two MELPAs.

## Code
```
(setq package-archives
      '(("gnu" . "https://elpa.gnu.org/packages/")
        ("melpa" . "https://melpa.org/packages/")
        ("melpa-stable" . "https://stable.melpa.org/packages/")
        ("org" . "https://orgmode.org/elpa/")))

(require 'package)
(unless package-archive-contents (package-refresh-contents))
(unless (package-installed-p 'use-package)
  (package-install 'use-package))
(require 'use-package)
(setq use-package-always-ensure t)
```

**CC BY-NC 2025 stormrider**
