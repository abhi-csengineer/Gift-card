import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  CalendarHeart,
  Feather,
  Palette,
  Send,
  Sparkles,
} from 'lucide-react'
import {
  BLOG_ARTICLES,
  CARD_TEMPLATES,
  CATEGORIES,
  SPECIAL_COLLECTIONS,
} from '../data/catalog'
import { LOVE_CALENDAR_MONTHS } from '../data/loveCalendar'
import { SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'
import { loadFavorites, toggleFavoriteId } from '../utils/cardStorage'
import { AdPlacement } from '../components/AdPlacement'
import { CardArtwork } from '../components/CardArtwork'
import { CategoryIcon } from '../components/CategoryIcon'
import { HeroCardDeck } from '../components/HeroCardDeck'
import { QuickActions } from '../components/QuickActions'
import { QuickPreviewDialog } from '../components/QuickPreviewDialog'
import { SeoHead } from '../components/SeoHead'
import { TemplateCard } from '../components/TemplateCard'

function buildHomeSchemas() {
  const homeUrl = buildCanonicalUrl('/')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.brandName,
      url: homeUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${buildCanonicalUrl('/explore')}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.legalBrandLabel,
      url: homeUrl,
      email: SITE_CONFIG.contactEmail,
      logo: buildCanonicalUrl(SITE_CONFIG.socialImagePath),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rupaspur',
        addressRegion: 'Bihar',
        postalCode: '801503',
        addressCountry: 'IN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_CONFIG.brandName,
      description: SITE_CONFIG.description,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web',
      url: homeUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ]
}

