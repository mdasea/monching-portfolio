# Monching Desierto — Portfolio

## Repo structure

Two sub-projects in one repo:

| Directory | Tech | Purpose |
|---|---|---|
| `/` (root) | Astro 7 + Tailwind v4 + DaisyUI 5 | Static portfolio site (deployed to Vercel) |
| `cloudflare-worker/` | wrangler + Cloudflare Workers | Chatbot API proxy → opencode.ai |

## Dev commands

```sh
npm run dev              # astro dev (Vite dev server on :4321)
npm run build            # extract-knowledge → astro build
npm run preview          # astro preview
npm run extract-knowledge # reads src/content/*.json → public/knowledge-base.json
```

### Cloudflare Worker

```sh
npm run dev              # wrangler dev (local :8787)
npm run deploy           # wrangler deploy
```

## Build order matters

`npm run build` runs `extract-knowledge` **before** `astro build`. The knowledge-base JSON in `public/` is gitignored (generated artifact). If dev server can't find `/knowledge-base.json`, the chatbot still works — just without RAG context.

## Content model

All portfolio data lives in `src/content/` as JSON files. Each directory maps to an `astro:content` collection defined in `src/content.config.ts`. Schemas are enforced with Zod. Single-file collections (e.g. `skills/`, `education/`): one JSON file. Multi-file collections (e.g. `projects/`, `testimonials/`): one JSON file per entry.

## Chatbot architecture

1. Page loads → browser fetches `knowledge-base.json` (pre-built RAG corpus)
2. User asks a question → client-side BM25 search over chunks
3. Matched context + conversation history → POST to Cloudflare Worker
4. Worker proxies to `https://opencode.ai/zen/go/v1/chat/completions` (streaming SSE)
5. Requires env var `OPENCODE_GO_API_KEY` on the worker

Worker allowed origins: `monchingdesierto.github.io`, `monching-desierto.vercel.app`, `localhost:4321`, any `*.vercel.app`.

## Key config facts

- Tailwind v4 (not v3) — no `tailwind.config.js`, uses CSS-first config via `@import "tailwindcss"` in `src/styles/global.css`
- DaisyUI 5 as a Tailwind v4 plugin (`@plugin "daisyui"`)
- Themes: `light --default, dark` (client-side via `theme-change` + localStorage)
- TypeScript: `astro/tsconfigs/strict` with `@/*` → `src/*` path alias
- Vite plugin: `@tailwindcss/vite`
- Static site output, no SSR

## No tests/lint/typecheck

There are no test, lint, or typecheck scripts configured in `package.json`. Run `npx astro check` for type checking if needed.
