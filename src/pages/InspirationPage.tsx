import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, Copy, Sparkles } from 'lucide-react'
import { BLOG_ARTICLES, CATEGORIES, getTemplateById } from '../data/catalog'
import { SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'
import { AdPlacement } from '../components/AdPlacement'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { CardArtwork } from '../components/CardArtwork'
import { GreetingCardPreview } from '../components/GreetingCardPreview'
import { SeoHead } from '../components/SeoHead'

function toIsoDate(label: string): string | undefined {
  const parsed = new Date(label)
  if (Number.isNaN(parsed.getTime())) return undefined
  return parsed.toISOString().slice(0, 10)
}

export function InspirationPage() {
  const { slug } = useParams<{ slug?: string }>()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const articleCategories = useMemo(
    () => ['All', ...Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)))],
    [],
  )

  const filteredArticles = useMemo(
    () =>
      selectedCategory === 'All'
        ? BLOG_ARTICLES
        : BLOG_ARTICLES.filter((a) => a.category === selectedCategory),
    [selectedCategory],
  )

  const copyLine = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((c) => (c === key ? null : c)), 1800)
    } catch {
      // Ignore clipboard error
    }
  }

  if (slug) {
    const matchedArticle = BLOG_ARTICLES.find((a) => a.slug === slug)
    if (!matchedArticle) {
      return (
        <div className="paper-grain py-20 px-4 sm:px-6 lg:px-8">
          <SeoHead
            title="Article Not Found — Stationery Journal"
            description="Browse original birthday wishes, anniversary notes, and digital greeting card guides in the Cardelle Stationery Journal."
            noIndex
          />
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              The Stationery Journal
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Journal Guide Not Found
            </h1>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We could not find a stationery guide matching that link. Browse our complete collection of message ideas and writing guides below.
            </p>
            <Link
              to="/inspiration"
              className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Return to Stationery Journal</span>
            </Link>
          </div>
        </div>
      )
    }

    const article = matchedArticle
    const pairedCard = getTemplateById(article.recommendedTemplateId)
    const relatedCategory = article.occasionSlug
      ? CATEGORIES.find((c) => c.slug === article.occasionSlug)
      : undefined
    const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3)
    const isoPublished = toIsoDate(article.publishedAt)

    const articleSchema = [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        articleSection: article.category,
        ...(isoPublished ? { datePublished: isoPublished } : {}),
        image: buildCanonicalUrl(SITE_CONFIG.socialImagePath),
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.legalBrandLabel,
          url: buildCanonicalUrl('/'),
        },
        mainEntityOfPage: buildCanonicalUrl(`/inspiration/${article.slug}`),
        url: buildCanonicalUrl(`/inspiration/${article.slug}`),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Stationery Journal', item: buildCanonicalUrl('/inspiration') },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: buildCanonicalUrl(`/inspiration/${article.slug}`),
          },
        ],
      },
    ]

    return (
      <article className="paper-grain py-10 sm:py-16">
        <SeoHead
          title={article.seoTitle ?? article.title}
          description={article.excerpt}
          canonicalPath={`/inspiration/${article.slug}`}
          ogType="article"
          jsonLd={articleSchema}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Stationery Journal', to: '/inspiration' },
                { label: article.title },
              ]}
            />
            <Link
              to="/inspiration"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Stationery Journal</span>
            </Link>
          </div>

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
            className="flex h-52 items-center justify-center rounded-3xl border p-6"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="h-36 w-48">
              <CardArtwork motif={article.coverMotif} accent="#E9A6B5" foil="#D9B77E" text="#472C42" />
            </div>
          </div>

          <div className="space-y-9">
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
                {section.examples && section.examples.length > 0 && (
                  <ul className="space-y-2.5 pt-1">
                    {section.examples.map((ex, eIdx) => {
                      const k = `${idx}-${eIdx}`
                      return (
                        <li
                          key={k}
                          className="flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed"
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          <span>{ex}</span>
                          <button
                            type="button"
                            onClick={() => copyLine(ex.replace(/^\d+\.\s*/, ''), k)}
                            aria-label="Copy message example"
                            className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold cursor-pointer"
                            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                          >
                            {copiedKey === k ? (
                              <>
                                <Check className="h-3 w-3 text-[#256D4B]" aria-hidden="true" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" aria-hidden="true" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
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

            {article.conclusion && (
              <section
                className="rounded-3xl border p-6 space-y-2"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              >
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Final Thought
                </h2>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {article.conclusion}
                </p>
              </section>
            )}
          </div>

          {/* Separated optional Ad slot (hidden unless AdSense is enabled & consented) */}
          <AdPlacement location="article" />

          {/* Paired Card Recommendation & Internal Category Link */}
          <aside
            className="grid grid-cols-1 items-center gap-6 rounded-3xl border p-6 sm:grid-cols-12 sm:p-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="sm:col-span-5">
              <GreetingCardPreview templateId={pairedCard.id} compact />
            </div>
            <div className="sm:col-span-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
                Recommended Card Pairing
              </p>
              <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {pairedCard.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {pairedCard.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <Link
                  to={`/create/${pairedCard.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-5 py-2.5 text-sm font-semibold text-[#FFF9F3]"
                >
                  <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                  <span>{article.ctaLabel ?? 'Personalize This Card'}</span>
                </Link>
                {relatedCategory && (
                  <Link
                    to={`/occasions/${relatedCategory.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold"
                    style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  >
                    <span>More {relatedCategory.name} Cards</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Related Journal Guides */}
          <section className="space-y-4 border-t pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/inspiration/${rel.slug}`}
                  className="rounded-2xl border p-4 transition-colors hover:opacity-90"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
                    {rel.category}
                  </p>
                  <p className="mt-1 text-base font-semibold leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {rel.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    )
  }

  const journalSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Stationery Journal & Card Guides',
      description:
        'Explore original birthday wishes for Mom and Dad, anniversary messages, thank-you writing formulas, and digital greeting card ideas.',
      url: buildCanonicalUrl('/inspiration'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Stationery Journal Articles',
      numberOfItems: BLOG_ARTICLES.length,
      itemListElement: BLOG_ARTICLES.map((art, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: art.title,
        url: buildCanonicalUrl(`/inspiration/${art.slug}`),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Stationery Journal', item: buildCanonicalUrl('/inspiration') },
      ],
    },
  ]

  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title="Stationery Journal & Card Guides"
        description="Explore original birthday wishes for Mom and Dad, anniversary messages, thank-you writing formulas, and digital greeting card ideas."
        canonicalPath="/inspiration"
        jsonLd={journalSchemas}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <Breadcrumbs items={[{ label: 'Stationery Journal' }]} />
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            The Stationery Journal
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Greeting Ideas, Words &amp; Celebration Guides
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Thoughtful message collections, writing guides, and step-by-step inspiration to help you express what you feel—without staring at a blank card.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter journal guides by topic">
          {articleCategories.map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: active ? '#472C42' : 'var(--bg-surface)',
                  borderColor: active ? '#472C42' : 'var(--border-subtle)',
                  color: active ? '#FFF9F3' : 'var(--text-secondary)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
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
                <div className="mb-5 flex h-40 items-center justify-center rounded-2xl p-4" style={{ backgroundColor: 'var(--bg-canvas)' }}>
                  <div className="h-28 w-36">
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
                  <span>Read guide</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <AdPlacement location="article" />
      </div>
    </div>
  )
}
