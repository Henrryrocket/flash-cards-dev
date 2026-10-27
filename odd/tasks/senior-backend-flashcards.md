# Senior Backend Flashcards
Objective: minimalist, responsive, bilingual (ES/EN) flash-card web app with interactive diagrams for senior backend interview prep; later fullstack.
Branch: (none yet, not a git repo) · Delivery: ask-on-risk · Runner: vitest (planned)

## Specs
S1. "mediante el uso de fash-cards y ayudas visuales como diagramas" — flash-cards + visual aids per topic.
S2. "minimalista, responsive y con un diseño simple, pero llamativo."
S3. "El usuario podrá elegir el nivel de conocimiento para cada etapa (principiante, intermedio, avanzado)" — level selector per stage/topic.
S4. "En un principio estará orientado al backend, pero luego escalará a fullstack." — content model must allow new tracks.
S5. Topics: Git, Docker, JavaScript, TypeScript, Node, SQL, HTTP, PostgreSQL, ORMs (Prisma), System design, Nest, backend architectures, clean code, JWT, microservices, others needed.
S6. "Busca una herramienta que permita desarrollar un recurso visual" — interactive diagram (e.g. MVC request/data flow client↔server).
S7. Content sourced from current research: most common Senior SWE interview questions + fundamentals every Senior should know.
S8. "Incluye recursos en cada tema en donde el usuario pueda profundizar" — resource links per topic.
S9. "desplegar con facilidad en plataformas como Vercel o Cloudflare" — static-first deploy.
S10. "Seguridad: toma todas las medidas para que la web sea segura y resistente a ataques de terceros."
S11. Decision (user): content bilingual ES/EN from day 1, language selector.

## Tasks
- T1 (S2,S4,S9,S11) Scaffold Astro + React islands + Tailwind, i18n routing ES/EN, content schema — inline — done (build OK: 5 pages, ES/EN, no warnings; not committed)
- T2 (S1,S3) Flash-card component (flip, level filter, progress in localStorage) — inline — done (8 vitest tests green, astro check clean, flip/mark/persist verified in browser; not committed)
- T3 (S10) Security: CSP, headers (_headers), no user-input sinks, dependency audit — inline — done (CSP via Astro security.csp + public/_headers; 15 tests, check clean, pnpm audit clean, hydration verified under CSP; not committed)
- T4 (S6) Diagram engine (step-player over SVG) + MVC flow diagram — inline — done (22 tests, check clean, 7 pages; step-player verified in browser under CSP: next/play/reset; not committed)
- T5 (S5,S7,S8) Content pass 1: HTTP, JWT, SQL/Postgres, Node, System design (research-backed) — done pass 1 (HTTP, JWT, SQL, PostgreSQL, Node.js, System design + MVC = 7 topics, 38 cards ES/EN; 22 resource URLs return 200; 38 tests; 17 pages; not committed). Pass 2 done: Git, Docker, TypeScript, ORMs/Prisma, NestJS, architectures, clean code, microservices (15 topics total, 33 more URLs return 200, 54 tests, 33 pages; not committed). Content written from model knowledge, needs human review
- T6 (S9) Deploy config Cloudflare Pages + CI — config done: CI workflow + Dependabot + docs/DEPLOY.md; CI steps replayed locally from clean install (all green); NOT verified on GitHub Actions; Cloudflare project not created (needs user account); not committed
- T7 (S2,S11) Redesign: landing page + light/dark theme + English default + educational framing (`why` per topic) + learning-path order — inline — done (74 tests, check clean, 33 pages; verified in browser: light/dark, toggle persists under CSP, ES topic page, mobile no overflow; not committed)

## Log
L1 (2026-10-26): "Quiero construir y desplegar una aplicación web que permita ayudar a entender los fundamentos y conceptos básicos de programación, tanto en el backend como en el frontend, mediante el uso de fash-cards y ayudas visuales como diagramas." (full request in session)
L2 (2026-10-26): Language question answered: "Bilingüe desde el día 1".
L3 (2026-10-26): Research: sources agree senior loops stress tradeoffs, failure modes, caching, consistency, messaging, ownership (educative.io, kore1.com). Astro 6 (Mar 2026) has built-in CSP API, Cloudflare owns Astro. React Flow suits animated graphs; Mermaid static only.
L4 (2026-10-27): User asked: landing page más bonita y profesional con hero descriptivo; contenido con énfasis educativo en fundamentos ante la facilidad de crear productos con AI; modo claro y oscuro; inglés por defecto con opción de español; más diseño.
