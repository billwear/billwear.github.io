
**updated as often as possible**

## investments made vs. payoff

i used a chunk of my retirement money to invest in capital equipment needed to get business going.  so far, all of it is earning its keep.

| investment          |   | cost  |   | return path                        |
|---------------------|---|-------|---|------------------------------------|
| macbook pro         |   | $2000 |   | improved creative work             |
| iphone              |   | $0    |   | vastly improved communication      |
| ^^^^^^              |   |       |   | improved productivity/tracking     |
| airpods             |   | $200  |   | much better audio for telecons     |
| color laser printer |   | $600  |   | greatly improved output            |
| ^^^^^^^^^^^^^^^^^^^ |   |       |   | professional quality salables      |
| portable battery    |   | $40   |   | improves battery reach for iphone  |
| various material    |   | $200  |   | better range of sewing products    |
| helper books        |   | $200  |   | increased skillset in progress     |
| bags & purses       |   | $150  |   | better examples for new designs    |
| omnifocus 4         |   | $164  |   | didn't pay off; refunded           |
| claude 4 AI         |   | $132  |   | overblown; downgraded to $20 model |
| chatGPT AI          |   | $20   |   | useless; refunded                  |
| Etsy                |   | $20   |   | one-time setup fee; gateway value  |
| Amazon KDP          |   | $0    |   | reaching a wider audience          |
| ^^^^^^^^^^          |   |       |   | witnessing for Christ in public    |
| Morris Agency       |   | $0    |   | assigned agent exceedingly helpful |

all the $0 investments have been incredibly valuable. what can i learn from this?  start looking for $0 investments that pay off, going forward.

## publishing books

this is a slower income growth path, so not putting too much daily time into it, but moving it forward.

| book               | status    | revenue so far  |
|--------------------|-----------|-----------------|
| The Servant's Goal | published | $3.63           |
| The Missing Manual | revision  | (not published) |

## sewing & selling

this is also a slower income growth path, but needs dedicated daily time to take off.  also needs better marketing channels, need to explore how to do this better.

Etsy shop up and running as of April, that's a decent start on a larger audience, since Etsy handles taxes, shipping cost, returns, escrow, everything.

| product              | status          | $$ so far |
|----------------------|-----------------|-----------|
| mug rugs w/devo card | selling locally | $350      |
|                      |                 |           |

#### products considered or explored

| product                | status               |
|------------------------|----------------------|
| church-window mug rugs | needs a pattern      |
| phone slings           | design tweaks needed |
| crosses                | on tap for shoeboxes |

## finding a job

### summary table

i've been applying for any open position i find, and pitching freelance / consulting work to other bare-metal providers i discover or know about.  details about each company and status follow the table.

| company        | status                 | notes                       |
|----------------|------------------------|-----------------------------|
| tailscale      | applied 4/11           | open position, 99% match    |
| lambda labs    | finding contact        | pitching freelance devrel   |
| coreweaver     | finding contact        | pitching freelance devrel   |
| fly.io         | pitched Kurt Mackey    | pitching freelance devrel   |
| oxide computer | pitched Bryan Cantrill | pitching freelance devrel   |
| hetzner        | pitched CEO (German)   | pitching freelance devrel   |
| metal stack    | finding contact        | to pitch freelance devrel   |
| rackspace      | finding contact        | to pitch freelance devrel   |
| vultr          | finding contact        | to pitch freelance devrel   |
| scaleway       | pitched Remy Leone     | to pitch freelance devrel   |
| ubicloud       | decided not to pitch   | US co. hostile to americans |
| openmetal      | pitched Todd Robinson  | pitched freelance devrel    |
| hivelocity     | pitched Jeremy Pease   | sold out, @home, will scout |
| latitude       | decided not to pitch   | CEO < Brazil, hostile to US |
| phoenixNAP     | pitched Bill Bell      | pitched freelance devrel    |

### tailscale
don't know anyone there, but 4/11/26 targeted resume, enthusiastic cover letter to open position that's about a 99% match to my skillset.  no response yet, formal hiring process, not expecting quick action.  i use their open-source products extensively, and have published some tutorials on some difficult networking setups, linked these in both resume and cover letter.

