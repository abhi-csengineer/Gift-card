# Vellum & Bloom

**Digital Greeting Cards, The Love Calendar & Editorial Keepsakes**

Vellum & Bloom is a local-first editorial digital greeting card studio built with React, TypeScript, Vite, and Tailwind CSS. Users can browse original stationery templates, customize front covers and inside notes, celebrate romantic dates in **The Love Calendar**, track personal relationship milestones in **Our Little Forever**, export high-resolution **2-page PDF**, **PNG**, and **JPG** keepsakes, or share an interactive envelope-reveal link.

---

## Core Features

- **120+ Original Card Templates & 16 Occasion Categories**
  - Covers Girlfriend/Boyfriend, Mother, Father, Parents, Husband/Wife, Birthday, Anniversary, Friendship, Valentine’s Day, Thank You, Congratulations, Festivals, Appreciation, Good Morning, Good Night, and Just Because, plus dedicated seasonal designs across all 12 months.
- **Interactive Greeting Card Studio (`/create` & `/create/:templateId`)**
  - Customize recipient/sender names, headlines, inside messages, gift notes, color palettes, gradients, paper patterns, typography, font sizes, alignment, stickers, decorative effects, wax seal initials, and card layouts.
  - Save and manage drafts locally in the browser.
- **The Love Calendar (`/love-calendar` & `/love-calendar/:monthSlug`)**
  - Celebrates **44** romantic dates and relationship holidays organized across **12** monthly collections, each paired with occasion-specific visual themes and message suggestions.
- **Our Little Forever (Personal Milestones)**
  - Track **13** personal relationship milestones (including First Meeting Anniversary, First Date Anniversary, First Kiss Anniversary, Relationship Anniversary, Monthly Anniversary, 50/100/500/1000 Days Together, 6 Months, 1 Year, Engagement, and Wedding Anniversaries) with local countdowns and direct card-creation handoffs.
- **Interactive Envelope Reveal & Sharing (`/card/view` & `/card/:cardId`)**
  - Encodes personalized card payloads directly in the shareable URL (`?d=...`), supports one-click link copying, Web Share API, and WhatsApp sharing, and presents recipients with an animated wax-seal envelope opening experience.
- **Client-Side 2-Page PDF, PNG & JPG Downloads**
  - Exports Page 1 (Front Cover) and Page 2 (Inside Message) together into a single **2-page PDF** using `jsPDF`, alongside standalone **PNG** and **JPG** image exports rendered completely in the browser.
- **Stationery Journal & SEO Guides (`/inspiration` & `/occasions/:categorySlug`)**
  - Includes **13** original editorial guides and **16** occasion writing guides with tips and sample wishes.
- **Privacy, Legal & Accessibility Readiness**
  - Includes Privacy Policy, Terms & Conditions, Disclaimer, Cookie Policy, Copyright Policy, FAQ, About Us, Contact Us, and HTML Sitemap pages, light/dark theme toggle, keyboard navigation support, `prefers-reduced-motion` support, and a configurable consent banner.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Routing | React Router DOM (`react-router-dom` v7) |
| Build Tool | Vite 8 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion (`framer-motion`) |
| Icons | Lucide React (`lucide-react`) |
| PDF Export | `jspdf` (client-side 2-page PDF generation) |
| Linting | Oxlint (`oxlint`) |

---

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Editorial homepage, featured cards, occasion spotlight & workflow |
| `/explore` | Searchable, filterable template library across occasions & collections |
| `/occasions` | Directory of all 16 occasion categories |
| `/occasions/:categorySlug` | Occasion-specific writing tips, sample wishes & curated templates |
| `/love-calendar` | The Love Calendar hub + *Our Little Forever* personal milestone tracker |
| `/love-calendar/:monthSlug` | Monthly romantic calendar collections (January–December) |
| `/create` & `/create/:templateId` | Full greeting card customization studio & export workspace |
| `/card/view` & `/card/:cardId` | Private recipient envelope-reveal card viewer (`noindex`) |
| `/inspiration` & `/inspiration/:slug` | Stationery Journal & 13 long-form greeting card writing guides |
| `/about`, `/contact`, `/faq`, `/sitemap` | Studio details, contact page, 9 FAQs, and navigable HTML sitemap |
| `/privacy`, `/terms`, `/disclaimer`, `/cookies`, `/copyright` | Legal, storage, copyright, and optional AdSense disclosures |

