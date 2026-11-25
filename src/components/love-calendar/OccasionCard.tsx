import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Sparkles } from 'lucide-react'
import { getTemplateById } from '../../data/catalog'
import { resolveOccasionDate } from '../../data/loveCalendar'
import type { LoveCalendarOccasion } from '../../types/loveCalendar'
import { GreetingCardPreview } from '../GreetingCardPreview'
import { LoveCalendarArtwork } from './LoveCalendarArtwork'

const DEFAULT_CALENDAR_YEAR = new Date().getFullYear()

interface OccasionCardProps {
  occasion: LoveCalendarOccasion
  monthTitle?: string
  referenceYear?: number
  onQuickPreview?: (templateId: string) => void
}

export function OccasionCard({
  occasion,
  monthTitle,
  referenceYear = DEFAULT_CALENDAR_YEAR,
  onQuickPreview,
}: OccasionCardProps) {
  const resolvedDate = resolveOccasionDate(occasion.dateRule, referenceYear)
  const designPair = occasion.templateIds.map((id) => getTemplateById(id))

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Subtle top ribbon wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: occasion.accentColor }}
      />

      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className="text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: occasion.accentColor }}
            >
              {resolvedDate.formattedLabel}
              {resolvedDate.ruleNote ? ` · ${resolvedDate.ruleNote}` : ''}
              {monthTitle ? ` · ${monthTitle}` : ''}
            </p>
            <h3
              className="mt-1.5 font-display text-2xl font-semibold leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {occasion.name}
            </h3>
            <p
              className="mt-1 text-[0.72rem] font-medium tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              {occasion.visualTheme}
            </p>
          </div>

          <div
            className="shrink-0 rounded-2xl p-1.5"
            style={{ backgroundColor: occasion.accentTint }}
          >
            <LoveCalendarArtwork
              motif={occasion.motif}
              accentColor={occasion.accentColor}
              className="h-14 w-14 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <p className="mt-3.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {occasion.shortDescription}
        </p>

        {/* Two Unique Designs Per Occasion */}
        <div className="mt-4 space-y-2">
          <p
            className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            2 Bespoke Card Designs
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {designPair.map((tpl, index) => (
              <div
                key={tpl.id}
                className="group/design flex items-center gap-2.5 rounded-2xl border p-2 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {onQuickPreview ? (
                  <button
                    type="button"
                    onClick={() => onQuickPreview(tpl.id)}
                    className="h-16 w-12 shrink-0 overflow-hidden rounded-lg text-left cursor-pointer focus-visible:outline-2"
                    aria-label={`Preview ${tpl.title}`}
                  >
                    <GreetingCardPreview
                      templateId={tpl.id}
                      compact
                      className="h-full w-full pointer-events-none transition-transform duration-300 group-hover/design:scale-105"
                    />
                  </button>
                ) : (
                  <Link
                    to={`/create/${tpl.id}`}
                    className="h-16 w-12 shrink-0 overflow-hidden rounded-lg block"
                    aria-label={`Customize ${tpl.title}`}
                  >
                    <GreetingCardPreview
                      templateId={tpl.id}
                      compact
                      className="h-full w-full pointer-events-none transition-transform duration-300 group-hover/design:scale-105"
                    />
                  </Link>
                )}

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[0.62rem] font-semibold uppercase tracking-wider"
                    style={{ color: occasion.accentColor }}
                  >
                    Design {index + 1}
                  </p>
                  <p
                    className="truncate font-display text-sm font-semibold leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {tpl.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Link
                      to={`/create/${tpl.id}`}
                      className="text-[0.7rem] font-semibold hover:underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Edit →
                    </Link>
                    {onQuickPreview && (
                      <button
                        type="button"
                        onClick={() => onQuickPreview(tpl.id)}
                        className="inline-flex items-center gap-0.5 text-[0.68rem] font-medium cursor-pointer hover:underline"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Eye className="h-3 w-3" aria-hidden="true" />
                        <span>View</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-5 flex flex-wrap items-center gap-2.5 pt-4 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <Link
          to={`/create/${occasion.templateIds[0]}`}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#FFF9F3] transition-transform hover:-translate-y-0.5"
          style={{
            backgroundColor: '#472C42',
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
          <span>Create a Card</span>
        </Link>

        {occasion.exploreCategorySlug && (
          <Link
            to={`/explore?category=${occasion.exploreCategorySlug}`}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors hover:opacity-85"
            style={{
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}
