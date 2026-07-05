# Yasser Hosny — Founder Engineer Portfolio

A premium personal portfolio platform positioning **Yasser Hosny, MBA** as a
**Founder Engineer** — a senior software leader and technical cofounder
candidate who builds scalable software products, leads engineering teams, and
connects technology with business outcomes.

Not a job-seeker CV site. A founder-engineer credibility surface suitable for
startup, cofounder, product collaboration, consulting, and enterprise
leadership conversations.

## Tech stack

| Layer     | Choice                                                                          |
| --------- | ------------------------------------------------------------------------------- |
| Backend   | Python 3.12 · FastAPI · Pydantic v2 · pydantic-settings · pytest                 |
| Frontend  | Angular 18 (standalone) · TypeScript · SCSS · Angular Material · RxJS           |
| Data      | Seed data (Phase 1) · Supabase-ready service interfaces (Phase 2)               |
| DevOps    | Docker · docker-compose · Nginx reverse proxy · GitHub Actions                   |

Component prefix: `yh`.

## Repository layout

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

## Local development

### Backend

```bash
cd portfolio-backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

- API root: <http://localhost:8000/api>
- OpenAPI docs: <http://localhost:8000/api/docs>

Run tests:

```bash
pytest -q
```

### Frontend

```bash
cd portfolio-frontend
npm install
npm start
```

The dev server runs at <http://localhost:4200> and proxies `/api` to the backend
via `proxy.conf.json`.

Production build:

```bash
npm run build
```

### Docker Compose (both services)

```bash
docker compose up --build
```

- Site: <http://localhost:8080>
- API (direct): <http://localhost:8000/api>

The nginx container serves the built Angular app and proxies `/api/` to the
backend container.

## API endpoints

| Method | Path                          | Description                       |
| ------ | ----------------------------- | --------------------------------- |
| GET    | `/api/health`                 | Liveness probe                    |
| GET    | `/api/profile`                | Full public profile               |
| GET    | `/api/product-lab`            | List of product-lab items         |
| GET    | `/api/product-lab/{slug}`     | Single product-lab item           |
| GET    | `/api/case-studies`           | List of case studies              |
| GET    | `/api/case-studies/{slug}`    | Single case study                 |
| GET    | `/api/updates`                | Updates timeline (newest first)   |
| GET    | `/api/capabilities`           | Capability groups + certs + themes|
| POST   | `/api/contact`                | Submit contact form               |

## Environment variables

Backend (`portfolio-backend/.env`, see `.env.example`):

- `APP_NAME`, `APP_ENV`, `APP_DEBUG`, `APP_HOST`, `APP_PORT`
- `CORS_ORIGINS` — comma-separated list of allowed origins
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (Phase 2)

Frontend (compile-time, in `src/environments/`):

- `apiBaseUrl` — defaults to `/api` (proxied in dev, reverse-proxied in prod)

## Design system

Dark navy / blue / teal "Founder Engineer" system with dashboard-style cards,
Inter for prose, JetBrains Mono for technical labels. No fake skill percentage
bars, no cartoons, no "guru / ninja / rockstar" language.

See [`docs/design-system.md`](docs/design-system.md).

## Speckit specs

The build follows the Speckit / SDD flow. All three artifacts live in
`portfolio-specs/`:

- `spec.md` — what & why
- `plan.md` — tech stack & architecture constraints
- `tasks.md` — ordered implementation checklist

## Roadmap

**Phase 1 (this MVP):** public site with seed-data backend, Product Lab, Case
Studies, Capabilities, Updates, Contact form.

**Phase 2:** Supabase DB persistence, admin dashboard, auth, resume
upload/download, real transactional email.

**Phase 3:** blog / articles, Arabic version, product demo pages, analytics
dashboard, AI-assisted portfolio content suggestions.

See [`docs/roadmap.md`](docs/roadmap.md).

## Production deployment

Deployed to [Bunny.net Magic Containers](https://bunny.net/magic-containers/)
behind Bunny CDN + TLS. Full setup — GHCR image pipeline, Bunny app
configuration, Zoho SMTP contact form, and the CD workflow — is documented
in [`docs/deployment.md`](docs/deployment.md).
