# Evolver Company

Full-stack Next.js application for [evolver.company](https://evolver.company).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4** + **shadcn/ui**
- **Prisma** + **PostgreSQL** (backend-ready)
- **Vitest**, **ESLint**, **Prettier**, **Husky**

## Prerequisites

- Node.js 20+
- pnpm 9+

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `pnpm dev`         | Dev server (Turbopack)              |
| `pnpm build`       | Production build                    |
| `pnpm start`       | Production server                   |
| `pnpm lint`        | ESLint                              |
| `pnpm typecheck`   | TypeScript check                    |
| `pnpm test`        | Vitest                              |
| `pnpm format`      | Prettier write                      |
| `pnpm db:generate` | Generate Prisma client              |
| `pnpm db:migrate`  | Run migrations (needs DATABASE_URL) |

## Project structure

```
src/
├── app/              # Routes, layouts, API (Route Handlers)
├── features/         # Feature modules (UI + logic per domain)
├── shared/           # Reusable components, hooks, lib
└── config/           # App-wide config
prisma/               # Database schema
tests/                # Unit tests
docs/                 # Architecture, TECH_CARD, progress
```

## Frontend development

1. Add pages under `src/app/` or feature routes.
2. Add UI in `src/features/<name>/components/`.
3. Reuse primitives from `src/shared/components/ui/` (shadcn):

```bash
pnpm dlx shadcn@latest add button
```

## Backend (later)

- API: `src/app/api/**/route.ts`
- Business logic: `src/features/<name>/services/`
- Database: extend `prisma/schema.prisma`, then `pnpm db:migrate`

## Documentation

- [Architecture](docs/01-ARCHITECTURE.md)
- [Tech card](docs/TECH_CARD.md)
- [Progress](docs/PROGRESS.md)

## Environment

Copy `.env.example` to `.env`. `DATABASE_URL` is optional until you connect PostgreSQL (Neon recommended).
