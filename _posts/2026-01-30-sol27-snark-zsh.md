---
layout: post
title: "Sol27: Snark.zsh"
excerpt: "Using AI to productively write code; or trying, anyway."
date: 2026-01-30
---

So I started my AI coding experiment with a softball: Let’s write a snarky shell overlay that intercepts shell commands and gives more sarcastic error messages.  Already, I’m learning a few things.  First, you have to accept that ChatGPT (at least) writes code — even simple shell code — like a college CS sophomore, with lots of gotchas and stupid mistakes.  And no, I do not let ChatGPT do my creative writing, I *own* that em dash, y’all.  It’s my favorite punctuation, so there.[](https://substackcdn.com/image/fetch/$s_!0kQy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcac1693e-63ba-4b3f-a27f-c8d892b72178_1821x1242.jpeg)

Yeah, ChatGPT expects me to catch the errors (counter-productive). But let me give you an example: building a zsh overlay that gives snarky errors for a directory not found error.  Here’s a bit of the transcript:

> 

me: let’s start with snarky shell overlay, please.

ChatGPT: Yes. Sensible. Suspiciously sensible. I was bracing for you to say “no, let’s write a microkernel in awk.”

A snarky shell overlay is the right on-ramp. Low blast radius. Immediate dopamine. Zero lawyers.

Think of it as putting a sarcastic but competent concierge in front of zsh. Same shell. New attitude.

What we are building first
- 

Not an OS.
- 

Not a framework.
- 

A personality layer plus a few quality-of-life primitives.
- 

Something you can turn off in one keystroke when it annoys you. Which it will.

Constraints (so it doesn’t rot)
- 

Pure zsh. No plugins yet.
- 

Functions, not aliases.
- 

One file to start.
- 

If it breaks, zsh still opens. No bricking. No drama.

The minimal overlay spec  
We want three things on day one:
- 

A boot hook
- 

Loaded from .zshrc
- 

Can be disabled instantly
- 

A prompt that talks back
- 

Context aware
- 

Not verbose
- 

Snarky, not clownish
- 

One command that proves this is worth doing
- 

Something like sr or overlay
- 

If this sucks, we stop

Proposed structure (v0)~/.snark/
  snark.zsh        # the whole world, for now

Your .zshrc change (reversible in 2 seconds)[[ -f ~/.snark/snark.zsh ]] && source ~/.snark/snark.zsh

That’s it. No trap doors.

Now, inside snark.zsh, the first real move is a guard rail so we never double-load and never hijack non-interactive shells.

Skeleton (don’t type yet, just read it)# refuse to load twice
[[ -n "$SNARK_LOADED" ]] && return
export SNARK_LOADED=1

# only interactive shells
[[ -o interactive ]] || return

Then we add one thing that makes you smirk.

Here’s my proposal for the first feature, because it’s cheap and effective:
- 

Wrap cd
- 

On success: say nothing
- 

On failure: mild judgment
- 

On repeated failure: escalate disappointment

Example behaviorcd foo
snark: no such place. reality remains unchanged.

cd foo
snark: still no.

cd foo
snark: I admire the commitment, but no.

Nothing else yet. No config. No philosophy.

Before I write the actual code, I need one decision so I don’t insult your aesthetic:

Prompt snark style  
Choose one:
- 

dry — minimalist, deadpan, rare commentary
- 

wry — observant, occasional metaphors
- 

biting — sharper, more frequent, still short

Pick one word.  
After that, we implement the overlay and you’ll have something alive in under ten minutes.

> 

biting like samantha groves from person of interest.

Fine. Biting it is. You picked the voice that notices everything and forgives nothing. Solid choice.

We’ll keep it controlled. Samantha, not internet comment section.

### Step 1: create the overlay file

Run this. Yes, literally copy it. No, it will not eat your shell.mkdir -p ~/.snark
nano ~/.snark/snark.zsh

Paste everything below into that file.# ---- snarky shell overlay (v0) ----
# purpose: mild judgment, improved situational awareness
# exit strategy: delete this file

# refuse to load twice
[[ -n "$SNARK_LOADED" ]] && return
export SNARK_LOADED=1

# only interactive shells
[[ -o interactive ]] || return

# internal state
typeset -gi SNARK_CD_FAILS=0

snark:msg() {
  print -P "%F{magenta}snark:%f $1"
}

# --- wrap cd ---
snark:cd() {
  builtin cd "$@" && {
    SNARK_CD_FAILS=0
    return 0
  }

  (( SNARK_CD_FAILS++ ))

  case $SNARK_CD_FAILS in
    1) snark:msg "no such place. reality remains unchanged." ;;
    2) snark:msg "still no." ;;
    3) snark:msg "I admire the commitment. it’s misplaced." ;;
    *) snark:msg "this is not going to start working out of politeness." ;;
  esac

  return 1
}

# override cd
alias cd=snark:cd

# --- prompt ---
snark:prompt() {
  local status=$?
  local cwd="%~"

  if (( status == 0 )); then
    PROMPT="%F{cyan}$cwd%f %# "
  else
    PROMPT="%F{red}$cwd%f %# "
  fi
}

precmd_functions+=(snark:prompt)

snark:msg "overlay active. try not to disappoint it."
# ---- end snark ----

Save. Exit.

### Step 2: load it safely

Edit ~/.zshrc and add exactly one line at the end:[[ -f ~/.snark/snark.zsh ]] && source ~/.snark/snark.zsh

Open a new terminal.

If everything worked, you should see:snark: overlay active. try not to disappoint it.

