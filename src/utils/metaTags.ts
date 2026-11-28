import { SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'

export interface SocialMetaConfig {
  title: string
  description: string
  canonicalPath?: string
  url?: string
  ogType?: 'website' | 'article'
  ogImagePath?: string
  ogImageAlt?: string
  ogLocale?: string
  twitterCard?: 'summary' | 'summary_large_image'
  noIndex?: boolean
  publishedTime?: string
  articleSection?: string
}

const DEFAULT_OG_IMAGE_ALT =
  'Cardelle cream stationery envelope with wax seal and blush peony petals'

function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value)
}

export function formatMetaTitle(title: string): string {
  const trimmed = title.trim()
  if (!trimmed) {
    return `${SITE_CONFIG.brandName} — ${SITE_CONFIG.tagline}`
  }
  return trimmed.includes(SITE_CONFIG.brandName)
    ? trimmed
    : `${trimmed} | ${SITE_CONFIG.brandName}`
}

export function resolveMetaUrl(pathOrUrl: string): string {
  const trimmed = pathOrUrl.trim()
  if (!trimmed) {
    return buildCanonicalUrl('/')
  }
  return isAbsoluteHttpUrl(trimmed) ? trimmed : buildCanonicalUrl(trimmed)
}

function upsertMetaTag(
  selector: string,
  attributes: Record<string, string>,
  content: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function removeMetaTag(selector: string): void {
  document.head.querySelectorAll<HTMLMetaElement>(selector).forEach((node) => node.remove())
}

function upsertCanonicalLink(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function humanizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/**
 * Dynamically updates document title, canonical URL, Open Graph tags, and Twitter Card meta tags.
 */
export function updateSocialMetaTags({
  title,
  description,
  canonicalPath = typeof window !== 'undefined' ? window.location.pathname : '/',
  url,
  ogType = 'website',
  ogImagePath = SITE_CONFIG.socialImagePath,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  ogLocale = 'en_US',
  twitterCard = 'summary_large_image',
  noIndex = false,
  publishedTime,
  articleSection,
}: SocialMetaConfig): void {
  if (typeof document === 'undefined') return

  const formattedTitle = formatMetaTitle(title)
  const resolvedCanonicalUrl = url ? resolveMetaUrl(url) : resolveMetaUrl(canonicalPath)
  const resolvedImageUrl = resolveMetaUrl(ogImagePath)

  document.title = formattedTitle

  upsertMetaTag('meta[name="description"]', { name: 'description' }, description)
  upsertMetaTag(
    'meta[name="robots"]',
    { name: 'robots' },
    noIndex ? 'noindex, nofollow' : 'index, follow',
  )

  upsertCanonicalLink(resolvedCanonicalUrl)

  // Open Graph metadata
  upsertMetaTag('meta[property="og:type"]', { property: 'og:type' }, ogType)
  upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_CONFIG.brandName)
  upsertMetaTag('meta[property="og:locale"]', { property: 'og:locale' }, ogLocale)
  upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, formattedTitle)
  upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, description)
  upsertMetaTag('meta[property="og:url"]', { property: 'og:url' }, resolvedCanonicalUrl)
  upsertMetaTag('meta[property="og:image"]', { property: 'og:image' }, resolvedImageUrl)
  upsertMetaTag('meta[property="og:image:alt"]', { property: 'og:image:alt' }, ogImageAlt)

  if (ogType === 'article' && publishedTime) {
    upsertMetaTag(
      'meta[property="article:published_time"]',
      { property: 'article:published_time' },
      publishedTime,
    )
  } else {
    removeMetaTag('meta[property="article:published_time"]')
  }

  if (ogType === 'article' && articleSection) {
    upsertMetaTag(
      'meta[property="article:section"]',
      { property: 'article:section' },
      articleSection,
    )
  } else {
    removeMetaTag('meta[property="article:section"]')
  }

  // Twitter Card metadata
  upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, twitterCard)
  upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, formattedTitle)
  upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
  upsertMetaTag('meta[name="twitter:url"]', { name: 'twitter:url' }, resolvedCanonicalUrl)
  upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, resolvedImageUrl)
  upsertMetaTag('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, ogImageAlt)
}

/**
 * Provides immediate route-aware Open Graph and Twitter defaults on client-side navigation
 * before lazy-loaded page components apply page-specific overrides via SeoHead.
 */
