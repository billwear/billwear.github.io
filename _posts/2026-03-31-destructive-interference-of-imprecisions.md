# Destructive Interference of Imprecisions

*How engineers have always known you can’t eliminate error — only aim it*

-----

There is a class of engineering insight so obvious in retrospect that you wonder why it took so long to name. The insight is this: you cannot eliminate error from a physical system, but if you understand the *structure* of your errors well enough, you can engineer them to cancel each other. The result isn’t a system without error. It’s a system whose errors have been deliberately aimed at each other, like two waves timed to arrive out of phase, so what’s left is something closer to the truth than either component could have reached alone.

I call this **destructive interference of imprecisions**. It has formal names in several disciplines, none of them quite general enough to capture the full idea. This essay is an attempt to introduce a term broad enough to hold them all — and, more importantly, to suggest that the principle extends well past electronics and numerical methods into the structure of any careful practice.

-----

## The Problem With Perfection

Classical engineering proceeds from a fantasy: eliminate the error. Better components. Tighter tolerances. More precise measurements. The fantasy is economically rational when it’s cheap to improve a component and expensive to tolerate its imperfection. But physical systems have a floor. Transistors have thermal noise. Capacitors have mismatch. Amplifiers have offset voltage baked into their fabrication. You can push the floor lower, but you cannot remove it.

At some point, the engineers working in CMOS analog design in the 1970s and 1980s confronted this floor directly. They were building precision amplifiers — circuits where an offset voltage of a few microvolts could corrupt a measurement, where low-frequency noise would drift an output over time in ways that looked like signal. The components available couldn’t be made better. Something else had to give.

What they found was not a better component. It was a better architecture.

-----

## The CMOS Heritage

The technique they developed has three related forms: **auto-zeroing**, **correlated double sampling (CDS)**, and **chopper stabilization**. They look different on the surface. They are the same idea underneath.

Auto-zeroing works like this. During a calibration phase, the amplifier is disconnected from the signal and its own input is shorted. Whatever output appears is, by definition, error — offset voltage, bias current, low-frequency noise. That error is measured and stored, usually on a capacitor. In the subsequent signal phase, the stored correction is subtracted from the live output. The amplifier’s error cancels its own error, because both measurements were made with the same amplifier under nearly identical conditions. The errors are *correlated* — they share the same source — which means they can be reliably differenced to near zero.

Correlated double sampling extends this to image sensors and switched-capacitor filters. The noise present at one sampling instant is subtracted from the noise present at the next, exploiting the fact that low-frequency noise changes slowly relative to the sampling rate. The errors aren’t random with respect to each other; they’re related. You use that relationship against them.

Chopper stabilization is the most elegant variant. The input signal is modulated — multiplied by a square wave — before it enters the amplifier. Low-frequency noise and offset in the amplifier don’t follow the modulation; the signal does. At the output, the signal is demodulated back to baseband, and the amplifier’s imperfections, which were never modulated in the first place, land at the chopping frequency where they can be filtered. The errors are *separated in frequency* from the signal and then removed. The amplifier didn’t get better. The topology was redesigned so the imperfections are pointed somewhere harmless.

In all three cases, the key word is *correlated*. The errors must be related to each other — same source, same structure — for the cancellation to work. Random errors don’t cancel; they accumulate. Structured errors cancel if you know their structure well enough to exploit it.

-----

## Richardson’s Version

The same principle appears independently in numerical analysis, under the name **Richardson extrapolation**, formalized by Lewis Fry Richardson in the early twentieth century.

The problem Richardson was solving is this: any numerical approximation — a finite-difference derivative, a numerical integral — has an error that scales with the step size. Halve the step size and you get a better approximation, but you haven’t eliminated the error, you’ve just made it smaller. The error has a *structure*, though. It’s predictable in form, even if not in magnitude. For a given method and a given step size, you know the error is approximately proportional to some power of the step size.

Richardson’s insight: compute the approximation twice, with two different step sizes. The errors in both computations are related — they come from the same structural source. Combine the two results in the right proportion and the dominant error term cancels algebraically, leaving you with a result that’s accurate to a higher order than either computation alone. You haven’t computed more carefully. You’ve computed twice, strategically, so the errors aim at each other.

