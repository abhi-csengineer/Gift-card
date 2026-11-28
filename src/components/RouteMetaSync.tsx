import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteMetaFallback, updateSocialMetaTags } from '../utils/metaTags'

/**
 * Syncs Open Graph, Twitter Card, title, and canonical meta tags immediately on route transitions
 * before lazy-loaded page components refine them with page-specific SeoHead props.
 */
export function RouteMetaSync() {
  const { pathname } = useLocation()

  useEffect(() => {
    updateSocialMetaTags(getRouteMetaFallback(pathname))
  }, [pathname])

  return null
}
