import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, Heart, Sparkles } from 'lucide-react'
import { getUpcomingOccasions } from '../../data/loveCalendar'
import {
  buildMilestoneStudioUrl,
  calculatePersonalMilestoneStats,
  getPersonalMilestoneDefinition,
} from '../../data/personalMilestones'
import type { SavedPersonalMilestone, UpcomingOccurrenceItem } from '../../types/loveCalendar'
import { LoveCalendarArtwork } from './LoveCalendarArtwork'

interface ComingSoonSectionProps {
  referenceDate: Date
  personalMilestones: SavedPersonalMilestone[]
  searchQuery?: string
}

type ComingSoonEntry =
  | {
      kind: 'occasion'
      id: string
      title: string
      dateLabel: string
      subNote?: string
      daysRemaining: number
      description: string
      motif: UpcomingOccurrenceItem['occasion']['motif']
      accentColor: string
      accentTint: string
      createUrl: string
    }
  | {
      kind: 'personal'
      id: string
      title: string
      dateLabel: string
      subNote?: string
      daysRemaining: number
      description: string
      motif: UpcomingOccurrenceItem['occasion']['motif']
      accentColor: string
      accentTint: string
      createUrl: string
    }

function formatCountdown(days: number): string {
  if (days <= 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `In ${days} days`
}

export function ComingSoonSection({
  referenceDate,
  personalMilestones,
  searchQuery = '',
}: ComingSoonSectionProps) {
  const [sourceFilter, setSourceFilter] = useState<'all' | 'occasions' | 'personal'>('all')

  const entries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const upcomingHolidays: ComingSoonEntry[] = getUpcomingOccasions(referenceDate, 12).map(
      (item) => ({
        kind: 'occasion',
        id: `occ-${item.occasion.id}`,
        title: item.occasion.name,
        dateLabel: item.formattedDate,
        subNote: item.ruleNote,
        daysRemaining: item.daysRemaining,
        description: item.occasion.shortDescription,
        motif: item.occasion.motif,
        accentColor: item.occasion.accentColor,
        accentTint: item.occasion.accentTint,
        createUrl: `/create/${item.occasion.templateIds[0]}`,
      }),
    )

    const upcomingPersonal: ComingSoonEntry[] = personalMilestones.map((saved) => {
      const def = getPersonalMilestoneDefinition(saved.type)
      const stats = calculatePersonalMilestoneStats(saved, referenceDate)
      const partnerPrefix = saved.partnerName ? `With ${saved.partnerName} · ` : ''
      return {
        kind: 'personal',
        id: `pm-${saved.id}`,
        title: stats.nextEventTitle || def.name,
        dateLabel: stats.nextEventFormatted,
        subNote: `${partnerPrefix}${stats.statusHeadline}`,
        daysRemaining: stats.daysRemaining,
        description: def.shortDescription,
        motif: def.motif,
        accentColor: def.accentColor,
        accentTint: def.accentTint,
        createUrl: buildMilestoneStudioUrl(def, saved, stats),
      }
    })

    const combined =
      sourceFilter === 'occasions'
        ? upcomingHolidays
        : sourceFilter === 'personal'
          ? upcomingPersonal
          : [...upcomingPersonal, ...upcomingHolidays]

    return combined
      .filter((entry) => {
        if (!q) return true
        return (
          entry.title.toLowerCase().includes(q) ||
          entry.dateLabel.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          (entry.subNote?.toLowerCase().includes(q) ?? false)
        )
      })
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 6)
  }, [personalMilestones, referenceDate, searchQuery, sourceFilter])

  return (
    <section
      id="coming-soon"
      aria-labelledby="heading-coming-soon"
      className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-7">
        <div>
          <p
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--accent-rose)' }}
          >
            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Coming Soon</span>
          </p>
          <h2
            id="heading-coming-soon"
            className="mt-1 font-display text-3xl sm:text-4xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Upcoming Celebrations &amp; Countdowns
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Next occurrences calculated automatically from today—including rolled-over next-year dates and your saved milestones.
          </p>
        </div>

        {personalMilestones.length > 0 && (
          <div
            className="inline-flex rounded-full border p-1 self-start md:self-auto"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {[
              { id: 'all' as const, label: 'All Upcoming' },
              { id: 'occasions' as const, label: 'Holidays' },
              { id: 'personal' as const, label: 'Personal' },
            ].map((tab) => {
              const active = sourceFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSourceFilter(tab.id)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: active ? '#472C42' : 'transparent',
                    color: active ? '#FFF9F3' : 'var(--text-secondary)',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {entries.length === 0 ? (
        <div
          className="rounded-3xl border p-8 text-center"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <p className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            No upcoming dates match your current filter
          </p>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add a personal milestone below or clear your search query to see upcoming occasions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: entry.accentColor }}
              />

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className="text-xs font-semibold tracking-[0.14em] uppercase"
                      style={{ color: entry.accentColor }}
                    >
                      {formatCountdown(entry.daysRemaining)} · {entry.dateLabel}
                    </p>
                    <h3
                      className="mt-1.5 font-display text-2xl font-semibold leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-[0.72rem] font-medium" style={{ color: 'var(--text-muted)' }}>
                      {entry.kind === 'personal' ? (
                        <span className="inline-flex items-center gap-1">
                          <Heart className="h-3 w-3 inline" style={{ color: entry.accentColor }} aria-hidden="true" />
                          <span>{entry.subNote ?? 'Personal Milestone'}</span>
                        </span>
                      ) : (
                        entry.subNote ?? 'Annual Love Calendar Date'
                      )}
                    </p>
                  </div>

                  <div
                    className="shrink-0 rounded-2xl p-1.5"
                    style={{ backgroundColor: entry.accentTint }}
                  >
                    <LoveCalendarArtwork
                      motif={entry.motif}
                      accentColor={entry.accentColor}
                      className="h-14 w-14 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {entry.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <Link
                  to={entry.createUrl}
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#472C42] px-4 py-2 text-sm font-semibold text-[#FFF9F3] transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                  <span>Create Card</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
