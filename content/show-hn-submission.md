# Show HN submission

**Title (testing 3 variants — pick the one with cleanest signal-to-noise for HN):**

1. Show HN: 21 Claude Skills that turn one AI into a marketing team (MIT)
2. Show HN: I split marketing into 21 narrow Claude Skills and open-sourced them
3. Show HN: Open-source AI marketing team grounded in 100-year-old direct response methodology

**Recommend:** variant 1 — HN voters reward concrete numbers (21), clear what (Claude Skills), explicit license (MIT). Variant 3 risks reading as marketing-of-marketing.

**Submission URL:** https://github.com/nibrovkina-cyber/natalia-marketing-department
**No external link to product / waitlist in the title** — that's a fast path to flag-as-spam on HN.

---

## URL field

```
https://github.com/nibrovkina-cyber/natalia-marketing-department
```

## Text field

Leave the URL form. Add the context as the first comment immediately after submission (see below).

---

## First comment (post immediately after submission — this is where Show HN context goes)

Hi HN — author here.

I'm a marketer based in Moscow who got tired of watching small businesses ship websites that say "quality service" and then wonder why they don't convert. Spent six months figuring out why one prompt to ChatGPT can't actually replace a marketing team. Short answer: marketing isn't one skill, it's about twenty, and asking one prompt to do all of them averages everything to the same vague mush.

The repo is the fix. Structure follows Anthropic's Claude Skills pattern (October 2025 release):

```
skills/
├── natalia/                    # master orchestrator
├── natalia-brand-voice/        # foundation — voice/tone for all agents
├── natalia-design-system/      # foundation — design tokens/components
├── natalia-positioning/
├── natalia-copy/               # direct response copywriting
├── natalia-leadmagnet/
├── natalia-landing/            # landing page audit + rewrite
├── natalia-email/              # welcome / nurture / launch sequences
├── natalia-atomizer/           # 1 post → 15 formats
├── natalia-social/
├── natalia-ads/
├── natalia-seo/
├── natalia-competitors/
├── natalia-funnel/
├── natalia-launch/
├── natalia-brand/
├── natalia-newsletter/
├── natalia-webdesign/
├── natalia-proposal/
├── natalia-campaign-planner/   # full campaign from brief
├── natalia-carousel/           # social media carousel deliverables
└── natalia-motion/             # HTML video deliverables
```

22 SKILL.md total: 1 master orchestrator + 21 task-specific agents. Each `SKILL.md` has YAML frontmatter (name + description + version) — Claude reads description field and picks the right skill automatically based on the user's task. The two foundations (brand-voice + design-system) are loaded as context for any agent that emits HTML/CSS or branded content.

Methodology baked in: Ogilvy (headlines + 5 variants always), Schwartz (5 awareness levels classification before any output), Hopkins (verifiable claims — adjectives like "high-quality" / "professional" are forbidden, replaced with concrete numbers).

The thing I'm proudest of is the explicit "why this output" pattern: most agents return their result with a citation block — which awareness level was assumed, which methodology rule was applied, which forbidden word was almost generated and replaced. Adds tokens, slows responses, but turns the tool from a magic button into a teaching system. Pre-launch reviewers spent the most time on this.

Stack assumptions: Claude Sonnet 4.6+ via Anthropic API or Claude Code CLI. Hosted UI is Next.js 16 + Vercel at natashabrovkina.com — separate repo, not needed to use the skills directly.

Pre-revenue, build-in-public. No paying customers yet on the hosted side. Open-sourcing the skills because (a) audience-building before product-revenue is the path that makes sense for solo founders without ad budget, and (b) the bet is that distribution and trust matter more than IP — same playbook as Vercel/Supabase/PostHog. The hosted UI and personal audits are the paid layer when there's demand for them.

Real cases (verified):
- Dental clinic in Moscow: 12 → 47 weekly leads in 6 weeks
- Marketing agency: +58% conversion in 60 days
- Greek café: content production from 20h/week to 4h/week

Things I'd love feedback on:

1. **Skill granularity.** 21 skills feels right for me but might be over-decomposed for some users — they want one mega-prompt. Anyone designed similar skill systems and have data on the right granularity?
2. **Eval strategy for prompts.** "Good copy" doesn't reduce to exact-match. Currently testing manually against a fixture set of 10 sites per skill. Considering LLM-as-judge with a 50-example reference set per role. Anyone done this for non-deterministic creative outputs and have lessons?
3. **Multi-tenant.** Open-source version is single-tenant via local skills. Plan for SaaS multi-tenant — Postgres RLS, schema-per-tenant, or app-layer tenant_id? Experience appreciated.
4. **The "why this output" block.** Worth the token cost? Anyone built similar self-explaining LLM systems and tracked engagement?

The whole thing is MIT. Fork it, criticize it, rip out my opinions and replace them with yours. Issues and discussions are open.

If you've got a small business with a bad site and want a quick critique against Ogilvy/Schwartz/Hopkins, drop the URL in a reply — I'll do one or two for free as practice.

Thanks for looking.

---

## Followup comment to keep ready (post if discussion picks up)

A few people have asked about the methodology choice — why Ogilvy/Schwartz/Hopkins specifically, and not, say, more recent frameworks (StoryBrand, AIDA-on-steroids, modern growth-marketing literature).

Honest answer: those three are the ones that have survived a hundred years of testing across radically different media (print, radio, TV, web, social, AI search). When something works in 1923 and still works in 2026, it's probably orthogonal to the medium. The newer frameworks are mostly applications of the older ones with different vocabulary; once you have Ogilvy's headline rules, Schwartz's awareness levels, and Hopkins' verifiability test, most modern frameworks decompose to combinations of those primitives.

I'm not religious about it though — if a foundation file for a modern framework would clearly add value, I'll merge a PR. Just hasn't been the case yet in the situations I've tested.

---

## When to post

**Best time for Show HN (US Pacific):** Tuesday or Wednesday, 06:00-08:00 PT (= 17:00-19:00 MSK).

Avoid: Monday morning (front page churns fast), weekends (low traffic), Friday afternoon (people leaving for weekend).

**Pre-submission checklist:**

- [ ] Repo has clear README in EN — done (`docs/README.en.md`)
- [ ] LICENSE file present — done
- [ ] No broken links in README
- [ ] Recent commits visible (shows active maintenance)
- [ ] Issue templates present — done (`.github/ISSUE_TEMPLATE/`)
- [ ] CONTRIBUTING.md present — done
- [ ] Topics set on GitHub UI: `claude-skills`, `claude-code`, `ai-marketing`, etc

**On day of submission:**

- [ ] First comment posted within 1 minute of submission
- [ ] Watch for moderator flag — if flagged, respond to email immediately
- [ ] Reply to every comment in first 4 hours
- [ ] Don't ask friends to upvote (HN detects rings, kills posts)
- [ ] Cross-post to Twitter/LinkedIn AFTER 1 hour on HN, not before (avoids dilution)
