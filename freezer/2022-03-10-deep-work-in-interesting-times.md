
Skip to main content
Canonical
Canonical

    Products
    Solutions
    Partners
    Careers
    Company

    Blog Article 

Bill Wear
on 10 March 2022
Deep work in interesting times

    Share on: Facebook Twitter LinkedIn 

Newsletter signup

Get the latest Canonical news and updates in your inbox.
Work email:
*I agree to receive information about Canonical's products and services.

By submitting this form, I confirm that I have read and agree to Canonical's Privacy Policy.
Prologue

As programmers and tech writers, we are creators, and we are knowledge workers. We strive to do rare and valuable work, regardless of the circumstances, what Dartmouth professor Cal Newport calls deep work. Deep work is hard and difficult. At Canonical, we are specifically committed to doing things that are simultaneously hard and difficult, doing them all the time, and sustaining that work over long periods of time.

Last week, we had an engineering sprint, which is a live gathering of Canonical’s engineering knowledge workers from all over the world. Normally, we have them every six months, but we hadn’t had one for almost exactly two years because of the Covid-19 pandemic.

When he opened the sprint, our CEO began by speaking about the events in Ukraine, because these events were on everyone’s mind. Without addressing them, that weight wouldn’t be lifted and we couldn’t focus on doing good engineering work, live and in person, for an entire week. We would not be able to work deeply because of the creeping, subconscious distraction.

Over the last two years, Canonical has worked extremely well, despite the horrifying spectre of a global pandemic, and our society moved almost seamlessly from pestilence into war. Even though we are people who pride ourselves on our technical focus and, often, on our agnostic view toward circumstance, we can’t help but be distracted by these issues. It affects our concentration, which thus affects our ability to do hard and difficult, rare and valuable things. Yet we at Canonical have done them. And we will continue to do them. And so can you, whether you are doing open-source on a paid or pro-bono basis, in daylight or moonlight, in the open or in secret.

I can’t speak for other Canonical employees, but I can tell you about how I use technology to help me keep my head when all about me are losing theirs, to paraphrase Kipling. At Canonical, we want to be the best open-source company, ever, in the world, period. Much of that is technical in nature, but at least some of it is about how to use that technology to be good at open-source — in fact, to be good at anything that is hard and difficult, at any endeavor that strives to produce rare and valuable results.

What follows is not intended to give you a prescription so much as meta-definition of what is possible. I’m going to show you how I use emacs org-mode to keep me sane, focused, and productive, even when the sense of impending chaos is higher than it has been in generations.
Step one: know thyself

Socrates said it best: Know thyself. You have to understand where your strengths and weaknesses lie, specifically with respect to distraction. Creators and knowledge workers experience pressure because creating is all about re-examining values. Creating means thinking long-term, about building things that will last and things that will change the world, and that kind of thinking is affected by bad news about the world, like a global pandemic or the first major war since the last one — one that was ended by nuclear weapons.

Everybody experiences trauma differently, so everyone’s response to the distraction of fear must be heavily customized to their own unique strengths and weaknesses. Let me describe myself and my own weaknesses, not as a template, but as a vectored example.

I am Bill Wear, netizen handle stormrider, callsign WA5149-SWL. I am a chaotic, neutral, creative, diabetic, technical communicator. I choose these dimensions because they completely describe how I react to trauma, and how I can best manage my emotions when despair threatens.

By saying I am chaotic, I mean I use intuition more than logic. I am neutral because I don’t subscribe to dichotomies. I am creative because I think in pictures, animations, and scenarios. I am diabetic, which means I have a specific vulnerability to viruses — and to interruptions in the supply chain — which increase my concern in the interesting times. And I am a technical communicator because, to me, that’s the area where I can do hard and difficult work and, hopefully, and with some reasonable humility, produce rare and valuable results.

And these attributes are enough to help me design my exoself.
Step two: define your exoself

The idea of an exoself comes from mythology, when the Greek gods appeared in various human and animal forms for various (usually nefarious) purposes. In popular mythology, there are three enduring plots that hinge on the exoself: “Neuromancer”, about Case, who lives a virtual life in cyberspace; “The Matrix”, about Neo, who lives a virtual life in a shared simulation; and “The Peripheral”, about Flynne, who lives a virtual life in an android body across time.

For digital creators, we don’t want anything *quite* this radical. Instead, we want to live our virtual lives in an ordered, protected, and isolated way, so that we feel safe to focus and certain that when we disconnect, we won’t forget about the real world and its demands when the distractions kick up again.

