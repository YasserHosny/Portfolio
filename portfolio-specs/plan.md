# Plan — Yasser Hosny Founder Engineer Portfolio

> Speckit / SDD: **Plan** phase.
> Fixes the tech stack, architecture, and constraints that implementation must follow.

## Repository shape

Monorepo:

```
project-root/
├── portfolio-backend/    # FastAPI service
├── portfolio-frontend/   # Angular app
├── e2e/                  # placeholder for end-to-end tests
├── portfolio-specs/      # Speckit spec / plan / tasks
├── docs/                 # architecture, design system, roadmap
├── docker-compose.yml
└── .github/workflows/    # CI skeleton
```

## Backend

- **Language:** Python 3.12
- **Framework:** FastAPI + Uvicorn
- **Validation:** Pydantic v2
- **Config:** `pydantic-settings` reading `.env`
- **Data layer:** in-memory seed data (Phase 1). Interface is designed so a
  Supabase-backed repository can drop in later without changing routes or schemas.
- **CORS:** configured for the frontend origin (env-driven).
- **Health endpoint:** `GET /api/health`.

### Backend layers

```
app/
├── main.py              # FastAPI app factory + middleware wiring
├── api/routes/          # HTTP layer — one file per resource
├── core/                # settings, CORS, error handlers
├── schemas/             # Pydantic models exposed by the API
├── services/            # business logic — reads from data providers
├── models/              # internal domain models (mirrors of seed shapes)
└── data/                # seed JSON-like Python constants
tests/                   # pytest tests for health + read endpoints
```

## Frontend

- **Framework:** Angular (standalone-components-ready, but Phase 1 uses
  NgModules-free standalone bootstrap for lightness).
- **Language:** TypeScript
- **Styling:** SCSS with a shared design-system layer
- **UI kit:** Angular Material (minimal, heavily overridden by the design system)
- **State:** RxJS + services (no NgRx in Phase 1)
- **Routing:** Angular Router with lazy-loaded feature routes
- **i18n:** structure ready for `@ngx-translate/core` (Phase 2)
- **Component prefix:** `yh`

### Frontend layers

```
src/app/
├── core/           # singleton services (API clients, config)
├── shared/         # dumb reusable components (cards, buttons, badges)
├── layout/         # app shell, header, footer
└── features/       # route-level pages
```

## Design system

- Dark navy base (`#0B1120`), blue primary (`#3B82F6`), teal secondary (`#14B8A6`).
- Typography: Inter for prose, JetBrains Mono for technical labels.
- No skill-percentage bars, no cartoons, no "rockstar/ninja" language.
- Dashboard-card motif throughout hero, snapshots, capability groups, updates.

See [`docs/design-system.md`](../docs/design-system.md).

## DevOps

- Backend & frontend each get a Dockerfile.
- `docker-compose.yml` boots backend + frontend (nginx) locally.
- Nginx serves the built Angular app and proxies `/api/` → backend.
- GitHub Actions skeleton: lint + type-check + tests on push/PR.

## Non-functional constraints

- **Performance:** first meaningful paint under 2s on broadband.
- **Accessibility:** semantic HTML, keyboard-navigable, color contrast ≥ 4.5:1 for body text.
- **SEO:** meta tags + OG/Twitter cards in `index.html`.
- **Extensibility:** every content type has a service + schema so future
  persistence via Supabase requires only swapping the data provider.

## Phase boundary

Phase 1 (this MVP) delivers a public, static-content-driven site with a
FastAPI backend serving seed data. Auth, admin, and real DB persistence
are explicitly Phase 2.
