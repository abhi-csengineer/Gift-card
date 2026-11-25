import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
} from 'lucide-react'
import {
  LOVE_CALENDAR_MONTHS,
  getNextOccasionOccurrence,
  getOccasionsByMonth,
  resolveOccasionDate,
} from '../../data/loveCalendar'
import {
  buildMilestoneStudioUrl,
  calculatePersonalMilestoneStats,
  daysInMonth,
  getPersonalMilestoneDefinition,
  parseIsoDateParts,
} from '../../data/personalMilestones'
import type { LoveCalendarArtMotif, SavedPersonalMilestone } from '../../types/loveCalendar'
import { LoveCalendarArtwork } from './LoveCalendarArtwork'

interface SmartCalendarSectionProps {
  referenceDate: Date
  personalMilestones: SavedPersonalMilestone[]
}

interface CalendarDayEvent {
  id: string
  kind: 'occasion' | 'personal'
  day: number
  title: string
  dateLabel: string
  daysRemaining: number
  description: string
  ruleNote?: string
  motif: LoveCalendarArtMotif
  accentColor: string
  accentTint: string
  createUrl: string
}

const WEEKDAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function SmartCalendarSection({
  referenceDate,
  personalMilestones,
}: SmartCalendarSectionProps) {
  const currentYear = referenceDate.getFullYear()
  const currentMonth1 = referenceDate.getMonth() + 1
  const currentDay = referenceDate.getDate()

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(() => referenceDate.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(() => referenceDate.getDate())

  const activeMonth = LOVE_CALENDAR_MONTHS[selectedMonthIndex] ?? LOVE_CALENDAR_MONTHS[0]
  const totalDays = daysInMonth(currentYear, activeMonth.monthNumber)
  const firstWeekday = new Date(Date.UTC(currentYear, activeMonth.monthNumber - 1, 1)).getUTCDay()

  const todayMonthName = LOVE_CALENDAR_MONTHS[referenceDate.getMonth()]?.name ?? 'January'
  const todayFormatted = `${todayMonthName} ${currentDay}, ${currentYear}`

  const monthEvents = useMemo(() => {
    const year = referenceDate.getFullYear()
    const list: CalendarDayEvent[] = []
    const monthOccasions = getOccasionsByMonth(activeMonth.slug, year)

    for (const occ of monthOccasions) {
      const resolvedThisYear = resolveOccasionDate(occ.dateRule, year)
      const nextOccurrence = getNextOccasionOccurrence(occ.dateRule, referenceDate)
      list.push({
        id: `occ-${occ.id}`,
        kind: 'occasion',
        day: resolvedThisYear.day,
        title: occ.name,
        dateLabel: `${resolvedThisYear.formattedLabel}, ${year}`,
        daysRemaining: nextOccurrence.daysRemaining,
        description: occ.shortDescription,
        ruleNote: resolvedThisYear.ruleNote,
        motif: occ.motif,
        accentColor: occ.accentColor,
        accentTint: occ.accentTint,
        createUrl: `/create/${occ.templateIds[0]}`,
      })
    }

    for (const saved of personalMilestones) {
      const def = getPersonalMilestoneDefinition(saved.type)
      const stats = calculatePersonalMilestoneStats(saved, referenceDate)
      const nextParts = parseIsoDateParts(stats.nextEventDate)
      if (
        nextParts &&
        nextParts.year === year &&
        nextParts.month === activeMonth.monthNumber
      ) {
        list.push({
          id: `pm-${saved.id}`,
          kind: 'personal',
          day: nextParts.day,
          title: saved.partnerName ? `${stats.nextEventTitle} (${saved.partnerName})` : stats.nextEventTitle,
          dateLabel: stats.nextEventFormatted,
          daysRemaining: stats.daysRemaining,
          description: `${stats.statusHeadline} ${def.shortDescription}`,
          ruleNote: stats.leapYearNote ?? 'Personal Milestone',
          motif: def.motif,
          accentColor: def.accentColor,
          accentTint: def.accentTint,
          createUrl: buildMilestoneStudioUrl(def, saved, stats),
        })
      }
    }

    return list.sort((a, b) => a.day - b.day)
  }, [activeMonth.monthNumber, activeMonth.slug, personalMilestones, referenceDate])

  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarDayEvent[]>()
    for (const ev of monthEvents) {
      const prev = map.get(ev.day) ?? []
      prev.push(ev)
      map.set(ev.day, prev)
    }
    return map
  }, [monthEvents])

  const displayedEvents = useMemo(() => {
    if (selectedDay !== null) {
      const exactDayEvents = eventsByDay.get(selectedDay)
      if (exactDayEvents && exactDayEvents.length > 0) {
        return exactDayEvents
      }
    }
    return monthEvents
  }, [eventsByDay, monthEvents, selectedDay])

  const selectMonth = (nextIndex: number) => {
    const normalized = ((nextIndex % 12) + 12) % 12
    setSelectedMonthIndex(normalized)
    if (normalized + 1 === currentMonth1) {
      setSelectedDay(currentDay)
    } else {
      setSelectedDay(null)
    }
  }

  return (
    <section
      id="smart-calendar"
      aria-labelledby="heading-smart-calendar"
      className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8"
    >
      <div
        className="rounded-[2.25rem] border p-5 sm:p-8 lg:p-10"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Smart Calendar Header */}
        <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <p
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'var(--accent-gold)' }}
            >
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Smart Calendar · {currentYear}</span>
            </p>
            <h2
              id="heading-smart-calendar"
              className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Interactive Year-at-a-Glance
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Today is <strong style={{ color: 'var(--text-primary)' }}>{todayFormatted}</strong>. Select any month or highlighted date to inspect occasions, dynamic annual rules, and your saved personal milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => selectMonth(selectedMonthIndex - 1)}
              aria-label="Previous month"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedMonthIndex(referenceDate.getMonth())
                setSelectedDay(currentDay)
              }}
              className="inline-flex h-10 items-center rounded-full border px-4 text-xs font-semibold cursor-pointer hover:opacity-85"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              Today · {LOVE_CALENDAR_MONTHS[referenceDate.getMonth()]?.shortName} {currentDay}
            </button>
            <button
              type="button"
              onClick={() => selectMonth(selectedMonthIndex + 1)}
              aria-label="Next month"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick 12-Month Tabs */}
        <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Smart calendar month tabs">
          {LOVE_CALENDAR_MONTHS.map((m, idx) => {
            const isSelected = idx === selectedMonthIndex
            return (
              <button
                key={m.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectMonth(idx)}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: isSelected ? '#472C42' : 'var(--bg-canvas)',
                  borderColor: isSelected ? '#472C42' : 'var(--border-subtle)',
                  color: isSelected ? '#FFF9F3' : 'var(--text-secondary)',
                }}
              >
                {m.shortName}
              </button>
            )
          })}
        </div>

        {/* Main Grid: Month Calendar + Selected Day / Month Agenda */}
        <div className="mt-6 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
          {/* Left: 7-Column Calendar Grid */}
          <div
            className="lg:col-span-6 rounded-3xl border p-4 sm:p-5"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h3 className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {activeMonth.name} {currentYear}
                </h3>
                <p className="text-xs" style={{ color: activeMonth.accentColor }}>
                  {activeMonth.collectionTitle}
                </p>
              </div>
              <Link
                to={`/love-calendar/${activeMonth.slug}`}
                className="text-xs font-semibold hover:underline"
                style={{ color: 'var(--accent-rose)' }}
              >
                Open Chapter →
              </Link>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[0.68rem] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              {WEEKDAY_HEADERS.map((wd) => (
                <div key={wd} className="py-1">
                  {wd}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstWeekday }).map((_, emptyIdx) => (
                <div key={`empty-${emptyIdx}`} className="h-11 sm:h-12" aria-hidden="true" />
              ))}

              {Array.from({ length: totalDays }).map((_, idx) => {
                const dayNum = idx + 1
                const dayEvents = eventsByDay.get(dayNum) ?? []
                const hasHoliday = dayEvents.some((e) => e.kind === 'occasion')
                const hasPersonal = dayEvents.some((e) => e.kind === 'personal')
                const isTodayCell =
                  activeMonth.monthNumber === currentMonth1 && dayNum === currentDay
                const isSelectedDay = selectedDay === dayNum

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedDay((prev) => (prev === dayNum ? null : dayNum))}
                    aria-label={`${activeMonth.name} ${dayNum}, ${currentYear}${dayEvents.length > 0 ? `, ${dayEvents.length} celebration${dayEvents.length > 1 ? 's' : ''}` : ''}`}
                    aria-pressed={isSelectedDay}
                    className="relative flex h-11 sm:h-12 flex-col items-center justify-center rounded-2xl border text-xs font-semibold transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelectedDay
                        ? '#472C42'
                        : dayEvents.length > 0
                          ? 'var(--bg-surface)'
                          : 'transparent',
                      borderColor: isSelectedDay
                        ? '#472C42'
                        : isTodayCell
                          ? '#D9B77E'
                          : dayEvents.length > 0
                            ? 'var(--border-strong)'
                            : 'transparent',
                      color: isSelectedDay ? '#FFF9F3' : 'var(--text-primary)',
                    }}
                  >
                    <span>{dayNum}</span>
                    {dayEvents.length > 0 && (
                      <span className="mt-0.5 flex items-center gap-0.5" aria-hidden="true">
                        {hasHoliday && (
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: isSelectedDay ? '#E9A6B5' : activeMonth.accentColor }}
                          />
                        )}
                        {hasPersonal && (
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: '#D9B77E' }}
                          />
                        )}
                      </span>
                    )}
                    {isTodayCell && !isSelectedDay && (
                      <span
                        className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#D9B77E]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t pt-3 text-[0.72rem]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeMonth.accentColor }} />
                <span>Calendar Occasion</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D9B77E]" />
                <span>Today / Personal Milestone</span>
              </span>
            </div>
          </div>

          {/* Right: Agenda & Occasion Inspector */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--text-muted)' }}>
                  {selectedDay && (eventsByDay.get(selectedDay)?.length ?? 0) > 0
                    ? `Selected Date · ${activeMonth.name} ${selectedDay}`
                    : `${activeMonth.name} Celebrations (${monthEvents.length})`}
                </p>
                {selectedDay && (eventsByDay.get(selectedDay)?.length ?? 0) === 0 && (
                  <p className="mt-0.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    No fixed holiday on {activeMonth.name} {selectedDay}—showing all {activeMonth.name} highlights.
                  </p>
                )}
              </div>

              {selectedDay !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="text-xs font-semibold underline cursor-pointer"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  Show full month ({monthEvents.length})
                </button>
              )}
            </div>

            <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
              {displayedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className="shrink-0 rounded-2xl p-1"
                      style={{ backgroundColor: ev.accentTint }}
                    >
                      <LoveCalendarArtwork
                        motif={ev.motif}
                        accentColor={ev.accentColor}
                        className="h-12 w-12"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: ev.accentColor }}>
                        {ev.dateLabel} · {ev.daysRemaining === 0 ? 'Today' : ev.daysRemaining === 1 ? 'Tomorrow' : `${ev.daysRemaining} days remaining`}
                      </p>
                      <h4 className="mt-0.5 font-display text-xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {ev.kind === 'personal' && (
                          <Heart className="mr-1.5 inline h-4 w-4" style={{ color: ev.accentColor }} aria-hidden="true" />
                        )}
                        {ev.title}
                      </h4>
                      {ev.ruleNote && (
                        <p className="text-[0.7rem] font-medium" style={{ color: 'var(--text-muted)' }}>
                          {ev.ruleNote}
                        </p>
                      )}
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {ev.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={ev.createUrl}
                    className="inline-flex shrink-0 min-h-9 items-center justify-center gap-1.5 rounded-full bg-[#472C42] px-4 py-2 text-xs font-semibold text-[#FFF9F3]"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                    <span>Create Card</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
