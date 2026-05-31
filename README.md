# Paper Foundation India

A full-stack Next.js 15 platform for evidence-based public understanding of paper, recycling, and circularity in India.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · Framer Motion · MongoDB (Mongoose) · NextAuth · Cloudinary
- **Pages:** Home, Knowledge Hub (index + article reader), Myths vs Facts, Resources, About, Get Involved, Contact
- **Admin:** Dashboard, Article editor (Tiptap, autosave), Myth editor, Resource editor, Inquiries inbox, Subscribers
- **Bulk publish:** Drafts can be published one by one — or selected and published/unpublished/deleted in bulk

## Quick start

1. `cp .env.example .env` and fill in:
   - `MONGODB_URI` (MongoDB Atlas connection string with database name)
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `http://localhost:3000` locally, your domain in prod
   - `ADMIN_EMAIL` — the single admin's email
   - `ADMIN_PASSWORD_HASH` — generate with `npm run hash-password -- yourPassword`
   - Cloudinary credentials (free tier is enough)

2. Install and seed:
   ```bash
   npm install --legacy-peer-deps
   npm run seed
   ```
   The seed script is **idempotent** — re-running it does not duplicate records.

3. Run:
   ```bash
   npm run dev
   ```
   Public site at `http://localhost:3000`. Admin at `http://localhost:3000/admin`.

## Admin workflow

- Sign in at `/admin/login`.
- New articles default to **draft** status. Many seeded articles ship as drafts so you can publish progressively.
- In **Articles**, tick the checkboxes next to drafts and use the bulk-action bar to publish, unpublish, feature or delete in one operation.
- The article editor has Tiptap rich text, Cloudinary cover-image upload, repeatable references, collapsible SEO, and autosaves every 12 seconds.

## Project structure

```
app/
  (site)/        public site (shared layout w/ Nav, Footer, CampaignBanner)
  admin/         admin app (auth-gated, separate layout)
  api/           CRUD + bulk + auth + uploads
components/
  site/          Hero, AssumptionsQuiz, MythCard, ArticleCard, ContactForm…
  admin/         Sidebar, DataTable (selection + bulk bar), ArticleEditor (Tiptap), Toaster…
  visuals/       AbstractHero, CircularityDiagram (in-house SVG + Framer)
  ui/            Button, Badge, Reveal, CountUp
lib/             db, models, validators (zod), auth, cloudinary, utils
content/seed/    researched JSON content (articles, myths, resources, quiz)
scripts/         seed.ts, hash-password.ts
```

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo into Vercel.
3. Set the same env vars in the Vercel project settings.
4. Deploy. First deploy: run `npm run seed` locally against your Atlas database.

## Editorial principles

This project is built around a few non-negotiables — they should survive in code too:

- Every published article should carry primary-source references.
- Cite, don't summarise vaguely.
- Corrections are dated and visible — never silent edits.
# Paper-Foundation
# Paper-Foundation
# Ppaer-Foundation