### lambda labs
Lambda (lambda.com) provides GPU cloud and on-prem GPU clusters for AI/ML training and inference. Bare metal GPU servers (NVIDIA H100, A100). Also sells GPU workstations and servers as hardware. Developer-focused — their audience is ML engineers and researchers. Strong brand in the AI training community. Kubernetes-native cloud. As AI training scales, every customer needs documentation for deployment, networking, storage, and cluster management on bare metal GPU infrastructure.
Developer surface area: NEEDS RESEARCH — API, CLI, docs, tutorials, community, blog quality.

#### Contact
NEEDS RESEARCH — Stephen Balaban is CEO/founder. Look for developer experience or content roles on LinkedIn. Lambda is mid-size and growing fast — may or may not have dedicated DevRel.
**Status: NOT YET CONTACTED, need appropriate contact. Pitch to CEO at this size company probably won't land.**

#### Pitch Angle
GPU cloud built on bare metal — ML engineers are the audience, but the infrastructure underneath is bare metal provisioning, networking, and storage. MAAS experience means understanding the physical layer that GPU cloud abstracts away. Pitch: documentation sprints for deployment guides, cluster setup tutorials, migration content. Note: Lambda's audience skews ML/AI — lean into the "explaining infrastructure to people who are experts in something else" angle.

### coreweave
CoreWeave is a specialized GPU cloud provider — bare metal GPU servers at scale for AI/ML training, inference, VFX rendering. Massively funded (billions in recent rounds). Fastest-growing cloud provider in the AI infrastructure space. They run their own data centers with NVIDIA GPU clusters. Kubernetes-native infrastructure. As they scale, the documentation and developer onboarding needs grow exponentially — every new AI startup that signs up needs to understand how to deploy training jobs on bare metal GPU clusters.

Developer surface area: NEEDS RESEARCH — Kubernetes APIs, GPU provisioning, docs quality, developer portal, community.

#### Contact
NEEDS RESEARCH — large and growing company. Look for developer experience, developer relations, or technical content leadership on LinkedIn. May have DevRel already at this funding level.

#### Status: NOT YET CONTACTED, need credible contact.

#### Pitch Angle
GPU cloud on bare metal Kubernetes — the infrastructure layer is bare metal provisioning and orchestration, which is MAAS-adjacent. The pitch: "I know the bare metal provisioning journey and how to document it for developers who've never touched physical hardware." Caution: CoreWeave may be big enough to have in-house DevRel already. Research before pitching.


### fly.io
Fly.io runs applications close to users on their own hardware — they own and operate bare metal servers in data centers worldwide. Developer-first platform for deploying apps globally. Strong developer community and brand. Known for good developer experience and content — their blog is well-regarded. However, as they expand into more infrastructure-level offerings (Machines API, GPU workloads, bare metal Kubernetes), the content needs grow. They already have DevRel but may need depth in the infrastructure layer.
Developer surface area: NEEDS RESEARCH — flyctl CLI, Machines API, GPU instances, docs, community forum.

#### Contact
NEEDS RESEARCH — Kurt Mackey (CEO) is very public, very approachable. Look for developer experience or content leadership. They likely have DevRel already — the pitch may be contractor augmentation rather than "you need DevRel."
Status: Messaged Kurt informally; he takes a while to catch up.  Still need to look for other devrel contacts.

#### Pitch Angle
As Fly.io expands deeper into bare metal and infrastructure (Machines API, GPU clusters), the content layer needs someone who understands the physical layer underneath the abstraction. This is a harder pitch — they already do DevRel well. Best angle may be a specific documentation sprint offer rather than ongoing fractional retainer. Or: contract technical writing for the bare metal / Machines API docs specifically.


### oxide computer
Oxide Computer builds integrated rack-scale cloud computers — hardware + software designed together from scratch. Founded by Bryan Cantrill (ex-Sun, DTrace fame) and Jessie Frazelle. Serious engineering culture, opinionated product, deep technical blog. They design their own hardware, firmware, and control plane. Target: companies that want to run their own cloud on-prem with a hyperscaler-quality experience. Think "what if AWS built a rack you could buy." Very well-funded, small team, engineering-heavy. Strong existing content (blog, podcast "On the Metal") but always room for more developer documentation and tutorials.
Developer surface area: NEEDS RESEARCH — API, CLI, SDK, docs quality, GitHub repos (likely extensive and open source).

