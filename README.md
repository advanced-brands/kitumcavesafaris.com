# Kitum Cave Safaris

Premium tour & travel website for Kitum Cave Safaris Limited — Uganda-based journeys across East Africa and beyond.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **Prisma** + SQLite (swap to PostgreSQL for production)
- **Flutterwave** payment architecture (server-side secrets)
- **Leaflet** maps
- PDF receipts via **jsPDF** + email via **Nodemailer**

## Deploy to cPanel / public_html (static hosting)

This project builds a **static site** into the `out/` folder.

```bash
npm install
npm run build
```

Then upload **the contents of `out/`** (not the project root) into `public_html`:

```
public_html/
├── index.html          ← required at the root
├── .htaccess
├── images/
├── about/
├── packages/
├── _next/
└── ...
```

**Git deployment:** set the deploy/root directory to `out` (after build), not the repo root.

Do **not** upload as `public_html/kitumcavesafaris.com/index.html` — that causes the 403 / missing homepage issue.

> Note: Online payment APIs need Node.js hosting later. On static hosting, booking/contact forms open WhatsApp. Server API code is preserved under `server/api` for a future Node deploy.

## Environment

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma DB (default SQLite file) |
| `FLUTTERWAVE_SECRET_KEY` | Live/test secret (server only) |
| `FLUTTERWAVE_PUBLIC_KEY` | Public key |
| `FLUTTERWAVE_ENCRYPTION_KEY` | Encryption key |
| `FLUTTERWAVE_WEBHOOK_SECRET` | Webhook verification |
| `SMTP_*` | Receipt / inquiry email |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

Without real Flutterwave keys, bookings run in **demo mode** and still create records + confirmation pages.

## Content editing

| Content | File |
|---------|------|
| Packages | `src/data/packages.ts` |
| Gallery | `src/data/gallery.ts` |
| Blog | `src/data/blog.ts` |
| Team / founder | `src/data/team.ts` |
| Images | `public/images/` (synced from `images/`) |

Placeholders like `[PACKAGE NAME]` mark fields still waiting for final company content. Do not invent awards, reviews, or statistics.

## Key routes

- `/` — Homepage
- `/packages/east-africa` — East African packages (+ `?country=` filter)
- `/packages/international` — Outside East Africa
- `/packages/[slug]` — Package detail + map
- `/book/[slug]` — Booking + partial/full payment
- `/booking/confirmation` — Receipt download
- `/gallery` — Editorial gallery + lightbox
- `/blog` — Journal
- `/plan-your-journey` — Inquiry form
- `/contact` — Contact + office map
- `/about` — Founder & team
- `/reviews` — Submit / view reviews
- `/faq` — FAQs

## Contact (live)

- Email: info@kitumcavesafaris.com
- Phone / WhatsApp: 0705940988
- Address: MI Mall Kiwatule, Kampala, Uganda
