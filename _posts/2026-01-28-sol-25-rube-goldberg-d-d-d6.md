---
layout: post
title: "Sol 25: Rube Goldberg D&D d6"
excerpt: "Transistors, flip-flops, and a little chaos."
date: 2026-01-28
---

Tonight’s electronics project is an **electronic 1d6** — a physical dice roller built from discrete logic, flip-flops, and LEDs. No microcontroller. No firmware. Just electrons doing what electrons do best.

And yes: it works beautifully.

I prototyped this on my old **Science Fair 200-in-1 Electronic Project Lab**, the same one I’ve been using for about 45 years now. It’s still one of my favorite ways to explore circuits, precisely because it forces you to *think about routing and structure*, not just drop parts into a breadboard.  And also because it’s faster to implement, because the components aren’t in a drawer with 20 other values (hey, I only have so much room for drawer units, I have to economize somewhere).  

---

What the circuit does

Flip the A/B switch: the LEDs flicker rapidly, as if the dice is tumbling.

Flip it again: the flicker stops, and one clean dice value (1 through 6) remains lit.

That’s it. A physical die, animated by logic.

---

How it works (high level)

The circuit breaks down into four functional blocks:

**1. A clock oscillator**  
A simple two-transistor RC oscillator generates a pulse train while the “roll” input is active. The exact frequency depends on resistor values, capacitor tolerances, and — critically — how long *you *take to toggle the switch back and forth.

That human timing is part of the randomness.

**2. A state machine built from JK flip-flops**  
Two JK flip-flops act as a counter, cycling through states. Additional feedback logic ensures the system only occupies six valid states — exactly what you want for a d6.

If the logic ever wanders into an invalid state, it’s automatically corrected.

**3. Decode logic**  
The current flip-flop state is decoded into six mutually exclusive outputs. Each output corresponds to a dice face.

This is the “rules engine” of the die.

**4. LED drivers**  
Transistor drivers handle the LED current so the logic circuitry doesn’t have to. This keeps the LEDs bright and the logic happy.

---

Why the LEDs flicker when rolling

While the clock is running, the flip-flops advance through states faster than your eyes can track. The LEDs flicker faintly as different dice faces flash in rapid succession.

When the clock stops, the current state is latched — and the LEDs settle into a single, stable roll.

That flicker is the visual equivalent of dice tumbling across a table.

---

Building it on the 200-in-1

Because the project lab has fixed component locations and prewired ICs, I had to do some real routing. A few of the signal runs were longer than my stock jumpers allowed, so I cut and used **green bell wire** to make the connections.

That’s not a workaround — that’s prototyping.

If you can’t reach a node, you make a wire. That’s how real circuits get built.

---

How I’d breadboard this next

If (or when) I rebuild this on a standard breadboard, I’d do a few things differently:
- 

Use modern CMOS equivalents for the flip-flops and gates
- 

Keep the oscillator physically separated from the decode logic
- 

Group LEDs and their drivers as a single display block
- 

Add a clock enable switch so the roll speed can be adjusted

None of that changes the core idea — it just makes the layout clearer.

---

Why this still matters

You could build a dice roller with three lines of code and a microcontroller.

But this version teaches you something code doesn’t:
- 

how randomness *actually* enters a system
- 

how state machines behave in hardware
- 

how human interaction influences digital outcomes

In D&D terms: this is a die you can *see thinking*.

And honestly? That’s a little bit magical.

---

If you’re interested in more projects like this — shortwave, logic, signal experiments, and hands-on electronics — that’s what I’ll be building and writing about on Tuesday evenings here.

Sometimes at 7pm.  
Sometimes closer to 8.  
But always real.

**Burn slow. Build deep. Be the proof.**

*Below this line, paid subscribers can read the detailed circuit analysis and construction parameters: why the multiple stages were separated, how randomness enters the system (including some deliberately long jumpers), and why the LED outputs are not driven directly by the logic gates. *

### Detailed Circuit Walkthrough: Electronic 1d6 Using Discrete Logic

This circuit implements a six-state pseudo-random generator using a free-running clock, a constrained state machine, and hard decode logic. It is deterministic in principle, but chaotic in practice due to human-timed clock interruption and analog tolerances.

I’ll walk through it block by block, then tie the blocks together.

---

## 1. Clock Generation: Asymmetric RC Multivibrator

The leftmost section of the schematic is a discrete two-transistor astable multivibrator. The core components are:
- 

Two NPN transistors
- 

Cross-coupled RC networks (0.05 µF and 0.1 µF)
- 

Biasing resistors (4.7k, 10k, 2.2k range)

This is a classic relaxation oscillator with deliberately loose timing. The asymmetry in capacitor values ensures uneven charge/discharge paths, preventing a clean 50% duty cycle. That matters later.

### Behavior

When enabled, the circuit oscillates continuously, producing a pulse train whose:
- 