#### Contact
NEEDS RESEARCH — Bryan Cantrill is very public (Twitter/X, blog, podcast) but may not be the right pitch target. Look for someone in product or developer experience. Jessie Frazelle also very technical/public. Small company = founders may be approachable.
Status: Connect request to Bryan Cantrill on LinkedIn.  

#### Pitch Angle
Oxide is building the whole-stack cloud computer. Their content game is already strong (blog, podcast), but as they ship product to customers, the onboarding documentation and deployment tutorials become critical. MAAS experience at Canonical = understanding the bare metal provisioning layer and the developer journey from "rack arrives" to "workload running." Caution: Oxide has a very specific engineering culture. The pitch needs to demonstrate technical depth, not just DevRel methodology. Lead with craft, not process.

### hetzner
Hetzner is a major German hosting/cloud provider. Known for extremely competitive pricing on bare metal and cloud VMs. Huge in the European developer community. Budget-friendly but technically serious — Ubicloud and others build on top of Hetzner bare metal. Developer community is organic and largely self-organized (forums, community tutorials). Hetzner's own docs and developer content are functional but minimal — the community fills the gaps. That gap is the opportunity.
Developer surface area: NEEDS RESEARCH — API, CLI tools, Terraform provider, community wiki, docs quality.

#### Contact
NEEDS RESEARCH — German company, may need to find someone in product or marketing who handles developer-facing content. Check LinkedIn for Hetzner developer experience roles.
Status: Cold messaged CEO just to find out what they are doing, no pitch yet.

#### Pitch Angle
Massive developer user base with minimal official developer content. The community does the DevRel work for free — Hetzner could capture more of that value with official tutorials and onboarding content. "Six years at Canonical on MAAS" reads well to a German bare metal company.

### metal stack
Metal Stack is an open source project: "We believe Kubernetes runs best on bare metal. We build an API to manage bare metal hardware." Small team, almost certainly has zero DevRel. Open source, API-first approach to bare metal provisioning — essentially a MAAS competitor/complement. This is the most direct overlap with Bill's Canonical experience. The pitch practically writes itself.
Developer surface area: NEEDS RESEARCH — GitHub repos, API docs, community size, contributors.

#### Contact
NEEDS RESEARCH — find the maintainers/founders. Check GitHub contributors, LinkedIn. Small open source project = probably 1-3 key people.
Status: NOT YET CONTACTED Date contacted: Response:

#### Pitch Angle
Open source bare metal provisioning API — closest thing to a MAAS sibling in the market. Six years writing MAAS docs and tutorials means you can write Metal Stack content with near-zero ramp-up time. Community contribution angle possible too.

### rackspace
Rackspace is one of the oldest managed cloud/hosting providers. More configuration options than the larger public clouds. Managed services angle. Historically underinvested in DevRel. Bare metal offerings plus managed OpenStack, Kubernetes, VMware. Larger company — will need to find the right entry point (likely someone in developer experience or product marketing).
Developer surface area: NEEDS RESEARCH — APIs, SDKs, docs quality, community presence, blog.

#### Contact
NEEDS RESEARCH — find developer experience or product marketing leadership. Rackspace is big enough that a cold pitch to the CEO won't land. Need a mid-level champion.
Status: NOT YET CONTACTED Date contacted: Response:

#### Pitch Angle
Legacy hosting company with bare metal and managed OpenStack offerings that needs modern developer content. Historically underinvested in DevRel. MAAS/OpenStack experience at Canonical is directly relevant.

### vultr
Vultr is a developer-centric bare metal cloud provider. Four types of bare metal server instances across nearly two dozen data centers. Hourly-billed physical servers provisioned in minutes via web console or CLI. Developer-focused but not developer-advocated — clean product, thin community layer. Targets developers, startups, and SMBs. No GPU bare metal options (separate GPU-as-a-service offering). Strong candidate for the Equinix Metal refugee wave.
Developer surface area: API, CLI, cloud-like provisioning UX. NEEDS RESEARCH — SDKs, Terraform support, docs quality, GitHub presence.

#### Contact
NEEDS RESEARCH — find Head of Developer Experience, VP Engineering, or whoever owns developer-facing content. Check LinkedIn, engineering blog, GitHub.
Status: NOT YET CONTACTED Date contacted: Response:

