# Architecture

Two containers, one purpose: serve a fast, credible founder-engineer surface
with a clean read/write API in front of a swap-friendly data layer.

## Runtime shape

```
                    ┌──────────────────────────┐
     Browser ──────▶│  Nginx (frontend image)  │──── static SPA ──▶ /
                    │                          │
                    │  proxy /api/* ───────────┼──▶ FastAPI (backend image)
                    └──────────────────────────┘             │
                                                             ▼
                                                     Seed data (Phase 1)
                                                     Supabase repo (Phase 2)
```

- **Frontend container** — multi-stage Docker build: node → nginx. Nginx serves
  the built SPA and reverse-proxies `/api/*` to the backend service via
  `nginx.conf.template` (envsubst-expanded on container start).
- **Backend container** — Uvicorn hosting the FastAPI app, listening on `:8000`.

## Backend layers

```
app/
├── main.py               # app factory, CORS, error handler, router wiring
├── api/routes/           # HTTP layer — one file per resource
├── core/config.py        # pydantic-settings, .env driven
├── schemas/              # Pydantic request/response models
├── services/             # business logic — reads from data providers
├── models/               # (reserved for future ORM/domain models)
└── data/seed.py          # in-memory source of truth for Phase 1
```

Routes call services; services read from `data/seed.py` today, and will read
from a Supabase-backed repository in Phase 2. Nothing above the service layer
needs to change when persistence lands.

## Frontend layers

```
src/app/
├── app.config.ts         # provideRouter, provideHttpClient, animations
├── app.routes.ts         # lazy-loaded standalone routes
├── app.component.ts      # bootstraps <yh-app-shell>
├── core/                 # singleton services (API clients) + models
├── shared/components/    # dumb presentation components
├── layout/               # AppShell, Header, Footer
└── features/             # one folder per route
```

All feature pages are standalone components lazy-loaded via `loadComponent()`.
State is held in signals within each feature; there is no NgRx / global store
in Phase 1 — services + `shareReplay(1)` on the profile call are enough.

## Data flow

1. Feature component calls a service in `core/services/`.
2. Service delegates to `ApiBaseService`, which prepends `environment.apiBaseUrl`.
3. In dev, `proxy.conf.json` forwards `/api` to `localhost:8000`.
4. In prod, Nginx forwards `/api/` to the backend container over the compose
   network.

## Configuration

- Backend reads env via `pydantic-settings` (`Settings` class).
- Frontend reads env via `src/environments/environment.ts` (compile-time).
- `docker-compose.yml` injects `CORS_ORIGINS` for the backend and
  `BACKEND_HOST` / `BACKEND_PORT` for the frontend's nginx template.

## Extensibility

- **New content type** → add a Pydantic schema + service + route + a
  frontend model + service + component. No cross-cutting changes.
- **Real persistence** → introduce a `Repository` protocol; swap the
  seed-reading service implementation for a Supabase-backed one.
- **Admin** → add auth middleware + protected write routes. Frontend gets a
  parallel `admin/` feature area guarded by an auth service.

## Non-functional targets

- First meaningful paint under 2s on broadband.
- Contentful chunk (initial) under 100KB gzipped — the current production build
  is ~89KB gzipped for the initial payload.
- Semantic HTML + keyboard-navigable focus states throughout.
