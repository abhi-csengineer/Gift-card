import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  EyeOff,
  FileText,
  MessageCircle,
  Reply,
  RotateCcw,
  Share2,
  Sparkles,
} from 'lucide-react'
import { CARD_TEMPLATES } from '../data/catalog'
import {
  buildWhatsAppShareUrl,
  decodeCardPayload,
  findLocalCardById,
} from '../utils/cardStorage'
import { exportCardToImage } from '../utils/canvasExport'
import { exportCardToPdf } from '../utils/pdfExport'
import { useReducedMotionPref } from '../utils/reducedMotion'
import { EnvelopeReveal } from '../components/EnvelopeReveal'
import { SeoHead } from '../components/SeoHead'
import { Toast, type ToastNotice } from '../components/Toast'

export function CardViewPage() {
  const { cardId } = useParams<{ cardId?: string }>()
  const [searchParams] = useSearchParams()
  const encoded = searchParams.get('d')

  const { reducedMotion, toggleReducedMotion } = useReducedMotionPref()
  const [ready, setReady] = useState(() => reducedMotion)
  const [opened, setOpened] = useState(false)
  const [side, setSide] = useState<'front' | 'inside'>('inside')
  const [downloading, setDownloading] = useState<'png' | 'jpeg' | 'pdf' | null>(null)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState<ToastNotice | null>(null)

  useEffect(() => {
    if (ready) return
    const timer = window.setTimeout(() => setReady(true), 380)
    return () => window.clearTimeout(timer)
  }, [ready])

  const resolution = useMemo(() => {
    if (encoded !== null) {
      const decoded = decodeCardPayload(encoded)
      if (decoded) return { status: 'ok' as const, card: decoded }
      return { status: 'invalid' as const, card: null }
    }

    if (cardId && cardId !== 'view' && cardId !== 'sample') {
      const localMatch = findLocalCardById(cardId)
      if (localMatch) return { status: 'ok' as const, card: localMatch }
      return { status: 'not-found' as const, card: null }
    }

    const fallback = CARD_TEMPLATES[0]
    return {
      status: 'ok' as const,
      card: {
        id: 'sample',
        templateId: fallback.id,
        recipientName: 'Someone Wonderful',
        senderName: 'Vellum & Bloom',
        relationship: 'Dear Friend',
        headline: fallback.defaultHeadline,
        message: fallback.defaultMessage,
        paletteId: fallback.defaultPaletteId,
        backgroundMode: 'palette' as const,
        pattern: fallback.defaultPattern,
        fontId: fallback.defaultFontId,
        fontSize: 'md' as const,
        textAlign: 'center' as const,
        layout: 'portrait' as const,
        effects: fallback.defaultEffects ?? ['flowers'],
        stickers: fallback.defaultStickers ?? ['pressed-rose'],
        sealText: fallback.sealInitial,
        giftNote: '',
        updatedAt: '2026-11-24T00:00:00.000Z',
      },
    }
  }, [cardId, encoded])

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    window.setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr))
    }, 3200)
  }

  const handleDownload = async (format: 'png' | 'jpeg' | 'pdf') => {
    if (!resolution.card || downloading !== null) return
    setDownloading(format)
    try {
      if (format === 'pdf') {
        const filename = await exportCardToPdf(resolution.card)
        showToast('success', `Saved complete 2-page PDF (${filename}).`)
      } else {
        await exportCardToImage(resolution.card, format)
        showToast('success', `Saved keepsake as ${format.toUpperCase()}.`)
      }
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : `Unable to export ${format === 'pdf' ? 'PDF' : format.toUpperCase()} in this browser.`
      showToast('error', msg)
    } finally {
      setDownloading(null)
    }
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyShareLink = async () => {
    if (!currentUrl) return
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      showToast('success', 'Card link copied to clipboard.')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('error', 'Unable to copy link automatically.')
    }
  }

  const handleNativeShare = async () => {
    if (!resolution.card || !('share' in navigator)) return
    try {
      await navigator.share({
        title: `A keepsake card for ${resolution.card.recipientName || 'you'}`,
        text: "I've created something special for you! Open your card here:",
        url: currentUrl,
      })
    } catch {
      // Dismissed
    }
  }

  // Friendly Error Page for invalid or expired/corrupted links
  if (resolution.status !== 'ok' || !resolution.card) {
    return (
      <div className="paper-grain py-20 px-4">
        <SeoHead
          title="Card Link Unavailable"
          description="This shared greeting card link could not be opened."
          noIndex
        />
        <div
          className="mx-auto max-w-lg rounded-[2rem] border p-8 sm:p-10 text-center space-y-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--bg-blush)', color: '#B5546D' }}
          >
            <AlertCircle className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Card Link Unavailable
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            We Could Not Open This Keepsake
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {resolution.status === 'invalid'
              ? 'This shared card URL appears incomplete or altered. Ask the sender to re-copy the full link or send a PNG/JPG image.'
              : 'This card ID is not saved in this browser and does not contain encoded card data. Only links generated with the Share button can be opened across devices.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3]"
            >
              <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              <span>Create Your Own Card</span>
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center rounded-full border px-6 py-2.5 text-sm font-semibold"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const card = resolution.card
  const replyUrl = `/create?replyTo=${encodeURIComponent(card.senderName || '')}&from=${encodeURIComponent(card.recipientName || '')}`
  const whatsAppUrl = currentUrl ? buildWhatsAppShareUrl(card, currentUrl) : '#'

  return (
    <div className="paper-grain py-12 sm:py-18">
      <SeoHead
        title="A Keepsake Card for You"
        description="Open your personalized digital greeting card on Vellum & Bloom."
        noIndex
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
        {/* Top Accessibility Bar */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleReducedMotion}
            aria-pressed={reducedMotion}
            className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer"
            style={{
              backgroundColor: reducedMotion ? 'var(--bg-blush)' : 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{reducedMotion ? 'Reduced Motion On' : 'Reduce Motion'}</span>
          </button>

          {opened && (
            <button
              type="button"
              onClick={() => setOpened(false)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Replay Envelope</span>
            </button>
          )}
        </div>

        {/* Loading State vs Envelope Reveal */}
        {!ready ? (
          <div className="mx-auto max-w-md py-16 space-y-4" aria-busy="true" aria-label="Preparing your greeting card">
            <div
              className="mx-auto h-16 w-16 animate-pulse rounded-full border-2 flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-blush)', borderColor: '#D9B77E' }}
            >
              <Sparkles className="h-6 w-6 text-[#472C42]" aria-hidden="true" />
            </div>
            <p className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Unsealing your keepsake...
            </p>
          </div>
        ) : (
          <EnvelopeReveal
            card={card}
            opened={opened}
            onOpen={() => setOpened(true)}
            side={side}
            onToggleSide={() => setSide((s) => (s === 'front' ? 'inside' : 'front'))}
            reducedMotion={reducedMotion}
          />
        )}

        {/* Post-Reveal Actions */}
        {ready && opened && (
          <div className="space-y-5 pt-2">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => handleDownload('png')}
                disabled={downloading !== null}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-60"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{downloading === 'png' ? 'Preparing PNG...' : 'Download PNG'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('jpeg')}
                disabled={downloading !== null}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-60"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{downloading === 'jpeg' ? 'Preparing JPG...' : 'Download JPG'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('pdf')}
                disabled={downloading !== null}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-60"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <FileText className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                <span>
                  {downloading === 'pdf'
                    ? 'Preparing PDF...'
                    : 'Download Complete Card (PDF)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#256D4B]" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#256D4B] px-4 py-2 text-xs font-semibold text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Share on WhatsApp</span>
              </a>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Share</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to={replyUrl}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Reply className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Send a Reply Card</span>
              </Link>

              <Link
                to="/create"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Create Your Own Card</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Toast notice={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
