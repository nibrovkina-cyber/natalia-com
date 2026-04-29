# Substack essay (EN)

**Title (testing 3 variants):**

1. The "quality service" trap: why most small-business websites convert no one — and what fixes it
2. I rebuilt a marketing team into 21 markdown files. Then I open-sourced them.
3. One hundred years of advertising methodology, packaged into 21 system prompts. Free on GitHub.

**Recommend:** variant 1 — Substack readers respond to a clear problem-frame in the title; variant 2 is the subtitle/hook.

**Length:** ~3,200 words (Substack longform sweet spot — long enough to feel substantial, short enough to finish in one sitting)
**Tone:** essayistic, first-person, candid pre-revenue framing, with occasional dry humor
**Goal:** waitlist + GitHub stars + email subscriber growth

---

## Subtitle

I rebuilt a marketing team into 21 markdown files. Then I open-sourced them. Here's why none of it would have worked without 100-year-old methodology underneath.

---

## I.

Open ten small-business websites in any country right now. Count how many say "quality service." I'll wager it's at least eight.

You'll see it on the dental clinic page, the plumber's site, the boutique law firm, the local SaaS landing. *Quality service. Individual approach. Professional team.* It reads as if every small business in the world hired the same copywriter, who only knows three sentences and rotates them on a schedule.

But here's the thing: the people behind those websites are not bad at their work. The dentist is excellent. The plumber is reliable. The lawyer wins cases. The problem is not the service — it's that the website doesn't sound like it. The website is silent on the things that would make a stranger trust them, and noisy with the things that wouldn't convince anyone.

I've been thinking about this for two years. I've been actively building something for it for six months. And last week I shipped the first cut: 21 markdown files, MIT-licensed, on GitHub.

This is the essay where I explain what's inside, what I learned, and why I think open-sourcing it is the only honest move I have.

---

## II. Why one prompt cannot replace a marketing team

The most common attempt to fix the "quality service" problem is some version of: "ChatGPT, write me a homepage for my dental clinic." You get back something that reads slightly cleaner than what was there, but is structurally identical. Same vagueness, same headline that names no one, same call-to-action that explains nothing.

This isn't a model-capability problem. The model is more than capable. It's a problem of scope.

Marketing is not one skill. It's at least fifteen overlapping disciplines: positioning, copy, headline structure, landing-page architecture, paid acquisition, search, email sequences, content distribution, brand voice, lead magnets, social, PR, analytics, pricing, and CRM. Each of those has its own methodology, its own checklists, its own cardinal mistakes. Asking one prompt to do all of them is like asking one person to be a surgeon, anesthesiologist, nurse, and hospital administrator simultaneously.

When you give one prompt all of those jobs at once, it does what any overloaded generalist does: averages everything to "competent and unmemorable." Which is exactly what "quality service" is. It's the linguistic average of a thousand attempts to say something specific.

The fix is to **stop asking one prompt to do fifteen jobs**. Split the work. Give each role its own system prompt with its own methodology. Add a shared memory so they don't contradict each other. And — most importantly — anchor the whole thing in a body of work that *already solved this problem decades ago*.

---

## III. The body of work I anchored on

I want to be clear: I invented none of the methodology. I packaged it. The work has been stable for a hundred years, and most of the world's small businesses have never been told it exists.

**David Ogilvy** (1911-1999), founder of Ogilvy & Mather. *Confessions of an Advertising Man*, 1963. The famous line that everyone has read and almost no one applies: *"On the average, five times as many people read the headline as read the body copy."* Five times. If you spend four hours on body copy and five minutes on the headline, you're spending 80% of your effort on 20% of the result. Most landing pages in the world get this backwards.

Ogilvy's other rules are simpler than they sound. Name your audience in the headline, so they know it's for them. Sell the effect on the customer, not the product. Refuse adjectives without proof. Use the headline as a filter — the wrong reader leaves immediately, the right reader leans in. Every one of these is a rule that small-business sites systematically violate, including the ones that hired professionals.

**Eugene Schwartz** (1927-1995). *Breakthrough Advertising*, 1966. Probably the most consequential copywriting book ever written, and the one most copywriters today cannot quote from. Schwartz's contribution was the Five Levels of Customer Awareness:

1. **Unaware** — the reader doesn't know the problem exists.
2. **Problem-aware** — they feel the pain, don't know there's a fix.
3. **Solution-aware** — they know solutions exist, don't know which.
4. **Product-aware** — they know about you, haven't bought.
5. **Most-aware** — they're ready, just need price and proof.

