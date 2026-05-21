# Gamers Guild Hyderabad

Custom website for Gamers Guild, a premium gaming cafe chain in Hyderabad with
three locations: Madhapur, Begumpet and Banjara Hills.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- shadcn-style components (hand-authored in `components/ui`)
- next-themes (dark default, light available)
- Framer Motion for restrained motion

## Develop

```bash
cd gamersguild
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Structure

```
app/            routes (home, pricing, locations, birthdays, tournaments, blog)
components/
  layout/       header, footer, logo
  theme/        theme provider and toggle
  ui/           shadcn-style primitives
lib/            site config, locations and pricing data, helpers
content/blog/   MDX posts (migrated later)
public/         images, videos, logo (placeholders for now)
```

All business data (locations, pricing, phone numbers) lives in `lib/` as the
single source of truth.

## Deployment

Deploys to Vercel. Set the project Root Directory to `gamersguild` so Next.js
is auto-detected.
