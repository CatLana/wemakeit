# CLAUDE.md

## Purpose

Use this file as the stable instruction prefix for Claude-driven work in this repository. Keep it concise and avoid churn so prompt caching has a better chance of hitting across repeated requests.

## Project

- Name: We Make IT
- Market: Ireland first, EU second
- Tone: warm, direct, conversational, no buzzwords
- Stack: Next.js 16 App Router, TypeScript strict mode, Tailwind CSS v4, Radix UI, shadcn, next-intl 4, react-hook-form, zod
- Locale model: English only, routed under `en`

## Core commands

```bash
npm run dev
npm run build
npm run lint
```

`npm run build` and `npm run lint` must pass before shipping changes.

## Codebase rules

- Use `@/*` for imports from `src/*`
- Keep TypeScript strict, do not introduce `any`
- Server Components by default, add `"use client"` only when needed
- Do not import navigation helpers from `next/link` or `next/navigation`, use `@/i18n/navigation`
- All user-visible copy belongs in `messages/en.json`, do not hardcode strings in JSX
- Generate only British English copy aimed at Irish businesses
- No em dashes, no emoji, no corporate jargon
- API routes must validate request bodies with Zod before processing
- Do not expose secrets in client code or committed files

## Design and content rules

- Use semantic HTML and visible focus styles
- Decorative icons must be `aria-hidden`
- Icon-only controls need `aria-label`
- Follow existing brand tokens and layout patterns
- Write headings in sentence case
- Prefer short, clear sentences over clever copy
- Avoid these words in user-facing copy: leverage, utilise, robust, seamless, game-changing, transformative, elevate, empower, streamline

## Working style

- Make the smallest change that solves the problem at the root
- Prefer targeted reads over broad repo exploration
- After the first real edit, run the narrowest useful validation immediately
- Do not revert user changes you did not make
- Preserve existing style and public APIs unless the task requires a change

## Claude API cost rules

### 1. Prompt caching

Prompt caching should be treated as enabled for Claude API work in this repo.

- Keep this file stable and under 200 lines so the instruction prefix stays reusable
- Put stable content first: tools, system instructions, repo rules, shared examples
- Put volatile content last: timestamps, one-off user asks, per-task payloads
- For multi-turn or repeated requests, add top-level `cache_control: { "type": "ephemeral" }`
- Use explicit block `cache_control` on the last shared block when the suffix changes per request
- Check usage fields to confirm caching is working: `cache_read_input_tokens` and `cache_creation_input_tokens`
- Prefer the default 5-minute TTL, use `ttl: "1h"` only when requests are likely to be spaced more than 5 minutes apart
- If you need low first-request latency, pre-warm shared prefixes with `max_tokens: 0` outside batches

TypeScript pattern for repeated interactive requests:

```ts
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  cache_control: { type: "ephemeral" },
  system: "You are working inside the We Make IT repository.",
  messages,
});
```

### 2. Message Batches API

Use the Message Batches API for non-interactive, high-volume work because it is billed at 50% of standard API pricing.

Default to batches for:

- test generation at scale
- bulk refactors planned ahead of time
- large evaluations
- long-form offline analysis
- repeated content or code transformations that do not need immediate answers

Do not use batches for:

- chat-like interactive loops
- tasks that need streamed output
- cache pre-warming with `max_tokens: 0`
- workflows that depend on immediate user feedback

Batch rules:

- Validate one request shape with the normal Messages API first
- Give every request a stable `custom_id`
- Expect results in arbitrary order, match by `custom_id`
- Poll until the batch reaches `ended`, then stream the `.jsonl` results
- Failed or expired requests should be retried selectively, not by rerunning the whole batch blindly
- Batch processing stores inputs and outputs server-side and is not ZDR eligible

Python pattern for a bulk job:

```py
message_batch = client.messages.batches.create(
    requests=[
        {
            "custom_id": "test-case-001",
            "params": {
                "model": "claude-sonnet-4-6",
                "max_tokens": 1024,
                "system": [
                    {
                        "type": "text",
                        "text": "Shared repo instructions",
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                "messages": [{"role": "user", "content": "Generate tests for ..."}],
            },
        }
    ]
)
```

## Decision rule

- Interactive or user-facing now: Messages API with prompt caching
- Offline, repeatable, or bulk: Message Batches API, with shared cached prefixes where practical

## Files to keep in sync

- `.github/copilot-instructions.md`
- `messages/en.json`
- any relevant `.github/instructions/*.md` file when adding or editing matching files