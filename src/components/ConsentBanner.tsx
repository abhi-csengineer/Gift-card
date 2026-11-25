import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { ADSENSE_CONFIG } from '../config/siteConfig'
import { CONSENT_MODAL_EVENT, useConsent } from '../utils/consent'

export function ConsentBanner() {
  const { consent, acceptAll, acceptEssentialOnly, updatePreferences } = useConsent()
  const [preferencesPref, setPreferencesPref] = useState(consent.preferences)
  const [analyticsPref, setAnalyticsPref] = useState(consent.analytics)
  const [adsPref, setAdsPref] = useState(consent.personalizedAds)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    setPreferencesPref(consent.preferences)
    setAnalyticsPref(consent.analytics)
    setAdsPref(consent.personalizedAds)
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }

  const closeModal = () => {
    dialogRef.current?.close()
  }

  useEffect(() => {
    const handleOpenEvent = () => {
      setPreferencesPref(consent.preferences)
      setAnalyticsPref(consent.analytics)
      setAdsPref(consent.personalizedAds)
      const dialog = dialogRef.current
      if (dialog && !dialog.open) {
        dialog.showModal()
      }
    }
    window.addEventListener(CONSENT_MODAL_EVENT, handleOpenEvent)
    return () => window.removeEventListener(CONSENT_MODAL_EVENT, handleOpenEvent)
  }, [consent.analytics, consent.personalizedAds, consent.preferences])

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault()
    updatePreferences(preferencesPref, analyticsPref, ADSENSE_CONFIG.enabled ? adsPref : false)
    closeModal()
  }

  return (
    <>
      {!consent.decided && (
        <aside
          aria-label="Privacy and cookie preferences"
          className="fixed inset-x-0 bottom-3 z-40 mx-auto w-[min(95vw,56rem)] rounded-3xl border p-4 sm:p-5 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5 md:max-w-xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#D9B77E] shrink-0" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                  Your Privacy &amp; Storage Choices
                </p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Cardelle stores your card drafts, favorites, and theme locally in your browser. Analytics cookies stay disabled unless you consent, and advertising cookies are{' '}
                {ADSENSE_CONFIG.enabled ? 'optional and disabled unless you consent' : 'currently disabled on this site'}. Read our{' '}
                <Link to="/privacy" className="underline font-medium" style={{ color: 'var(--text-primary)' }}>
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/cookies" className="underline font-medium" style={{ color: 'var(--text-primary)' }}>
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                style={{
                  borderColor: 'var(--border-strong)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Manage</span>
              </button>

              <button
                type="button"
                onClick={acceptEssentialOnly}
                className="inline-flex min-h-9 items-center rounded-full border px-4 py-1.5 text-xs font-semibold cursor-pointer"
                style={{
                  borderColor: 'var(--border-strong)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-9 items-center rounded-full bg-[#472C42] px-4 py-1.5 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="privacy-modal-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="w-[min(94vw,34rem)] rounded-3xl p-0 backdrop:bg-black/50"
      >
        <form onSubmit={handleSaveCustom} className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <h2 id="privacy-modal-title" className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Privacy &amp; Cookie Settings
              </h2>
              <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                Control how browser storage and optional future advertising scripts behave on your device.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close privacy settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Essential */}
            <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Essential Browser Storage
                </span>
                <span className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold" style={{ backgroundColor: 'var(--bg-blush)', color: '#2A1726' }}>
                  Always Active
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Required for core studio functionality including remembering your consent choice, reduced-motion accessibility setting, and locally stored greeting card drafts.
              </p>
            </div>

            {/* Preferences */}
            <label
              htmlFor="consent-preferences-toggle"
              className="flex items-start justify-between gap-4 rounded-2xl border p-4 cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}
            >
              <div>
                <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Theme &amp; Favorite Templates
                </span>
                <span className="mt-1 block text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Saves your light/dark palette preference and bookmarked card templates locally in your browser.
                </span>
              </div>
              <input
                id="consent-preferences-toggle"
                type="checkbox"
                checked={preferencesPref}
                onChange={(e) => setPreferencesPref(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#472C42]"
              />
            </label>

            {/* Analytics */}
            <label
              htmlFor="consent-analytics-toggle"
              className="flex items-start justify-between gap-4 rounded-2xl border p-4 cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}
            >
              <div>
                <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Analytics &amp; Performance (Google Analytics 4)
                </span>
                <span className="mt-1 block text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Helps us understand which occasions and templates visitors enjoy most via page view metrics. Private card messages in shared links are excluded and never tracked.
                </span>
              </div>
              <input
                id="consent-analytics-toggle"
                type="checkbox"
                checked={analyticsPref}
                onChange={(e) => setAnalyticsPref(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#472C42]"
              />
            </label>

            {/* Advertising */}
            <label
              htmlFor="consent-ads-toggle"
              className="flex items-start justify-between gap-4 rounded-2xl border p-4 cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}
            >
              <div>
                <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Advertising Cookies &amp; Personalization (Google AdSense)
                </span>
                <span className="mt-1 block text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {ADSENSE_CONFIG.enabled
                    ? 'Allows Google and third-party vendors to use cookies to serve relevant ads based on your visits. You may opt out anytime.'
                    : 'Advertising is currently disabled on this site. Enabling or disabling this records your preference should ads be introduced later.'}
                </span>
              </div>
              <input
                id="consent-ads-toggle"
                type="checkbox"
                checked={adsPref}
                onChange={(e) => setAdsPref(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#472C42]"
              />
            </label>
          </div>

          <p className="text-[0.72rem] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Note: In regions requiring a Google-certified Consent Management Platform (EEA, UK, Switzerland), the site administrator should pair this site with a certified CMP prior to activating Google AdSense.
          </p>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => {
                acceptEssentialOnly()
                closeModal()
              }}
              className="rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
            >
              Essential Only
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#472C42] px-5 py-2 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