For me at least, and for most Emacs users, org-mode can help a lot, if you define your exoself properly. Let me show you how I define mine — again, as a vector, not a template.

Because of my personal nature, I need five common objects:

    a pipe, to channel my creative resources into a coherent workflow.
    an axle, to give me a center of rotation and induce artificial gravity around what matters to me.
    a clothesline, to give me meaningful endpoints, and just enough flex to wobble without losing it.
    a telescope, to keep me focused on the end goal, and not distracted by lesser things.
    and a ground wire, to drain off my digressive thoughts into a storage battery without losing them.

You may need different metaphors, but I encourage you to pick old-fashioned, common objects, because they anchor you in the mundane — which is the antidote to the kryptonite of anxiety.
Step three: build your exoself

An emacs “mode” is an editor overlay that changes the views and behaviors of a specific file type, but not other file types. You can have multiple files open, in multiple modes, all at the same time. I can have one window open in directory mode; one in org-mode; one in chronos mode; one in lisp mode; and one in org-agenda mode. All of these windows behave differently, have different context menus, and present in a way relevant to that file type.
Smart outlining: the writer’s Excalibur

Org is a super-smart outline, with folding, which is what I do all through the video above. It also permits easy rearrangement of even the longest outline section, which moves intact, regardless of how many sub-bullets you have. This is very handy for writing documents, since you can start with chaos and finish with organized thoughts.
Personal organizer

