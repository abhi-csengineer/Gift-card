import {
  BACKGROUND_PATTERNS,
  CARD_FONTS,
  CARD_PALETTES,
  CARD_TEMPLATES,
  DECORATIVE_EFFECT_OPTIONS,
  GRADIENT_PRESETS,
  STICKER_OPTIONS,
  getTemplateById,
} from '../data/catalog'
import type {
  BackgroundPattern,
  CardFontId,
  CardFontSize,
  CardLayout,
  CardTextAlign,
  DecorativeEffect,
  PersonalizedCard,
  StickerId,
} from '../types/card'

const DRAFTS_KEY = 'cardelle_drafts_v1'
const FAVORITES_KEY = 'cardelle_favorites_v1'
const SHARED_CARDS_KEY = 'cardelle_shared_v1'
const LEGACY_DRAFTS_KEY = 'vellum_bloom_drafts_v1'
const LEGACY_FAVORITES_KEY = 'vellum_bloom_favorites_v1'
const LEGACY_SHARED_CARDS_KEY = 'vellum_bloom_shared_v1'

export const MAX_SAFE_URL_LENGTH = 1900
export const MAX_ENCODED_PAYLOAD_LENGTH = 8192

const ALLOWED_PATTERNS = new Set<string>(BACKGROUND_PATTERNS.map((p) => p.id))
const ALLOWED_FONTS = new Set<string>(CARD_FONTS.map((f) => f.id))
const ALLOWED_PALETTES = new Set<string>(CARD_PALETTES.map((p) => p.id))
const ALLOWED_GRADIENTS = new Set<string>(GRADIENT_PRESETS.map((g) => g.id))
const ALLOWED_EFFECTS = new Set<string>(DECORATIVE_EFFECT_OPTIONS.map((e) => e.id))
const ALLOWED_STICKERS = new Set<string>(STICKER_OPTIONS.map((s) => s.id))
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/

export function sanitizeTextInput(value: unknown, maxLength: number, fallback = ''): string {
  if (typeof value !== 'string') return fallback
  // Strip unsafe ASCII control chars (keep tabs/newlines/carriage returns and normal Unicode)
  let cleaned = ''
  for (let i = 0; i < value.length && cleaned.length < maxLength; i++) {
    const code = value.charCodeAt(i)
    if (code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127)) {
      cleaned += value[i]
    }
  }
  return cleaned
}

export function sanitizeHexColor(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return HEX_COLOR_RE.test(trimmed) ? trimmed : undefined
}

export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export function loadDrafts(): PersonalizedCard[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY) ?? localStorage.getItem(LEGACY_DRAFTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as PersonalizedCard[]) : []
  } catch {
    return []
  }
}

export function saveDraft(card: PersonalizedCard): PersonalizedCard[] {
  const existing = loadDrafts().filter((d) => d.id !== card.id)
  const updated = [{ ...card, updatedAt: new Date().toISOString() }, ...existing].slice(0, 24)
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated))
  } catch {
    // Ignore storage quota errors
  }
  return updated
}

export function deleteDraft(id: string): PersonalizedCard[] {
  const updated = loadDrafts().filter((d) => d.id !== id)
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated))
  } catch {
    // Ignore
  }
  return updated
}

export function saveSharedCardLocally(shortId: string, card: PersonalizedCard): void {
  try {
    const raw = localStorage.getItem(SHARED_CARDS_KEY) ?? localStorage.getItem(LEGACY_SHARED_CARDS_KEY)
    const map: Record<string, PersonalizedCard> = raw ? JSON.parse(raw) : {}
    map[shortId] = { ...card, updatedAt: new Date().toISOString() }
    const keys = Object.keys(map)
    if (keys.length > 30) {
      delete map[keys[0]]
    }
    localStorage.setItem(SHARED_CARDS_KEY, JSON.stringify(map))
  } catch {
    // Ignore storage errors
  }
}

export function findLocalCardById(cardId: string): PersonalizedCard | null {
  try {
    if (!/^(?:cd|vb)-[a-z0-9]{4,12}$/.test(cardId) && !/^draft-\d+$/.test(cardId)) {
      return null
    }
    const drafts = loadDrafts()
    const draftMatch = drafts.find((d) => d.id === cardId)
    if (draftMatch) return draftMatch

    const raw = localStorage.getItem(SHARED_CARDS_KEY) ?? localStorage.getItem(LEGACY_SHARED_CARDS_KEY)
    if (!raw) return null
    const map = JSON.parse(raw) as Record<string, PersonalizedCard>
    return map[cardId] ?? null
  } catch {
    return null
  }
}

