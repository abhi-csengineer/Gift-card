import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'

export interface SeoHeadProps {
  title: string
  description: string
  canonicalPath?: string
  ogType?: 'website' | 'article'
  ogImagePath?: string
  ogImageAlt?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsertMeta(selector: string, attrs: Record<string, string>, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([key, val]) => el!.setAttribute(key, val))
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImagePath = SITE_CONFIG.socialImagePath,
  ogImageAlt = 'Cardelle cream stationery envelope with wax seal and blush peony petals',
  noIndex = false,
  jsonLd,
}: SeoHeadProps) {
  const { pathname } = useLocation()
  const resolvedPath = canonicalPath ?? pathname
  const canonicalUrl = buildCanonicalUrl(resolvedPath)
  const resolvedImageUrl = buildCanonicalUrl(ogImagePath)
  const fullTitle = title.includes(SITE_CONFIG.brandName)
    ? title
    : `${title} | ${SITE_CONFIG.brandName}`

  const serializedLd = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = fullTitle

    upsertMeta('meta[name="description"]', { name: 'description' }, description)
    upsertMeta(
      'meta[name="robots"]',
      { name: 'robots' },
      noIndex ? 'noindex, nofollow' : 'index, follow',
    )

    upsertCanonical(canonicalUrl)

    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, ogType)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_CONFIG.brandName)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, resolvedImageUrl)
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, ogImageAlt)

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, resolvedImageUrl)
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, ogImageAlt)

    // Remove previous route JSON-LD scripts cleanly
    document.head.querySelectorAll('script[data-seo-ld="true"]').forEach((node) => node.remove())

    if (serializedLd) {
      const items = JSON.parse(serializedLd)
      const list = Array.isArray(items) ? items : [items]
      list.forEach((schemaObj) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-seo-ld', 'true')
        script.textContent = JSON.stringify(schemaObj)
        document.head.appendChild(script)
      })
    }

    return () => {
      document.head.querySelectorAll('script[data-seo-ld="true"]').forEach((node) => node.remove())
    }
  }, [canonicalUrl, description, fullTitle, noIndex, ogImageAlt, ogType, resolvedImageUrl, serializedLd])

  return null
}