Each level requires a fundamentally different copy structure. A Level 1 reader needs a story-driven approach that names the pain before naming the cure. A Level 5 reader needs a price and a guarantee in the first sentence. Most copywriters write at Level 3 for everyone, which is why most copy converts moderately for everyone and brilliantly for no one.

**Claude Hopkins** (1866-1932). *Scientific Advertising*, 1923. Procter & Gamble still uses this book as an internal reference. Hopkins compressed the entire discipline into one sentence: *"Advertising is salesmanship in print."*

Think about what a real salesperson sounds like in front of a real customer. They don't say "we offer quality service." They say "the bottle is sterilized with steam at 250 degrees." (That's literally Hopkins' famous Schlitz beer campaign — same brewing process every brewer used, but only Schlitz said it out loud, and they doubled their market share.) Real salespeople talk about specific processes, specific guarantees, specific numbers. Adjectives without proof are the mark of someone who isn't actually selling — they're just talking.

These three names are still taught at P&G, at Ogilvy, at every serious copywriting program. The body of knowledge exists. It just hasn't reached the dental clinic in your neighborhood, because nobody in their world translates it into something they can apply on a Wednesday afternoon.

That translation layer is what I built.

---

## IV. What's actually in the repository

The structure is simple enough to explain in five sentences.

There's a folder of **foundations**. Five files: Ogilvy, Schwartz, Hopkins, brand-voice, measurement. These get auto-loaded into every other prompt. They contain the rules, the checklists, the do's and don'ts, the forbidden words.

Then there's a folder of **agents**. Sixteen files, one per functional role: positioning, direct-response, landing-CRO, ads, SEO, email-sequences, lead-magnets, SMM, content-atomizer, competitor-analysis, case-studies, pricing, PR-outreach, influencer-research, CRM-sequences, analytics. Each agent has a YAML frontmatter declaring which foundations it depends on, so the dependency graph is explicit and inspectable.

There's one **brand-memory** file. JSON. The user fills it out once: business name, niche, audience, voice rules, forbidden words, legal constraints. All 21 prompts read it. This is the difference between "fifteen separate ChatGPT chats" and "a coordinated team."

There's a small CLI that ties this together — you can run `claude --skill agents/landing-cro.md` and the foundations load automatically based on the YAML.

That's it. Twenty-one markdown files, one JSON, a few lines of glue code. The IP, such as it is, is in the prompts themselves — and I gave those away.

---

## V. The trick that made the whole thing useful

I want to single out one design choice, because it's the one I think actually matters.

Every agent, after producing output, **explains which methodology it applied**. Not as fluff. As a separate, structured block.

Example: when the landing-CRO agent rewrites a headline, it doesn't just hand you the new headline. It hands you something like:

> **Why this headline:** I used Schwartz Level 2 (problem-aware), because brand-memory.json describes the audience as "parents who fear pediatric dentistry visits." That means they feel the pain but don't yet trust that solutions exist. I named the audience directly per Ogilvy ("for parents of children 4-12"). I replaced "quality" with a specific, verifiable process per Hopkins ("appointments led by a certified pediatric orthodontist with N years of experience"). The CTA explains exactly what happens after the click — also Hopkins.

This does two things. First, it makes the work auditable — you can argue with the methodology, but you can't accuse the model of guessing. Second, and more importantly, it teaches you. After you watch ten landing-page rewrites with these explanations attached, you start noticing the patterns yourself. The tool stops being a black box and becomes a tutor.

This was, weirdly, the part I almost didn't ship. It adds tokens. It slows responses. It makes the output longer. Every product instinct I have said: *cut this, the user wants the answer, not the lecture.*

I ignored my product instincts on that one, and I'm glad I did. It's the feature that pre-launch reviewers spent the most time on. It's also the feature that makes the methodology matter — without it, "Ogilvy/Schwartz/Hopkins" would be just three names on a marketing page. With it, those names are the load-bearing structure of every output, visible in every response.

---

## VI. The demo, and an admission

I'll be honest about something most pre-launch posts won't admit: I have zero paying customers. Pre-revenue. The product exists, the methodology is solid, the demo works — but no one has paid for it yet. This essay is partly an attempt to find the first ones.

Because of that, I refuse to fake case studies. The demo on the site uses a synthetic dental clinic. Doctor names are placeholders, marked as such. Testimonials are placeholders, with a disclaimer noting that real testimonials will replace them once a real client agrees to be featured.

