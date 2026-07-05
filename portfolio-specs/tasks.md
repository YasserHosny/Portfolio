# Tasks — Yasser Hosny Founder Engineer Portfolio

> Speckit / SDD: **Tasks** phase.
> Ordered checklist that the implementation phase works through.

## 1. Repo scaffolding
- [x] Create monorepo directory tree
- [x] Write `portfolio-specs/spec.md`, `plan.md`, `tasks.md`

## 2. Backend (FastAPI)
- [x] `requirements.txt` with FastAPI, Uvicorn, Pydantic v2, pydantic-settings, pytest
- [x] `app/core/config.py` — settings loaded from env
- [x] `app/main.py` — app factory + CORS + error handling + router wiring
- [x] Pydantic schemas for Profile, ProductLab, CaseStudy, Update, Capability, Contact
- [x] Seed data for all content types (Yasser's real profile from the brief)
- [x] Services layer wrapping seed data (interface-first for future Supabase swap)
- [x] Routes: `/api/health`, `/api/profile`, `/api/product-lab`, `/api/case-studies`, `/api/updates`, `/api/capabilities`, `/api/contact`
- [x] Health + smoke tests in `tests/`
- [x] `Dockerfile` and `.env.example`

## 3. Frontend (Angular)
- [x] Angular workspace files (`angular.json`, `package.json`, `tsconfig*.json`)
- [x] Global styles: design tokens, typography, resets in `styles.scss`
- [x] Core: API base config, HTTP services for each content type
- [x] Shared components: SectionHeader, StatCard, Badge, ProductCard, CaseStudyCard, UpdateTimeline, CapabilityGroup, FounderSnapshot, CtaButton
- [x] Layout: AppShell, Header, Footer
- [x] Feature pages: Home, ProductLab, CaseStudies, About, Updates, Contact
- [x] Routing with lazy-loaded features
- [x] `proxy.conf.json` for local `/api` proxy
- [x] `Dockerfile` (multi-stage: node build → nginx serve)
- [x] `nginx.conf.template` with reverse proxy for `/api/`

## 4. DevOps
- [x] Root `docker-compose.yml` (backend + frontend)
- [x] `.env.example` at root
- [x] `.github/workflows/ci.yml` skeleton

## 5. Documentation
- [x] `README.md` — overview, setup, endpoints, envs, roadmap
- [x] `docs/design-system.md`
- [x] `docs/architecture.md`
- [x] `docs/roadmap.md`

## 6. Acceptance
- [ ] `docker compose up` boots both services
- [ ] Home page loads with hero + snapshot + all sections
- [ ] All routes resolve
- [ ] All API endpoints return 200 with valid JSON
- [ ] Contact form POSTs and receives success response
