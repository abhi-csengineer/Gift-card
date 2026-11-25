import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { BLOG_ARTICLES, getTemplateById } from '../data/catalog'
import { CardArtwork } from '../components/CardArtwork'
import { GreetingCardPreview } from '../components/GreetingCardPreview'

export function InspirationPage() {
  const { slug } = useParams<{ slug?: string }>()

  if (slug) {
    const article = BLOG_ARTICLES.find((a) => a.slug === slug) ?? BLOG_ARTICLES[0]
    const pairedCard = getTemplateById(article.recommendedTemplateId)

    return (
      <article className="paper-grain py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <Link
            to="/inspiration"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:underline"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Stationery Journal</span>
          </Link>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              <span className="rounded-full px-3 py-1 font-semibold" style={{ backgroundColor: 'var(--bg-blush)', color: '#2A1726' }}>
                {article.category}
              </span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.publishedAt}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              {article.title}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {article.excerpt}
            </p>
          </header>

          <div
            className="flex h-56 items-center justify-center rounded-3xl border p-6"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="h-40 w-52">
              <CardArtwork motif={article.coverMotif} accent="#E9A6B5" foil="#D9B77E" text="#472C42" />
            </div>
          </div>

          <div className="space-y-8">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {para}
                  </p>
                ))}
                {section.quote && (
                  <blockquote
                    className="rounded-2xl border-l-4 px-6 py-4 text-xl italic"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--accent-gold)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    “{section.quote}”
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Paired Card Recommendation */}
          <aside
            className="grid grid-cols-1 items-center gap-6 rounded-3xl border p-6 sm:grid-cols-12 sm:p-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="sm:col-span-5">
              <GreetingCardPreview templateId={pairedCard.id} compact />
            </div>
            <div className="sm:col-span-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
                Recommended Pairing
              </p>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {pairedCard.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {pairedCard.shortDescription}
              </p>
              <Link
                to={`/create/${pairedCard.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-5 py-2.5 text-sm font-semibold text-[#FFF9F3]"
              >
                <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Personalize This Card</span>
              </Link>
            </div>
          </aside>
        </div>
      </article>
    )
  }

  return (
    <div className="paper-grain py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            The Stationery Journal
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Greeting Ideas, Words &amp; Celebration Guides
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Thoughtful prompts and editorial notes to help you say what you really feel—without staring at a blank page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-3xl border p-6 transition-all hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div>
                <div className="mb-5 flex h-44 items-center justify-center rounded-2xl p-4" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                  <div className="h-32 w-40">
                    <CardArtwork motif={article.coverMotif} accent="#E9A6B5" foil="#D9B77E" text="#472C42" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span className="font-semibold" style={{ color: 'var(--accent-rose)' }}>
                    {article.category}
                  </span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  <Link to={`/inspiration/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>
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
                  <span>Read article</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
