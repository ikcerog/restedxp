# Sample Post Seed Data

`posts.json` contains 4 sample blog posts for development and demo purposes.

## Import into Sanity

```bash
# From the studio/ directory:
npx sanity dataset import seed/posts.json production
```

> The `--replace` flag will overwrite existing documents with the same `_id`.
> Omit it on a fresh dataset.

## Posts included

| Title | Category | Date |
|---|---|---|
| Widgets, Sprockets, and the Path to Gold | GUIDES | 2026-01-10 |
| Borrowed Fire and Stolen Shadow: Mana, Mages & Warlocks | LORE | 2026-01-22 |
| Space Wizards with Laser Swords | GAMING | 2026-02-01 |
| The Geometry of War: Three-Faction Conflicts | DESIGN | 2026-02-14 |
