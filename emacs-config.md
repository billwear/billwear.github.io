---
layout: page
title: "My Emacs Configuration"
permalink: /emacs-config/
description: "A annotated walkthrough of my Emacs init.el — 21 sections covering everything from UI setup and package management to org-roam networked notes, org-babel literate programming, and a custom journaling system."
---

I've been living in Emacs for decades. This is my current `init.el` — annotated, because an uncommented config is a liability, and because the decisions behind a config are more interesting than the config itself.

The full source is below. Here's what it does and why.

---

## Design philosophy

The file is organized in numbered sections so that `C-c m i` (jump to init file) followed by a section search always lands me where I want to be. Everything is grouped by function, not by package. Keybindings live at the end, after the things they bind exist.

Three rules I hold to:

- **`custom.el` is separate.** The `custom-set-variables` block that Emacs wants to append to your init file will fight with any dynamic configuration you set above it. Custom gets its own file, loaded at startup, never touched by hand.
- **Aliases before keybindings.** `which-key` shows whatever the function is named. Aliasing `my/show-hybrid-agenda` to `agenda` means the popup says `agenda`, not a namespace-mangled blob.
- **`keymap-global-set` not `global-set-key`.** Emacs 29 introduced `keymap-global-set`, which handles key description strings correctly and is the forward-compatible form. The old form still works but generates warnings.

---

## What's in it

**Sections 01–03** handle the mechanical foundation: path setup before anything else (critical for eshell launched from a desktop icon, which never sees `.bashrc`), UI chrome removal, font size, theme, scrolling behavior, backup file management, and the handful of modes that should simply always be on — `save-place-mode`, `recentf-mode`, `savehist-mode`, `show-paren-mode`.

**Section 04** configures all four package archives (GNU ELPA, MELPA, MELPA Stable, Org ELPA) and bootstraps `use-package`. `use-package-always-ensure t` means every `use-package` declaration is also an install declaration — the config is self-installing on a fresh machine.

**Sections 05–06** set up `ivy`, `counsel`, `ivy-rich`, `ivy-prescient`, and `which-key`. Ivy is my completion framework of choice — predictable, fast, and composable with counsel for file, git, ripgrep, and locate searches. Prescient adds frequency-based ranking so the things I use most float to the top over time.

**Section 07** configures magit with full-frame status display and diff refinement on all hunks. `magit-todos` surfaces TODO/FIXME comments from the codebase directly in the magit status buffer. `diff-hl` puts git change indicators in the fringe of every buffer, integrated with magit's refresh cycle.

**Section 08** configures mu4e for Gmail via mbsync, with a 5-minute sync interval and compose-in-new-frame for focus.

**Section 09** is org core — the largest section. Key decisions:

- `org-modules` includes `org-id` and `org-attach` explicitly, which the default list omits
- `org-tempo` enables `<s TAB` expansion for source blocks
- Refile targets go 3 levels deep across all agenda files, with outline-path completion rather than just headline completion — this means you navigate the full tree when refiling
- `org-id-link-to-org-use-id` set to create IDs on interaction, which org-roam depends on
- Numeric priorities (0–63) instead of the default A/B/C — more granular, sorts correctly with standard comparators

**Section 10** sets up capture templates for five entry types: TODO, Note, Journal (routes to `my-journal-open`), Meeting (with scheduled timestamp), and Link (grabs from clipboard). Each template stamps a `:CREATED:` property for auditability.

**Section 11** configures org-babel with ten languages: emacs-lisp, shell, python, js, sql, css, plantuml, graphviz (dot), ditaa, latex, calc, and awk. The confirm-evaluate function skips the prompt for the three I run interactively all the time (emacs-lisp, shell, python) while still prompting for anything unexpected.

**Section 12** configures org-clock persistence — clock state survives Emacs restarts, idle time triggers a clock-out after 15 minutes, zero-time entries are automatically removed from the log.

**Section 13** adds org-pomodoro with standard 25/5/20 intervals, bound to `P` in the agenda buffer.

**Section 14** is org-super-agenda, which reorganizes the agenda view into named groups: Overdue, Today, Appointments, Waiting, Projects, Habits, and Inbox — in that priority order. The `:discard` rule at the end suppresses anything that doesn't fit a named group, keeping the view clean.

**Section 15** configures org-roam for networked notes, with three capture templates: default (timestamped filename), reference (author/URL fields), and project (goal/tasks/notes structure). The roam directory lives under `~/org/roam`. `org-roam-db-autosync-mode` keeps the database current without manual intervention.

**Section 16** sets up org-attach for binary attachments and org-download for dragging images directly into org buffers — screenshot support via scrot, clipboard paste via `C-c y`.

**Section 17** configures org-present for in-Emacs presentations, with hooks to go fullscreen, display inline images, hide the cursor, and make the buffer read-only on entry, reversing all of that cleanly on exit.

**Section 18** is the journal system — `my-journal-open` creates a dated `.org` file under `~/org/` if it doesn't exist, inserting a fortune cookie and a Discordian date (via `ddate`) as the header, followed by the emologent emotional log template. On subsequent opens the same day, it appends a timestamped section break.

**Sections 19–20** are utility functions and keybindings. All personal commands live under `C-c m <letter>`, alphabetically by letter. org-roam commands live under `C-c n` per convention. `my/today` opens today's journal and the agenda side by side in a split — the command I run first thing every morning.

**Section 21** logs init load time to the minibuffer at startup.

---

## The source

```elisp
;; see init.el linked below — or visit ~/the-way-of-emacs for annotated tutorials
```

Full source: [init.el on GitHub](https://github.com/billwear/billwear.github.io/blob/main/init.el)

For deeper walkthroughs of specific pieces — particularly magit, org-mode, and the journaling system — see [The Way of Emacs](https://the-way-of-emacs.com).