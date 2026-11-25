import { useEffect, useState } from 'react'
import { ADSENSE_CONFIG } from '../config/siteConfig'

const CONSENT_STORAGE_KEY = 'vellum_bloom_consent_v1'
const CONSENT_CHANGE_EVENT = 'vb:consent-changed'
const CONSENT_MODAL_EVENT = 'vb:open-privacy-settings'

export interface ConsentState {
  decided: boolean
  essential: true
  preferences: boolean
  personalizedAds: boolean
  updatedAt: string | null
}

const DEFAULT_CONSENT: ConsentState = {
  decided: false,
  essential: true,
  preferences: true,
  personalizedAds: false,
  updatedAt: null,
}

export function loadConsent(): ConsentState {
  if (typeof window === 'undefined') return DEFAULT_CONSENT
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return DEFAULT_CONSENT
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    return {
      decided: Boolean(parsed.decided),
      essential: true,
      preferences: parsed.preferences !== false,
      personalizedAds: Boolean(parsed.personalizedAds),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    }
  } catch {
    return DEFAULT_CONSENT
  }
}

export function saveConsent(next: Omit<ConsentState, 'essential' | 'updatedAt'>): ConsentState {
  const full: ConsentState = {
    decided: next.decided,
    essential: true,
    preferences: next.preferences,
    personalizedAds: next.personalizedAds,
    updatedAt: new Date().toISOString(),
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(full))
    } catch {
      // Ignore storage quota errors
    }
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: full }))
  }
  return full
}

export function openPrivacySettings(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(CONSENT_MODAL_EVENT))
}

export function canLoadAdSense(consent: ConsentState): boolean {
  return Boolean(ADSENSE_CONFIG.enabled && ADSENSE_CONFIG.clientId && consent.decided && consent.personalizedAds)
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => loadConsent())

  useEffect(() => {
    const onChange = (event: Event) => {
      const custom = event as CustomEvent<ConsentState>
      setConsent(custom.detail ?? loadConsent())
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) {
        setConsent(loadConsent())
      }
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return {
    consent,
    acceptAll: () =>
      saveConsent({
        decided: true,
        preferences: true,
        personalizedAds: true,
      }),
    acceptEssentialOnly: () =>
      saveConsent({
        decided: true,
        preferences: false,
        personalizedAds: false,
      }),
    updatePreferences: (preferences: boolean, personalizedAds: boolean) =>
      saveConsent({
        decided: true,
        preferences,
        personalizedAds,
      }),
  }
}

export { CONSENT_MODAL_EVENT }