frequency varies with component tolerance
- 

duty cycle is asymmetric
- 

phase is uncontrolled at enable/disable boundaries

The roll button gates power or bias to this oscillator. When released, the oscillator halts immediately — not at a synchronized edge.

**This is the entropy source.**

Even though the logic downstream is deterministic, the clock stopping at an arbitrary phase relative to the flip-flop clock inputs introduces effective randomness.

---

## 2. Clock Conditioning and Distribution

The raw oscillator output is not fed directly into the logic. It is conditioned via resistor networks and transistor buffering to:
- 

sharpen edges
- 

limit base current into logic inputs
- 

reduce loading effects from downstream gates

This is subtle but important: the oscillator is allowed to be “analog messy,” while the logic sees reasonably clean transitions.

On a breadboard build, this separation becomes even more important to prevent meta-stable behavior.

---

## 3. State Register: Dual JK Flip-Flops as a Constrained Counter

At the heart of the circuit are **two JK flip-flops**, configured to operate as a small state machine rather than a straight binary counter.

### Why JK?

JK flip-flops are used here because:
- 

they support toggle behavior cleanly
- 

they allow feedback-based state suppression
- 

they are tolerant of asynchronous correction

Each clock edge advances the state, but **not all four possible binary states are allowed**.

### State Constraint

Additional logic monitors the flip-flop outputs. If an invalid state is detected (i.e., a state outside the desired 1–6 range), the logic forces a corrective transition on the next clock.

This is a classic synchronous-with-asynchronous-correction hybrid design:
- 

synchronous under normal operation
- 

self-healing when misaligned

The result is a **six-state ring**, not a modulo-8 or modulo-4 counter.

---

## 4. Decode Logic: State → Dice Face Mapping

The flip-flop outputs are not used directly to drive LEDs. Instead, they feed combinational logic that performs a full decode.

Each valid state activates exactly one decode line.

This design choice matters for several reasons:
- 

**Display independence**  
The visual representation (dice pips) is decoupled from the state encoding.
- 

**Noise isolation**  
Glitches or short transitions in the flip-flop outputs are absorbed by the decode logic rather than appearing directly on LEDs.
- 

**Extensibility**  
You can change the display mapping without altering the state machine.

The decode logic uses simple AND / NAND combinations to assert one line per state.

---

## 5. LED Driver Stage: Current Isolation and Brightness Control

Each decoded output drives a transistor used as a low-side or high-side switch (depending on the specific channel).

Why not drive LEDs directly?
- 

Logic ICs cannot source/sink consistent LED current
- 

LED brightness would vary with logic loading
- 

Switching noise would couple back into the state logic

By using discrete transistor drivers:
- 

LED current is controlled and repeatable
- 

logic levels remain clean
- 

multiple LEDs per face can be driven without stress

The result is a crisp, stable display that does not disturb the upstream logic.

---

## 6. Roll Behavior: Why the Flicker Looks “Analog”

While the roll button is pressed:
- 

the clock runs continuously
- 

states advance rapidly
- 

decode outputs switch faster than visual persistence

Because the clock duty cycle is uneven and the state machine is constrained, the flicker is not uniform. Some faces appear more prominently during the roll.

That unevenness is a feature. It visually communicates motion, not randomness.

When the button is released:
- 

the clock halts immediately
- 

the current state remains latched
- 

the LEDs settle cleanly

There is no post-processing, debouncing, or latching circuit. The system simply stops moving.

---

## 7. Physical Implementation Notes (Why the Wiring Matters)

This circuit was built on a Science Fair 200-in-1 project lab. The lab includes:
- 

fixed resistor networks
- 

prewired logic ICs
- 

fixed transistor locations

As a result, some signal runs exceed the length of stock jumpers. I used cut green bell wire to complete those connections.

This matters electrically:
- 

longer runs introduce capacitance
- 

ground reference becomes non-ideal
- 

clock edges soften slightly

All of that feeds back into the oscillator behavior — increasing effective entropy rather than harming functionality.

In other words: **the physical layout contributes to the roll quality**.

---

## 8. Breadboarding and Modernization Considerations

If rebuilding this circuit from scratch:
- 

Use modern CMOS JK flip-flops or D-FF equivalents
- 

Keep the oscillator physically isolated from logic
- 

Route clock lines short and direct
- 

Provide a dedicated ground bus for LED drivers
- 

Optionally add a clock enable or speed control

The logic structure does not need to change. The design is sound.

---

## Final Observation

This circuit is not “random” in the mathematical sense.

It is:
- 

deterministic logic
- 

driven by analog uncertainty
- 

sampled by human timing

That is exactly how many real systems behave — including sensors, radios, and human interfaces.

As a dice roller, it works.  
As a teaching circuit, it’s excellent.

And as a reminder that **hardware always leaks reality into logic**, it’s hard to beat.