import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarHeart,
  ChevronRight,
  Compass,
  HeartHandshake,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { ComingSoonSection } from '../components/love-calendar/ComingSoonSection'
import { LoveCalendarArtwork, LoveCalendarHeroIllustration } from '../components/love-calendar/LoveCalendarArtwork'
import { MonthCollectionSection } from '../components/love-calendar/MonthCollectionSection'
import { OccasionCard } from '../components/love-calendar/OccasionCard'
import { OurLittleForeverSection } from '../components/love-calendar/OurLittleForeverSection'
import { SmartCalendarSection } from '../components/love-calendar/SmartCalendarSection'
import { QuickPreviewDialog } from '../components/QuickPreviewDialog'
import { SeoHead } from '../components/SeoHead'
import { TemplateCard } from '../components/TemplateCard'
import { buildCanonicalUrl } from '../config/siteConfig'
import { getTemplateById } from '../data/catalog'
import {
  LOVE_CALENDAR_MONTHS,
  LOVE_CALENDAR_OCCASIONS,
  RELATIONSHIP_MILESTONES,
  getAdjacentLoveMonths,
  getLoveCalendarMonth,
  getNextOccasionOccurrence,
  getOccasionCalendarCategories,
  getOccasionsByMonth,
  getUpcomingOccasions,
  searchLoveCalendar,
} from '../data/loveCalendar'
import {
  deletePersonalMilestone,
  loadPersonalMilestones,
  savePersonalMilestone,
} from '../data/personalMilestones'
import type {
  LoveCalendarDiscoveryFilter,
  PersonalMilestoneType,
  SavedPersonalMilestone,
} from '../types/loveCalendar'
import { useReducedMotionPref } from '../utils/reducedMotion'
import { useTheme } from '../utils/theme'

type DiscoveryTab = 'all' | 'featured' | 'upcoming' | 'calendar' | 'milestones'

const CURRENT_CALENDAR_DATE = new Date()
const CURRENT_CALENDAR_YEAR = CURRENT_CALENDAR_DATE.getFullYear()
const CURRENT_CALENDAR_MONTH =
  LOVE_CALENDAR_MONTHS[CURRENT_CALENDAR_DATE.getMonth()] ?? LOVE_CALENDAR_MONTHS[0]

const CATEGORY_FILTERS: { id: LoveCalendarDiscoveryFilter; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'romantic', label: 'Romantic' },
  { id: 'appreciation', label: 'Appreciation' },
  { id: 'fun', label: 'Fun' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'personal-milestone', label: 'Personal Milestone' },
]

