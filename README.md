# RestedXP

A sci-fi / space opera blog. Vite + Vanilla JS frontend, Sanity CMS backend.

## Stack

| Layer    | Tech                                   |
|----------|----------------------------------------|
| Frontend | Vite 5, Vanilla JS (ESM), CSS3         |
| CMS      | Sanity v3 (Studio lives in `studio/`)  |
| Fonts    | Orbitron · Space Grotesk · Space Mono  |

## Getting started

### 1. Create a Sanity project

```bash
npm create sanity@latest
```

Or go to [sanity.io/manage](https://sanity.io/manage) and create a new project. Note your **Project ID** and **Dataset** name.

### 2. Configure environment

```bash
cp .env.example .env
# edit .env — paste your VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET
```

### 3. Run the Sanity Studio

```bash
cd studio
npm install
# edit sanity.config.ts — add your projectId (or set env vars)
npm run dev        # Studio at http://localhost:3333
```

### 4. Run the blog

```bash
npm install
npm run dev        # Blog at http://localhost:3000
```

### 5. Deploy

- **Blog**: `npm run build` → deploy `dist/` to Netlify, Vercel, Cloudflare Pages, etc.
- **Studio**: `cd studio && npm run deploy` → deploys to `<project>.sanity.studio`

## Project structure

```
restedxp/
├── index.html              # App shell
├── public/
│   └── favicon.svg
├── src/
│   ├── main.js             # Entry, routing, clock, nav
│   ├── router.js           # Hash-based SPA router
│   ├── sanity.js           # Sanity client + GROQ queries
│   ├── starfield.js        # Canvas star animation
│   ├── scramble.js         # Text-scramble reveal effect
│   ├── views/
│   │   ├── home.js         # Post grid + hero
│   │   ├── post.js         # Full post view
│   │   ├── archive.js      # Archive by year
│   │   └── about.js        # About page
│   └── styles/
│       └── main.css        # All styles (custom props → layout → components → animations)
└── studio/                 # Sanity Studio
    ├── sanity.config.ts
    └── schemas/
        ├── index.ts
        └── post.ts         # Post schema (title, slug, body, tags, cover, category)
```
