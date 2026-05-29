---
description: "Use when writing or editing ANY user-visible text: page copy, blog posts, headings, button labels, email templates, metadata, alt text, placeholder text, or error messages. These rules are mandatory for all contributors, human and AI."
applyTo: "**/*.{tsx,ts,json,md}"
---

# Content Writing Rules

These rules apply to every piece of user-visible text in this project. There are no exceptions.

## Language

- **British English** throughout. Not American English.
- Correct spellings: colour, organise, licence (noun), practise (verb), recognise, centre, programme, catalogue, travelling, behaviour, labour, honour, favour, neighbour, analyse, realise, socialise.
- Target audience: Irish business owners and entrepreneurs. References to grants, regulations, support schemes, or location should default to Ireland.

## Tone

- Warm and direct. Write as if explaining something to a smart friend who runs a small business, not to an investor or a regulator.
- Use contractions naturally: we're, it's, you'll, that's, don't, won't, can't, isn't.
- Vary sentence length. Short punchy sentences land a point. Longer ones work when you need to explain something step by step.
- Active voice is almost always better: "We build the app" not "The app is built by us".
- Do not start three or more consecutive sentences with the same word.

## Punctuation

- **No em dashes (—) anywhere in user-facing content.** Replace with:
  - a comma when the pause is light
  - a colon when introducing a list or explanation
  - a semicolon when joining two closely related clauses
  - parentheses when adding a side note
  - a full stop and a new sentence when the ideas are separate
- No en dashes used as em-dash substitutes either.
- No exclamation marks except at the end of a clear call to action (e.g. "Let's talk!" or "Get started!"). One per page maximum.
- Apostrophes in JSX must be `&apos;` or the literal `'` character, never the curly `'` or `'`.

## Forbidden words and phrases

Never use any of the following in user-visible copy. They read as AI-generated and undermine trust:

| Avoid | Use instead |
|-------|------------|
| leverage | use |
| utilise | use |
| robust | (describe what makes it solid) |
| cutting-edge | (say what is actually new about it) |
| state-of-the-art | (same as above) |
| best-in-class | (same as above) |
| seamless / seamlessly | smooth, simple, without friction |
| game-changer / game-changing | (say what changes and why) |
| transformative | (say what actually changes) |
| revolutionise | (say how it works differently) |
| disruptive | (say what it replaces or improves) |
| elevate | improve, raise, make better |
| unlock potential | (say what becomes possible) |
| harness the power of | use, get the most from |
| tailor-made | built for you, custom |
| ensure | make sure, or rewrite the sentence |
| streamline | simplify, make faster, reduce steps |
| dive in / delve into | explore, look into, start with |
| it's worth noting | (just say the thing) |
| importantly | (just say the thing) |
| in today's digital landscape | (just say the thing) |
| in the ever-evolving landscape | (same) |
| navigate the complexities | deal with, work through |
| empower | help, give you the tools to, let you |
| scalable solution | (say what it actually does as it grows) |
| at the end of the day | (cut it, say what you mean) |
| touch base / circle back | get in touch, follow up |
| going forward | from now on, or restructure |
| holistic | (say what is covered) |
| ecosystem | (say what the parts are) |
| synergy | (say what works together and why) |
| value-add | (say what the benefit is) |
| pain points | problems, challenges |
| bandwidth | capacity, time, resource |

## Emojis

- **No emojis** in any page content, component JSX, email template HTML, metadata title/description, alt text, or error messages.
- Emojis are only acceptable in developer-facing content: code comments, commit messages, and internal notes.

## Headings and titles

- **Sentence case** for all headings: "How we work" not "How We Work".
- Exception: proper nouns and brand names keep their normal capitalisation.
- No full stops at the end of headings.
- Make headings informative. The reader should understand what the section is about from the heading alone, without reading the body text.

## Lists

- If every item is a fragment (not a full sentence), end items without a full stop.
- If every item is a full sentence, end each with a full stop.
- Never mix fragments and full sentences in the same list.

## Metadata

- Page titles: "Page name | We Make IT" — sentence case for the page name.
- Meta descriptions: 140-160 characters, written as a plain sentence. No em dashes. No exclamation marks.
- OG title/description: match the meta title/description or use a slightly more conversational variation. Same rules apply.

## Structured data (JSON-LD)

- `areaServed` for services: `["IE"]` for Ireland-specific services. Include `"EU"` only when the service genuinely applies to EU clients.
- Do not include language codes or country codes for markets that are no longer active.

## What to do when the brief is vague

If you are generating copy and the brief does not specify the tone, audience, or context, default to:
- Audience: Irish SME owner or entrepreneur, not technical
- Tone: friendly, direct, no jargon
- Length: as short as the content allows while still being complete
- Format: short paragraphs, sentence case headings, no bullet spam