export function HomePage() {
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites())
  const [previewId, setPreviewId] = useState<string | null>(null)

  const priorityIds = [
    'confetti-birthday-spark',
    'mixtape-love-note',
    'crimson-kisses-note',
    'ink-promise-flourish',
    'berry-vine-reminder',
    'butterfly-quilled-anniversary',
    'counting-moments-canvas',
    'rose-arch-anniversary',
  ]
  const featuredPool = CARD_TEMPLATES.filter((c) => c.featured)
  const prioritized = priorityIds
    .map((id) => featuredPool.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
  const remaining = featuredPool.filter((c) => !priorityIds.includes(c.id))
  const featuredCards = [...prioritized, ...remaining].slice(0, 8)
  const featuredArticles = BLOG_ARTICLES.slice(0, 6)
  const homeSchemas = buildHomeSchemas()

  const handleToggleFavorite = (id: string) => {
    setFavorites(toggleFavoriteId(id))
  }

  return (
    <div className="paper-grain">
      <SeoHead
        title="Cardelle — Every Feeling Deserves a Card"
        description={SITE_CONFIG.description}
        canonicalPath="/"
        jsonLd={homeSchemas}
      />

      {/* B. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Joyful watercolor aura blobs */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-45 blur-3xl"
          style={{ backgroundColor: '#FFB3CC' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-12 left-1/3 h-80 w-80 rounded-full opacity-35 blur-3xl"
          style={{ backgroundColor: '#FFE09E' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: '#CDBFFF' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-6"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--accent-rose)',
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#E88B1F]" aria-hidden="true" />
                <span>Cardelle · Every Feeling Deserves a Card</span>
              </div>

              <h1
                className="font-semibold tracking-tight leading-[1.03]"
                style={{
                  fontSize: 'clamp(2.5rem, 2rem + 3vw, 4.35rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Make Someone&apos;s{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'var(--gradient-brand)' }}
                >
                  Day Beautiful.
                </span>
              </h1>

              <p
                className="max-w-xl text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Every feeling deserves a card. Personalize vibrant digital greeting cards—from mixtape love notes and 3D butterfly crests to birthday celebrations—and send a warm keepsake anywhere in the world.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/create"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: 'var(--gradient-cta)',
                  }}
                >
                  <Feather className="h-4 w-4 text-[#FFE599]" aria-hidden="true" />
                  <span>Create Your First Card</span>
                </Link>

                <Link
                  to="/explore"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm sm:text-base font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>Explore Designs</span>
                  <ArrowRight className="h-4 w-4 text-[var(--accent-rose)]" aria-hidden="true" />
                </Link>
              </div>

              {/* Editorial Trust Strip */}
              <div className="grid grid-cols-3 gap-4 border-t pt-6 max-w-lg" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <p className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {CATEGORIES.length} Occasions
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {CARD_TEMPLATES.length}+ Original Cards
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    Instant
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    WhatsApp &amp; Link Share
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    PDF &amp; PNG
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Keepsake Downloads
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Card Stack Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <HeroCardDeck />
            </motion.div>
          </div>
        </div>
      </section>

      {/* B2. QUICK ACTIONS */}
      <QuickActions />

      {/* C. POPULAR CATEGORIES */}
      <section className="py-16 sm:py-20 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                Popular Categories
              </p>
              <h2 className="mt-1.5 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Every Relationship &amp; Milestone
              </h2>
            </div>
            <Link
              to="/occasions"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              style={{ color: 'var(--text-primary)' }}
            >
              <span>Browse all occasions</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <Link
                  to={`/occasions/${category.slug}`}
                  className="group flex h-full flex-col justify-between rounded-3xl border p-4 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    backgroundImage: `linear-gradient(155deg, ${category.accentBg}55 0%, transparent 65%)`,
                    borderColor: category.accentBg,
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: category.accentBg }}
                    >
                      <CategoryIcon name={category.iconName} />
                    </span>
                    <ArrowRight
                      className="h-4 w-4 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-85 group-hover:translate-x-0"
                      style={{ color: 'var(--accent-rose)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {category.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* D. FEATURED CARD COLLECTION */}
      <section
        className="py-16 sm:py-22 border-t"
        style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                Featured Card Collection
              </p>
              <h2 className="mt-1.5 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Designs Crafted to Be Remembered
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              style={{ color: 'var(--text-primary)' }}
            >
              <span>Explore full gallery ({CARD_TEMPLATES.length})</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCards.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isFavorite={favorites.includes(template.id)}
                onToggleFavorite={handleToggleFavorite}
                onQuickPreview={(id) => setPreviewId(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Separated optional Ad slot (renders null unless AdSense is enabled & consented) */}
      <AdPlacement location="home" />

      {/* E. HOW IT WORKS (3 Simple Steps) */}
      <section className="py-16 sm:py-22 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              How It Works
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              From Thought to Keepsake in Three Gentle Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                icon: Palette,
                title: 'Choose your favourite design.',
                description:
                  'Browse botanical arches, mixtape love notes, 3D butterfly crests, or minimalist vellum tailored to the moment.',
                bg: '#FFD6E5',
                ink: '#C8235D',
              },
              {
                step: '02',
                icon: Feather,
                title: 'Add a personal message.',
                description:
                  'Write from the heart, pick your favorite paper palette and calligraphy font, and seal it with your initials.',
                bg: '#E3DCFF',
                ink: '#6438C9',
              },
              {
                step: '03',
                icon: Send,
                title: 'Share happiness with someone special.',
                description:
                  'Generate an instant envelope-reveal link for WhatsApp, copy it anywhere, or download a 2-page PDF, PNG, or JPG keepsake.',
                bg: '#D4F5E5',
                ink: '#178A68',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col justify-between rounded-3xl border p-7 sm:p-8"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    backgroundImage: `linear-gradient(155deg, ${item.bg}45 0%, transparent 60%)`,
                    borderColor: item.bg,
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs"
                        style={{ backgroundColor: item.bg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: item.ink }} aria-hidden="true" />
                      </span>
                      <span
                        className="text-3xl font-semibold opacity-70"
                        style={{ fontFamily: 'var(--font-display)', color: item.ink }}
                      >
                        {item.step}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* F. SPECIAL COLLECTIONS */}
      <section
        className="py-16 sm:py-22 border-t"
        style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                Special Collections
              </p>
              <h2 className="mt-1.5 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Curated Aesthetics for Every Sentiment
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              style={{ color: 'var(--text-primary)' }}
            >
              <span>View all collections</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SPECIAL_COLLECTIONS.map((col, idx) => (
              <Link
                key={col.slug}
                to={`/explore?collection=${col.slug}`}
                className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div
                  className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-40 blur-2xl transition-transform duration-500 group-hover:scale-125"
                  style={{ backgroundColor: col.surfaceTint }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] uppercase"
                      style={{ backgroundColor: col.surfaceTint, color: '#2A1726' }}
                    >
                      {col.mood}
                    </span>
                    <h3 className="mt-4 text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {col.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
                      {col.subtitle}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {col.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      {col.templateIds.length} signature designs
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <span>Explore collection</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* G. EMOTIONAL BRAND SECTION */}
      <section className="py-16 sm:py-24 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[2.25rem] border p-8 sm:p-12 lg:p-16"
            style={{
              background: 'linear-gradient(135deg, #4B194F 0%, #9E2A59 52%, #502680 100%)',
              borderColor: 'rgba(255, 229, 153, 0.45)',
              color: '#FFF9FD',
            }}
          >
            {/* Decorative gold & coral radial highlights */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-35 blur-3xl"
              style={{ backgroundColor: '#FFD166' }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
              style={{ backgroundColor: '#FF6B9D' }}
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FFE599]">
                  Why Thoughtful Words Matter
                </p>
                <h2 className="text-3xl sm:text-5xl font-semibold leading-tight text-[#FFF9FD]">
                  Sometimes, a Few Words Mean Everything.
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#FFDCEB]">
                  In an age of hurried three-word texts and disappearing notifications, taking two quiet minutes to choose artwork, linger over a sentence, and seal a card with someone’s name feels deeply rare.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[#FFF9F3]/85">
                  Whether it is a mother who carried you, a friend ten time zones away, or a partner celebrating another year by your side—a card becomes a small room they can walk back into whenever they need to remember they are loved.
                </p>
                <div className="pt-2">
                  <Link
                    to="/create"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FFF9FD] px-7 py-3 text-sm font-semibold text-[#581E52] shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="h-4 w-4 text-[#D93B6B]" aria-hidden="true" />
                    <span>Write Someone&apos;s Keepsake</span>
                  </Link>
                </div>
              </div>

              {/* Letterpress Quote Card */}
              <div className="lg:col-span-5">
                <div
                  className="rounded-3xl border p-7 sm:p-8 text-center space-y-4 backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(255, 249, 243, 0.08)',
                    borderColor: 'rgba(217, 183, 126, 0.4)',
                  }}
                >
                  <div className="mx-auto h-24 w-28">
                    <CardArtwork
                      motif="botanical-arch"
                      accent="#E9A6B5"
                      foil="#D9B77E"
                      text="#FFF9F3"
                    />
                  </div>
                  <blockquote
                    className="text-xl sm:text-2xl italic leading-relaxed text-[#FFF9F3]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    “To be remembered gently, in your own handwriting of thought, is one of life’s quietest luxuries.”
                  </blockquote>
                  <p className="text-xs tracking-[0.18em] uppercase text-[#D9B77E]">
                    The Cardelle Manifesto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G2. THE LOVE CALENDAR ENTRY SECTION */}
      <section className="py-14 sm:py-18 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[2rem] border p-6 sm:p-10"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-7 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                  Year-Round Romance Anthology
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  The Love Calendar
                </h2>
                <p className="font-display text-xl italic" style={{ color: 'var(--accent-rose)' }}>
                  “365 days. Countless reasons to celebrate love.”
                </p>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Browse twelve monthly collections, relationship milestones, and romantic celebrations crafted to help you mark every meaningful season together.
                </p>
              </div>
              <Link
                to="/love-calendar"
                className="inline-flex shrink-0 min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--gradient-cta)' }}
              >
                <CalendarHeart className="h-4 w-4 text-[#FFE599]" aria-hidden="true" />
                <span>Explore The Love Calendar</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
              {LOVE_CALENDAR_MONTHS.map((month) => (
                <Link
                  key={month.slug}
                  to={`/love-calendar/${month.slug}`}
                  className="rounded-2xl border px-3.5 py-2.5 transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: `${month.accentColor}18`,
                    borderColor: `${month.accentColor}48`,
                  }}
                >
                  <span className="block text-[0.65rem] font-semibold tracking-[0.14em] uppercase" style={{ color: month.accentColor }}>
                    {String(month.monthNumber).padStart(2, '0')} · {month.shortName}
                  </span>
                  <span className="mt-0.5 block truncate font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {month.collectionTitle.replace('Month of ', '')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* H. BLOG / INSPIRATION SECTION */}
      <section
        className="py-16 sm:py-22 border-t"
        style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                The Stationery Journal
              </p>
              <h2 className="mt-1.5 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Message Inspiration &amp; Celebration Guides
              </h2>
            </div>
            <Link
              to="/inspiration"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              style={{ color: 'var(--text-primary)' }}
            >
              <span>Read all {BLOG_ARTICLES.length} guides</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, articleIdx) => {
              const articleStageColors = ['#FFD8E8', '#E7DDFF', '#FFEEC7', '#D7F5EA', '#FFE2D4', '#D8ECFF']
              const stageBg = articleStageColors[articleIdx % articleStageColors.length]
              return (
              <article
                key={article.slug}
                className="group flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div>
                  <div
                    className="mb-5 flex h-40 items-center justify-center rounded-2xl p-4"
                    style={{ background: `linear-gradient(145deg, ${stageBg} 0%, var(--bg-canvas) 100%)` }}
                  >
                    <div className="h-28 w-36 transition-transform duration-300 group-hover:scale-105">
                      <CardArtwork
                        motif={article.coverMotif}
                        accent="#D93B6B"
                        foil="#F0B43A"
                        text="#25132B"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-semibold" style={{ color: 'var(--accent-rose)' }}>
                      {article.category}
                    </span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="mt-2 text-xl sm:text-2xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                    <Link to={`/inspiration/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <Link
                    to={`/inspiration/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <BookOpen className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                    <span>Read guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </section>

      <QuickPreviewDialog templateId={previewId} onClose={() => setPreviewId(null)} />
    </div>
  )
}