export function LoveCalendarPage() {
  const { monthSlug } = useParams<{ monthSlug?: string }>()
  const { resolvedTheme } = useTheme()
  const { reducedMotion } = useReducedMotionPref()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<LoveCalendarDiscoveryFilter>('all')
  const [upcomingOnly, setUpcomingOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [activeTab, setActiveTab] = useState<DiscoveryTab>('all')
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)
  const [personalMilestones, setPersonalMilestones] = useState<SavedPersonalMilestone[]>(() =>
    loadPersonalMilestones(),
  )

  const activeMonth = useMemo(() => getLoveCalendarMonth(monthSlug), [monthSlug])
  const currentCalendarMonth = CURRENT_CALENDAR_MONTH

  const upcomingOccasionsList = useMemo(
    () => getUpcomingOccasions(CURRENT_CALENDAR_DATE, 44).map((item) => item.occasion),
    [],
  )

  const handleSavePersonalMilestone = (input: {
    id?: string
    type: PersonalMilestoneType
    date: string
    partnerName?: string
    senderName?: string
    note?: string
  }) => {
    setPersonalMilestones(savePersonalMilestone(input))
  }

  const handleDeletePersonalMilestone = (id: string) => {
    setPersonalMilestones(deletePersonalMilestone(id))
  }

  const filtered = useMemo(() => {
    const result = searchLoveCalendar(searchQuery, CURRENT_CALENDAR_YEAR)
    let occasions = result.occasions

    if (selectedMonthFilter !== 'all') {
      occasions = occasions.filter((o) => o.monthSlug === selectedMonthFilter)
    }

    if (categoryFilter === 'personal-milestone') {
      occasions = []
    } else if (categoryFilter !== 'all') {
      occasions = occasions.filter((o) =>
        getOccasionCalendarCategories(o).includes(categoryFilter),
      )
    }

    if (featuredOnly || activeTab === 'featured') {
      occasions = occasions.filter((o) => o.featured)
    }

    if (upcomingOnly || activeTab === 'upcoming') {
      occasions = [...occasions]
        .filter((o) => getNextOccasionOccurrence(o.dateRule, CURRENT_CALENDAR_DATE).daysRemaining <= 120)
        .sort(
          (a, b) =>
            getNextOccasionOccurrence(a.dateRule, CURRENT_CALENDAR_DATE).daysRemaining -
            getNextOccasionOccurrence(b.dateRule, CURRENT_CALENDAR_DATE).daysRemaining,
        )
    }

    const months = result.months.filter((m) => {
      if (selectedMonthFilter !== 'all' && m.slug !== selectedMonthFilter) return false
      if (categoryFilter === 'personal-milestone') return false
      if (categoryFilter !== 'all' || featuredOnly || upcomingOnly) {
        return occasions.some((o) => o.monthSlug === m.slug)
      }
      return true
    })

    return {
      months,
      occasions,
      milestones: result.milestones,
    }
  }, [activeTab, categoryFilter, featuredOnly, searchQuery, selectedMonthFilter, upcomingOnly])

  // Dedicated Invalid Month Slug View
  if (monthSlug && !activeMonth) {
    return (
      <div className="paper-grain py-20 px-4 sm:px-6 lg:px-8">
        <SeoHead
          title="Month Not Found — The Love Calendar"
          description="Explore all twelve monthly romantic collections in The Love Calendar on Vellum & Bloom."
          noIndex
        />
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            The Love Calendar
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Month Collection Not Found
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Choose any month below to browse its romantic stationery collection, or return to The Love Calendar overview.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {LOVE_CALENDAR_MONTHS.map((m) => (
              <Link
                key={m.slug}
                to={`/love-calendar/${m.slug}`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:opacity-85"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                {m.name}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              to="/love-calendar"
              className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Return to The Love Calendar</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Dedicated Dynamic Month View (/love-calendar/:monthSlug)
  if (activeMonth) {
    const { prev, next } = getAdjacentLoveMonths(activeMonth.slug)
    const monthOccasions = getOccasionsByMonth(activeMonth.slug, CURRENT_CALENDAR_YEAR)
    const monthTemplates = activeMonth.featuredTemplateIds.map((id) => getTemplateById(id))
    const bannerBg = resolvedTheme === 'dark' ? activeMonth.softTintDark : activeMonth.softTintLight

    const monthSeoTitle = activeMonth.seoTitle ?? `${activeMonth.name} Love Calendar Cards`
    const monthSeoDesc =
      activeMonth.seoDescription ??
      `${activeMonth.description} Create custom ${activeMonth.name} digital greeting cards.`

    const monthJsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${activeMonth.name} — ${activeMonth.collectionTitle} | The Love Calendar`,
        description: monthSeoDesc,
        url: buildCanonicalUrl(`/love-calendar/${activeMonth.slug}`),
      },
      ...(monthOccasions.length > 0
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `${activeMonth.name} Love Calendar Occasions`,
              numberOfItems: monthOccasions.length,
              itemListElement: monthOccasions.map((occ, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: occ.name,
                description: occ.shortDescription,
                url: buildCanonicalUrl(`/create/${occ.templateId}`),
              })),
            },
          ]
        : []),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'The Love Calendar', item: buildCanonicalUrl('/love-calendar') },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${activeMonth.name} — ${activeMonth.collectionTitle}`,
            item: buildCanonicalUrl(`/love-calendar/${activeMonth.slug}`),
          },
        ],
      },
    ]

    return (
      <div className="paper-grain pb-20">
        <SeoHead
          title={monthSeoTitle}
          description={monthSeoDesc}
          canonicalPath={`/love-calendar/${activeMonth.slug}`}
          jsonLd={monthJsonLd}
        />

        {/* Month Hero Banner */}
        <section
          className="border-b py-12 sm:py-16"
          style={{
            backgroundColor: bannerBg,
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link to="/love-calendar" className="hover:underline">
                The Love Calendar
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span style={{ color: 'var(--text-primary)' }}>{activeMonth.name}</span>
            </nav>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: activeMonth.accentColor }}
                >
                  Chapter {String(activeMonth.monthNumber).padStart(2, '0')} · {activeMonth.seasonLabel}
                </p>
                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {activeMonth.name} — {activeMonth.collectionTitle}
                </h1>
                <p className="max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {activeMonth.description}
                </p>
                <p className="font-display text-xl italic" style={{ color: activeMonth.accentColor }}>
                  “{activeMonth.poeticLine}”
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to={`/create/${activeMonth.featuredTemplateIds[0]}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                    <span>Create a {activeMonth.name} Card</span>
                  </Link>
                  <Link
                    to={`/explore?category=${activeMonth.exploreCategorySlug}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-85"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>Explore Designs</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to={`/occasions/${activeMonth.exploreCategorySlug}`}
                    className="inline-flex min-h-11 items-center gap-1.5 px-3 py-2 text-sm font-semibold underline-offset-4 hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span>Occasion Guide</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div
                  className="flex flex-col items-center justify-center rounded-3xl border p-8 text-center"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <LoveCalendarArtwork motif={activeMonth.motif} accentColor={activeMonth.accentColor} className="h-28 w-28" />
                  <p className="mt-3 text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: activeMonth.accentColor }}>
                    {activeMonth.name} Motif
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {activeMonth.collectionTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Adjacent Month Navigation */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--border-subtle)' }}>
              <Link
                to={`/love-calendar/${prev.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                style={{ color: 'var(--text-primary)' }}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>{prev.name} · {prev.collectionTitle}</span>
              </Link>
              <Link
                to={`/love-calendar/${next.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>{next.name} · {next.collectionTitle}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Special Occasions in This Month */}
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: activeMonth.accentColor }}>
                Calendar Dates
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {activeMonth.name} Romantic Occasions
              </h2>
            </div>
            <Link
              to="/love-calendar"
              className="text-sm font-semibold hover:underline"
              style={{ color: 'var(--accent-rose)' }}
            >
              View All 12 Months →
            </Link>
          </div>

          {monthOccasions.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {monthOccasions.map((occ) => (
                <OccasionCard
                  key={occ.id}
                  occasion={occ}
                  monthTitle={activeMonth.collectionTitle}
                  referenceYear={CURRENT_CALENDAR_YEAR}
                  onQuickPreview={setPreviewTemplateId}
                />
              ))}
            </div>
          ) : (
            <div
              className="rounded-3xl border p-8 sm:p-10"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: activeMonth.accentColor }}>
                    Seasonal Collection Ready
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Handpicked {activeMonth.name} Stationery Awaits Your Words
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Dedicated annual calendar dates for {activeMonth.name} are queued for the upcoming Love Calendar release.
                    Meanwhile, explore our curated {activeMonth.collectionTitle.toLowerCase()} card templates below and personalize any design instantly.
                  </p>
                </div>
                <Link
                  to={`/create/${activeMonth.featuredTemplateIds[0]}`}
                  className="inline-flex shrink-0 min-h-11 items-center gap-2 rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3]"
                >
                  <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                  <span>Open Studio</span>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Curated Card Templates for This Month */}
        <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <div className="mb-7">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-gold)' }}>
              Atelier Pairings
            </p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Recommended Designs for {activeMonth.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {monthTemplates.map((tpl) => (
              <TemplateCard key={tpl.id} template={tpl} onQuickPreview={setPreviewTemplateId} />
            ))}
          </div>
        </section>

        {/* 12-Month Switcher Strip */}
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
              Jump to Another Month
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {LOVE_CALENDAR_MONTHS.map((m) => {
                const isCurrent = m.slug === activeMonth.slug
                return (
                  <Link
                    key={m.slug}
                    to={`/love-calendar/${m.slug}`}
                    className="rounded-2xl border px-3.5 py-2.5 transition-all hover:-translate-y-0.5"
                    style={{
                      backgroundColor: isCurrent ? '#472C42' : 'var(--bg-canvas)',
                      borderColor: isCurrent ? '#472C42' : 'var(--border-subtle)',
                      color: isCurrent ? '#FFF9F3' : 'var(--text-primary)',
                    }}
                  >
                    <span className="block text-[0.65rem] font-semibold tracking-[0.14em] uppercase opacity-75">
                      {String(m.monthNumber).padStart(2, '0')}
                    </span>
                    <span className="block font-display text-base font-semibold">{m.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <QuickPreviewDialog templateId={previewTemplateId} onClose={() => setPreviewTemplateId(null)} />
      </div>
    )
  }

  // Main Love Calendar Hub (/love-calendar)
  const hubJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Love Calendar — 365 Days of Romance',
      description:
        'Explore 12 monthly romantic collections, Rose Day to Valentine’s Day cards, First Date Anniversary, and 100 Days Together milestone keepsakes.',
      url: buildCanonicalUrl('/love-calendar'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'The Love Calendar Monthly Collections',
      numberOfItems: LOVE_CALENDAR_MONTHS.length,
      itemListElement: LOVE_CALENDAR_MONTHS.map((m, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: `${m.name} — ${m.collectionTitle}`,
        url: buildCanonicalUrl(`/love-calendar/${m.slug}`),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'The Love Calendar', item: buildCanonicalUrl('/love-calendar') },
      ],
    },
  ]

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedMonthFilter !== 'all' ||
    categoryFilter !== 'all' ||
    upcomingOnly ||
    featuredOnly

  const resetAllFilters = () => {
    setSearchQuery('')
    setSelectedMonthFilter('all')
    setCategoryFilter('all')
    setUpcomingOnly(false)
    setFeaturedOnly(false)
    setActiveTab('all')
  }

  return (
    <div className="paper-grain pb-24">
      <SeoHead
        title="The Love Calendar — 365 Days of Romance"
        description="Explore 12 monthly romantic collections, Rose Day to Valentine’s Day cards, First Date Anniversary, and 100 Days Together milestone keepsakes."
        canonicalPath="/love-calendar"
        jsonLd={hubJsonLd}
      />

      {/* Romantic Hero Section */}
      <section
        className="relative overflow-hidden border-b py-14 sm:py-20"
        style={{
          borderColor: 'var(--border-subtle)',
          background:
            resolvedTheme === 'dark'
              ? 'radial-gradient(circle at 12% 18%, rgba(181, 84, 109, 0.22), transparent 52%), radial-gradient(circle at 86% 78%, rgba(217, 183, 126, 0.14), transparent 50%), var(--bg-canvas)'
              : 'radial-gradient(circle at 12% 18%, rgba(248, 221, 228, 0.72), transparent 52%), radial-gradient(circle at 88% 78%, rgba(232, 226, 247, 0.65), transparent 50%), var(--bg-canvas)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.55 }}
              className="lg:col-span-7 space-y-6"
            >
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase"
                style={{ color: 'var(--accent-rose)' }}
              >
                Vellum &amp; Bloom · Seasonal Anthology
              </p>

              <h1
                className="font-display text-4xl sm:text-6xl lg:text-[3.9rem] font-semibold tracking-tight leading-[1.04]"
                style={{ color: 'var(--text-primary)' }}
              >
                The Love Calendar
              </h1>

              <p
                className="font-display text-2xl sm:text-3xl italic leading-snug"
                style={{ color: 'var(--accent-rose)' }}
              >
                “365 days. Countless reasons to celebrate love.”
              </p>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                A year-round atelier celebrating 44 romantic calendar dates, twelve curated monthly collections, smart countdowns, and your personal milestones in <em>Our Little Forever</em>.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#our-little-forever"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <CalendarHeart className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                  <span>Our Little Forever</span>
                </a>
                <a
                  href="#smart-calendar"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors hover:opacity-85"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Calendar className="h-4 w-4 text-[var(--accent-rose)]" aria-hidden="true" />
                  <span>Smart Calendar</span>
                </a>
                <a
                  href="#monthly-collections"
                  className="inline-flex min-h-11 items-center gap-1.5 px-2.5 py-2 text-sm font-semibold underline-offset-4 hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <HeartHandshake className="h-4 w-4 text-[var(--accent-gold)]" aria-hidden="true" />
                  <span>12 Months</span>
                </a>
                <Link
                  to={`/love-calendar/${currentCalendarMonth.slug}`}
                  className="inline-flex min-h-11 items-center gap-1.5 px-2.5 py-2 text-sm font-semibold underline-offset-4 hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>This Month: {currentCalendarMonth.name}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-5">
              <LoveCalendarHeroIllustration reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </section>

      {/* Search, View Filter & 12-Month Calendar Discovery Strip */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8" aria-label="Love Calendar search and month navigation">
        <div
          className="rounded-[2rem] border p-5 sm:p-8"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          {/* Top Row: Search + Segmented Discovery Tabs */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search romantic occasions, months, or milestones..."
                aria-label="Search romantic occasions, months, or milestones"
                className="w-full rounded-full border py-3 pr-10 pl-11 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 cursor-pointer hover:opacity-75"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Calendar discovery sections">
              {[
                { id: 'all' as const, label: 'All View' },
                { id: 'upcoming' as const, label: 'Coming Soon' },
                { id: 'calendar' as const, label: 'Smart Calendar' },
                { id: 'milestones' as const, label: 'Our Little Forever' },
                { id: 'featured' as const, label: 'Featured Dates' },
              ].map((tab) => {
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab.id)}
                    className="rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? '#472C42' : 'var(--bg-canvas)',
                      borderColor: isSelected ? '#472C42' : 'var(--border-subtle)',
                      color: isSelected ? '#FFF9F3' : 'var(--text-secondary)',
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Second Row: Category Filter + Upcoming & Featured Toggles */}
          <div className="mt-4 flex flex-col gap-3 border-t pt-4 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by occasion category">
              {CATEGORY_FILTERS.map((cat) => {
                const active = categoryFilter === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    aria-pressed={active}
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                    style={{
                      backgroundColor: active ? '#472C42' : 'var(--bg-canvas)',
                      borderColor: active ? '#472C42' : 'var(--border-subtle)',
                      color: active ? '#FFF9F3' : 'var(--text-secondary)',
                    }}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setUpcomingOnly((prev) => !prev)}
                aria-pressed={upcomingOnly}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: upcomingOnly ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                  borderColor: upcomingOnly ? 'var(--accent-rose)' : 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                Upcoming Only
              </button>
              <button
                type="button"
                onClick={() => setFeaturedOnly((prev) => !prev)}
                aria-pressed={featuredOnly}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: featuredOnly ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                  borderColor: featuredOnly ? 'var(--accent-rose)' : 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                Featured Dates
              </button>
            </div>
          </div>

          {/* 12-Month Calendar Grid Selector */}
          <div className="mt-5 pt-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--text-muted)' }}>
                Calendar Month Index
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold underline cursor-pointer"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  Reset all filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {LOVE_CALENDAR_MONTHS.map((month) => {
                const isFiltered = selectedMonthFilter === month.slug
                const isTodayMonth = currentCalendarMonth.slug === month.slug
                const monthCount = LOVE_CALENDAR_OCCASIONS.filter((o) => o.monthSlug === month.slug).length

                return (
                  <div
                    key={month.slug}
                    className="group relative flex flex-col justify-between rounded-2xl border p-3 transition-all"
                    style={{
                      backgroundColor: isFiltered
                        ? '#472C42'
                        : resolvedTheme === 'dark'
                          ? month.softTintDark
                          : month.softTintLight,
                      borderColor: isFiltered ? '#472C42' : 'var(--border-subtle)',
                      color: isFiltered ? '#FFF9F3' : 'var(--text-primary)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMonthFilter((prev) => (prev === month.slug ? 'all' : month.slug))
                      }
                      className="text-left cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase"
                          style={{ color: isFiltered ? '#D9B77E' : month.accentColor }}
                        >
                          {String(month.monthNumber).padStart(2, '0')} · {month.shortName}
                        </span>
                        {isTodayMonth && (
                          <span
                            className="text-[0.62rem] font-semibold uppercase tracking-wider"
                            style={{ color: isFiltered ? '#E9A6B5' : month.accentColor }}
                          >
                            Now
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-display text-lg font-semibold leading-snug">
                        {month.name}
                      </p>
                      <p
                        className="mt-0.5 line-clamp-1 text-[0.72rem]"
                        style={{ color: isFiltered ? '#E2CED8' : 'var(--text-secondary)' }}
                      >
                        {month.collectionTitle.replace('Month of ', '')}
                      </p>
                    </button>

                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t text-[0.68rem]" style={{ borderColor: isFiltered ? 'rgba(255,249,243,0.16)' : 'rgba(71,44,66,0.1)' }}>
                      <span style={{ color: isFiltered ? '#E2CED8' : 'var(--text-muted)' }}>
                        {monthCount > 0 ? `${monthCount} ${monthCount === 1 ? 'date' : 'dates'}` : 'Collection'}
                      </span>
                      <Link
                        to={`/love-calendar/${month.slug}`}
                        className="font-semibold hover:underline"
                        style={{ color: isFiltered ? '#D9B77E' : month.accentColor }}
                      >
                        Open →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Countdowns Section */}
      {(activeTab === 'all' || activeTab === 'upcoming') && categoryFilter !== 'personal-milestone' && (
        <ComingSoonSection
          referenceDate={CURRENT_CALENDAR_DATE}
          personalMilestones={personalMilestones}
          searchQuery={searchQuery}
        />
      )}

      {/* Smart Calendar Section */}
      {(activeTab === 'all' || activeTab === 'calendar') && categoryFilter !== 'personal-milestone' && (
        <SmartCalendarSection
          referenceDate={CURRENT_CALENDAR_DATE}
          personalMilestones={personalMilestones}
        />
      )}

      {/* OUR LITTLE FOREVER — Personal Relationship Milestones */}
      {(activeTab === 'all' || activeTab === 'milestones' || categoryFilter === 'personal-milestone') && (
        <OurLittleForeverSection
          referenceDate={CURRENT_CALENDAR_DATE}
          savedMilestones={personalMilestones}
          onSaveMilestone={handleSavePersonalMilestone}
          onDeleteMilestone={handleDeletePersonalMilestone}
          searchQuery={searchQuery}
        />
      )}

      {/* Filtered & Curated Spotlight Occasions */}
      {(activeTab === 'all' || activeTab === 'featured' || activeTab === 'upcoming') &&
        categoryFilter !== 'personal-milestone' &&
        (() => {
          const rawList = hasActiveFilters
            ? filtered.occasions
            : activeTab === 'upcoming'
              ? upcomingOccasionsList
              : filtered.occasions.filter((o) => o.featured)
          const displayedSpotlightOccasions =
            activeTab === 'all' && !hasActiveFilters ? rawList.slice(0, 6) : rawList

          return (
            <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="heading-featured-upcoming">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                    {hasActiveFilters
                      ? `Filtered Results (${filtered.occasions.length})`
                      : activeTab === 'upcoming'
                        ? 'Next on the Horizon'
                        : 'Curated Spotlight'}
                  </p>
                  <h2
                    id="heading-featured-upcoming"
                    className="mt-1 font-display text-3xl sm:text-4xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {hasActiveFilters
                      ? 'Matching Love Calendar Occasions'
                      : activeTab === 'upcoming'
                        ? 'Upcoming Romantic Occasions'
                        : 'Featured Dates & Current Season'}
                  </h2>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Today’s chapter:{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {currentCalendarMonth.name} — {currentCalendarMonth.collectionTitle}
                  </strong>
                </p>
              </div>

              {/* Live Current Month Romantic Spotlight Banner */}
              <div
                className="mb-6 flex flex-col justify-between gap-6 rounded-3xl border p-6 sm:p-8 lg:flex-row lg:items-center"
                style={{
                  backgroundColor:
                    resolvedTheme === 'dark' ? currentCalendarMonth.softTintDark : currentCalendarMonth.softTintLight,
                  borderColor: 'var(--border-subtle)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div className="flex items-start gap-4 sm:gap-5 max-w-3xl">
                  <div
                    className="hidden sm:flex shrink-0 rounded-2xl p-2"
                    style={{ backgroundColor: 'var(--bg-surface)' }}
                  >
                    <LoveCalendarArtwork
                      motif={currentCalendarMonth.motif}
                      accentColor={currentCalendarMonth.accentColor}
                      className="h-16 w-16"
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.18em] uppercase"
                      style={{ color: currentCalendarMonth.accentColor }}
                    >
                      In Season Now · {currentCalendarMonth.name}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {currentCalendarMonth.collectionTitle}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {currentCalendarMonth.description}
                    </p>
                    <p className="mt-2 font-display text-base sm:text-lg italic" style={{ color: currentCalendarMonth.accentColor }}>
                      “{currentCalendarMonth.poeticLine}”
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    to={`/love-calendar/${currentCalendarMonth.slug}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#472C42] px-5 py-2 text-sm font-semibold text-[#FFF9F3]"
                  >
                    <Calendar className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                    <span>Open {currentCalendarMonth.name} Chapter</span>
                  </Link>
                  <Link
                    to={`/create/${currentCalendarMonth.featuredTemplateIds[0]}`}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>Create a Card</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Balanced Spotlight Occasion Grid */}
              {hasActiveFilters && displayedSpotlightOccasions.length === 0 ? (
                <div
                  className="rounded-3xl border p-8 text-center"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <p className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    No matching calendar dates found
                  </p>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Try adjusting one of your filters or browse personal milestones above.
                  </p>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="mt-4 rounded-full bg-[#472C42] px-5 py-2 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {displayedSpotlightOccasions.map((occasion) => {
                    const monthInfo = getLoveCalendarMonth(occasion.monthSlug)
                    return (
                      <OccasionCard
                        key={occasion.id}
                        occasion={occasion}
                        monthTitle={monthInfo?.collectionTitle}
                        referenceYear={CURRENT_CALENDAR_YEAR}
                        onQuickPreview={setPreviewTemplateId}
                      />
                    )
                  })}
                </div>
              )}
            </section>
          )
        })()}

      {/* 12 Monthly Collections */}
      {(activeTab === 'all' || selectedMonthFilter !== 'all') && categoryFilter !== 'personal-milestone' && (
        <section
          id="monthly-collections"
          className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8"
          aria-labelledby="heading-monthly-collections"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                Twelve Monthly Chapters
              </p>
              <h2
                id="heading-monthly-collections"
                className="mt-1 font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                A Full Year of Love Stories
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Each month carries its own mood, color story, and handpicked stationery pairings ready for your personal message.
            </p>
          </div>

          {filtered.months.length === 0 ? (
            <div
              className="rounded-3xl border p-10 text-center"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <p className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                No monthly collections matched your active filters
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-4 rounded-full bg-[#472C42] px-5 py-2.5 text-sm font-semibold text-[#FFF9F3] cursor-pointer"
              >
                Show All 12 Months
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filtered.months.map((month) => (
                <MonthCollectionSection
                  key={month.slug}
                  month={month}
                  referenceYear={CURRENT_CALENDAR_YEAR}
                  allowedOccasionIds={
                    hasActiveFilters
                      ? new Set(filtered.occasions.map((o) => o.id))
                      : undefined
                  }
                  onQuickPreview={setPreviewTemplateId}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Dedicated Relationship Milestones Section */}
      {(activeTab === 'all' || activeTab === 'milestones' || categoryFilter === 'personal-milestone') && (
        <section
          id="relationship-milestones"
          className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8"
          aria-labelledby="heading-milestones"
        >
          <div
            className="rounded-[2.25rem] border p-6 sm:p-10 lg:p-12"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between pb-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                  Timeless Chapters
                </p>
                <h2
                  id="heading-milestones"
                  className="mt-2 font-display text-3xl sm:text-5xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Relationship Milestones
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Beyond calendar dates, some moments belong strictly to the two of you. Mark every turning point with a
                  keepsake card tailored to your story.
                </p>
              </div>
              <Link
                to="/explore?collection=romantic"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-85"
                style={{
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <Compass className="h-4 w-4 text-[var(--accent-gold)]" aria-hidden="true" />
                <span>Browse Romantic Studio</span>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(hasActiveFilters ? filtered.milestones : RELATIONSHIP_MILESTONES).map((milestone) => (
                <article
                  key={milestone.id}
                  className="group flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="text-xs font-semibold tracking-[0.16em] uppercase"
                          style={{ color: milestone.accentColor }}
                        >
                          {milestone.chapterLabel}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                          {milestone.name}
                        </h3>
                      </div>

                      <div
                        className="shrink-0 rounded-2xl p-1.5"
                        style={{ backgroundColor: milestone.accentTint }}
                      >
                        <LoveCalendarArtwork
                          motif={milestone.motif}
                          accentColor={milestone.accentColor}
                          className="h-14 w-14 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {milestone.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <Link
                      to={`/create/${milestone.templateId}`}
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#472C42] px-4 py-2 text-sm font-semibold text-[#FFF9F3] transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                      <span>Create a Card</span>
                    </Link>
                    {milestone.exploreCategorySlug && (
                      <Link
                        to={`/explore?category=${milestone.exploreCategorySlug}`}
                        className="inline-flex min-h-10 items-center justify-center gap-1 rounded-full border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors hover:opacity-85"
                        style={{
                          borderColor: 'var(--border-strong)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <span>Explore Designs</span>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <QuickPreviewDialog templateId={previewTemplateId} onClose={() => setPreviewTemplateId(null)} />
    </div>
  )
}
