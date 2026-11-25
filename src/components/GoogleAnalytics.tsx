import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ANALYTICS_CONFIG } from '../config/siteConfig'
import {
  buildSanitizedAnalyticsPath,
  disableGa4,
  ensureGa4Initialized,
  trackPageView,
} from '../utils/analytics'
import { canLoadAnalytics, useConsent } from '../utils/consent'

export function GoogleAnalytics() {
  const { pathname, search } = useLocation()
  const { consent } = useConsent()
  const analyticsAllowed = canLoadAnalytics(consent)
  const lastTrackedPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (!analyticsAllowed) {
      disableGa4(ANALYTICS_CONFIG.measurementId)
      lastTrackedPathRef.current = null
      return
    }

    ensureGa4Initialized(ANALYTICS_CONFIG.measurementId)

    const sanitizedPath = buildSanitizedAnalyticsPath(pathname, search)
    if (lastTrackedPathRef.current === sanitizedPath) {
      return
    }

    let cancelled = false
    let rafId = 0
    let timeoutId = 0
    const startedAt = Date.now()

    // Wait for lazy-loaded route chunks and SeoHead to update document.title
    const dispatchOnceReady = () => {
      if (cancelled) return
      const isSuspenseLoading = Boolean(document.querySelector('#main-content [aria-busy="true"]'))
      const elapsed = Date.now() - startedAt

      if (isSuspenseLoading && elapsed < 600) {
        timeoutId = window.setTimeout(() => {
          rafId = window.requestAnimationFrame(dispatchOnceReady)
        }, 40)
        return
      }

      if (lastTrackedPathRef.current === sanitizedPath) return
      lastTrackedPathRef.current = sanitizedPath
      trackPageView(pathname, search, ANALYTICS_CONFIG.measurementId)
    }

    rafId = window.requestAnimationFrame(dispatchOnceReady)

    return () => {
      cancelled = true
      if (rafId) window.cancelAnimationFrame(rafId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [analyticsAllowed, pathname, search])

  return null
}
