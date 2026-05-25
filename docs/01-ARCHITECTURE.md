# evolver.company — Architecture

Corporate website on full-stack Next.js. Frontend first; backend grows in the same repo via Route Handlers and Prisma.

**Project size:** B (feature-based)  
**Last updated:** 2026-05-25

---

## Overview

Single Next.js 16 application deployed on Vercel. UI in Server Components by default; API in `src/app/api/`. Domain logic lives in `src/features/*/services/` to keep routes thin.

### High-level diagram

```
┌─────────────────────────────────────────┐
│           Next.js (Vercel)              │
│  ┌─────────────┐    ┌─────────────────┐ │
│  │ App Router  │    │ Route Handlers  │ │
│  │ (RSC + UI)  │───▶│ /api/*          │ │
│  └─────────────┘    └────────┬────────┘ │
│                              │          │
│                    ┌─────────▼────────┐ │
│                    │ Prisma + Neon PG │ │
│                    └──────────────────┘ │
└─────────────────────────────────────────┘
```

**Style:** Modular monolith in one repo — no separate NestJS service for v1.

---

## Folder layout

```
src/
├── app/                    # Routes, layouts, global CSS
│   ├── api/                # REST endpoints (backend)
│   ├── layout.tsx
│   └── page.tsx
├── features/               # Feature modules (public barrels)
│   └── <feature>/
│       ├── components/
│       ├── services/       # Server-only business logic
│       ├── types/
│       └── index.ts
├── shared/
│   ├── components/         # Shared UI + shadcn/ui
│   ├── hooks/
│   └── lib/                # cn, env, logger, prisma
└── config/                 # siteConfig, constants
prisma/
└── schema.prisma
tests/
docs/
```

### Rules

- `features/*` may import from `shared/`; **never** the reverse.
- Cross-feature imports only via public `index.ts` barrels.
- No DB or secrets in client components.

---

## Request flow (API)

```
Client / Server Component
  → fetch('/api/...')
  → Route Handler (validate with Zod)
  → feature service
  → Prisma → PostgreSQL
  → JSON response
```

---

## Environments

| Environment | URL             | Purpose   |
| ----------- | --------------- | --------- |
| Development | localhost:3000  | Local dev |
| Production  | evolver.company | Live site |

---

## Key decisions

| Decision | Choice                 | Reason                                    |
| -------- | ---------------------- | ----------------------------------------- |
| Backend  | Next.js Route Handlers | Same deploy, simpler ops for company site |
| ORM      | Prisma                 | Type-safe, migrations                     |
| UI       | shadcn/ui + Tailwind 4 | Fast iteration, accessible primitives     |
| Layout   | Feature-based (B)      | Room to grow without monorepo overhead    |