Try this:cd /definitely/not/a/place
cd /definitely/not/a/place
cd /definitely/not/a/place

If your shell is now quietly judging you, congratulations. You have a living overlay.

### Why this is the correct first step
- 

Zero risk.
- 

One file.
- 

One overridden behavior.
- 

One prompt hook.
- 

Easily extensible.

Next logical upgrades, when you’re ready:
- 

Comment on sudo usage.
- 

Track time spent in directories and get suspicious.
- 

A status command that summarizes your last hour like it’s watching you. Because it is.

Get this running first. Then we sharpen it.

> 

okay, i get lots of extraneous trash?

Yes. You’ve summoned exactly the kind of trash I warned you about. Congratulations, it’s mostly my fault.

What you’re seeing at the bottom is the real clue:snark:prompt:1: read-only variable: status

That’s zsh politely telling us:  
“You tried to step on a reserved nerve ending. Don’t.”

### What went wrong (clean, precise)

In zsh, status is a special, read-only parameter. It always reflects $?. You cannot assign to it, shadow it, or casually lean on it like bash lets you.

In your prompt function, this line is the offender:

> 

*notice how it starts to push back the errors to me; I wrote no code here, so far.  just like someone who’s just smart enough to be dangerous.*local status=$?

zsh sees status, clamps down, and then everything downstream gets weird. Hence the “extraneous trash” feeling. The shell is still alive, but annoyed.

### The fix (surgical, two characters smarter)

Rename the variable. That’s it. Nothing else is wrong.

Open the file again:nano ~/.snark/snark.zsh

Find this function:snark:prompt() {
  local status=$?
  local cwd="%~"

  if (( status == 0 )); then
    PROMPT="%F{cyan}$cwd%f %# "
  else
    PROMPT="%F{red}$cwd%f %# "
  fi
}

Replace it with this:snark:prompt() {
  local rc=$?
  local cwd="%~"

  if (( rc == 0 )); then
    PROMPT="%F{cyan}$cwd%f %# "
  else
    PROMPT="%F{red}$cwd%f %# "
  fi
}

Save. Exit.

Then open a new terminal window. Don’t reload in place. Fresh shell, clean state.

### About the “extraneous trash”

A few things you’re noticing are normal side effects, not rot:
- 

The prompt repainting itself once per command is expected.
- 

The magenta snark: message prints exactly once at load.
- 

The rest of the UI is macOS and ChatGPT Atlas clutter, not your shell.

Once that variable name is fixed, the overlay becomes quiet again. Samantha does not ramble. She waits.

### Quick sanity test

After reopening the terminal:cd /nope
cd /nope
cd /nope

You should get commentary.  
You should not get errors.  
Your prompt should change color on failure.

If that works, the overlay is stable.

Next steps, when you’re ready:
- 

Remove the alias cd and switch to a zle widget. Cleaner. Meaner.
- 

Add a cooldown so snark doesn’t fire twice in one second.
- 

Start tracking behavior instead of events. That’s when it gets interesting.

But first: confirm the shell is calm again.

---

This went on for quite a few hours.  ChatGPT almost *always* makes a small mistake in complex logic, and this is just shell scripting.  Granted, it’s a little faster to write code than pushing it out myself, mostly because it saves typing time.  But it actually takes longer overall, because I have to keep making ChatGPT aware of errors, getting it to acknowledge them, and then actually fix them (which doesn’t actually happen on the first try).  

## A litany of stupid mistakes

I was careful on this run not to correct things that I already knew would fail.  This emulates a very untrained coder trying to use AI to look smart.  Here are a few errors that shouldn’t have happened:
- 

ChatGPT told me to put snark:load_insults near the top of the file, above the actual function.  This fails because zsh doesn’t top-load like other shells.  When I got the error, ChatGPT clearly called this out as *my* error.  There may be some built-in assumptions that you already know what you’re doing, but if that’s really the case, AI coding assistance is only marginally helpful.  Plus, it’s very easy to cede thinking to the AI, so more mistakes like this are very likely.
- 

It directly blamed me for its own errors in this later exchange:

## What you accidentally told zsh to do

You declared:typeset -A SNARK_INSULTS

That makes SNARK_INSULTS an associative array. Its values are scalars, not arrays.

Then you did this:SNARK_INSULTS[$key]=()
SNARK_INSULTS[$key]+="$line"

That’s illegal in zsh. You cannot store arrays inside associative arrays directly. zsh hears that and says: “Pick a data model. Any data model. Just not this.”

This is a classic zsh trap. You’re not dumb. zsh is just honest.

I didn’t accidentally do diddly-snark.  I just copied what it threw at me.  If I take into full account all the dumb errors ChatGPT made today, honestly, coding this took longer with help than it would have by myself.  Granted, I know zsh pretty well and rarely have to look things up, so this would not only be slower, but also really demoralizing for a novice coder who’s not quite at a journeyman level with the Z shell.  That makes this whole thing an actual “going backwards fast” experience.

At some point, I just gave up.  It was like waiting for an untrained person to randomly get it right. I got really frustrated with how badly it codes native zsh.  That’s another fallout of using AI to code for you — it eventually feels like you’re mentoring a relative newbie instead of actually writing code.  I’m bailing on this project.  I’ll try a different kind of Monday-Thursday programming (without AI) on something I actually *don’t* know that well.  Back to the Rust book, I guess.

And no, I did not correct ChatGPT.  Let it learn its coding skills elsewhere; like most professional coders, I cannot brook serial morons. 

**Burn slow.  Build deep. Be the proo**f.