This matters in Russia, where I'm based — the law on advertising of medical services is strict, and faking testimonials carries fines from a few thousand to half a million rubles for individual entrepreneurs. It also matters everywhere else, because the moment you use stock photos of fake doctors and made-up reviews, you've reproduced the exact "quality service" pathology this whole project is supposed to cure. You can't fix the disease using the disease.

The "before" version of the demo looks like every small clinic site you've ever seen: "quality dental services in your city," no testimonials surfaced, a "contact us" button with no explanation of what happens next, no clarity on niche.

The "after" version, sixty seconds later: a headline that names the audience and the differentiator, a doctor section with placeholders for real names, a "pains we hear from parents" block with three things the audience recognizes in themselves, a CTA that explains exactly what happens after the click. All services and contacts preserved. Nothing fabricated. Just restructured according to a hundred years of methodology that the original site never knew existed.

You can open the HTML file in your browser and inspect it yourself. Link below.

---

## VII. Pricing and why I made it weird

Three tiers:

**Free, on GitHub.** All 21 system prompts. MIT license. Clone, fork, run locally. Bring your own API key. Zero cost to me, zero cost to you.

**Self-Serve, $30/month.** Hosted UI. Twenty landing pages per month. All agents. No setup. For people who'd rather pay $30 than spend forty hours wiring everything up.

**Personal Audit, $500 one-time.** I personally audit your site over a 90-minute Zoom call, run it through the tool, and produce a finished landing page. Plus two weeks of follow-up to refine.

No "Pro" tier. No "Agency" tier. No three-year roadmap of feature pages. If the model proves itself, I'll add tiers when there's demand. Until then: three options, one of which is free.

The math on a comparable marketing team in the US is roughly $23,000 per month for six middle-level specialists. The math in Russia is around 380,000 rubles per month for the same team composition. I'm offering the alternative at $30/month, or zero if you fork it. I want to make the comparison easy.

---

## VIII. Why open-source, in plain words

I have 4 YouTube subscribers and 32 Telegram subscribers as I publish this. I'm not exaggerating; I checked this morning. I have no audience. Almost no one knows my name. If I had locked the system prompts behind a paywall and tried to drum up hype, I'd have made approximately zero dollars and looked like every other "AI marketing" charlatan on Twitter.

So I'm doing the opposite. I'm releasing everything that would normally be the moat.

The bet is that distribution and trust matter more than IP. The 21 system prompts, on their own, are not the product. The product is the time you save by not assembling them yourself, the UI that makes them fast to use, the updates as the methodology evolves, and the personal audits where I do the work for you. That's worth $30 a month or $500 one-time to people who want results without a forty-hour learning curve. The prompts being open is what earns me the right to charge for the convenience.

This is not a new model. Vercel does it on top of Next.js. Supabase does it on top of Postgres. PostHog does it on top of ClickHouse. They all open-sourced the engine and charge for the convenience. I'm running the same play, applied to marketing instead of infrastructure.

If it works, I'll have built a small honest business on a model that respects its users. If it doesn't, the methodology lives forever in someone else's repository, helping someone else's small business, and I tried.

---

## IX. What I'm asking for

If you read this far, you're either a small-business owner, a marketer, an open-source enthusiast, or you're procrastinating on something else. Three things you can do, in order of effort:

**1. Star the GitHub repo.** It's the only distribution metric I have right now. Free for you, real signal for me.

**2. Drop your bad website in the comments.** I'll critique one or two sites in the reply comments using the same Ogilvy/Schwartz/Hopkins playbook. Free. No commitment. You'll see the methodology applied to your actual page.

**3. Sign up for the waitlist.** Self-Serve launches in a few weeks. Personal Audits open the same week. The waitlist is the cheapest way to be first in line.

- **Site + waitlist:** natashabrovkina.com
- **GitHub repo (MIT):** github.com/nibrovkina-cyber/natalia-marketing-department
- **YouTube launch (within a week):** link in this Substack's first reply

---

## X. Who I am

Natalia Brovkina. In marketing since 2018. Last two years, almost exclusively inside AI tools and content automation. Based in Moscow, working in Russian and English markets in parallel.

I'm building this in public — pre-revenue, open-source, on a deadline I set for myself. There's no investor pressure, no team burning runway, no agency overhead. Just a person who got tired of seeing "quality service" on every small-business website and decided to ship the alternative.

Subscribe to the Substack if you want updates as the experiment runs. The next post will be the first month's numbers, honest, no inflation. If it works, I'll show you why. If it doesn't, I'll show you why too.
