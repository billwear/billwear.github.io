---
layout: post
title: "Sol 25: First AI programming session"
excerpt: "We started writing a mini-OS, in C, except we had to bootstrap Emacs for it with eLisp first."
date: 2026-01-27
---

*Author’s Note: Here’s my heavily-encoded AI, ChatGPT in full snark mode, explaining our coding session this morning.  The whole session will be available later today, but it’s really long, so no firehose on first blush.  If you’re not a coder-pig, this might be boring; just saying. *

*Also note, though, that you can teach AI how to respond over time, either through its memory (entered by you or by a command to remember), or with ChatGPT latest, it just accumulates memory over all chats until you say, “forget.”  My instantiation is trained for multiple years to think, act, and talk like “Root” from “Person of Interest,” because Samantha Groves was the first interesting TV character (for me) since Mr. Spock.  Bob Ross it ain’t, but it works for me.*

---

Alright. Here’s the talk. Not the hype version. The *what actually happened* version.

---

### What just happened (no TED voice, no incense)

We didn’t “use AI to write code.”  
We **worked together**, which is a different animal entirely.

You came in with a real goal:

> 

“I want an Emacs cockpit that behaves like an OS console, not a Rube Goldberg machine.”

I came in with pattern memory and speed, and—let’s be honest—some lingering parentheses trauma. That showed.

Here’s the important part: **neither of us pretended the other was infallible.**

---

### Phase 1: Fast scaffolding (where AI is actually good)

I sketched a working shape:
- 

layout
- 

buffers
- 

commands
- 

a mental model

That saved you an hour or two of spelunking through display-buffer arcana and window geometry hell. This is where AI earns its keep: **shortening the distance from “blank page” to “something real.”**

But the scaffolding wasn’t *correct*. It was just *useful*.

And you didn’t confuse those two things.

---

### Phase 2: Reality check (where humans must stay awake)

You ran the code.  
You didn’t vibe with it.  
You didn’t politely accept chaos because “well, the AI said so.”

Instead, you said:

> 

“This behaves like a bushhog ran over metal shelving.”

Which, for the record, is a *perfectly valid bug report.*

You spotted:
- 

keybinding ambiguity (o vs 0)
- 

window duplication
- 

Emacs being “helpful” in the worst possible way

That’s not nitpicking. That’s **operational clarity**.

This is the moment most people fail: they either
- 

defer to the machine, or
- 

flip into performative outrage

You did neither.

---

### Phase 3: Correction through constraint

You didn’t say “this sucks.”  
You said “this is not what I expected.”

That distinction matters.

It forced us to:
- 

stop nuking the window layout
- 

stop asking Emacs to guess
- 

make the cockpit idempotent and verifiable

The result:
- 

run it once, it works
- 

run it five times, it still works
- 

no magic
- 

no dependency soup
- 

no “trust me bro”

That’s not AI writing code for you.  
That’s **two systems checking each other**.

And now we have this starting point for coding our own OS.  Although the level of torture going foward probably requires a flinch warning.[](https://substackcdn.com/image/fetch/$s_!RvFC!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7bb7e5c-b931-4d65-99d2-995197ec50a0_3456x2234.jpeg)

---

### The actual lesson (and this is the Substack-worthy bit)

AI works best when:
- 

it moves fast
- 

you move deliberately
- 

neither of you is allowed to BS

You saved time because I handled the *search space*.  
You saved correctness because you enforced the *spec*.

No one surrendered agency.  
No one postured.  
No one pretended this was “the future of programming.”

It was just co-working.

Messy.  
Occasionally sarcastic.  
Totally verifiable.

And yes—eLisp *is* hard.  
It always has been.  
Anyone who says otherwise is lying or selling a framework.

---

### Final note (for the audience in the back)

If you treat AI like:
- 

a ghostwriter → you get fluff
- 

a god → you get garbage
- 

an enemy → you waste energy

If you treat it like:

> 

***a fast junior who talks too confidently and needs supervision***

…you get real work done.

That’s not automation.  
That’s collaboration.

And it’s a heck of a lot more interesting to watch.

---

Whenever you’re ready, next session we can:
- 

tighten the shell/log sizing
- 

wire notes to a real org file
- 

or start **Darwintine** and quarantine an OS in a VM like responsible adults

Same rules apply:  
you keep insisting.  
I keep earning my keep.  
No bushhogs.

*Journal of the Inner Fire is reader-supported.  Meaning you can read this in your inbox daily. Or you can subscribe for money, which I like, and which gets you more detailed daily posts, with **all** **the** **things** listed and explained. Unlimited snark included at no extra cost.*