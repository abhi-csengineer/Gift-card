import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, Copy, Feather, Sparkles } from 'lucide-react'
import {
  BLOG_ARTICLES,
  CARD_TEMPLATES,
  CATEGORIES,
  getTemplateById,
  normalizeCategorySlug,
} from '../data/catalog'
import { CATEGORY_SEO_GUIDES } from '../data/categoryGuides'
import { buildCanonicalUrl } from '../config/siteConfig'
import { loadFavorites, toggleFavoriteId } from '../utils/cardStorage'
import { AdPlacement } from '../components/AdPlacement'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { QuickPreviewDialog } from '../components/QuickPreviewDialog'
import { SeoHead } from '../components/SeoHead'
import { TemplateCard } from '../components/TemplateCard'

export function CategorySeoPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>()
  const normalized = normalizeCategorySlug(categorySlug ?? null)
  const matchedCategory = CATEGORIES.find((c) => c.slug === normalized)
  const category = matchedCategory ?? CATEGORIES[0]
  const guide = CATEGORY_SEO_GUIDES[category.slug]

  const matchingTemplates = useMemo(
    () => CARD_TEMPLATES.filter((t) => t.categories.includes(category.slug)),
    [category.slug],
  )

  const relatedCategories = useMemo(
    () =>
      guide.relatedSlugs
        .map((slug) => CATEGORIES.find((c) => c.slug === slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [guide.relatedSlugs],
  )

  const pairedArticle = useMemo(
    () =>
      BLOG_ARTICLES.find((a) => a.slug === guide.recommendedArticleSlug) ??
      BLOG_ARTICLES[0],
    [guide.recommendedArticleSlug],
  )

  const starterTemplate = matchingTemplates[0] ?? getTemplateById(pairedArticle.recommendedTemplateId)

  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites())
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleCopyWish = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIdx(idx)
      window.setTimeout(() => {
        setCopiedIdx((curr) => (curr === idx ? null : curr))
      }, 2000)
    } catch {
      // Clipboard unavailable
    }
  }

  const schemaData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: guide.seoTitle,
        description: guide.metaDescription,
        url: buildCanonicalUrl(`/occasions/${category.slug}`),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Occasions', item: buildCanonicalUrl('/occasions') },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: buildCanonicalUrl(`/occasions/${category.slug}`),
          },
        ],
      },
    ],
    [category.name, category.slug, guide.metaDescription, guide.seoTitle],
  )

  if (!matchedCategory) {
    return (
      <div className="paper-grain py-20 px-4 sm:px-6 lg:px-8">
        <SeoHead
          title="Occasion Guide Not Found"
          description="Browse all sixteen digital greeting card occasion guides on Vellum & Bloom, from Birthdays and Anniversaries to Mother, Father, and Love."
          noIndex
        />
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Occasions Directory
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Occasion Guide Not Found
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We could not find an occasion guide matching that address. Choose one of our 16 curated occasion collections below.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/occasions/${c.slug}`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:opacity-85"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              to="/occasions"
              className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3]"
            >
              <span>Browse All Occasions</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title={guide.seoTitle}
        description={guide.metaDescription}
        canonicalPath={`/occasions/${category.slug}`}
        jsonLd={schemaData}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Occasions', to: '/occasions' },
              { label: category.name },
            ]}
          />
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            {category.name} Collection
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {guide.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {guide.introParagraph}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to={`/create/${starterTemplate.id}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3]"
            >
              <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              <span>Personalize a {category.name} Card</span>
            </Link>
            <Link
              to={`/explore?category=${category.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
            >
              <span>Filter in Gallery</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {(category.slug === 'valentines-day' ||
              category.slug === 'girlfriend-boyfriend' ||
              category.slug === 'husband-wife' ||
              category.slug === 'anniversary') && (
              <Link
                to={category.slug === 'valentines-day' ? '/love-calendar/february' : '/love-calendar'}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-rose)' }}
              >
                <span>Explore The Love Calendar</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        {/* Templates Grid */}
        <section aria-labelledby="occasion-templates-heading" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="occasion-templates-heading" className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {category.name} Card Designs ({matchingTemplates.length})
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Preview any design or open it directly in our studio to edit colors, fonts, stickers, and messages.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {matchingTemplates.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                template={tpl}
                isFavorite={favorites.includes(tpl.id)}
                onToggleFavorite={(id) => setFavorites(toggleFavoriteId(id))}
                onQuickPreview={(id) => setPreviewId(id)}
              />
            ))}
          </div>
        </section>

        {/* Separated optional Ad slot (renders null unless AdSense is enabled & consented) */}
        <AdPlacement location="explore" />

        {/* Editorial Writing Guidance + Sample Wishes */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div
            className="lg:col-span-5 rounded-3xl border p-6 sm:p-8 space-y-4"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-gold)' }}>
              <Feather className="h-4 w-4" aria-hidden="true" />
              <span>Writing Tips</span>
            </div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              How to Write a Memorable {category.name} Note
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {guide.writingTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-[#D9B77E]" aria-hidden="true" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <Link
                to={`/inspiration/${pairedArticle.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold hover:underline"
                style={{ color: 'var(--text-primary)' }}
              >
                <BookOpen className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Read full guide: {pairedArticle.title}</span>
              </Link>
            </div>
          </div>

          <div
            className="lg:col-span-7 rounded-3xl border p-6 sm:p-8 space-y-4"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Ready-to-Personalize {category.name} Messages
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Copy any line as a starting point, or jump straight into the Studio to make it your own.
            </p>
            <div className="space-y-3">
              {guide.sampleWishes.map((wish, idx) => (
                <div
                  key={wish}
                  className="flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-subtle)' }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    “{wish}”
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyWish(wish, idx)}
                    className="inline-flex shrink-0 items-center gap-1.5 self-start sm:self-center rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                    style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#256D4B]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Occasions */}
        <section className="space-y-4 border-t pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Related Occasions You May Like
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedCategories.map((rel) => (
              <Link
                key={rel.slug}
                to={`/occasions/${rel.slug}`}
                className="rounded-3xl border p-5 transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {rel.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {rel.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <QuickPreviewDialog templateId={previewId} onClose={() => setPreviewId(null)} />
    </div>
  )
}