export function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY) ?? localStorage.getItem(LEGACY_FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

export function toggleFavoriteId(templateId: string): string[] {
  const current = loadFavorites()
  const exists = current.includes(templateId)
  const updated = exists ? current.filter((id) => id !== templateId) : [templateId, ...current]
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  } catch {
    // Ignore
  }
  return updated
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(str: string): Uint8Array {
  if (!/^[A-Za-z0-9\-_]+$/.test(str)) {
    throw new Error('Invalid base64url characters')
  }
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function generateShortCardId(card: PersonalizedCard): string {
  const seed = `${card.templateId}:${card.recipientName}:${card.senderName}:${card.headline}:${Date.now()}`
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  const code = (hash >>> 0).toString(36).padStart(6, '0').slice(0, 7)
  return `cd-${code}`
}

export function encodeCardPayload(card: PersonalizedCard): string {
  const tpl = getTemplateById(card.templateId)
  // Omit fields equal to template defaults to keep URL compact
  const compact: Record<string, unknown> = {
    t: tpl.id,
    r: sanitizeTextInput(card.recipientName, 60),
    s: sanitizeTextInput(card.senderName, 60),
    h: sanitizeTextInput(card.headline, 100),
    m: sanitizeTextInput(card.message, 600),
  }

  if (card.relationship?.trim()) compact.rel = sanitizeTextInput(card.relationship.trim(), 40)
  if (card.paletteId !== tpl.defaultPaletteId && ALLOWED_PALETTES.has(card.paletteId)) {
    compact.p = card.paletteId
  }
  if (card.backgroundMode && card.backgroundMode !== 'palette') compact.bm = card.backgroundMode
  if (card.backgroundMode === 'solid' && sanitizeHexColor(card.customBgColor)) {
    compact.bc = sanitizeHexColor(card.customBgColor)
  }
  if (card.backgroundMode === 'gradient') {
    if (card.gradientId && ALLOWED_GRADIENTS.has(card.gradientId)) compact.gi = card.gradientId
    const fromColor = sanitizeHexColor(card.customGradientFrom)
    const toColor = sanitizeHexColor(card.customGradientTo)
    if (fromColor) compact.gf = fromColor
    if (toColor) compact.gt = toColor
  }
  const textColor = sanitizeHexColor(card.customTextColor)
  if (textColor) compact.tc = textColor
  if (card.pattern !== tpl.defaultPattern && ALLOWED_PATTERNS.has(card.pattern)) {
    compact.bg = card.pattern
  }
  if (card.fontId !== tpl.defaultFontId && ALLOWED_FONTS.has(card.fontId)) {
    compact.f = card.fontId
  }
  if (card.fontSize && card.fontSize !== 'md') compact.fs = card.fontSize
  if (card.textAlign && card.textAlign !== 'center') compact.ta = card.textAlign
  if (card.layout && card.layout !== 'portrait') compact.ly = card.layout
  const defaultEffects = tpl.defaultEffects ?? []
  const sanitizedEffects = (card.effects ?? []).filter((e) => ALLOWED_EFFECTS.has(e)).slice(0, 4)
  if (
    sanitizedEffects.length !== defaultEffects.length ||
    sanitizedEffects.some((e, i) => e !== defaultEffects[i])
  ) {
    compact.ef = sanitizedEffects
  }

  const defaultStickers = tpl.defaultStickers ?? []
  const sanitizedStickers = (card.stickers ?? []).filter((s) => ALLOWED_STICKERS.has(s)).slice(0, 6)
  if (
    sanitizedStickers.length !== defaultStickers.length ||
    sanitizedStickers.some((s, i) => s !== defaultStickers[i])
  ) {
    compact.st = sanitizedStickers
  }
  if (card.sealText && card.sealText !== tpl.sealInitial) {
    compact.seal = sanitizeTextInput(card.sealText, 4)
  }
  if (card.giftNote?.trim()) compact.g = sanitizeTextInput(card.giftNote.trim(), 200)

  const bytes = new TextEncoder().encode(JSON.stringify(compact))
  return toBase64Url(bytes)
}

export function decodeCardPayload(encoded: string): PersonalizedCard | null {
  try {
    if (!encoded || encoded.length > MAX_ENCODED_PAYLOAD_LENGTH) return null
    const bytes = fromBase64Url(encoded)
    if (bytes.byteLength > MAX_ENCODED_PAYLOAD_LENGTH) return null

    const json = new TextDecoder().decode(bytes)
    const obj = JSON.parse(json) as Record<string, unknown>
    if (!obj || typeof obj !== 'object' || Array.isArray(obj) || typeof obj.t !== 'string') {
      return null
    }

    const templateExists = CARD_TEMPLATES.some((t) => t.id === obj.t)
    const tpl = getTemplateById(templateExists ? (obj.t as string) : CARD_TEMPLATES[0].id)

    const effects = Array.isArray(obj.ef)
      ? (obj.ef
          .filter((e): e is DecorativeEffect => typeof e === 'string' && ALLOWED_EFFECTS.has(e))
          .slice(0, 4) as DecorativeEffect[])
      : tpl.defaultEffects ?? []

    const stickers = Array.isArray(obj.st)
      ? (obj.st
          .filter((s): s is StickerId => typeof s === 'string' && ALLOWED_STICKERS.has(s))
          .slice(0, 6) as StickerId[])
      : tpl.defaultStickers ?? []

    const paletteId =
      typeof obj.p === 'string' && ALLOWED_PALETTES.has(obj.p) ? obj.p : tpl.defaultPaletteId

    const pattern = (
      typeof obj.bg === 'string' && ALLOWED_PATTERNS.has(obj.bg) ? obj.bg : tpl.defaultPattern
    ) as BackgroundPattern

    const fontId = (
      typeof obj.f === 'string' && ALLOWED_FONTS.has(obj.f) ? obj.f : tpl.defaultFontId
    ) as CardFontId

    const gradientId =
      typeof obj.gi === 'string' && ALLOWED_GRADIENTS.has(obj.gi) ? obj.gi : undefined

    return {
      id: 'shared-view',
      templateId: tpl.id,
      recipientName: sanitizeTextInput(obj.r, 60, 'Someone Special'),
      senderName: sanitizeTextInput(obj.s, 60, 'With Love'),
      relationship: sanitizeTextInput(obj.rel, 40, ''),
      headline: sanitizeTextInput(obj.h, 100, tpl.defaultHeadline),
      message: sanitizeTextInput(obj.m, 600, tpl.defaultMessage),
      paletteId,
      backgroundMode:
        obj.bm === 'solid' || obj.bm === 'gradient' || obj.bm === 'palette' ? obj.bm : 'palette',
      customBgColor: sanitizeHexColor(obj.bc),
      gradientId,
      customGradientFrom: sanitizeHexColor(obj.gf),
      customGradientTo: sanitizeHexColor(obj.gt),
      customTextColor: sanitizeHexColor(obj.tc),
      pattern,
      fontId,
      fontSize:
        obj.fs === 'sm' || obj.fs === 'md' || obj.fs === 'lg' || obj.fs === 'xl'
          ? (obj.fs as CardFontSize)
          : 'md',
      textAlign:
        obj.ta === 'left' || obj.ta === 'center' || obj.ta === 'right'
          ? (obj.ta as CardTextAlign)
          : 'center',
      layout:
        obj.ly === 'portrait' || obj.ly === 'landscape' || obj.ly === 'square'
          ? (obj.ly as CardLayout)
          : tpl.defaultLayout ?? 'portrait',
      effects,
      stickers,
      sealText: sanitizeTextInput(obj.seal, 4, tpl.sealInitial) || tpl.sealInitial,
      giftNote: sanitizeTextInput(obj.g, 200, ''),
      updatedAt: '2026-11-25T00:00:00.000Z',
    }
  } catch {
    return null
  }
}

export function buildShareUrl(card: PersonalizedCard): {
  url: string
  shortId: string
  encoded: string
  isLarge: boolean
} {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const shortId = generateShortCardId(card)
  saveSharedCardLocally(shortId, card)
  const encoded = encodeCardPayload(card)
  const url = `${origin}/card/${shortId}?d=${encoded}`
  return {
    url,
    shortId,
    encoded,
    isLarge: url.length > MAX_SAFE_URL_LENGTH,
  }
}

export function buildWhatsAppShareUrl(card: PersonalizedCard, shareUrl: string): string {
  const recipient = sanitizeTextInput(card.recipientName, 60).trim()
  const sender = sanitizeTextInput(card.senderName, 60).trim()
  const greeting = recipient
    ? `I made a Cardelle card for you, ${recipient}! Open it here: ${shareUrl}`
    : `I made a Cardelle card for you! Open it here: ${shareUrl}`
  const text = sender ? `${greeting}\n\n— ${sender}` : greeting
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