This is destructive interference of imprecisions in pure mathematics. The imprecisions are quantified, their structure is known, and they’re deliberately oriented to cancel.

-----

## Feedforward Cancellation

A third form appears in signal processing and control systems, under the name **feedforward error cancellation**. A parallel path estimates the error of the main path and subtracts it before the output. The classic example in audio amplifier design is current dumping: a low-power class-A amplifier handles the signal accurately at low levels while a high-power class-B stage handles the output current demands. Neither stage is perfect. But the feedforward path — a bridge network connecting them — is tuned so that the distortion from the class-B stage is canceled by a signal derived from the class-A stage. The errors of two imperfect amplifiers, aimed at each other, produce an output more accurate than either could achieve alone.

-----

## The General Principle

Across these three disciplines — analog integrated circuits, numerical analysis, power electronics — the same move appears:

1. You cannot eliminate the error.
1. You characterize the error well enough to know its *structure*.
1. You design a second path whose error has the same structure, with opposite phase.
1. The errors cancel.
1. What remains is signal.

This is not error *reduction* in the classical sense. You’re not improving your components. You’re not tightening your tolerances. You’re exploiting the fact that structured imprecision is predictable, and predictable things can be aimed.

The term I want to introduce — **destructive interference of imprecisions** — is meant to be general enough to hold all of these instances. *Destructive interference* is the wave mechanics term for what happens when two waves of equal amplitude and opposite phase arrive at the same point: they cancel. *Imprecisions* rather than *errors* — because the engineer’s job is usually not to be correct, but to be *close enough*, and the gap between those framings matters. An error implies a right answer you failed to reach. An imprecision is a known deviation from an ideal, with a characterizable magnitude and structure. You can work with imprecisions. You cannot work with errors until you’ve turned them into imprecisions first.

-----

## Why This Matters Beyond the Lab

The principle extends into any domain where you cannot reach the ideal directly but can characterize what keeps you from it.

A good editor doesn’t write a perfect first draft. She writes two drafts that fail in different, predictable ways, then combines what survives each. The failures are structured — the first draft has energy but no precision, the second has precision but no energy — and she knows how to extract the signal from each.

A doctor treating a condition with known drug side effects will sometimes prescribe a second drug whose side effects counteract the first. Not because either drug is ideal, but because the adverse profiles are structured and she knows how to aim them.

A negotiator who understands that both parties will overstate their position by roughly the same magnitude in the same direction can factor that out. The imprecisions cancel. What’s left is closer to what both parties actually want.

In each case: characterize the structure of your imprecision, design or select a second imprecision with a related structure, aim them at each other. The result is not perfection. It’s a better approximation than you could have reached by trying to be perfect.

-----

## The Condition for Cancellation

One caution: random errors don’t cancel. They accumulate. The RMS noise of two independent noise sources adds as the square root of the sum of squares, not as zero. Destructive interference of imprecisions only works when the imprecisions are *correlated* — when they share a common structure that allows one to predict and offset the other.

This is the condition that makes the technique disciplined rather than wishful. You can’t just do two imprecise things and hope they cancel. You have to understand *why* they fail, and design the second failure to mirror the first. That understanding is the hard part. The cancellation, once you have it, is almost automatic.

The corollary: if you don’t understand the structure of your error, don’t try to cancel it. You’ll just add noise. This is why expert practitioners can exploit the technique and novices can’t — not because the technique is complicated, but because it requires that you first characterize your imprecision precisely, which is most of the work.

-----

## A Name for What We Already Do

Engineers have been practicing destructive interference of imprecisions for as long as they’ve built precision systems. The formal names are narrow: auto-zeroing, correlated double sampling, Richardson extrapolation, feedforward cancellation. Each lives in its discipline and doesn’t talk to the others much, even though the underlying architecture is identical.

Giving the pattern a cross-disciplinary name doesn’t change the practice. But it does make it visible across contexts where you might not otherwise recognize it — and visible patterns can be applied deliberately. If you know you’re doing destructive interference of imprecisions, you know what conditions you need: a characterizable structure to your errors, a second path with a related structure, and a way to combine them so the errors aim at each other rather than accumulate.

The goal is not to stop being imprecise. The goal is to be imprecise in the right directions.