import { Link } from 'react-router-dom'
import { BLOG_ARTICLES, CARD_TEMPLATES, CATEGORIES, SPECIAL_COLLECTIONS } from '../data/catalog'
import { LOVE_CALENDAR_MONTHS } from '../data/loveCalendar'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { SeoHead } from '../components/SeoHead'

export function SitemapPage() {
  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title="Sitemap — Complete Site Directory"
        description="Navigable index of all Vellum & Bloom greeting card occasions, collections, templates, stationery guides, and policy pages."
        canonicalPath="/sitemap"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <Breadcrumbs items={[{ label: 'Sitemap' }]} />
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Directory
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Sitemap
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Complete navigable index of Vellum &amp; Bloom pages, occasion guides, collections, card templates, and stationery articles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section className="rounded-3xl border p-6 space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Main Pages</h2>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/explore" className="hover:underline">Explore Cards</Link></li>
              <li><Link to="/occasions" className="hover:underline">Occasions Directory</Link></li>
              <li><Link to="/love-calendar" className="hover:underline">The Love Calendar</Link></li>
              <li><Link to="/create" className="hover:underline">Create a Card Studio</Link></li>
              <li><Link to="/inspiration" className="hover:underline">Stationery Journal &amp; Guides</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Policies &amp; Legal</h2>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms and Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
              <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
              <li><Link to="/copyright" className="hover:underline">Copyright Policy</Link></li>
            </ul>
          </section>

          <section className="rounded-3xl border p-6 space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Occasion Guides ({CATEGORIES.length})</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/occasions/${c.slug}`} className="hover:underline">{c.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border p-6 space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Special Collections</h2>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {SPECIAL_COLLECTIONS.map((col) => (
                <li key={col.slug}>
                  <Link to={`/explore?collection=${col.slug}`} className="hover:underline">{col.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border p-6 space-y-3 md:col-span-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>The Love Calendar ({LOVE_CALENDAR_MONTHS.length} Months)</h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {LOVE_CALENDAR_MONTHS.map((month) => (
                <li key={month.slug}>
                  <Link to={`/love-calendar/${month.slug}`} className="hover:underline">
                    {month.name} — {month.collectionTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border p-6 space-y-3 md:col-span-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Card Templates ({CARD_TEMPLATES.length}) &amp; Journal Articles ({BLOG_ARTICLES.length})</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {CARD_TEMPLATES.map((t) => (
                  <li key={t.id}>
                    <Link to={`/create/${t.id}`} className="hover:underline">{t.title} ({t.occasion})</Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {BLOG_ARTICLES.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/inspiration/${a.slug}`} className="hover:underline">{a.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
