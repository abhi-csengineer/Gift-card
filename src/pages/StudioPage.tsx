import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FolderHeart,
  Mail,
  MessageCircle,
  RotateCw,
  Save,
  Share2,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from 'lucide-react'
import {
  BACKGROUND_PATTERNS,
  CARD_FONTS,
  CARD_PALETTES,
  CARD_TEMPLATES,
  MESSAGE_PROMPTS,
  getTemplateById,
} from '../data/catalog'
import type { PersonalizedCard } from '../types/card'
import {
  buildShareUrl,
  buildWhatsAppShareUrl,
  deleteDraft,
  loadDrafts,
  saveDraft,
} from '../utils/cardStorage'
import { exportCardToPng } from '../utils/canvasExport'
import { GreetingCardPreview } from '../components/GreetingCardPreview'

function createInitialCard(templateId?: string): PersonalizedCard {
  const tpl = getTemplateById(templateId ?? CARD_TEMPLATES[0].id)
  return {
    id: `draft-${Date.now()}`,
    templateId: tpl.id,
    recipientName: '',
    senderName: '',
    headline: tpl.defaultHeadline,
    message: tpl.defaultMessage,
    paletteId: tpl.defaultPaletteId,
    pattern: tpl.defaultPattern,
    fontId: tpl.defaultFontId,
    sealText: tpl.sealInitial,
    giftNote: '',
    updatedAt: new Date().toISOString(),
  }
}

