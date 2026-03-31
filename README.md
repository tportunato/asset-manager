# Asset Manager — RE Portfolio Intelligence

A logistics real estate asset management dashboard built for investment analysts. Tracks portfolio performance, quarterly data history, tenant credit trends, financing covenants, and generates AI-powered briefings.

## Features

- **Command Centre** — portfolio overview with expandable rows, health indicators, and sparklines
- **Asset View** — per-asset deep dive with 7 quarterly history charts and period-by-period data table
- **AI Briefing** — pre-generated analyst notes with streaming animation; live generation via Claude API
- **Alerts** — automatic flags for loan maturity, credit deterioration, WALT thresholds, ICR covenant proximity
- **AI CSV Import** — upload any CSV in any language; Claude interprets column names and maps to data model
- **Add Asset** — manual entry or AI-assisted CSV import to onboard new assets

## Stack

- React 18 + Vite
- Inline styles throughout (no Tailwind / CSS modules)
- Anthropic Claude API (`claude-sonnet-4-20250514`) for CSV interpretation and live briefings
- Cloudinary for logo assets

## Getting started

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub — Vercel auto-deploys on every commit to `main`.

> **Note:** AI features (CSV import interpretation, live briefing generation) require a Claude API key. The app ships with pre-generated demo briefings and pre-loaded Q&A responses so all features are demonstrable without an API key.
