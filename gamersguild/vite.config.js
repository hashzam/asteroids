import { defineConfig } from "vite";

// Relative base so the built site works whether it's served from a domain
// root (gamersguild.in) or a subpath (GitHub Pages project page).
export default defineConfig({
  base: "./",
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
});