---

## Local-First Architecture & Privacy

- **Zero Backend Account Database**: Card drafts, favorite templates, personal milestone dates, theme mode, reduced-motion preference, and consent choices are stored only in browser `LocalStorage`:
  - `vellum_bloom_drafts_v1`
  - `vellum_bloom_favorites_v1`
  - `vellum_bloom_personal_milestones_v1`
  - `vellum_bloom_consent_v1`
  - `vellum_bloom_reduced_motion_v1`
  - `color-scheme`
- **URL-Encoded Sharing**: Shareable greeting links encode card state inside the URL query string (`?d=...`). `/card/*` routes emit `noindex, nofollow` and are disallowed in `public/robots.txt`.
- **Client-Side Exports**: PDF, PNG, and JPG files are generated entirely on the user’s device without uploading private text or images to a server.

---

## Project Structure

```text
├── index.html                  # Base HTML document, fonts, canonical & OG/Twitter fallbacks
├── vite.config.ts              # Vite build config + runtime origin sync for sitemap/robots/index.html
├── .env.example                # Public VITE_* environment variable template
├── public/
│   ├── favicon.svg             # Brand favicon
│   ├── og-card.jpg             # Social OpenGraph/Twitter card image
│   ├── robots.txt              # Crawler directives (disallows /card/)
│   └── sitemap.xml             # Static XML sitemap (56 curated public URLs)
└── src/
    ├── App.tsx                 # Route definitions, lazy pages, skip link & motion config
    ├── main.tsx                # Application mount & theme/motion bootstrap
    ├── index.css               # Tailwind CSS v4 styles, typography & paper textures
    ├── config/
    │   └── siteConfig.ts       # Site metadata, canonical URL builder, contact & AdSense config
    ├── data/
    │   ├── catalog.ts          # Templates, palettes, fonts, stickers, patterns & FAQ data
    │   ├── categoryGuides.ts   # 16 occasion SEO writing guides
    │   ├── loveCalendar.ts     # 12 monthly collections & 44 romantic/relationship occasions
    │   ├── loveCalendarTemplates.ts
    │   ├── personalMilestones.ts # 13 personal milestone definitions & date calculations
    │   └── articles.ts         # 13 Stationery Journal articles
    ├── components/             # Studio preview, envelope reveal, artwork, SEO head, Love Calendar UI
    ├── pages/                  # Route page components
    ├── types/                  # TypeScript definitions for cards & Love Calendar
    └── utils/                  # Canvas PNG/JPG export, 2-page PDF export, storage & consent utils
```

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended) and npm (or Bun)

### Installation & Local Development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000` (configured on `0.0.0.0:3000`).

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Vite development server on port `3000` |
| `npm run build` | Runs `tsc -b` typechecking and builds production bundle into `dist/` |
| `npm run lint` | Runs Oxlint checks across the codebase |
| `npm run preview` | Previews the built `dist/` bundle locally |

---

## Environment Configuration

Copy `.env.example` to `.env` if overriding public configuration (never place secrets in `VITE_*` variables):

```env
# Canonical production origin without trailing slash (e.g., https://yourdomain.com)
VITE_SITE_URL=

# Public studio/support contact details displayed on Contact, Footer & Legal pages
VITE_CONTACT_EMAIL=abhi.ytcreator01@gmail.com
VITE_CONTACT_LOCATION="Rupaspur, Bihar 801503, India"

# Google AdSense Configuration (disabled by default until live domain approval)
VITE_ADSENSE_ENABLED=false
VITE_ADSENSE_CLIENT_ID=
VITE_ADSENSE_SLOT_HOME=
VITE_ADSENSE_SLOT_EXPLORE=
VITE_ADSENSE_SLOT_ARTICLE=
```

When `VITE_SITE_URL` is provided at build time, `vite.config.ts` automatically rewrites canonical/sitemap origins in `dist/sitemap.xml`, `dist/robots.txt`, and `dist/index.html`.

---

## Contact

- **Email**: `abhi.ytcreator01@gmail.com`
- **Location**: Rupaspur, Bihar 801503, India
