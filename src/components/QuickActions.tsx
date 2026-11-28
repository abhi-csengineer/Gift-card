import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarHeart } from 'lucide-react'
import { CATEGORIES } from '../data/catalog'
import { LOVE_CALENDAR_MONTHS, getUpcomingOccasions } from '../data/loveCalendar'
import { CategoryIcon } from './CategoryIcon'

function formatCountdownLabel(daysRemaining: number): string {
  if (daysRemaining === 0) return 'Today'
  if (daysRemaining === 1) return 'Tomorrow'
  return `In ${daysRemaining} days`
}

export function QuickActions() {
  const [currentDate] = useState(() => new Date())
  const currentLoveMonth =
    LOVE_CALENDAR_MONTHS.find((month) => month.monthNumber === currentDate.getMonth() + 1) ??
    LOVE_CALENDAR_MONTHS[0]
  const upcomingEvents = getUpcomingOccasions(currentDate, 3)
  const popularCategories = [...CATEGORIES]
    .sort((a, b) => b.featuredCount - a.featuredCount)
    .slice(0, 6)
  const nextEvent = upcomingEvents[0]

  return (
    <section
      aria-labelledby="heading-quick-actions"
      className="py-12 sm:py-16 border-t"
      style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'var(--accent-rose)' }}
            >
              Quick Actions
            </p>
            <h2
              id="heading-quick-actions"
              className="mt-1.5 text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Start With a Popular Category or Upcoming Moment
            </h2>
          </div>
          <Link
            to="/create"
            className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>Open blank studio</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Card Categories */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div>
                <h3
                  className="font-display text-2xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Popular Card Categories
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                  Jump straight into our most-sent greeting collections
                </p>
              </div>
              <Link
                to="/occasions"
                className="shrink-0 text-xs sm:text-sm font-semibold hover:underline"
                style={{ color: 'var(--accent-rose)' }}
              >
                All {CATEGORIES.length} categories →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {popularCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/occasions/${category.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundColor: category.accentBg }}
                    >
                      <CategoryIcon name={category.iconName} />
                    </span>
                    <div className="min-w-0">
                      <span
                        className="block truncate text-sm sm:text-base font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {category.name}
                      </span>
                      <span
                        className="block truncate text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {category.featuredCount} designs · {category.tagline}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: 'var(--text-muted)' }}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Love Calendar Events */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <div>
                <h3
                  className="font-display text-2xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Upcoming Love Calendar Events
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                  Next romantic dates &amp; seasonal celebrations
                </p>
              </div>
              <Link
                to={`/love-calendar/${currentLoveMonth.slug}`}
                className="shrink-0 text-xs sm:text-sm font-semibold hover:underline"
                style={{ color: currentLoveMonth.accentColor }}
              >
                {currentLoveMonth.name} guide →
              </Link>
            </div>

            <div
              className="flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {upcomingEvents.map(({ occasion, formattedDate, daysRemaining }) => (
                  <Link
                    key={occasion.id}
                    to={`/love-calendar/${occasion.monthSlug}#${occasion.id}`}
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="min-w-0 space-y-1">
                      <p
                        className="text-xs font-semibold tracking-[0.12em] uppercase"
                        style={{ color: occasion.accentColor }}
                      >
                        {formattedDate} · {formatCountdownLabel(daysRemaining)}
                      </p>
                      <p
                        className="font-display text-xl font-semibold leading-snug group-hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {occasion.name}
                      </p>
                      <p
                        className="line-clamp-1 text-xs"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {occasion.visualTheme}
                      </p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: occasion.accentColor }}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>

              <div
                className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3.5"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <Link
                  to={`/create/${nextEvent?.occasion.templateId ?? currentLoveMonth.featuredTemplateIds[0]}`}
                  className="inline-flex min-h-9 items-center gap-1.5 text-xs sm:text-sm font-semibold hover:underline"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <CalendarHeart className="h-4 w-4" style={{ color: 'var(--accent-rose)' }} aria-hidden="true" />
                  <span>
                    {nextEvent ? `Create ${nextEvent.occasion.name} Card` : `Create ${currentLoveMonth.name} Card`}
                  </span>
                </Link>
                <Link
                  to="/love-calendar"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  All 12 months →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
