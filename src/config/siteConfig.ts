const DEFAULT_CONTACT_EMAIL = 'abhi.ytcreator01@gmail.com'
const DEFAULT_LOCATION_LABEL = 'Rupaspur, Bihar 801503, India'

const rawSiteUrl = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')
const rawContactEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim()
const rawLocation = (import.meta.env.VITE_CONTACT_LOCATION ?? '').trim()
const rawAdsenseClient = (import.meta.env.VITE_ADSENSE_CLIENT_ID ?? '').trim()
const rawAdsenseEnabled = (import.meta.env.VITE_ADSENSE_ENABLED ?? '').trim().toLowerCase()

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function isValidAdsenseClientId(value: string): boolean {
  return /^ca-pub-\d{10,20}$/.test(value)
}

const resolvedContactEmail = isValidEmail(rawContactEmail)
  ? rawContactEmail
  : DEFAULT_CONTACT_EMAIL

const resolvedLocation = rawLocation || DEFAULT_LOCATION_LABEL

export const SITE_CONFIG = {
  brandName: 'Vellum & Bloom',
  legalBrandLabel: 'Vellum & Bloom Digital Stationery',
  tagline: 'Bespoke Digital Greeting Cards & Editorial Stationery',
  description:
    'Create, personalize, and share heartfelt digital greeting cards with original botanical artwork, refined typography, and instant envelope reveals.',
  lastPolicyUpdate: 'November 25, 2026',
  configuredOrigin: rawSiteUrl,
  hasConfiguredOrigin: Boolean(rawSiteUrl),
  contactEmail: resolvedContactEmail,
  contactEmailDisplay: resolvedContactEmail,
  hasConfiguredEmail: true,
  locationLabel: resolvedLocation,
  googleAdsSettingsUrl: 'https://adssettings.google.com/',
  aboutAdsOptOutUrl: 'https://www.aboutads.info/choices/',
  yourOnlineChoicesEuUrl: 'https://www.youronlinechoices.com/',
  googlePartnerPrivacyUrl: 'https://policies.google.com/technologies/partner-sites',
} as const

export function getCanonicalOrigin(): string {
  if (SITE_CONFIG.configuredOrigin) {
    return SITE_CONFIG.configuredOrigin
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'https://example.com'
}

export function buildCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${getCanonicalOrigin()}${cleanPath}`
}

export const ADSENSE_CONFIG = {
  // Advertising stays strictly disabled unless explicitly enabled AND paired with a real publisher ID
  enabled: rawAdsenseEnabled === 'true' && isValidAdsenseClientId(rawAdsenseClient),
  clientId: isValidAdsenseClientId(rawAdsenseClient) ? rawAdsenseClient : '',
  slots: {
    home: (import.meta.env.VITE_ADSENSE_SLOT_HOME ?? '').trim(),
    explore: (import.meta.env.VITE_ADSENSE_SLOT_EXPLORE ?? '').trim(),
    article: (import.meta.env.VITE_ADSENSE_SLOT_ARTICLE ?? '').trim(),
  },
} as const

export type AdSlotLocation = keyof typeof ADSENSE_CONFIG.slots
