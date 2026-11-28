import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_CONFIG } from '../config/siteConfig'
import { updateSocialMetaTags } from '../utils/metaTags'

export interface SeoHeadProps {
  title: string
  description: string
  canonicalPath?: string
  ogType?: 'website' | 'article'
  ogImagePath?: string
  ogImageAlt?: string
  ogLocale?: string
  twitterCard?: 'summary' | 'summary_large_image'
  publishedTime?: string
  articleSection?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImagePath = SITE_CONFIG.socialImagePath,
  ogImageAlt = 'Cardelle cream stationery envelope with wax seal and blush peony petals',
  ogLocale = 'en_US',
  twitterCard = 'summary_large_image',
  publishedTime,
  articleSection,
  noIndex = false,
  jsonLd,
}: SeoHeadProps) {
  const { pathname } = useLocation()
  const resolvedPath = canonicalPath ?? pathname
  const serializedLd = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    updateSocialMetaTags({
      title,
      description,
      canonicalPath: resolvedPath,
      ogType,
      ogImagePath,
      ogImageAlt,
      ogLocale,
      twitterCard,
      publishedTime,
      articleSection,
      noIndex,
    })

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
  }, [
    articleSection,
    description,
    noIndex,
    ogImageAlt,
    ogImagePath,
    ogLocale,
    ogType,
    publishedTime,
    resolvedPath,
    serializedLd,
    title,
    twitterCard,
  ])

  return null
}
