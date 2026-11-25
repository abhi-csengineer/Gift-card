import { ANALYTICS_CONFIG } from '../config/siteConfig'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    __cardelleGaConfigured?: boolean
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

const GA_SCRIPT_ATTR = 'data-cardelle-ga4'

function ensureGtagStub(): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
  }
}

/**
 * Loads the official gtag.js script in <head> once and configures GA4 with
 * automatic page_view disabled so React Router owns route-level page_view tracking.
 * Must only be called after explicit analytics consent has been granted.
 */
export function ensureGa4Initialized(
  measurementId: string = ANALYTICS_CONFIG.measurementId,
): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !measurementId) {
    return false
  }

  window[`ga-disable-${measurementId}`] = false
  ensureGtagStub()

  const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  const existingScript = document.head.querySelector<HTMLScriptElement>(
    `script[${GA_SCRIPT_ATTR}="${measurementId}"], script[src^="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`,
  )

  if (!existingScript) {
    const script = document.createElement('script')
    script.async = true
    script.src = scriptSrc
    script.setAttribute(GA_SCRIPT_ATTR, measurementId)
    document.head.appendChild(script)
  }

  if (!window.__cardelleGaConfigured && typeof window.gtag === 'function') {
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
    })
    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      send_page_view: false,
    })
    window.__cardelleGaConfigured = true
  } else if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    })
  }

  return true
}

/**
 * Suppresses further GA4 hits if the visitor revokes analytics consent mid-session.
 */
export function disableGa4(measurementId: string = ANALYTICS_CONFIG.measurementId): void {
  if (typeof window === 'undefined' || !measurementId) return
  window[`ga-disable-${measurementId}`] = true
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    })
  }
}

/**
 * Normalizes route path + query before sending to GA4 so private card payloads (?d=...)
 * inside shared card URLs are never transmitted in analytics telemetry.
 */
export function buildSanitizedAnalyticsPath(pathname: string, search: string): string {
  if (pathname.startsWith('/card/')) {
    return '/card/view'
  }
  return `${pathname}${search}`
}

export function trackPageView(
  pathname: string,
  search: string,
  measurementId: string = ANALYTICS_CONFIG.measurementId,
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !measurementId) return
  if (window[`ga-disable-${measurementId}`]) return
  if (typeof window.gtag !== 'function' || !window.__cardelleGaConfigured) return

  const pagePath = buildSanitizedAnalyticsPath(pathname, search)
  const pageLocation = `${window.location.origin}${pagePath}`

  window.gtag('event', 'page_view', {
    send_to: measurementId,
    page_title: document.title,
    page_path: pagePath,
    page_location: pageLocation,
  })
}
