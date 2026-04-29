# LinkedIn long-form post (EN)

**Hook (first two lines — what shows above "see more"):**

Open ten small-business websites in the US right now. Count how many say "quality service." I'll wager it's at least eight. That's not marketing — that's noise. And it's the reason small businesses don't get leads.

**Length:** ~1,400 words (LinkedIn long-form sweet spot)
**Tone:** B2B, founder-to-founder, candid pre-revenue framing
**Goal:** waitlist signups + GitHub stars + warm-up before YouTube launch

---

## Post

Open ten small-business websites in the US right now. Count how many say "quality service." I'll wager it's at least eight. That's not marketing — that's noise. And it's the reason small businesses don't get leads.

I spent the last six months figuring out why this happens. Why a dentist with great reviews and twelve years of practice still has a website that gets zero conversions. Why a small marketing agency that does excellent work for clients has a homepage that just says "Marketing for your business." Why ChatGPT, when you ask it to write copy, gives you back exactly the same "quality service" mush.

The short answer: one prompt cannot replace a marketing team. Not because the model isn't capable — it is. Because **marketing is not one skill, it's fifteen**. And those fifteen skills require methodology that small businesses have never been exposed to.

The longer answer is what I built. I'm releasing it as open-source on GitHub today. MIT license. Full system prompts. Use it, fork it, criticize it.

---

## The math that pushed me to build this

To run baseline marketing for a small business in any country, you need:

- A **copywriter** (mid-level): $4,000-5,000/mo
- A **landing-page designer**: $5,000-6,000/mo
- An **SEO specialist**: $4,000-5,000/mo
- A **paid-ads operator** (Meta + Google): $4,000-5,000/mo
- An **SMM manager**: $3,000-4,000/mo
- A **junior analyst**: $2,500-3,500/mo

Total: roughly **$23,000-29,000 per month**. Just salaries. Before taxes, software, and management.

Most small businesses can't afford this. So they hire one generalist (who half-does six jobs), or they go to an agency at $5K-10K/month and lose voice control, or they DIY in ChatGPT and get the "quality service" output that converts no one.

I was looking for a fifth path.

---

## What I built

I split marketing into **16 functional roles**. Each role got its own system prompt grounded in specific methodology. Above all 16, I added five "foundations" — Ogilvy, Schwartz, Hopkins, brand voice, measurement — that load automatically into every request.

Total: **21 SKILL.md files** in one repository. 16 working agents and 5 foundations.

They share **one memory file**: `brand-memory.json`. You fill out the business profile once (name, niche, target audience, voice rules, forbidden words), and all 21 prompts read it. No more starting from scratch in every chat.

And — this was my personal twist — every agent explains which methodology it applied after every response. Separate block. "I used Schwartz Level 2 because the audience knows the pain but doesn't know the solution exists. Ogilvy headline rule — I named the audience directly. Hopkins — replaced 'quality' with a specific verifiable process."

That turns the tool from a magic button into a teaching system. After ten landing-page rewrites, you start spotting where methodology is at work and where it's just noise.

---

## Where the methodology comes from

I invented none of this. I packaged work that's been stable for a hundred years.

**David Ogilvy** (1911-1999), founder of Ogilvy & Mather. *Confessions of an Advertising Man*, 1963. The rule that everyone quotes and almost no one applies: **"On average, five times as many people read the headline as read the body copy."** If you spend four hours on the body and five minutes on the headline, you're spending 80% of your budget on 20% of the impact.

**Eugene Schwartz** (1927-1995). *Breakthrough Advertising*, 1966. His contribution: **5 Levels of Customer Awareness.** Unaware, Problem-Aware, Solution-Aware, Product-Aware, Most-Aware. Each level needs a different copy structure. Most copywriters write the same text for all five levels — which is why it doesn't work.

**Claude Hopkins** (1866-1932). *Scientific Advertising*, 1923. Still used as a corporate standard at Procter & Gamble. The rule, in one sentence: **"Advertising is salesmanship in print."** Adjectives are removed. What remains is numbers, processes, and specifics that can be verified.

These names are still taught at P&G, at Ogilvy, at every serious copywriting program. The work just hasn't reached most small businesses — it stayed inside paid books and Western universities.

---

## A demo, not a case study

I'm pre-revenue. I have zero paying customers. So I'm not going to pretend I have case studies. What I have is a demo: a synthetic small dental clinic, with placeholder doctor names and placeholder testimonials clearly labeled as demo data.

Before:
- Headline: "Quality dental services in your city"
- Zero testimonials surfaced (even when they exist on Yelp)
- A "Contact us" button with no explanation of what happens next
- No clarity on niche (pediatric? implants? orthodontics?)

After 60 seconds through the tool:
- Headline like: "Pediatric dentistry without tears — appointments led by orthodontist {name}, {N} years of experience"
- Doctor section with placeholders for names and credentials
- A "Pains we hear from parents" block with three things the audience recognizes in themselves
- CTA: "Get a treatment plan in 30 minutes — free consultation"
- All services, contacts, addresses stayed. AI didn't fabricate. It restructured.

The HTML lives in the public folder of the repo. You can open it in a browser yourself and inspect.

---

## Pricing

- **Free / GitHub** — all 21 SKILL.md files under MIT. Clone, fork, run locally, rewrite for your stack.
- **Self-Serve** — $30/month — hosted UI, 20 landing pages per month, no agent limits.
- **Personal Audit** — $500 one-time — I personally audit your site over 90 minutes on Zoom and produce a finished landing page + 2 weeks of follow-up.

No "Pro" or "Agency" tier yet. If the model proves itself, I'll add them.

$23,000/month vs $30/month vs zero (if you fork from GitHub) — your call.

---

## Why open-source

The honest answer: I have 4 YouTube subscribers and 32 Telegram subscribers as I publish this. I don't have an audience. I can't lock the product behind a paywall and sell through hype — no one would come.

So I'm doing the opposite. Releasing the full system prompts for free. Same funnel as Vercel over Next.js, Supabase over Postgres, PostHog over ClickHouse:

1. **Trust.** You see 21 text files, not a marketing placeholder. You can read, verify, and apply the methodology with no contact from me.
2. **Distribution.** These 21 files live in GitHub search, in "awesome-prompts" lists, in Reddit comments. Each fork distributes my name without an ad budget.
3. **Funnel.** Free user reads the methodology, realizes that wiring it all up takes 40-60 hours of work, upgrades to $30/month so they don't have to. Same model as every successful open-core company in the last decade.

No magic. Old open-core, applied to marketing.

---

## What happens next

Within a week — a YouTube video where I rebuild a bad small-business website live. No edit cuts on the meaningful moments. Live typing, real waiting, methodology explained in plain English.

If you have a business with a bad website and you want me to break it down publicly — drop the URL in the comments. I'll critique one or two sites in reply comments using the same Ogilvy/Schwartz/Hopkins playbook. Free. No commitment.

- **Site + waitlist:** natashabrovkina.com
- **GitHub repo with all 21 SKILL.md (MIT):** github.com/nibrovkina-cyber/natalia-marketing-department
- **YouTube launch (within a week):** link in the first comment under this post

Stars on GitHub are appreciated — right now they're the only distribution metric I have. Issues, forks, criticism, experiments in discussions — even more so.

---

## Who I am

Natalia Brovkina. In marketing since 2018. Last two years — inside AI tools and content automation. natashabrovkina.com is a public experiment: pre-revenue, build-in-public, everything under open system prompts on GitHub. Not "the expert who launches a course." Not "the expert who runs an agency." A marketer who released what is usually kept behind paywalls and writes about it honestly.
