import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CARD_TEMPLATES, CATEGORIES, SPECIAL_COLLECTIONS } from '../data/catalog'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { GreetingCardPreview } from '../components/GreetingCardPreview'
import { SeoHead } from '../components/SeoHead'

export function OccasionsPage() {
  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title="Occasions Directory — Digital Cards for Every Moment"
        description="Browse all 16 greeting card categories from Mom, Dad, Birthdays, and Anniversaries to Thank You, Festivals, Good Morning, and Just Because."
        canonicalPath="/occasions"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <Breadcrumbs items={[{ label: 'Occasions' }]} />
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Occasions Directory
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Find the Right Sentiment for Every Moment
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From milestone birthdays and golden anniversaries to spontaneous Tuesday thank-yous, explore a dedicated occasion guide or jump straight into tailored stationery.
          </p>
        </div>

        {/* All 16 Categories */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const sample =
              CARD_TEMPLATES.find((t) => t.categories.includes(category.slug)) ?? CARD_TEMPLATES[0]
            return (
              <div
                key={category.slug}
                className="group flex items-center gap-4 rounded-3xl border p-4 transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div className="h-32 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <GreetingCardPreview templateId={sample.id} compact className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold"
                      style={{ backgroundColor: category.accentBg, color: '#2A1726' }}
                    >
                      {category.featuredCount} ideas
                    </span>
                    <h2 className="mt-2 text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      <Link to={`/occasions/${category.slug}`} className="hover:underline">
                        {category.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {category.tagline}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/occasions/${category.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span>View guide &amp; cards</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    <Link
                      to={`/create/${sample.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--accent-rose)' }}
                    >
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      <span>Quick create</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Collections Strip */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Or Browse by Editorial Collection
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SPECIAL_COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                to={`/explore?collection=${col.slug}`}
                className="rounded-3xl border p-5 transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <span
                  className="inline-block h-3 w-8 rounded-full"
                  style={{ backgroundColor: col.accentColor }}
                />
                <h3 className="mt-3 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {col.name}
                </h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {col.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
