# Evolver Showcase

Minimal backend-first Next.js app for testing public pages, bilingual routing, project CRUD, and Cloudflare R2 image uploads.

## Stack

- Next.js 16+ (App Router)
- TypeScript
- Prisma + PostgreSQL
- Cloudflare R2 (S3-compatible) for all image storage
- pnpm (package manager)

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Set in `.env`:
   - `DATABASE_URL`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`

3. Install dependencies and prepare the database:

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

## Admin login

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Credentials: values from `.env`
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
- Session cookie is signed with `SESSION_SECRET`

Protected routes:

- `/admin`
- `/admin/home-hero`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- `/admin/contact-messages`

## Home Hero carousel

- Admin URL: [http://localhost:3000/admin/home-hero](http://localhost:3000/admin/home-hero)
- Settings stored in `SiteSetting` with key `homeHero` (JSON slides)
- Public homepage renders `HeroCarousel` from DB-backed slides
- Admin editor supports `hy`, `en`, and `ru` copy fields; storefront uses `en` and `hy` only
- Hero image uploads use `context=homeHero` → R2 path `home-hero/YYYY/MM/...`

## Image uploads (Cloudflare R2)

- All uploads go through `POST /api/admin/upload` (admin-only)
- Optional `context` field: `project` (default) or `homeHero`
- Storage implementation: `lib/storage.ts`
- Public URLs saved in DB use `R2_PUBLIC_URL`
- R2 object keys are stored in `Project.coverImageKey` and `ProjectImage.key` for delete/replace
- Allowed types: JPEG, PNG, WebP, AVIF (max 10MB each)
- Admin supports drag-and-drop for cover and gallery images
- Gallery images can be reordered with drag-and-drop before save

Upload path format:

`projects/{projectId or temp}/{timestamp}-{uuid}.{ext}`

## Language routes

- `/` redirects to `/en`
- Supported locales: `en`, `hy`
- Public routes:
  - `/[locale]`
  - `/[locale]/services`
  - `/[locale]/projects`
  - `/[locale]/projects/[slug]`
  - `/[locale]/about-us`
  - `/[locale]/contact-us`

The header language switcher keeps the current page when switching locale.

Examples:

- `/en/projects/estate-data` → `/hy/projects/estate-data`
- `/hy/contact-us` → `/en/contact-us`

Static page copy for Home, Services, About Us, and Contact Us is hardcoded in `lib/i18n.ts`.

## Creating a bilingual project

1. Log in to admin.
2. Go to **Projects → New project**.
3. Fill shared fields: slug, project URL, cover image, gallery images, published toggle.
4. Drag and drop images or click upload areas.
5. Reorder gallery images by dragging previews.
6. Use the **Armenian** tab for HY title, short description, and long description.
7. Use the **English** tab for EN title, short description, and long description.
8. Click **Create project** — both translations are saved on one project record.

Slug auto-generates from the English title on create; you can edit it before saving.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
