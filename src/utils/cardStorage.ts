import type { PersonalizedCard } from '../types/card'

const DRAFTS_KEY = 'vellum_bloom_drafts_v1'
const FAVORITES_KEY = 'vellum_bloom_favorites_v1'

export function loadDrafts(): PersonalizedCard[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as PersonalizedCard[]) : []
  } catch {
    return []
  }
}

export function saveDraft(card: PersonalizedCard): PersonalizedCard[] {
  const existing = loadDrafts().filter((d) => d.id !== card.id)
  const updated = [{ ...card, updatedAt: new Date().toISOString() }, ...existing].slice(0, 20)
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

export function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
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
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function encodeCardPayload(card: PersonalizedCard): string {
  const compact = {
    t: card.templateId,
    r: card.recipientName,
    s: card.senderName,
    h: card.headline,
    m: card.message,
    p: card.paletteId,
    bg: card.pattern,
    f: card.fontId,
    seal: card.sealText,
    g: card.giftNote,
  }
  const bytes = new TextEncoder().encode(JSON.stringify(compact))
  return toBase64Url(bytes)
}

export function decodeCardPayload(encoded: string): PersonalizedCard | null {
  try {
    const bytes = fromBase64Url(encoded)
    const json = new TextDecoder().decode(bytes)
    const obj = JSON.parse(json) as Record<string, string>
    if (!obj || typeof obj.t !== 'string') return null
    return {
      id: 'shared-view',
      templateId: obj.t,
      recipientName: typeof obj.r === 'string' ? obj.r : 'Someone Special',
      senderName: typeof obj.s === 'string' ? obj.s : 'With Love',
      headline: typeof obj.h === 'string' ? obj.h : 'Warmest Wishes',
      message: typeof obj.m === 'string' ? obj.m : '',
      paletteId: typeof obj.p === 'string' ? obj.p : 'warm-ivory',
      pattern: (obj.bg as PersonalizedCard['pattern']) || 'foil-arch',
      fontId: (obj.f as PersonalizedCard['fontId']) || 'editorial-serif',
      sealText: typeof obj.seal === 'string' ? obj.seal : 'V',
      giftNote: typeof obj.g === 'string' ? obj.g : '',
      updatedAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function buildShareUrl(card: PersonalizedCard): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const encoded = encodeCardPayload(card)
  return `${origin}/card/view?d=${encoded}`
}

export function buildWhatsAppShareUrl(card: PersonalizedCard, shareUrl: string): string {
  const recipient = card.recipientName.trim() || 'you'
  const sender = card.senderName.trim() || 'Someone who cares'
  const text = `I crafted a personalized digital greeting card for ${recipient} on Vellum & Bloom ✨\n\nOpen your keepsake card here:\n${shareUrl}\n\n— ${sender}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
