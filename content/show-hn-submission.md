# Show HN submission

**Title (testing 3 variants — pick the one with cleanest signal-to-noise for HN):**

1. Show HN: 21 system prompts that turn one AI into a marketing team (MIT)
2. Show HN: I split marketing into 16 roles + 5 foundations and open-sourced the prompts
3. Show HN: Open-source AI marketing team grounded in 100-year-old methodology

**Recommend:** variant 1 — HN voters reward concrete numbers (21), clear what (system prompts), explicit license (MIT). Variant 3 risks reading as marketing-of-marketing.

**Submission URL:** github.com/nibrovkina-cyber/natalia-marketing-department
**No external link to product / waitlist in the title** — that's a fast path to flag-as-spam on HN.

---

## URL field

```
https://github.com/nibrovkina-cyber/natalia-marketing-department
```

## Text field (only if submitting as Show HN with text — the standard form is URL-only)

Leave the URL form. Add the context as the first comment immediately after submission (see below).

---

## First comment (post immediately after submission — this is where Show HN context goes)

Hi HN — author here.

I'm a marketer (since 2018) who got tired of watching small businesses ship websites that say "quality service" and then wonder why they don't convert. Spent six months figuring out why one prompt to ChatGPT can't actually replace a marketing team. Short answer: marketing isn't one skill, it's about fifteen, and asking one prompt to do all of them averages everything to the same vague mush.

The repo is the fix. Structure:

```
agents/
├── _foundations/        # auto-loaded into every prompt
│   ├── ogilvy.md        # headline + structure rules
│   ├── schwartz.md      # 5 awareness levels classifier
│   ├── hopkins.md       # claims must be verifiable
│   ├── brand-voice.md   # per-business voice + forbidden words
│   └── measurement.md   # what to measure, how
│
├── positioning.md
├── direct-response.md
├── landing-cro.md
├── ads.md
├── seo.md
├── email-sequences.md
├── lead-magnets.md
├── smm.md
├── content-atomizer.md
├── competitor-analysis.md
├── case-studies.md
├── pricing.md
├── pr-outreach.md
├── influencer-research.md
├── crm-sequences.md
└── analytics.md

shared/
└── brand-memory.json    # one file, read by all 21 prompts
```

21 SKILL.md total: 16 functional agents + 5 foundations. YAML frontmatter on each agent declares which foundations it depends on, so the dependency graph is explicit. Shared `brand-memory.json` keeps all agents consistent on voice, audience, and forbidden words — fill it once, every prompt reads it.

The thing I'm proudest of is a small design choice: every agent emits a "why this output" block after the actual output, citing which foundation rules and which awareness level it applied. Adds tokens, slows responses, and is the feature pre-launch reviewers spent the most time on. Turns the tool from a magic button into a teaching system.

Stack assumptions: Claude Sonnet 4.6 via Anthropic API. Works locally via the `claude` CLI — `claude --skill agents/landing-cro.md` loads the listed foundations automatically. Hosted UI is Next.js 16 + Vercel, but that's a separate repo and not needed to use the prompts.

Pre-revenue, build-in-public. No paying customers yet. Open-sourcing the prompts because (a) I have no audience yet, so paywall-and-hype isn't an option, and (b) the bet is that distribution and trust matter more than IP — same playbook as Vercel/Supabase/PostHog. The hosted UI and personal audits are the paid layer when there's demand for them.

Things I'd love feedback on:

1. **Brand-memory format.** Started with JSON for clone-and-edit ergonomics. Will probably need Postgres + RLS at multi-tenant scale. Premature optimization to start there, or am I going to regret JSON in three months?
2. **Eval strategy for prompts.** "Good copy" doesn't reduce to exact-match. Currently testing manually against a fixture set of 10 sites per agent. Considering LLM-as-judge with a 50-example reference set per role. Anyone done this for non-deterministic creative outputs and have lessons?
3. **Multi-tenant.** Open-source version is single-tenant. Plan for SaaS multi-tenant — Postgres RLS, schema-per-tenant, or app-layer tenant_id? Experience appreciated.
4. **The "why this output" block.** Worth the token cost? Anyone built similar self-explaining LLM systems and tracked engagement?

The whole thing is MIT. Fork it, criticize it, rip out my opinions and replace them with yours. Issues and discussions are open. If you've got a small business with a bad site and want a quick critique against Ogilvy/Schwartz/Hopkins, drop the URL in a reply — I'll do one or two for free as practice.

Thanks for looking.

---

## Followup comment to keep ready (post if discussion picks up)

A few people have asked about the methodology choice — why Ogilvy/Schwartz/Hopkins specifically, and not, say, more recent frameworks (StoryBrand, AIDA-on-steroids, modern growth-marketing literature).

Honest answer: those three are the ones that have survived a hundred years of testing across radically different media (print, radio, TV, web, social, AI search). When something works in 1923 and still works in 2026, it's probably orthogonal to the medium. The newer frameworks are mostly applications of the older ones with different vocabulary; once you have Ogilvy's headline rules, Schwartz's awareness levels, and Hopkins' verifiability test, most modern frameworks decompose to combinations of those primitives.

I'm not religious about it though — if a foundation file for a modern framework would clearly add value, I'll merge a PR. Just hasn't been the case yet in the situations I've tested.