Org is also a personal organizer, with to-do items that can have

    TODO states,
    [#A] and priorities,
    and tags, :work:
    and can be scheduled by date,
    SCHEDULED: <2022-03-10 Thu>
    and time,
    SCHEDULED: <2022-03-10 Thu 09:00>
    and repeated every so many units of time,
    SCHEDULED: <2022-03-10 Thu 09:00 +3d>
    or on the next unit of time after it’s completed,
    SCHEDULED: <2022-03-10 Thu 09:00 .+3d>
    or ….

Tables, too
low 	high 	humalog units
85 	120 	0
120 	150 	2
150 	180 	4
180 	220 	6
220 	250 	8
250 	280 	10
280 	310 	12
311 	plus 	call doctor
		

Org has tables, like this insulin dosage sliding scale, which is a step function, which leads to constant over- and under-dosing, which leads to uneven blood sugar regulation, which leads to 62% apathy among diabetics — which is an apathy that has kicked up for me during these global crises. There are times I just want to eat chocolate, which is my personal kryptonite.
And spreadsheets
bsr 	units of humalog/lispro
180 	3.62
	

But, saving the day, these tables can also be used as spreadsheets, like this bolus calculator I was able to design. It uses a slope-intercept equation (y = x \* .0457 – 4.606) derived from a year’s worth of personal blood sugar logs. I enter a blood-sugar reading, press a key chord, and I can dose precisely to the hundredths of a unit or smaller.
And an agenda

Org also has an agenda, which shows me a whole day, and where I can type quick shortcuts to update tasks:

    e to set effort
    , to set priority
    : to set tags
    t to set to-do states (using a lisp function I wrote myself)

For example, when cancelling a task, org-mode hooks to a function I wrote that makes me put in a reason.  This makes me ashamed of being lazy over time and more willing to do the task when I should: mission accomplished.
Also tracks habits

Org mode can graphically track anything I designate as a habit. For example, I can use this feature to easily see how well I’ve done with various personal hygiene habits over the last few days.
I can clock my work

Org mode allows me to clock any task, and then produce summary reports to see how I’m doing. Right now, I’m trying to timebox my work on standard documentation against my work on yearly goals for our product, so both get done. The clock helps a lot, letting me see where I am and adjust when I get behind.
I can even build and manage my website

Everything on my personal website, stormrider.io, is edited in org-mode and then exported to my Web server.  In fact, org-mode can be exported, to just about any other format, including Google Docs.
Step four: deploy your exoself

Having an exoself is a great start, but what matters is how you use it. Here’s how I morph my own, org-mode exoself into the everyday objects I need.
The pipe

I use what I call an “habitual exoskeleton” to channel my creative resources into a coherent workflow. Essentially, I schedule almost everything into a timed agenda. I do this not for absolute scheduling or perfect sequencing — I rarely do the things at exactly the specified time, nor do I do them all in order. I don’t even do them all every day, depending on my needs and my mood. But over time, my behavior tends to be described by this exoskeleton. My life takes on the character of having done these things, consistently and daily, even when I’m inconsistent from day to day.
The clothesline

I use effort estimates for everything I do, and by using the clock, I improve these estimates every time I do something similar. I rarely get the estimate exactly, but again, over time, my behavior averages out to be predictable and repeatable. It also makes it easy to modify my agenda on the fly, when my time is limited or my schedule is scrambled (like at the sprint last week), because I can easily find things I can skip or defer to match time expended to time actually available.
The axle

I do something I call “cognizant deferral” of tasks to make sure I keep on top of things. Nearly everything that isn’t a discrete task is scheduled daily. I can work on each item a little every day, or I can defer things that can wait. The difference? I defer things with full awareness that I’m skipping them, without worrying about whether I’ll remember to come back to them, since daily repeats mean I’ll see them again tomorrow. Org’s agenda view also highlights things which were not touched yesterday, in a different color, so I can quickly see where I’m falling behind. And I never have to worry about those moments when I just throw something into a file — org-mode will sort it for me and put it in the right place in the agenda.

Over time, this gives me the appearance of multitasking on several complex projects and keeping a lot of balls in the air, without dropping too many, which is not normal for someone with a chaotic mind.
The telescope

Org’s outline mode keeps me focused. Everything I do can be placed in an outline. Higher-level tasks can be given tags that are then inherited by lower-level tasks. Also, when I’m on a task, the bottom of the screen shows me a condensed waterfall, so I always know where each task fits in the overall scheme of things. I always know why I’m doing something, and this takes my mind instantly to the end goal.
The ground wire/storage battery

Org-mode offers ubiquitous capture. With a single keystroke from the agenda view, I can enter a new task into a capture buffer. If I take just enough time to schedule the task, so I’ll see it when it’s relevant, I can clear my short-term memory with minimal interruption, and without losing track of the task I’m working on. This makes it easy to capture random thoughts and interruptions with a minimum of distraction. For example, if I’m worried about world events, I can dismiss this worry by setting a reminder to look at the news at 8:30PM today, avoiding the rabbit-hole of surfing that would normally ensue.
Epilogue

This is just one person’s accommodation of his own mind. You have to adapt yourself to tools and needs, following a pattern like the one above, so that you can focus better and worry less. You can use almost the same tools and techniques with vim, nano, pico, Microsoft Word, Google Docs, or even pencil and paper. It’s just a matter of:

    understanding your pain points, and
    implementing specific patches that cover your weaknesses.

And as knowledge workers and developers, we have an innate understanding of patches.

As an open-source developer advocate, technical author, open-source contributor, and Canonical employee, I offer this little respite as a just a bit of hope and encouragement. The ability to finish the day feeling good about what you’ve personally done — regardless of how chaotic the world has been — makes things just a little better.

And that makes our open-source community stronger in the long run.
Related posts

Lech Sandecki
27 March 2026
The “scanner report has to be green” trap 

Stability, backports, and hidden risks of the bleeding edge In the modern DevSecOps world, CISOs are constantly looking for signals in the noise, and the outputs of security scanners often carry a lot of weight. A security scan that returns a “zero CVE” report often unlocks promotion to production; a single red flag can block ...

Massimiliano Gori
27 March 2026
Modern Linux identity management: from local auth to the cloud with Ubuntu

The modern enterprise operates in a hybrid world where on-premises infrastructure coexists with cloud services, and security threats evolve daily. IT administrators are tasked with a difficult balancing act: maintaining traditional local workflows while managing the inevitable shift toward cloud-native architectures. Identity has emerged ...

Abdelrahman Hosny
24 March 2026
Canonical welcomes NVIDIA’s donation of the GPU DRA driver to CNCF

At KubeCon Europe in Amsterdam, NVIDIA announced that it will donate the GPU Dynamic Resource Allocation (DRA) Driver to the Cloud Native Computing Foundation (CNCF). This marks an important milestone for the Kubernetes ecosystem and for the future of AI infrastructure. For years, GPUs have been central to modern machine learning and high ...

    Contact information
    Legal information
    Improve this site
    Projects
    Manage your tracker settings

© 2026 Canonical Ltd.

Ubuntu and Canonical are registered trademarks.
All other trademarks are the property of their respective owners.

For further information on data collection,
please refer to our privacy policy.
