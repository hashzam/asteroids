# Gamers Guild Hyderabad — site rebuild

Custom Next.js rebuild of [gamersguild.in](https://www.gamersguild.in). Replaces
the current Wix template with a brand-led site that matches Gamers Guild's
premium positioning.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based theme in `globals.css`)
- **shadcn/ui** conventions (Radix primitives, manual install per component)
- **next-themes** for dark / light mode
- **Framer Motion** for restrained motion
- **lucide-react** for icons

## Brand tokens

| Token       | Dark              | Light             |
| ----------- | ----------------- | ----------------- |
| Background  | `#09090b`         | `#ffffff`         |
| Foreground  | `#f4f4f5`         | `#0a0a0c`         |
| Card        | `#121216`         | `#f8f8f9`         |
| Primary     | `#ff2233` (red)   | `#dc1a2a`         |
| Accent      | `#7cf3ff` (cyan)  | `#00b8d4`         |

Display font: **Chakra Petch**. Body font: **Inter**.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              Root layout, fonts, theme provider, nav, footer
│  ├─ globals.css             Tailwind + theme tokens
│  ├─ page.tsx                Home (placeholder, real build next)
│  ├─ pricing/page.tsx        Pricing (placeholder)
│  ├─ locations/
│  │  ├─ page.tsx             Locations index
│  │  └─ [slug]/page.tsx      Per-location pages
│  ├─ birthdays/page.tsx
│  └─ lans/page.tsx           Tournaments
├─ components/
│  ├─ site/                   Nav, Footer, Logo, Container
│  ├─ ui/                     shadcn-style primitives (Button etc)
│  ├─ theme-provider.tsx
│  └─ theme-toggle.tsx
└─ lib/
   ├─ utils.ts                cn() helper
   ├─ site.ts                 Site metadata + nav config
   ├─ locations.ts            Branch data (typed)
   └─ pricing.ts              Pricing tiers (typed)
```

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build status

- [x] Scaffold: theme, fonts, layout, nav, footer, data files
- [ ] Home page (vertical slice with placeholder media)
- [ ] Pricing page
- [ ] Location pages (Banjara, then Madhapur, then Begumpet)
- [ ] Birthdays page
- [ ] Tournaments page
- [ ] Vercel deploy

## Notes

- Hero / reel video slots are scaffolded to receive Instagram embeds and 9:16
  reels once available.
- Logo placeholder is the `GG` mark in `Logo` component. Drop in the real
  `GG_Solo_Mitsu_horizontal` SVG / PNG to replace.
- Booking form submits keep the current "request then follow-up call" flow,
  with a WhatsApp deep-link to the relevant location on success.
- Copy convention: no em-dashes anywhere in user-facing strings.
