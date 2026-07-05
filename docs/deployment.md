# Deployment — Bunny.net Magic Containers

Production runtime: two Docker containers (`portfolio-backend`,
`portfolio-frontend`) hosted on
[Bunny.net Magic Containers](https://bunny.net/magic-containers/), fronted by
Bunny CDN + DNS + TLS.

## Bunny Magic Containers — deployment model

Bunny groups multiple containers under a single **app**. Containers within
the same app share a **network namespace** — they communicate via
`localhost`, similar to a Kubernetes Pod. Both frontend and backend live in
one Bunny app.

| Container | Image source | Public port | Custom hostname |
|---|---|---|---|
| `portfolio-backend`  | `ghcr.io/<owner>/portfolio-backend:latest`  | 8000 | `portfolio-api.iron-sys.com` |
| `portfolio-frontend` | `ghcr.io/<owner>/portfolio-frontend:latest` |   80 | `portfolio.iron-sys.com`     |

Because the two containers share a network namespace:

- The frontend's Nginx config uses `BACKEND_HOST=127.0.0.1` in production
  (loopback IP, so no DNS resolver is needed — safer inside Bunny's runtime).
- Both `deploy-backend.yml` and `deploy-frontend.yml` target the **same
  Bunny app**, with app-scoped IDs (`BUNNY_BACKEND_APP_ID` /
  `BUNNY_FRONTEND_APP_ID`) identifying the container within it.

## Runtime shape

```
                          ┌──────────────────────────────────────────┐
   portfolio.iron-sys.com ─▶│  Bunny CDN + TLS + DNS                   │
                          │        │                                  │
                          │        ▼                                  │
                          │  ┌────────────────────────────────────┐   │
                          │  │ Bunny Magic Containers app (shared │   │
                          │  │ network namespace):                │   │
                          │  │                                    │   │
                          │  │  portfolio-frontend (nginx :80) ───┼──▶ /api/* proxied to 127.0.0.1:8000
                          │  │                                    │   │
                          │  │  portfolio-backend  (uvicorn :8000)│   │
                          │  └────────────────────────────────────┘   │
                          └──────────────────────────────────────────┘

   portfolio-api.iron-sys.com ─▶ same app, backend container (optional public route)
```

## One-time setup

### 1. Bunny Magic Containers app

1. In the Bunny dashboard, create **one** Magic Containers app.
2. Add two containers to that app with these exact names:
   - `portfolio-backend`  — port 8000
   - `portfolio-frontend` — port 80 (public)
3. Wire the **image source** for each container:
   - Backend: `ghcr.io/<your-github-user>/portfolio-backend:latest`
   - Frontend: `ghcr.io/<your-github-user>/portfolio-frontend:latest`
   - If your GHCR packages are private, add a **Container Registry** in Bunny
     (Magic Containers → Container Registries → Add) with a GitHub PAT scoped
     to `read:packages`.
4. Set **custom hostnames**:
   - `portfolio.iron-sys.com` → frontend container (port 80)
   - `portfolio-api.iron-sys.com` → backend container (port 8000) — optional,
     useful for docs (`/api/docs`) and direct API testing. If you skip this,
     the backend remains reachable only via the frontend's `/api/*` proxy,
     which is fine for production.
5. Set **env vars** on each container:

   Backend (`portfolio-backend`):

   ```
   APP_ENV=production
   APP_DEBUG=false
   CORS_ORIGINS=https://portfolio.iron-sys.com,https://portfolio-api.iron-sys.com
   SMTP_HOST=smtp.zoho.com
   SMTP_PORT=465
   SMTP_USE_SSL=true
   SMTP_USERNAME=<your Zoho address>
   SMTP_PASSWORD=<Zoho app password>
   CONTACT_FROM_EMAIL=<your Zoho address>
   CONTACT_FROM_NAME=Yasser Hosny Portfolio
   CONTACT_TO_EMAIL=<where you want to receive messages>
   CONTACT_RATE_LIMIT=5/hour
   ```

   Frontend (`portfolio-frontend`):

   ```
   BACKEND_HOST=127.0.0.1
   BACKEND_PORT=8000
   ```

   Note the `127.0.0.1` — that only works because Bunny gives both
   containers a shared network namespace. We use the loopback IP (not
   `localhost`) so nginx does not go through a DNS resolver that may not
   exist inside Bunny's runtime.

### 2. Zoho SMTP (contact form)

1. Log in to Zoho Mail as your `iron-sys.com` mailbox.
2. Enable **IMAP/SMTP access** in mailbox settings.
3. Generate an **App Password** at
   [accounts.zoho.com → Security → App Passwords](https://accounts.zoho.com/home#security).
   Never use your real login password.
4. Paste the app password into the Bunny `SMTP_PASSWORD` env var.
5. Optional but recommended: add SPF and DKIM records for `iron-sys.com` per
   Zoho's guide, so your outbound mail does not land in Spam.

### 3. GitHub repo — secrets

Under repo Settings → Secrets and variables → Actions → New repository secret:

- `BUNNY_API_KEY` — Bunny.net API key (Account Settings → API Access,
  main-account key only; sub-user keys are not accepted by the deploy
  action per Bunny's docs)
- `BUNNY_BACKEND_APP_ID`  — Bunny app container ID for the backend
- `BUNNY_FRONTEND_APP_ID` — Bunny app container ID for the frontend

No repository variables are required.

## CI/CD pipelines

`.github/workflows/` contains three workflows:

| File | Trigger | Purpose |
|---|---|---|
| `ci.yml` | any push or PR | backend `pytest`, frontend production build |
| `deploy-backend.yml`  | push to `main` when `portfolio-backend/**` changes, or manual dispatch | Build+push backend image, roll out on Bunny |
| `deploy-frontend.yml` | push to `main` when `portfolio-frontend/**` changes, or manual dispatch | Build+push frontend image, roll out on Bunny |

The two deploy workflows follow an identical pattern (per Bunny's recommended
GitHub Actions guide):

1. Log in to GHCR
2. Normalize the owner name to lowercase (GHCR is case-sensitive; the
   `${GITHUB_REPOSITORY_OWNER,,}` bash expansion handles the common
   `YasserHosny` → `yasserhosny` case)
3. Compute image tags via `docker/metadata-action@v5` — a SHA tag on every
   run plus `:latest` on `main`
4. Buildx build+push for `linux/amd64` with GHA cache
5. `BunnyWay/actions/container-update-image@main` tells Bunny to roll the
   container to the new `:latest` tag

Path filters mean a docs-only or root-config change never triggers a deploy.
`workflow_dispatch` lets you redeploy the current `main` at will.

## Verifying a deploy

- Watch the CI run — the `BunnyWay/actions/container-update-image` step logs
  the API response.
- In Bunny, the container should flip to the new tag within ~30 seconds.
  Bunny's default health check hits `GET /api/health` on the backend and
  `GET /` on the frontend.
- From outside:
  - `curl https://portfolio.iron-sys.com/api/health` → `{"status":"ok",...}`
  - `curl https://portfolio-api.iron-sys.com/api/health` → same (if you
    exposed the backend hostname)
- Contact-form smoke test: submit a real message from `/contact`; it should
  arrive at `CONTACT_TO_EMAIL` within seconds. If SMTP fails, the API still
  returns success (so the UI doesn't lie), but the failure is logged.

## Rollback

The GHCR tag history is your rollback log. To roll back:

1. Find the desired 12-char SHA tag in your GHCR package view.
2. In the Bunny app, edit the container's image tag from `:latest` to the
   older SHA — Bunny rolls out immediately. Once you have verified, redeploy
   the good commit from `main` via `workflow_dispatch` to restore `:latest`.

## Local development is unchanged

Local dev still uses `docker compose up` at the repo root. In compose, the
two containers do NOT share a network namespace — they use Docker's user-
defined bridge network, and the frontend reaches the backend via the
`backend` service name (compose adds that as a network alias automatically).

The frontend's Nginx template reads `BACKEND_HOST` from the environment, so
compose sets `BACKEND_HOST=backend` locally and Bunny sets
`BACKEND_HOST=127.0.0.1` in production. Same image, different environment.

## Observability (deferred to Round 2)

- Uptime — UptimeRobot ping against `https://portfolio.iron-sys.com/api/health`
- Web analytics — Cloudflare Web Analytics or Plausible
- Error tracking — Sentry (both backend and frontend)
- Structured logs — Bunny streams container stdout; forward to a sink you
  own if you want retention.
