# How to write engineering requirements

## The language of requirements

* **shall** — binding, testable, mandatory.  
Example: *The system **shall** encrypt all stored passwords using bcrypt.*

* **should** — desirable but not mandatory.  
Example: *The API **should** respond within 200ms under normal load.*

* **will** — statement of fact or intent, not a requirement.  
Example: *Data **will** be archived for seven years under company policy.*

## How to organize requirements


* **Hierarchy matters:** start with system-level requirements, then decompose into subsystem and component requirements.

* **Unique IDs:** number everything (e.g., REQ-1.2.3). Don’t delete IDs; mark obsolete instead.

* **Atomic statements:** one thought per requirement. Avoid “and/or.”

* **Traceability:** link each requirement to its source (stakeholder, regulation, standard). Map downward to design and test cases.

* **Verification focus:** every *shall* must be verifiable by test, analysis, inspection, or demonstration.

## Examples

* REQ-1.1: The device shall operate continuously for 8 hours on battery power. [Test]

* REQ-1.2: The user interface should support dark mode. [Inspection]

* REQ-1.3: The product will be manufactured in Austin, TX. [Context only]

## Checklist before you publish

* Each *shall* has a clear verification method.

* No requirement mixes multiple ideas.

* Numbering and trace links are consistent.

* Stakeholders can understand it without a decoder ring.

**CC BY-NC 2025 stormrider**