#### Pitch Angle
Developer-focused product with minimal developer advocacy. Bare metal line needs tutorials, migration guides, and community content — especially with Equinix Metal sunsetting. Six years on MAAS at Canonical = immediate credibility.

### scaleway
Scaleway (Paris, subsidiary of Iliad Group) is a major European cloud provider. Much larger company than the other targets — 38,000+ clients, 100+ cloud products, data centers in Paris, Amsterdam, Warsaw. Bare metal Dedibox line plus GPU, Kubernetes, serverless, AI. Sustainability angle — renewable energy data centers since 2017. Competing with hyperscalers on developer experience. This is NOT a "you have no DevRel" pitch — they have a DevTools team. The angle is contractor/fractional help for the bare metal documentation and tutorials while the DevTools team scales. Currently hiring a Tech Lead for DevTools, but i'm not a good match for that.
Developer surface area: CLI (scaleway-cli), Terraform provider, SDKs, Ansible modules, Pulumi, Packer builder, Dedibox bare metal, developer portal, blog, API documentation.

#### Round 1: Rémy Léone — START HERE
Title: Engineering Manager, DevTools Location: Paris, France LinkedIn: linkedin.com/in/remyleone Website: sieben.fr (lists himself as "Cloud Developer Advocate") GitHub: github.com/remyleone Email: rleone@scaleway.com Background: 14 years experience. Active open source contributor (scaleway-cli, Packer Scaleway builder, Ansible modules, Apache Libcloud, Kubernetes docs). Writes on the Scaleway blog. PhD background.
Why him: Owns the DevTools team (CLI, Terraform, SDKs). Closest to developer experience and community. Would be the internal champion to bring in a contractor. Peer-to-peer approach — fellow cloud developer advocate.
Note: Rémy doesn't accept LinkedIn connections. Sent a LinkedIn message instead. Status: MESSAGE SENT Date contacted: Apr 2, 2026 Response: Follow-up sent:

#### Next Actions
☐ If no response by day 5, try rleone@scaleway.com directly ☐ Research Scaleway marketing or product leadership as alternate contacts ☐ Look at Dedibox docs for specific gaps to reference in follow-up


### ubicloud
Ubicloud (~15-17 employees, San Francisco / Amsterdam) is an open source alternative to AWS, YC W24, $16M seed. Founded by the Citus Data team (distributed PostgreSQL, acquired by Microsoft 2019). Provides IaaS cloud features on bare metal providers like Hetzner, Leaseweb, and AWS Bare Metal. Self-host or managed service. Reduces cloud costs 3-10x. "Rebel Alliance" branding — Ozgun literally wore a costume for YC launch day. All engineers, no DevRel. CEO writes all developer-facing content. They chose Ubuntu as base OS after Red Hat/CentOS collapse — Canonical connection right in the stack. GitHub Actions runners are a key product (10x price/performance over GitHub defaults).
Developer surface area: Open source repo on GitHub, compute VMs, managed PostgreSQL, block storage, GitHub Actions runners (ARM + x64), networking. Engineering blog is deeply technical but engineer-authored — missing the tutorial/onboarding/migration layer.

#### Round 1: Ozgun Erdogan — START HERE
Title: Co-Founder & CEO Location: Amsterdam (splits time with SF) LinkedIn: linkedin.com/in/ozgune Email: founders@ubicloud.com Background: Stanford grad, ex-Amazon, co-founded Citus Data (YC S11), led PostgreSQL product team at Azure after Microsoft acquisition. Three kids. Very active on LinkedIn — technical thought leadership posts. Sense of humor.
Why him: At 15 people, the CEO is the one doing all community/content work. Same pattern as OpenMetal. He's the decision-maker.
Approach: LinkedIn connection request with personal note (two variants drafted — "knows what's under the abstraction" or "Rebel Alliance needs a voice") Status: Didn't send due to arrogant post about people from America not being welcome at his American-registered company.  Date contacted: Response: Follow-up sent:

#### Other Contacts
Umur Cubukcu — Co-Founder. Also co-founded Citus Data. Was visiting partner at YC. Active on LinkedIn (linkedin.com/in/umurc). Daniel Farina — Co-Founder. Built Heroku PostgreSQL. Cloud services at Citus, Azure, Crunchy Bridge.

#### Next Actions
☐ Send LinkedIn connection request to Ozgun ☐ If connection not accepted in 3 days, try founders@ubicloud.com with longer pitch ☐ Follow Ubicloud GitHub repo — engagement builds visibility

