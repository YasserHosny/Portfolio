# Spec — Yasser Hosny Founder Engineer Portfolio

> Speckit / SDD: **Specify** phase.
> Describes *what* is being built and *why*, without prescribing technology choices.

## Vision

A premium personal portfolio platform that positions **Yasser Hosny, MBA** as a
**Founder Engineer** — a senior software leader and technical cofounder candidate
who can build scalable software products, lead engineering teams, design
enterprise platforms, and connect technology to business outcomes.

This is not a job-seeker CV site. It is a founder-engineer credibility surface
suitable for startup, cofounder, product collaboration, consulting, and
enterprise leadership conversations.

## Target audiences

- Startup founders looking for a technical cofounder
- Product leaders looking for a product-minded engineering partner
- Consulting clients evaluating senior software leadership
- Enterprise hiring managers evaluating senior engineering leadership
- Recruiters searching for senior team leads / architects

## Business outcomes

- Inbound cofounder / consulting / leadership conversations
- Trusted signal that Yasser can move from **problem → MVP → scaled product**
- Reusable content platform Yasser can extend with case studies, updates,
  and product-lab experiments over time

## Product outcomes

- Public site with a coherent narrative across Home, Product Lab, Case Studies,
  About, Updates, Contact
- Clear separation of *technical execution*, *leadership*, and *product/business* signals
- A backend that can later back an admin surface + real persistence

## Non-goals (Phase 1)

- Real authentication or admin dashboard
- Real database persistence (seed data only)
- Real transactional email
- Blog / articles engine
- Analytics dashboard

## User stories

### As a startup founder
- I can understand within 15 seconds that Yasser is a senior engineer + product-minded leader with 20 years of experience.
- I can see concrete product ideas he has thought through (Product Lab).
- I can see real, credible case studies with problem/role/solution/impact.
- I can quickly reach a contact form or LinkedIn.

### As a recruiter for a senior engineering leadership role
- I can see technical capabilities grouped by domain (not fake percentage bars).
- I can see leadership and delivery signals (mentoring, sprint planning, cross-functional teams).
- I can find a resume download link.

### As Yasser (owner)
- I can add updates, product ideas, and case studies over time via a data layer that is ready to be swapped for Supabase.
- I can extend the platform to an admin dashboard later without rewriting the core.

## Success criteria (see also acceptance criteria in the brief)

- Home page communicates "Founder Engineer" positioning without generic CV clichés.
- All required routes render.
- All required API endpoints return valid responses.
- Design uses the specified dark navy / blue / teal system.
- The stack is Angular + FastAPI, containerized behind an Nginx reverse proxy.
- Content matches the source-of-truth profile in the brief.
