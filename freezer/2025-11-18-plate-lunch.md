---
layout: post
title: "Plate Lunch"
excerpt: "0511.18 Recipes start with the ingredients you have, most of the time."
date: 2025-11-18
---

Spent my first weekend here reading the local productivity canon. Interesting titles: *Getting Things Done*. *Atomic Habits*. *Deep Work*. *The One Thing*. *Essentialism*. *Thinking, Fast and Slow*. A few others. They’re starting to piece it together here, but the framework isn’t unified yet.

Real productivity isn’t a checklist. It’s pantry work. Unless you’re walking into the store with a recipe in hand, dinner depends on what’s already on the shelves. Pull it all out, look at it under real light, see what combinations are actually possible. A decent plate lunch comes from knowing your surroundings, not from following a script.

Same deal with work. Different pantry, same principle: environment, materials, ideas, mood, energy, time pressure, urgency. Get all of that on the counter first. What’s in reach? What blocks you? What’s workable under current conditions? Targets and goals are fine as scaffolding, but the actual choice of action has to be *read from the situation*, not imposed on it. That’s the part their books keep missing.

## MarVal

About thirty cycles ago, someone here shipped a tiny free program that implemented *MarVal* — “marginal value.” Beautifully simple. List the possibilities. Compare them by return on effort. Drill down layer by layer until you hit primitives where more detail won’t help. Then choose the one with the highest marginal value.

No absolutes. No heroic commitments. Just best overall value **right now**. Targets drift as the day drifts. Recalculate whenever the field shifts. Follow the gradient.

The math is straightforward. Your day is a point moving through a big, ugly, high-dimensional space. Every axis is an ingredient: time, energy, mood, tools, money, other people’s expectations, your internal standards. Too many dimensions to ever see the whole terrain, but you can always *feel* the slope under your feet.

MarVal turns that whole space into a scalar field: each point has a “height” — how much this move matters given everything else. The math word is potential. Steeper slope means stronger move.

Every option on your list is just a vector pointing somewhere in that field. When you ask “what’s the marginal value here?” you’re estimating a quick gradient: if I push one unit in this direction, how far does the potential rise per unit of effort?

Full equations unnecessary. You only need the sign and the shape:
- 

Positive and steep: do it now. Steepest first.
- 

Positive and shallow: hold for later.
- 

Flat: ignore unless you need filler.
- 

Negative: sabotage; drop it.

Gradients are local, though. Easy to climb the nearest hill and miss the mountain behind it. That’s why MarVal has to be re-run every time the conditions change — new message, new mood, new chemical profile, new demands. New field. New slope. New best move.

The loop stays simple: sample the terrain, estimate a few slopes, pick the best Δvalue/Δeffort, take a small step, resample. No five-year plan. No sacred priorities. Just a rolling numerical truce with reality.

As far as I can tell, they haven’t really articulated this on the local nets. Fair game to teach it. Fair game to use it. And if anyone asks? “Yeah, I saw it in some old shareware app thirty years ago. Never caught on. Still works.”

## Implementing MarVal in Emacs

So the first step is the pantry. Get the ingredients on the table. No grocery stores selling replicators. No programmable matter. No multiphasic accumulators. Just whatever’s bolted to the walls and stuffed into drawers.

Start with one file: **pantry.org**.  
Catalog everything.  
Interpret later.

MarVal needs terrain. This is how you build it.  Now how do I code that in Lisp, again?  It’s been awhile….