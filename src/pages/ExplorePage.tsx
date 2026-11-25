import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Heart, Search, SlidersHorizontal, X } from 'lucide-react'
import {
  CARD_TEMPLATES,
  CATEGORIES,
  SPECIAL_COLLECTIONS,
  normalizeCategorySlug,
} from '../data/catalog'
import { buildCanonicalUrl } from '../config/siteConfig'
import { loadFavorites, toggleFavoriteId } from '../utils/cardStorage'
import { AdPlacement } from '../components/AdPlacement'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { QuickPreviewDialog } from '../components/QuickPreviewDialog'
import { SeoHead } from '../components/SeoHead'
import { TemplateCard } from '../components/TemplateCard'

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = normalizeCategorySlug(searchParams.get('category'))
  const activeCollection = searchParams.get('collection') ?? 'all'
  const urlQuery = searchParams.get('q') ?? ''

  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery)
  const [query, setQuery] = useState(urlQuery)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites())
  const [previewId, setPreviewId] = useState<string | null>(null)

  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery)
    setQuery(urlQuery)
  }

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'all' || !value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next)
  }

  const clearAllFilters = () => {
    setQuery('')
    setOnlyFavorites(false)
    setSearchParams(new URLSearchParams())
  }

  const filteredTemplates = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARD_TEMPLATES.filter((card) => {
      if (onlyFavorites && !favorites.includes(card.id)) return false
      if (activeCategory !== 'all' && !card.categories.includes(activeCategory)) {
        return false
      }
      if (activeCollection !== 'all' && card.collection !== activeCollection) {
        return false
      }
      if (q) {
        const hay = `${card.title} ${card.occasion} ${card.shortDescription} ${card.categories.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [activeCategory, activeCollection, favorites, onlyFavorites, query])

  const exploreSchemas = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Explore ${CARD_TEMPLATES.length}+ Digital Greeting Cards`,
        description:
          'Browse and filter bespoke digital greeting card templates by occasion, aesthetic collection, and mood—then personalize instantly.',
        url: buildCanonicalUrl('/explore'),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Explore Cards', item: buildCanonicalUrl('/explore') },
        ],
      },
    ],
    [],
  )

  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title={`Explore ${CARD_TEMPLATES.length}+ Digital Greeting Cards`}
        description="Browse and filter 120+ digital greeting card templates by occasion, aesthetic, and mood—then customize colors, fonts, and messages."
        canonicalPath="/explore"
        noIndex={Boolean(urlQuery.trim())}
        jsonLd={exploreSchemas}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <Breadcrumbs items={[{ label: 'Explore Cards' }]} />
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Card Gallery
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Explore Bespoke Digital Cards
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Filter by occasion, aesthetic collection, or saved favorites—then personalize every color, typeface, and word in seconds.
          </p>
        </div>

        {/* Search & Collection Controls */}
        <div
          className="mt-8 rounded-3xl border p-4 sm:p-5 space-y-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, mood, or occasion..."
                aria-label="Filter cards by keyword"
                className="w-full rounded-2xl border py-2.5 pr-4 pl-10 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}>
                <SlidersHorizontal className="h-3.5 w-3.5" style={{ color: 'var(--accent-gold)' }} aria-hidden="true" />
                <select
                  aria-label="Filter by collection"
                  value={activeCollection}
                  onChange={(e) => setFilter('collection', e.target.value)}
                  className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <option value="all">All Collections</option>
                  {SPECIAL_COLLECTIONS.map((col) => (
                    <option key={col.slug} value={col.slug}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setOnlyFavorites((prev) => !prev)}
                aria-pressed={onlyFavorites}
                className="inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: onlyFavorites ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                  borderColor: onlyFavorites ? 'var(--accent-rose)' : 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <Heart className={`h-3.5 w-3.5 ${onlyFavorites ? 'fill-[#B5546D] text-[#B5546D]' : ''}`} aria-hidden="true" />
                <span>Saved ({favorites.length})</span>
              </button>

              {(activeCategory !== 'all' || activeCollection !== 'all' || query || onlyFavorites) && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold hover:underline cursor-pointer"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setFilter('category', 'all')}
              className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
              style={{
                backgroundColor: activeCategory === 'all' ? '#472C42' : 'var(--bg-canvas)',
                borderColor: activeCategory === 'all' ? '#472C42' : 'var(--border-subtle)',
                color: activeCategory === 'all' ? '#FFF9F3' : 'var(--text-secondary)',
              }}
            >
              All Occasions
            </button>
            {CATEGORIES.map((cat) => {
              const selected = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setFilter('category', cat.slug)}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: selected ? '#472C42' : 'var(--bg-canvas)',
                    borderColor: selected ? '#472C42' : 'var(--border-subtle)',
                    color: selected ? '#FFF9F3' : 'var(--text-secondary)',
                  }}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Count */}
        <p className="mt-6 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? 'design' : 'designs'}
        </p>

        {/* Grid or Empty State */}
        {filteredTemplates.length === 0 ? (
          <div
            className="mt-6 rounded-3xl border p-12 text-center space-y-4"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          >
            <p className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              No matching cards found
            </p>
            <p className="mx-auto max-w-md text-sm" style={{ color: 'var(--text-secondary)' }}>
              Try clearing one of your filters or exploring all sixteen occasions to find the right artwork.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3] cursor-pointer"
            >
              Show All Designs
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTemplates.map((card) => (
              <TemplateCard
                key={card.id}
                template={card}
                isFavorite={favorites.includes(card.id)}
                onToggleFavorite={(id) => setFavorites(toggleFavoriteId(id))}
                onQuickPreview={(id) => setPreviewId(id)}
              />
            ))}
          </div>
        )}

        <AdPlacement location="explore" />
      </div>

      <QuickPreviewDialog templateId={previewId} onClose={() => setPreviewId(null)} />
    </div>
  )
}
