import { useEffect, useRef } from 'react'
import { ADSENSE_CONFIG, type AdSlotLocation } from '../config/siteConfig'
import { canLoadAdSense, useConsent } from '../utils/consent'

interface AdPlacementProps {
  location: AdSlotLocation
  format?: 'auto' | 'horizontal' | 'rectangle'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

let adsenseScriptInjected = false

function ensureAdSenseScript(clientId: string): void {
  if (typeof document === 'undefined' || adsenseScriptInjected) return
  if (document.querySelector('script[data-vb-adsense="true"]')) {
    adsenseScriptInjected = true
    return
  }
  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-vb-adsense', 'true')
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`
  document.head.appendChild(script)
  adsenseScriptInjected = true
}

/**
 * Policy-compliant AdSense placement slot.
 * - Renders NOTHING when advertising is disabled, unconfigured, or lacks user consent.
 * - Never renders fake/simulated advertisements or placeholder ad boxes.
 * - Must never be placed inside greeting cards, private messages, /card/* pages, or near interactive buttons.
 */
export function AdPlacement({ location, format = 'auto', className = '' }: AdPlacementProps) {
  const { consent } = useConsent()
  const pushedRef = useRef(false)

  const slotId = ADSENSE_CONFIG.slots[location]
  const isActive = canLoadAdSense(consent) && Boolean(slotId)

  useEffect(() => {
    if (!isActive || pushedRef.current) return
    ensureAdSenseScript(ADSENSE_CONFIG.clientId)
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
      pushedRef.current = true
    } catch {
      // AdSense script blocked or unavailable in current environment
    }
  }, [isActive])

  if (!isActive) {
    return null
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-10 mx-auto max-w-4xl px-4 sm:px-6 ${className}`}
    >
      <div
        className="rounded-2xl border p-4 text-center"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <p
          className="mb-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Advertisement
        </p>
        <ins
          className="adsbygoogle block min-h-[90px] w-full overflow-hidden"
          data-ad-client={ADSENSE_CONFIG.clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  )
}