### openmetal
OpenMetal (~6 employees, Virginia Beach, VA) is a bare metal and on-demand private cloud provider spun out of InMotion Hosting. Built on OpenStack + Ceph, hyper-converged, deployed as-a-service in under 1 minute. Focus: making complex open source systems accessible to smaller teams. $16M+ funding. Hiring a CTO and Director of Sales & Marketing — growth mode, stretched thin. The CEO (Todd Robinson) is personally writing blog posts, doing fireside chats with OpenInfra Foundation, and running FinOps webinars because there's no DevRel. Open source philosophy company — strong cultural fit.
Developer surface area: OpenStack APIs, Ceph storage, bare metal servers, private cloud deployment, Kubernetes workloads. Blog content exists but is executive-authored. No dedicated developer tutorials or onboarding content.

#### Round 1: Todd Robinson — START HERE
Title: President / CEO Location: Evergreen, CO LinkedIn: linkedin.com/in/toddrobinson2/ Background: Co-founded InMotion Hosting (2001), Michigan Tech ME degree, started with a Commodore 64. Open source advocate. Active on LinkedIn.
Why him: At 6 people, the CEO is the decision-maker for everything. He's personally doing all developer-facing content — blog posts, OpenInfra fireside chats, FinOps webinars. That time should be spent on the CTO search and sales pipeline, not writing tutorials.
Approach: LinkedIn message (two variants drafted — "free up CEO time" or "OpenStack ecosystem angle") Status: sent pitch 1  Date contacted: 4/2/26 Response: Follow-up sent:

#### Pitch Angles
Angle 1 (CEO time): "You're personally doing all the developer content because nobody else on the team can. I did this for six years at Canonical on MAAS. Fractional DevRel gets it done without a full-time hire."
Angle 2 (Equinix refugee wave): "Equinix Metal sunsetting June 2026, wave of developers looking for a new home who expect real tutorials and community. Fractional DevRel to catch that wave without adding headcount."

#### Next Actions
☐ Sent LinkedIn message to Todd Robinson ☐ If no response by day 4, send one follow-up ☐ Research CTO Jamie Tischart as alternate contact ☐ Research Yuriy Shyyan (Cloud Systems Architecture, appeared on Software Defined Talk podcast) as technical entry point

### hivelocity
Hivelocity is a Tampa-based bare metal cloud provider, 21+ years in business, 40+ locations across 6 continents. Acquired by Colohouse (Miami) in early 2024. CEO Jeremy Pease is a hands-on technologist who talks publicly about AI inference at the edge.
They have a Developer Portal (developers.hivelocity.net) with API docs, Terraform provider (official HashiCorp partner), Go SDK, Kubernetes cluster-api provider. The developer surface area EXISTS but feels engineer-written — functional, not narrative. No DevRel team, no developer blog, no tutorial content.
They claim "more variety of servers than any other bare metal cloud" but nobody is telling that story to developers.

#### Contact: Jeremy Pease
Title: CEO Location: Spicewood, TX (Austin area) LinkedIn: search "Jeremy Pease Hivelocity"
Why him: Tech enthusiast who skipped college and built a hosting empire. Personally talks about AI inference at the edge. At this company size, the CEO is accessible and understands the DevRel value prop. Already invested in the developer portal — just needs someone to make it sing.
Note: Connections locked down. Used InMail.
Status: INMAIL SENT Date contacted: Apr 1, 2026 Subject line: "you did the hard part already" Response: I sold off my shares, spending time with family, will keep my eyes open for opportunities you can use.  Follow-up sent: same day, thanks, good luck.

#### Pitch Angle
"You built a dev portal and a Terraform provider — that's the hard part. The developer story that goes on top is the fun part. I spent 6 years doing developer advocacy for MAAS at Canonical — bare metal provisioning, API-first, IaC integrations. I can help you turn that developer portal from a reference into a reason developers choose Hivelocity."

#### Next Actions
☐ If no response by day 4, send one follow-up via InMail (costs 1 credit) ☐ If still cold by day 7, try COO Jason Burnett or CRO Matt Schatz via connection request ☐ Check if Chrissy Hines (VP Channel) is a viable alternate — she's active on LinkedIn

Last updated: Apr 1, 2026
