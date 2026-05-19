# Gamers Guild Hyderabad — website

A full redesign of the Gamers Guild Hyderabad site: a single-page experience
with a 3D WebGL hero (synthwave grid, floating neon polyhedra, particles +
bloom), animated stats, 3D tilt cards, a tournament circuit, arena pricing
and a contact form.

Built with **Vite** + **Three.js**.

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer (it ships with `npm`).

```bash
cd gamersguild
npm install      # one-time: downloads Three.js + Vite
npm run dev      # start the dev server → http://localhost:5173
```

`npm run dev` hot-reloads as you edit files.

## Build for production

```bash
npm run build    # outputs a static site into gamersguild/dist/
npm run preview  # preview that production build locally
```

The contents of `dist/` are plain static files — drop them on any host
(Netlify, Vercel, GitHub Pages, S3, your own server). `base` is set to
`./` in `vite.config.js`, so it works from a domain root or a subpath.

## Project structure

```
gamersguild/
├─ index.html        markup for every section
├─ vite.config.js    build / dev-server config
└─ src/
   ├─ main.js        nav, scroll reveals, stat counters, tilt, form
   ├─ hero3d.js      the Three.js WebGL hero scene
   └─ style.css      all styling (neon gaming theme)
```

## Notes

- Stats, tournament dates and pricing are realistic placeholders — swap them
  for real numbers in `index.html`.
- Social links in the footer point to `#`; add the real URLs.
- The contact form is front-end only. Wire it to an email service or backend
  in the `joinForm` submit handler in `src/main.js`.
- Respects `prefers-reduced-motion` and falls back gracefully without WebGL.
