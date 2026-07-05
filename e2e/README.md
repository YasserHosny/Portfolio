# End-to-end tests

Playwright suite covering routes, design-system CSS, and functional flows.
CI runs it against the local docker-compose stack on every PR + push to main.
You can also run it against production.

## Install

```bash
cd e2e
npm install
npm run install-browsers    # downloads chromium + system deps
```

## Run against the local stack

```bash
# First, boot the app (from repo root):
docker compose up --build -d

# Then, from e2e/:
npm run test:local
```

## Run against production

```bash
npm run test:prod
```

## Suite layout

| File | Covers |
|---|---|
| `tests/routes.spec.ts` | Each of 7 routes: HTTP 200, `<title>`, exactly one `<h1>` with expected copy, no console errors |
| `tests/design-system.spec.ts` | Design-system CSS actually applies — catches the "main stylesheet loaded with `media=print`" regression that silently broke every page. Asserts `.eyebrow`, `.surface`, `.grid`, and body background compute to the expected values |
| `tests/functional.spec.ts` | Header nav navigates, `<img>` `naturalWidth > 0`, all 7 API endpoints return 200, contact form validates + submits (POST is mocked so we do not spam Zoho), `/projects` language filter chips work |

## Why we watch computed styles

There was a live production incident where `.eyebrow`, `.surface`, `.grid`,
and heading sizes silently stopped applying because Angular's build
inlined ~4KB of critical CSS and loaded the full stylesheet with
`media="print"`. The page still rendered (body background was inlined),
so nothing looked broken *enough* to notice in a smoke test — but every
card, badge, and grid was unstyled.

The tests in `design-system.spec.ts` assert `getComputedStyle` values
against the design tokens, so if this regresses again the CI is red
before the deploy runs.
