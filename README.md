# Multitenant E‑Commerce (Next.js + Payload CMS)

A foundation for a multi‑tenant e‑commerce platform built with:

- Next.js 15 (App Router) + React 19
- Payload CMS (headless – MongoDB adapter)
- MongoDB
- Tailwind CSS 4 + Radix UI + extended shadcn/ui components
- GraphQL & REST routes (via Payload)

## Core (current / planned) Features

- Multiple tenants (shops) on a single codebase
- User access control (Users collection)
- Hierarchical category management (Categories collection)
- Media upload & asset management (Media collection)
- Search + filter UI (search-filters components)
- Responsive UI (mobile / desktop: sidebar, navbar, drawer)
- Internal GraphQL Playground

## System Requirements

- Node >= 18
- MongoDB (local or Atlas)
- Bun or npm/yarn/pnpm (repo ships a `bun.lock`, Bun recommended)

## Installation

```bash
# Clone
git clone <repo-url> multitenant-ecommerce
cd multitenant-ecommerce

# Install dependencies (choose one)
bun install
# or
npm install
```

## Environment Variables (.env.local example)

Create a `.env.local` at repo root:

```
MONGODB_URI=mongodb://localhost:27017/multitenant_ecommerce
PAYLOAD_SECRET=changeme-long-random-string
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# If using Payload Cloud you may also need: PAYLOAD_CLOUD=true
```

(For Atlas) replace with your SRV connection string.

## Main Scripts

| Script           | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `dev`            | Run Next + Payload in development mode                         |
| `build`          | Production build                                               |
| `start`          | Start production build                                         |
| `lint`           | ESLint                                                         |
| `generate:types` | Generate TS types from Payload schema (`src/payload-types.ts`) |
| `db:fresh`       | Reset + migrate (Mongo) through Payload                        |
| `db:seed`        | Run seeding script (`src/seed.ts`)                             |
| `db:reset`       | Fresh + seed (with dotenv)                                     |

Run dev:

```bash
bun run dev
# or
npm run dev
```

Visit: http://localhost:3000

Payload Admin (default): http://localhost:3000/payload

## Seeding Data

After setting MONGODB_URI & PAYLOAD_SECRET:

```bash
bun run db:reset
# or step by step:
bun run db:fresh
bun run db:seed
```

## Highlighted Directory Structure

```
src/
  app/(app)/...(public UI)
  app/(payload)/...(Payload Admin + routes)
  collections/ (Payload Collections definitions)
  components/ui/ (Reusable UI library)
  hooks/ (Custom React hooks)
  lib/ (utility helpers)
```

- `payload.config.ts`: central Payload CMS config (collections, adapters, plugins...)
- `src/seed.ts`: sample data initialization logic.

## Multi‑Tenant Architecture (proposed roadmap)

Currently a base platform. To reach full multi‑tenant separation:

1. Add a `Tenants` collection (domain, name, config...)
2. Attach a `tenant` reference field to Products, Orders, Users, etc.
3. Configure Payload Access Control to scope queries by current tenant (derived from domain / header)
4. Next.js middleware: detect tenant from host → inject context (e.g. request headers / server context)
5. Add MongoDB indexes: `{ tenant: 1, slug: 1 }`, `{ tenant: 1, createdAt: -1 }`

## GraphQL

Route: `src/app/(payload)/api/graphql/route.ts`

- Playground: `/payload/api/graphql-playground` (if enabled)
- Introspect to generate a typed client SDK.

## UI / Styling

- Tailwind CSS 4 (minimal config via PostCSS)
- Radix primitives wrapped in local components (`components/ui`)
- Utility `cn` helper in `lib/utils.ts`

## Potential Next Extensions

- Add Products, Orders, Inventory collections
- Stripe (tenant‑specific): store Stripe keys in Tenants collection
- Advanced search (Atlas Search / Meilisearch)
- Faceted filters (categories, price range, etc.)
- Image optimization + CDN integration
- Audit logs & activity feed

## Deployment

- Docker (recommended) or Vercel + Mongo Atlas
- Define environment variables on the hosting platform
- Build: `bun run build` then `bun run start`

## Security & Performance Tips

- Use a strong PAYLOAD_SECRET (>= 32 chars)
- HTTPS / reverse proxy
- Add TTL / caching layer (Edge / CDN) for public pages
- Rate limit public APIs

## Quick Dev Checklist

```bash
bun run lint
bun run generate:types
bun run dev
```

## License

MIT (update if different).

---

Contributing: open a PR against `dev`. Issues / feature requests: open a GitHub Issue.