export function getRouteMetaFallback(pathname: string): SocialMetaConfig {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  if (cleanPath === '/') {
    return {
      title: 'Cardelle — Every Feeling Deserves a Card',
      description: SITE_CONFIG.description,
      canonicalPath: '/',
    }
  }

  if (cleanPath === '/explore') {
    return {
      title: 'Explore Greeting Card Designs',
      description:
        'Browse 40+ curated digital greeting cards for birthdays, anniversaries, gratitude, and heartfelt occasions.',
      canonicalPath: '/explore',
    }
  }

  if (cleanPath === '/occasions') {
    return {
      title: 'Greeting Card Occasions & Categories',
      description:
        'Explore 16+ relationship and celebration categories to create and share personalized digital greeting cards.',
      canonicalPath: '/occasions',
    }
  }

  if (cleanPath.startsWith('/occasions/')) {
    const slug = cleanPath.slice('/occasions/'.length)
    const label = humanizeSlug(slug)
    return {
      title: `${label} Greeting Cards & Message Ideas`,
      description: `Create and share personalized ${label.toLowerCase()} digital greeting cards with instant PNG and 2-page PDF downloads on Cardelle.`,
      canonicalPath: cleanPath,
    }
  }

  if (cleanPath === '/love-calendar') {
    return {
      title: 'The Love Calendar — 365 Days of Romantic Occasions',
      description:
        'Discover twelve monthly romantic collections, special dates, and relationship milestones in The Love Calendar.',
      canonicalPath: '/love-calendar',
    }
  }

  if (cleanPath.startsWith('/love-calendar/')) {
    const slug = cleanPath.slice('/love-calendar/'.length)
    const label = humanizeSlug(slug)
    return {
      title: `${label} Love Calendar Cards & Milestones`,
      description: `Explore ${label} romantic greeting card designs, curated messages, and seasonal celebrations on Cardelle.`,
      canonicalPath: cleanPath,
    }
  }

  if (cleanPath === '/create' || cleanPath.startsWith('/create/')) {
    return {
      title: 'Card Studio — Customize Your Greeting Card',
      description:
        'Personalize cover artwork, fonts, colors, inside notes, and download as a 2-page PDF or PNG keepsake.',
      canonicalPath: cleanPath,
    }
  }

  if (cleanPath.startsWith('/card/')) {
    return {
      title: 'A Keepsake Card for You',
      description: 'Open your personalized digital greeting card on Cardelle.',
      canonicalPath: cleanPath,
      noIndex: true,
    }
  }

  if (cleanPath === '/inspiration') {
    return {
      title: 'Stationery Journal & Card Guides',
      description:
        'Read thoughtful writing guides for birthday wishes, anniversary notes, thank-you letters, and meaningful moments.',
      canonicalPath: '/inspiration',
    }
  }

  if (cleanPath.startsWith('/inspiration/')) {
    const slug = cleanPath.slice('/inspiration/'.length)
    const label = humanizeSlug(slug)
    return {
      title: `${label} — Stationery Journal`,
      description: `Read ${label.toLowerCase()} in the Cardelle Stationery Journal and pair your words with a bespoke digital greeting card.`,
      canonicalPath: cleanPath,
      ogType: 'article',
    }
  }

  if (cleanPath === '/about') {
    return {
      title: 'About Cardelle',
      description:
        'Learn about Cardelle, our letterpress-inspired digital stationery craft, and how we help people celebrate meaningful connections.',
      canonicalPath: '/about',
    }
  }

  if (cleanPath === '/contact') {
    return {
      title: 'Contact Cardelle',
      description: 'Get in touch with the Cardelle team for support, feedback, or partnership inquiries.',
      canonicalPath: '/contact',
    }
  }

  if (cleanPath === '/faq') {
    return {
      title: 'Frequently Asked Questions',
      description:
        'Answers about customizing cards, sharing links, privacy, and downloading PNG, JPG, and 2-page PDFs on Cardelle.',
      canonicalPath: '/faq',
    }
  }

  if (cleanPath === '/sitemap') {
    return {
      title: 'Site Directory',
      description: 'Browse all Cardelle greeting card collections, Love Calendar months, guides, and pages.',
      canonicalPath: '/sitemap',
    }
  }

  if (['/privacy', '/terms', '/disclaimer', '/cookies', '/copyright'].includes(cleanPath)) {
    const label = humanizeSlug(cleanPath.slice(1))
    return {
      title: `${label} Policy`,
      description: `Read Cardelle's ${label.toLowerCase()} details and visitor information.`,
      canonicalPath: cleanPath,
    }
  }

  return {
    title: 'Cardelle — Every Feeling Deserves a Card',
    description: SITE_CONFIG.description,
    canonicalPath: cleanPath,
  }
}