export function StudioPage() {
  const { templateId } = useParams<{ templateId?: string }>()
  const [card, setCard] = useState<PersonalizedCard>(() => createInitialCard(templateId))
  const [previewSide, setPreviewSide] = useState<'front' | 'inside'>('inside')
  const [drafts, setDrafts] = useState<PersonalizedCard[]>(() => loadDrafts())
  const [draftSavedNotice, setDraftSavedNotice] = useState('')
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const lastAnnouncementRef = useRef('')

  const shareDialogRef = useRef<HTMLDialogElement>(null)
  const draftsDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (templateId) {
      const tpl = getTemplateById(templateId)
      setCard((prev) => ({
        ...prev,
        templateId: tpl.id,
        headline: tpl.defaultHeadline,
        message: tpl.defaultMessage,
        paletteId: tpl.defaultPaletteId,
        pattern: tpl.defaultPattern,
        fontId: tpl.defaultFontId,
        sealText: tpl.sealInitial,
      }))
    }
  }, [templateId])

  const activeTemplate = useMemo(() => getTemplateById(card.templateId), [card.templateId])
  const promptSuggestions =
    MESSAGE_PROMPTS[activeTemplate.occasion] ?? MESSAGE_PROMPTS.Default

  const updateField = <K extends keyof PersonalizedCard>(key: K, value: PersonalizedCard[K]) => {
    setCard((prev) => ({ ...prev, [key]: value }))
  }

  const handleTemplateSwitch = (nextId: string) => {
    const tpl = getTemplateById(nextId)
    setCard((prev) => ({
      ...prev,
      templateId: tpl.id,
      headline: tpl.defaultHeadline,
      paletteId: tpl.defaultPaletteId,
      pattern: tpl.defaultPattern,
      fontId: tpl.defaultFontId,
      sealText: tpl.sealInitial,
    }))
  }

  const handleSaveDraft = () => {
    const next = saveDraft(card)
    setDrafts(next)
    setDraftSavedNotice('Saved to browser drafts')
    window.setTimeout(() => setDraftSavedNotice(''), 2500)
  }

  const handleOpenShare = () => {
    const next = saveDraft(card)
    setDrafts(next)
    const url = buildShareUrl(card)
    setShareUrl(url)
    setCopyState('idle')
    setStatusMessage('')
    shareDialogRef.current?.showModal()
  }

  const handleCopyLink = async () => {
    if (!shareUrl) return
    let ok = false
    try {
      await navigator.clipboard.writeText(shareUrl)
      ok = true
    } catch {
      // Fallback for non-HTTPS contexts
      const previousFocus = document.activeElement as HTMLElement | null
      const field = Object.assign(document.createElement('textarea'), { value: shareUrl })
      field.setAttribute('readonly', '')
      field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0'
      document.body.append(field)
      field.select()
      try {
        ok = document.execCommand('copy')
      } finally {
        field.remove()
        previousFocus?.focus({ preventScroll: true })
      }
    }

    setCopyState(ok ? 'copied' : 'failed')
    let msg = ok ? 'Copied' : 'Copy failed'
    if (msg === lastAnnouncementRef.current) {
      msg += '\u00A0'
    }
    lastAnnouncementRef.current = msg
    setStatusMessage('')
    requestAnimationFrame(() => setStatusMessage(msg))
    window.setTimeout(() => {
      setCopyState('idle')
      setStatusMessage('')
    }, 2200)
  }

  const handleNativeShare = async () => {
    if (!shareUrl || !('share' in navigator)) return
    try {
      await navigator.share({
        title: `A card for ${card.recipientName || 'you'} from Vellum & Bloom`,
        text: `${card.senderName || 'Someone special'} sent you a personalized digital greeting card.`,
        url: shareUrl,
      })
    } catch {
      // User dismissed share sheet
    }
  }

  const handleDownloadPng = async () => {
    setExporting(true)
    setExportError('')
    try {
      await exportCardToPng(card)
    } catch {
      setExportError('Unable to generate PNG in this browser. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const whatsAppUrl = shareUrl ? buildWhatsAppShareUrl(card, shareUrl) : '#'
  const mailtoUrl = shareUrl
    ? `mailto:?subject=${encodeURIComponent(
        `A personalized card for ${card.recipientName || 'you'}`,
      )}&body=${encodeURIComponent(
        `I created a digital greeting card for you on Vellum & Bloom:\n\n${shareUrl}\n\n— ${
          card.senderName || 'With Love'
        }`,
      )}`
    : '#'

  return (
    <div className="paper-grain py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Studio Bar */}
        <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              Card Personalization Studio
            </p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {activeTemplate.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => draftsDialogRef.current?.showModal()}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <FolderHeart className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              <span>Drafts ({drafts.length})</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              <span>{draftSavedNotice || 'Save Draft'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={exporting}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-60"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{exporting ? 'Rendering PNG...' : 'Download PNG'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenShare}
              className="inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #472C42 0%, #663E5F 100%)' }}
            >
              <Share2 className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              <span>Share Card</span>
            </button>
          </div>
        </div>

        {exportError && (
          <p role="alert" className="mt-4 rounded-2xl border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200">
            {exportError}
          </p>
        )}

        {/* Main Split Workspace */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Sticky Live Card Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex rounded-full border p-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setPreviewSide('front')}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: previewSide === 'front' ? '#472C42' : 'transparent',
                    color: previewSide === 'front' ? '#FFF9F3' : 'var(--text-secondary)',
                  }}
                >
                  Front Cover
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewSide('inside')}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: previewSide === 'inside' ? '#472C42' : 'transparent',
                    color: previewSide === 'inside' ? '#FFF9F3' : 'var(--text-secondary)',
                  }}
                >
                  Inside Message
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPreviewSide((s) => (s === 'front' ? 'inside' : 'front'))}
                className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Flip card</span>
              </button>
            </div>

            <GreetingCardPreview
              templateId={card.templateId}
              paletteId={card.paletteId}
              pattern={card.pattern}
              fontId={card.fontId}
              headline={card.headline}
              recipientName={card.recipientName}
              senderName={card.senderName}
              message={card.message}
              sealText={card.sealText}
              giftNote={card.giftNote}
              side={previewSide}
            />

            <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
              Live preview updates instantaneously and exports at 1200×1600px HD PNG.
            </p>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Template Switcher */}
            <section
              className="rounded-3xl border p-5 sm:p-6 space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  1. Choose Artwork Design
                </h2>
                <Link to="/explore" className="text-xs font-semibold hover:underline" style={{ color: 'var(--accent-rose)' }}>
                  Full gallery
                </Link>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {CARD_TEMPLATES.map((tpl) => {
                  const active = tpl.id === card.templateId
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleTemplateSwitch(tpl.id)}
                      className="shrink-0 rounded-2xl border px-3.5 py-2 text-left transition-all cursor-pointer"
                      style={{
                        backgroundColor: active ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                        borderColor: active ? 'var(--accent-rose)' : 'var(--border-subtle)',
                      }}
                    >
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {tpl.title}
                      </p>
                      <p className="text-[0.68rem]" style={{ color: 'var(--text-muted)' }}>
                        {tpl.occasion}
                      </p>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* 2. Personal Message & Names */}
            <section
              className="rounded-3xl border p-5 sm:p-6 space-y-5"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                2. Personalize Names &amp; Heartfelt Message
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="recipient-name" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Recipient Name
                  </label>
                  <input
                    id="recipient-name"
                    type="text"
                    value={card.recipientName}
                    onChange={(e) => updateField('recipientName', e.target.value)}
                    placeholder="e.g., Elena"
                    className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="sender-name" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    From (Your Name)
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    value={card.senderName}
                    onChange={(e) => updateField('senderName', e.target.value)}
                    placeholder="e.g., Julian"
                    className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <label htmlFor="card-headline" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Cover Headline
                  </label>
                  <input
                    id="card-headline"
                    type="text"
                    value={card.headline}
                    onChange={(e) => updateField('headline', e.target.value)}
                    placeholder="Every Year With You"
                    className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="seal-initial" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Wax Seal
                  </label>
                  <input
                    id="seal-initial"
                    type="text"
                    maxLength={2}
                    value={card.sealText}
                    onChange={(e) => updateField('sealText', e.target.value.toUpperCase())}
                    placeholder="VB"
                    className="w-full rounded-2xl border px-4 py-2.5 text-center text-sm font-semibold uppercase focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="card-message" className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Heartfelt Message
                  </label>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {card.message.length}/380
                  </span>
                </div>
                <textarea
                  id="card-message"
                  rows={4}
                  maxLength={380}
                  value={card.message}
                  onFocus={() => setPreviewSide('inside')}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Write something memorable..."
                  className="w-full rounded-2xl border px-4 py-3 text-sm leading-relaxed focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                />

                {/* Quick inspiration prompts */}
                <div className="mt-2.5 space-y-1.5">
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    <Wand2 className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                    <span>Need inspiration? Click a line to use it:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {promptSuggestions.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          updateField('message', prompt)
                          setPreviewSide('inside')
                        }}
                        className="rounded-xl border px-3 py-1.5 text-left text-xs transition-colors hover:opacity-85 cursor-pointer"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        “{prompt.slice(0, 56)}...”
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="gift-note" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Optional Gift Promise / Treat Note
                </label>
                <input
                  id="gift-note"
                  type="text"
                  maxLength={65}
                  value={card.giftNote}
                  onFocus={() => setPreviewSide('inside')}
                  onChange={(e) => updateField('giftNote', e.target.value)}
                  placeholder="e.g., Dinner at our favorite trattoria is on me this Friday"
                  className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </section>

            {/* 3. Colors, Background & Typography */}
            <section
              className="rounded-3xl border p-5 sm:p-6 space-y-6"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                3. Color Theme, Paper Finish &amp; Typography
              </h2>

              {/* Color Palettes */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  Color Theme
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {CARD_PALETTES.map((pal) => {
                    const selected = card.paletteId === pal.id
                    return (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => updateField('paletteId', pal.id)}
                        className="flex items-center gap-2.5 rounded-2xl border p-2.5 text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: selected ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                          borderColor: selected ? 'var(--accent-rose)' : 'var(--border-subtle)',
                        }}
                      >
                        <span
                          className="h-7 w-7 shrink-0 rounded-full border"
                          style={{
                            background: `linear-gradient(135deg, ${pal.bg} 45%, ${pal.accent} 100%)`,
                            borderColor: pal.foil,
                          }}
                        />
                        <span className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {pal.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Background Patterns */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  Paper Border &amp; Finish
                </p>
                <div className="flex flex-wrap gap-2">
                  {BACKGROUND_PATTERNS.map((pat) => {
                    const selected = card.pattern === pat.id
                    return (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => updateField('pattern', pat.id)}
                        className="rounded-2xl border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer"
                        style={{
                          backgroundColor: selected ? '#472C42' : 'var(--bg-canvas)',
                          borderColor: selected ? '#472C42' : 'var(--border-subtle)',
                          color: selected ? '#FFF9F3' : 'var(--text-primary)',
                        }}
                        title={pat.description}
                      >
                        {pat.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Typography */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                  Typography Style
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {CARD_FONTS.map((font) => {
                    const selected = card.fontId === font.id
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => updateField('fontId', font.id)}
                        className="rounded-2xl border p-3.5 text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: selected ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                          borderColor: selected ? 'var(--accent-rose)' : 'var(--border-subtle)',
                        }}
                      >
                        <p className="text-base font-semibold" style={{ fontFamily: font.cssFamily, color: 'var(--text-primary)' }}>
                          {font.sampleText}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                          {font.name} · {font.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Share & Export Native Modal */}
      <dialog
        ref={shareDialogRef}
        aria-labelledby="share-dialog-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="w-[min(94vw,36rem)] rounded-3xl p-0"
      >
        <div className="p-6 sm:p-7 space-y-5">
          <div className="flex items-start justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-gold)' }}>
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ready to Send</span>
              </span>
              <h2 id="share-dialog-title" className="mt-1 text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Share Your Personalized Card
              </h2>
            </div>
            <button
              type="button"
              onClick={() => shareDialogRef.current?.close()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              aria-label="Close share dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Anyone who opens this link receives an animated sealed envelope addressed to{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{card.recipientName || 'Someone Special'}</strong>.
          </p>

          {/* Copyable Link Box with dedicated role="status" sibling */}
          <div className="space-y-2">
            <label htmlFor="generated-share-url" className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Shareable Keepsake Link
            </label>
            <div className="flex items-center gap-2">
              <input
                id="generated-share-url"
                type="text"
                readOnly
                value={shareUrl}
                onFocus={(e) => e.currentTarget.select()}
                className="min-w-0 flex-1 rounded-2xl border px-3.5 py-2.5 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              />
              <span className="relative inline-flex items-center">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  data-copied={copyState === 'copied' ? '' : undefined}
                  data-failed={copyState === 'failed' ? '' : undefined}
                  aria-label="Copy shareable card link"
                  className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-2xl bg-[#472C42] px-4 py-2 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
                >
                  {copyState === 'copied' ? (
                    <Check className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{copyState === 'copied' ? 'Copied' : 'Copy'}</span>
                </button>
                <span
                  role="status"
                  data-visible={Boolean(statusMessage)}
                  className="copy-status-tip absolute -top-8 right-0 rounded-lg bg-[#2A1726] px-2.5 py-1 text-[0.7rem] font-semibold text-[#FFF9F3] whitespace-nowrap"
                >
                  {statusMessage}
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#256D4B] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Send on WhatsApp</span>
            </a>

            <a
              href={mailtoUrl}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-85"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
              }}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Send via Email</span>
            </a>

            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-85 cursor-pointer"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
              }}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download PNG Image</span>
            </button>

            <Link
              to={`/card/view?d=${shareUrl.split('?d=')[1] ?? ''}`}
              onClick={() => shareDialogRef.current?.close()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-85"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-blush)',
                color: '#2A1726',
              }}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span>Preview Recipient View</span>
            </Link>
          </div>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>More System Share Options</span>
            </button>
          )}
        </div>
      </dialog>

      {/* Saved Drafts Modal */}
      <dialog
        ref={draftsDialogRef}
        aria-labelledby="drafts-dialog-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="w-[min(94vw,36rem)] rounded-3xl p-0"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <h2 id="drafts-dialog-title" className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Saved Browser Drafts
            </h2>
            <button
              type="button"
              onClick={() => draftsDialogRef.current?.close()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              aria-label="Close drafts"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {drafts.length === 0 ? (
            <p className="py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
              No saved drafts yet. Click “Save Draft” while personalizing a card to keep it here.
            </p>
          ) : (
            <ul className="space-y-2.5 max-h-[55dvh] overflow-y-auto pr-1">
              {drafts.map((d) => {
                const tpl = getTemplateById(d.templateId)
                return (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border p-3"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-subtle)' }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCard(d)
                        draftsDialogRef.current?.close()
                      }}
                      className="min-w-0 flex-1 text-left cursor-pointer"
                    >
                      <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        For {d.recipientName || 'Someone Special'} · {tpl.title}
                      </p>
                      <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                        {d.message || tpl.defaultMessage}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDrafts(deleteDraft(d.id))}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-500/10 cursor-pointer"
                      style={{ color: 'var(--text-muted)' }}
                      aria-label={`Delete draft for ${d.recipientName || 'Someone Special'}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </dialog>
    </div>
  )
}
