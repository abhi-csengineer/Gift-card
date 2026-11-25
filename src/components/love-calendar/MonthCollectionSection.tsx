import { Link } from 'react-router-dom'
import { ArrowRight, CalendarHeart, Sparkles } from 'lucide-react'
import { getTemplateById } from '../../data/catalog'
import { getOccasionsByMonth } from '../../data/loveCalendar'
import type { LoveCalendarMonth } from '../../types/loveCalendar'
import { useTheme } from '../../utils/theme'
import { GreetingCardPreview } from '../GreetingCardPreview'
import { LoveCalendarArtwork } from './LoveCalendarArtwork'
import { OccasionCard } from './OccasionCard'

const DEFAULT_CALENDAR_YEAR = new Date().getFullYear()

interface MonthCollectionSectionProps {
  month: LoveCalendarMonth
  referenceYear?: number
  allowedOccasionIds?: Set<string>
  onQuickPreview?: (templateId: string) => void
  compactPreview?: boolean
}

export function MonthCollectionSection({
  month,
  referenceYear = DEFAULT_CALENDAR_YEAR,
  allowedOccasionIds,
  onQuickPreview,
  compactPreview = true,
}: MonthCollectionSectionProps) {
  const { resolvedTheme } = useTheme()
  const rawMonthOccasions = getOccasionsByMonth(month.slug, referenceYear)
  const monthOccasions = allowedOccasionIds
    ? rawMonthOccasions.filter((occ) => allowedOccasionIds.has(occ.id))
    : rawMonthOccasions
  const templates = month.featuredTemplateIds.map((id) => getTemplateById(id))
  const bannerBg = resolvedTheme === 'dark' ? month.softTintDark : month.softTintLight

  return (
    <section
      id={`month-${month.slug}`}
      aria-labelledby={`heading-month-${month.slug}`}
      className="scroll-mt-24 rounded-[2rem] border overflow-hidden transition-colors"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Month Introductory Banner */}
      <div
        className="border-b px-6 py-7 sm:px-8 sm:py-8"
        style={{
          backgroundColor: bannerBg,
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
            <div
              className="hidden sm:flex shrink-0 items-center justify-center rounded-2xl border p-1.5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <LoveCalendarArtwork motif={month.motif} accentColor={month.accentColor} className="h-16 w-16" />
            </div>

            <div>
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ color: month.accentColor }}
              >
                {String(month.monthNumber).padStart(2, '0')} · {month.name} · {month.seasonLabel}
              </p>
              <h3
                id={`heading-month-${month.slug}`}
                className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {month.name} — {month.collectionTitle}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {month.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to={`/create/${month.featuredTemplateIds[0]}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#FFF9F3] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#472C42' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
              <span>Create a Card</span>
            </Link>
            <Link
              to={`/love-calendar/${month.slug}`}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:opacity-85"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <span>Explore {month.name}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Month Content Area: Populated Dates + Curated Romantic Designs */}
      <div className="p-6 sm:p-8 space-y-7">
        {monthOccasions.length > 0 && (
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
              Special Dates in {month.name} ({monthOccasions.length} {monthOccasions.length === 1 ? 'occasion' : 'occasions'} · {monthOccasions.length * 2} designs)
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {monthOccasions.map((occasion) => (
                <OccasionCard
                  key={occasion.id}
                  occasion={occasion}
                  monthTitle={month.collectionTitle}
                  referenceYear={referenceYear}
                  onQuickPreview={onQuickPreview}
                />
              ))}
            </div>
          </div>
        )}

        {/* Curated Seasonal Card Pairings for Every Month */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <CalendarHeart className="h-4 w-4" style={{ color: month.accentColor }} aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--text-muted)' }}>
                {monthOccasions.length > 0
                  ? `Curated ${month.name} Stationery Highlights`
                  : `${month.name} Stationery Pairings · Ready to Personalize`}
              </p>
            </div>
            <p className="italic font-display text-sm" style={{ color: 'var(--text-secondary)' }}>
              “{month.poeticLine}”
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {templates.slice(0, compactPreview ? 3 : templates.length).map((tpl) => (
              <div
                key={tpl.id}
                className="group flex items-center gap-3.5 rounded-2xl border p-3 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onQuickPreview?.(tpl.id)}
                  className="h-20 w-16 shrink-0 overflow-hidden rounded-xl text-left cursor-pointer focus-visible:outline-2"
                  aria-label={`Preview ${tpl.title}`}
                >
                  <GreetingCardPreview
                    templateId={tpl.id}
                    compact
                    className="h-full w-full pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.68rem] font-semibold tracking-wider uppercase" style={{ color: month.accentColor }}>
                    {tpl.occasion}
                  </p>
                  <p className="mt-0.5 truncate font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {tpl.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/create/${tpl.id}`}
                      className="text-xs font-semibold underline-offset-4 hover:underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Create Card →
                    </Link>
                    {onQuickPreview && (
                      <button
                        type="button"
                        onClick={() => onQuickPreview(tpl.id)}
                        className="text-xs font-medium cursor-pointer hover:underline"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
