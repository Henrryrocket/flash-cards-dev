# Senior Flashcards

Bilingual (ES/EN) flash-cards with interactive diagrams to prepare for senior
backend interviews. Astro + React islands + Tailwind, fully static.

```bash
pnpm install
pnpm dev        # local dev server
pnpm test       # vitest
pnpm check      # astro check (types)
pnpm build      # static output in dist/
```

- Content lives in `src/content/topics/{es,en}` and `src/content/diagrams/{es,en}`
  (validated by the schema in `src/content.config.ts`).
- Deployment: see [docs/DEPLOY.md](docs/DEPLOY.md).
