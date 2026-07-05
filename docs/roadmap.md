# Roadmap

## Phase 1 — Public portfolio MVP (this release)

- [x] Public portfolio website (Home, Product Lab, Case Studies, About, Updates, Contact)
- [x] FastAPI backend serving seed data
- [x] Responsive dark "Founder Engineer" design system
- [x] Product Lab with problem / target-user / MVP-scope / status / tags per item
- [x] Case Studies in Problem → Role → Solution → Impact format
- [x] Updates timeline with typed entries and tag filtering-ready data
- [x] Capability groups (no percentage bars) + learning themes + certifications
- [x] Contact form with FastAPI validation
- [x] Docker Compose (backend + Nginx + reverse proxy)
- [x] GitHub Actions CI skeleton (backend tests + frontend build)

## Phase 2 — Supabase persistence + admin

- [ ] Supabase Postgres schemas mirroring current Pydantic models
- [ ] Repository interface in the backend service layer (swap seed for DB)
- [ ] Supabase Auth-protected admin dashboard for content management
- [ ] Resume upload / download (Supabase Storage)
- [ ] Contact-form → Supabase table + transactional email dispatch
- [ ] Rate limiting on `/api/contact`

## Phase 3 — Content and reach

- [ ] Blog / articles engine
- [ ] Arabic version via `@ngx-translate/core` (structure already in place)
- [ ] Product demo pages for select Product Lab items
- [ ] Analytics dashboard (Plausible or self-hosted)
- [ ] AI-assisted portfolio content suggestions (LLM-backed drafting helpers
      that write Product Lab and Case Study drafts from a short brief)
