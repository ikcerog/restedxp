import { defineConfig } from 'vite'

export default defineConfig({
  // Set VITE_BASE_PATH=/restedxp/ in CI for GitHub Pages subdirectory deploys.
  // Omit (or set to /) for a custom domain or local dev.
  base: process.env.VITE_BASE_PATH ?? '/',
  server: {
    port: 3000,
  },
  build: {
    target: 'es2020',
  },
})
