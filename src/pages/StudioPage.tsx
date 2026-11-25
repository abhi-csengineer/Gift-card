import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  EyeOff,
  FileText,
  FolderHeart,
  Mail,
  MessageCircle,
  RotateCcw,
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
  DECORATIVE_EFFECT_OPTIONS,
  GRADIENT_PRESETS,
  MESSAGE_PROMPTS,
  RELATIONSHIP_PRESETS,
  STICKER_OPTIONS,
  getTemplateById,
} from '../data/catalog'
import { getLoveCalendarOccasionById, resolveOccasionDate } from '../data/loveCalendar'
import { getPersonalMilestoneDefinition } from '../data/personalMilestones'
import type {
  CardFontSize,
  CardLayout,
  CardTextAlign,
  DecorativeEffect,
  PersonalizedCard,
  StickerId,
} from '../types/card'
import {
  buildShareUrl,
  buildWhatsAppShareUrl,
  deleteDraft,
  loadDrafts,
  saveDraft,
} from '../utils/cardStorage'
import { exportCardToImage } from '../utils/canvasExport'
import { exportCardToPdf } from '../utils/pdfExport'
import { useReducedMotionPref } from '../utils/reducedMotion'
import { GreetingCardPreview } from '../components/GreetingCardPreview'
import { SeoHead } from '../components/SeoHead'
import { Toast, type ToastNotice } from '../components/Toast'

const MAX_MESSAGE_CHARS = 420
const MAX_HEADLINE_CHARS = 70
const MAX_NAME_CHARS = 40
const STUDIO_CALENDAR_YEAR = new Date().getFullYear()

function createInitialCard(
  templateId?: string,
  replyTo?: string | null,
  replyFrom?: string | null,
  headlineOverride?: string | null,
  messageOverride?: string | null,
): PersonalizedCard {
  const tpl = getTemplateById(templateId ?? CARD_TEMPLATES[0].id)
  const cleanHeadline = headlineOverride?.trim()
    ? headlineOverride.trim().slice(0, MAX_HEADLINE_CHARS)
    : tpl.defaultHeadline
  const cleanMessage = messageOverride?.trim()
    ? messageOverride.trim().slice(0, MAX_MESSAGE_CHARS)
    : tpl.defaultMessage
  return {
    id: `draft-${Date.now()}`,
    templateId: tpl.id,
    recipientName: replyTo ? replyTo.slice(0, MAX_NAME_CHARS) : '',
    senderName: replyFrom ? replyFrom.slice(0, MAX_NAME_CHARS) : '',
    relationship: '',
    headline: cleanHeadline,
    message: cleanMessage,
    paletteId: tpl.defaultPaletteId,
    backgroundMode: 'palette',
    customBgColor: '#FFF9F3',
    gradientId: GRADIENT_PRESETS[0].id,
    customGradientFrom: '#FFF9F3',
    customGradientTo: '#F8DDE4',
    customTextColor: '',
    pattern: tpl.defaultPattern,
    fontId: tpl.defaultFontId,
    fontSize: 'md',
    textAlign: 'center',
    layout: tpl.defaultLayout ?? 'portrait',
    effects: tpl.defaultEffects ?? [],
    stickers: tpl.defaultStickers ?? [],
    sealText: tpl.sealInitial,
    giftNote: '',
    updatedAt: new Date().toISOString(),
  }
}

const MOBILE_STEPS = [
  { id: 0, label: '1. Names & Note' },
  { id: 1, label: '2. Colors & Type' },
  { id: 2, label: '3. Stickers & Layout' },
  { id: 3, label: '4. Preview & Share' },
]

export function StudioPage() {
  const { templateId } = useParams<{ templateId?: string }>()
  const [searchParams] = useSearchParams()
  const replyTo = searchParams.get('replyTo')
  const replyFrom = searchParams.get('from')
  const milestoneParam = searchParams.get('milestone')
  const headlineParam = searchParams.get('headline')
  const msgParam = searchParams.get('msg')

  const [card, setCard] = useState<PersonalizedCard>(() =>
    createInitialCard(templateId, replyTo, replyFrom, headlineParam, msgParam),
  )
  const [previewSide, setPreviewSide] = useState<'front' | 'inside'>('inside')
  const [drafts, setDrafts] = useState<PersonalizedCard[]>(() => loadDrafts())
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [exportingFormat, setExportingFormat] = useState<'png' | 'jpeg' | 'pdf' | null>(null)
  const [shareMeta, setShareMeta] = useState<{
    url: string
    shortId: string
    encoded: string
    isLarge: boolean
  } | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [toast, setToast] = useState<ToastNotice | null>(null)
  const [mobileStep, setMobileStep] = useState(0)
  const [openRightSection, setOpenRightSection] = useState<
    'layout' | 'template' | 'color' | 'typography' | 'decor'
  >('color')
  const [validationError, setValidationError] = useState('')

  const { reducedMotion, toggleReducedMotion } = useReducedMotionPref()
  const lastAnnouncementRef = useRef('')
  const shareDialogRef = useRef<HTMLDialogElement>(null)
  const draftsDialogRef = useRef<HTMLDialogElement>(null)

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    window.setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr))
    }, 3400)
  }

  // Sync if user navigates directly to a different template param
  const prevTemplateIdRef = useRef(templateId)
  useEffect(() => {
    if (templateId && templateId !== prevTemplateIdRef.current) {
      prevTemplateIdRef.current = templateId
      const tpl = getTemplateById(templateId)
      queueMicrotask(() => {
        setCard((prev) => ({
          ...prev,
          templateId: tpl.id,
          headline: tpl.defaultHeadline,
          message: tpl.defaultMessage,
          paletteId: tpl.defaultPaletteId,
          backgroundMode: 'palette',
          customTextColor: '',
          pattern: tpl.defaultPattern,
          fontId: tpl.defaultFontId,
          effects: tpl.defaultEffects ?? [],
          stickers: tpl.defaultStickers ?? [],
          sealText: tpl.sealInitial,
        }))
      })
    }
  }, [templateId])

  const activeTemplate = useMemo(() => getTemplateById(card.templateId), [card.templateId])
  const loveOccasion = useMemo(
    () => getLoveCalendarOccasionById(activeTemplate.loveCalendarOccasionId),
    [activeTemplate.loveCalendarOccasionId],
  )
  const loveOccasionDate = useMemo(
    () => (loveOccasion ? resolveOccasionDate(loveOccasion.dateRule, STUDIO_CALENDAR_YEAR) : null),
    [loveOccasion],
  )
  const siblingTemplates = useMemo(
    () => (loveOccasion ? loveOccasion.templateIds.map((id) => getTemplateById(id)) : []),
    [loveOccasion],
  )
  const personalMilestoneDef = useMemo(
    () => (milestoneParam ? getPersonalMilestoneDefinition(milestoneParam) : null),
    [milestoneParam],
  )
  const promptSuggestions =
    MESSAGE_PROMPTS[activeTemplate.occasion] ?? MESSAGE_PROMPTS.Default

  const updateField = <K extends keyof PersonalizedCard>(key: K, value: PersonalizedCard[K]) => {
    setValidationError('')
    setCard((prev) => ({ ...prev, [key]: value }))
  }

  const handleTemplateSwitch = (nextId: string) => {
    const tpl = getTemplateById(nextId)
    setCard((prev) => ({
      ...prev,
      templateId: tpl.id,
      headline: tpl.defaultHeadline,
      paletteId: tpl.defaultPaletteId,
      backgroundMode: 'palette',
      customTextColor: '',
      pattern: tpl.defaultPattern,
      fontId: tpl.defaultFontId,
      effects: tpl.defaultEffects ?? [],
      stickers: tpl.defaultStickers ?? [],
      sealText: tpl.sealInitial,
    }))
    showToast('success', `Switched design to ${tpl.title}`)
  }

  const toggleEffect = (effect: DecorativeEffect) => {
    const current = card.effects ?? []
    const exists = current.includes(effect)
    const next = exists ? current.filter((e) => e !== effect) : [...current, effect]
    updateField('effects', next)
  }

  const toggleSticker = (sticker: StickerId) => {
    const current = card.stickers ?? []
    const exists = current.includes(sticker)
    if (!exists && current.length >= 4) {
      showToast('error', 'You can place up to 4 corner stickers per card.')
      return
    }
    const next = exists ? current.filter((s) => s !== sticker) : [...current, sticker]
    updateField('stickers', next)
  }

  const validateForOutput = (): boolean => {
    if (!card.headline.trim() && !card.message.trim()) {
      setValidationError('Please write a headline or a short personal message before sharing or exporting.')
      showToast('error', 'Please add a headline or message before sharing.')
      return false
    }
    if (card.message.length > MAX_MESSAGE_CHARS) {
      setValidationError(`Message cannot exceed ${MAX_MESSAGE_CHARS} characters.`)
      showToast('error', `Message must be ${MAX_MESSAGE_CHARS} characters or fewer.`)
      return false
    }
    return true
  }

  const handleSaveDraft = () => {
    const next = saveDraft(card)
    setDrafts(next)
    showToast('success', 'Draft saved locally in your browser.')
  }

  const handleResetCard = () => {
    setCard(createInitialCard(card.templateId))
    setConfirmReset(false)
    setValidationError('')
    showToast('success', 'Card reset to template defaults.')
  }

  const handleOpenShare = () => {
    if (!validateForOutput()) return
    const next = saveDraft(card)
    setDrafts(next)
    const meta = buildShareUrl(card)
    setShareMeta(meta)
    setCopyState('idle')
    setStatusMessage('')
    shareDialogRef.current?.showModal()
  }

  const handleCopyLink = async () => {
    if (!shareMeta?.url) return
    let ok = false
    try {
      await navigator.clipboard.writeText(shareMeta.url)
      ok = true
    } catch {
      const previousFocus = document.activeElement as HTMLElement | null
      const field = Object.assign(document.createElement('textarea'), { value: shareMeta.url })
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
    showToast(ok ? 'success' : 'error', ok ? 'Shareable link copied to clipboard.' : 'Could not copy automatically—select and copy the link.')
    window.setTimeout(() => {
      setCopyState('idle')
      setStatusMessage('')
    }, 2200)
  }

  const handleNativeShare = async () => {
    if (!shareMeta?.url || !('share' in navigator)) return
    try {
      await navigator.share({
        title: `A card for ${card.recipientName || 'you'} from Vellum & Bloom`,
        text: "I've created something special for you! Open your card here:",
        url: shareMeta.url,
      })
      showToast('success', 'Shared via device share sheet.')
    } catch {
      // User dismissed share sheet
    }
  }

  const handleDownload = async (format: 'png' | 'jpeg' | 'pdf') => {
    if (exportingFormat !== null) return
    if (!validateForOutput()) return
    setExportingFormat(format)
    try {
      if (format === 'pdf') {
        const filename = await exportCardToPdf(card)
        showToast('success', `Downloaded complete 2-page PDF (${filename}).`)
      } else {
        await exportCardToImage(card, format)
        showToast('success', `Downloaded ${format.toUpperCase()} keepsake image.`)
      }
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : `Unable to generate ${format === 'pdf' ? 'PDF' : format.toUpperCase()} in this browser.`
      showToast('error', msg)
    } finally {
      setExportingFormat(null)
    }
  }

  const shareUrl = shareMeta?.url ?? ''
  const whatsAppUrl = shareUrl ? buildWhatsAppShareUrl(card, shareUrl) : '#'
  const mailtoUrl = shareUrl
    ? `mailto:?subject=${encodeURIComponent(
        `A personalized card for ${card.recipientName || 'you'}`,
      )}&body=${encodeURIComponent(
        `I've created something special for you! Open your card here:\n\n${shareUrl}\n\n— ${
          card.senderName || 'With Love'
        }`,
      )}`
    : '#'

  // Shared Panel Builders
  const renderRecipientAndMessageControls = () => (
    <div className="space-y-5">
      {/* A. Recipient Info */}
      <section
        className="rounded-3xl border p-5 space-y-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Recipient &amp; Sender
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label htmlFor="recipient-name" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              Recipient Name
            </label>
            <input
              id="recipient-name"
              type="text"
              maxLength={MAX_NAME_CHARS}
              value={card.recipientName}
              onChange={(e) => updateField('recipientName', e.target.value)}
              placeholder="e.g., Elena"
              className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label htmlFor="sender-name" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              From (Your Name)
            </label>
            <input
              id="sender-name"
              type="text"
              maxLength={MAX_NAME_CHARS}
              value={card.senderName}
              onChange={(e) => updateField('senderName', e.target.value)}
              placeholder="e.g., Julian"
              className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="relationship-input" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Relationship (Optional)
          </label>
          <input
            id="relationship-input"
            type="text"
            maxLength={30}
            value={card.relationship ?? ''}
            onChange={(e) => updateField('relationship', e.target.value)}
            placeholder="e.g., Girlfriend, Mom, Best Friend..."
            className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {RELATIONSHIP_PRESETS.slice(0, 6).map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => updateField('relationship', card.relationship === rel ? '' : rel)}
                className="rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: card.relationship === rel ? '#472C42' : 'var(--bg-canvas)',
                  borderColor: card.relationship === rel ? '#472C42' : 'var(--border-subtle)',
                  color: card.relationship === rel ? '#FFF9F3' : 'var(--text-secondary)',
                }}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* B. Message Editor */}
      <section
        className="rounded-3xl border p-5 space-y-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Message &amp; Heading
        </h2>

        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3">
            <label htmlFor="card-headline" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              Editable Heading
            </label>
            <input
              id="card-headline"
              type="text"
              maxLength={MAX_HEADLINE_CHARS}
              value={card.headline}
              onChange={(e) => updateField('headline', e.target.value)}
              placeholder="Every Year With You"
              className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label htmlFor="seal-initial" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              Seal
            </label>
            <input
              id="seal-initial"
              type="text"
              maxLength={2}
              value={card.sealText}
              onChange={(e) => updateField('sealText', e.target.value.toUpperCase())}
              placeholder="VB"
              className="w-full rounded-2xl border px-2 py-2 text-center text-sm font-semibold uppercase focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="card-message" className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Heartfelt Message
            </label>
            <span
              className="text-xs tabular-nums"
              style={{
                color: card.message.length > MAX_MESSAGE_CHARS - 30 ? 'var(--accent-rose)' : 'var(--text-muted)',
              }}
            >
              {card.message.length}/{MAX_MESSAGE_CHARS}
            </span>
          </div>
          <textarea
            id="card-message"
            rows={4}
            maxLength={MAX_MESSAGE_CHARS}
            value={card.message}
            onFocus={() => setPreviewSide('inside')}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Write something memorable..."
            className="w-full rounded-2xl border px-3.5 py-2.5 text-sm leading-relaxed focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          />

          <div className="mt-2 space-y-1.5">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              <Wand2 className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
              <span>
                {personalMilestoneDef
                  ? `Suggestions for ${personalMilestoneDef.name}:`
                  : loveOccasion
                    ? `Suggestions for ${loveOccasion.name}:`
                    : `Suggestions for ${activeTemplate.occasion}:`}
              </span>
            </p>
            <div className="flex flex-col gap-1.5">
              {personalMilestoneDef && personalMilestoneDef.messageSuggestions.length > 0
                ? personalMilestoneDef.messageSuggestions.map((suggestion, idx) => (
                    <button
                      key={`pm-${suggestion.tone}-${idx}`}
                      type="button"
                      onClick={() => {
                        updateField('message', suggestion.text)
                        setPreviewSide('inside')
                      }}
                      className="rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:opacity-85 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span
                        className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] mb-0.5"
                        style={{ color: 'var(--accent-rose)' }}
                      >
                        {suggestion.tone}
                      </span>
                      <span>“{suggestion.text}”</span>
                    </button>
                  ))
                : loveOccasion && loveOccasion.messageSuggestions.length > 0
                  ? loveOccasion.messageSuggestions.map((suggestion, idx) => (
                      <button
                        key={`${suggestion.tone}-${idx}`}
                        type="button"
                        onClick={() => {
                          updateField('message', suggestion.text)
                          setPreviewSide('inside')
                        }}
                        className="rounded-xl border px-3 py-2 text-left text-xs transition-colors hover:opacity-85 cursor-pointer"
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <span
                          className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] mb-0.5"
                          style={{ color: 'var(--accent-rose)' }}
                        >
                          {suggestion.tone}
                        </span>
                        <span>“{suggestion.text}”</span>
                      </button>
                    ))
                  : promptSuggestions.map((prompt, idx) => (
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
                        “{prompt}”
                      </button>
                    ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="gift-note" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
            Optional Gift Promise / Treat Note
          </label>
          <input
            id="gift-note"
            type="text"
            maxLength={70}
            value={card.giftNote}
            onFocus={() => setPreviewSide('inside')}
            onChange={(e) => updateField('giftNote', e.target.value)}
            placeholder="e.g., Coffee & pastries on me this Sunday"
            className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </section>
    </div>
  )

  const renderDesignAccordion = (
    key: 'layout' | 'template' | 'color' | 'typography' | 'decor',
    title: string,
    summary: string,
    content: React.ReactNode,
  ) => {
    const isOpen = openRightSection === key
    return (
      <div
        className="rounded-3xl border overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <button
          type="button"
          onClick={() => setOpenRightSection(key)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
        >
          <div>
            <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {title}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {summary}
            </p>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--text-muted)' }}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div className="border-t px-5 py-4 space-y-4" style={{ borderColor: 'var(--border-subtle)' }}>
            {content}
          </div>
        )}
      </div>
    )
  }

  const renderDesignControls = (mode: 'accordions' | 'colors-type' | 'stickers-layout' = 'accordions') => {
    const templateSection = (
      <div className="space-y-3">
        {loveOccasion && siblingTemplates.length > 1 && (
          <div className="space-y-1.5 pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
              {loveOccasion.name} · 2 Designs
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {siblingTemplates.map((tpl, idx) => {
                const active = tpl.id === card.templateId
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleTemplateSwitch(tpl.id)}
                    className="rounded-2xl border px-3 py-2 text-left transition-all cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                      borderColor: active ? 'var(--accent-rose)' : 'var(--border-subtle)',
                    }}
                  >
                    <p className="text-[0.62rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
                      Design {idx + 1}
                    </p>
                    <p className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {tpl.title}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            {CARD_TEMPLATES.length} Original Designs
          </span>
          <Link to="/explore" className="text-xs font-semibold hover:underline" style={{ color: 'var(--accent-rose)' }}>
            Browse gallery
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1 sm:grid-cols-2">
          {CARD_TEMPLATES.map((tpl) => {
            const active = tpl.id === card.templateId
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleTemplateSwitch(tpl.id)}
                className="rounded-2xl border px-3 py-2 text-left transition-all cursor-pointer"
                style={{
                  backgroundColor: active ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                  borderColor: active ? 'var(--accent-rose)' : 'var(--border-subtle)',
                }}
              >
                <p className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {tpl.title}
                </p>
                <p className="truncate text-[0.68rem]" style={{ color: 'var(--text-muted)' }}>
                  {tpl.occasion}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    )

    const layoutSection = (
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          Card Aspect Ratio
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'portrait', label: 'Portrait', sub: '3 : 4' },
              { id: 'landscape', label: 'Landscape', sub: '4 : 3' },
              { id: 'square', label: 'Square', sub: '1 : 1' },
            ] as { id: CardLayout; label: string; sub: string }[]
          ).map((item) => {
            const selected = (card.layout ?? 'portrait') === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateField('layout', item.id)}
                className="rounded-2xl border px-3 py-2.5 text-center transition-colors cursor-pointer"
                style={{
                  backgroundColor: selected ? '#472C42' : 'var(--bg-canvas)',
                  borderColor: selected ? '#472C42' : 'var(--border-subtle)',
                  color: selected ? '#FFF9F3' : 'var(--text-primary)',
                }}
              >
                <span className="block text-xs font-semibold">{item.label}</span>
                <span className="block text-[0.65rem] opacity-75">{item.sub}</span>
              </button>
            )
          })}
        </div>
      </div>
    )

    const colorSection = (
      <div className="space-y-4">
        {/* Background Mode Switch */}
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border p-1" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-subtle)' }}>
          {(
            [
              { id: 'palette', label: 'Themes' },
              { id: 'gradient', label: 'Gradients' },
              { id: 'solid', label: 'Solid Color' },
            ] as const
          ).map((mode) => {
            const active = (card.backgroundMode ?? 'palette') === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => updateField('backgroundMode', mode.id)}
                className="rounded-xl py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                style={{
                  backgroundColor: active ? '#472C42' : 'transparent',
                  color: active ? '#FFF9F3' : 'var(--text-secondary)',
                }}
              >
                {mode.label}
              </button>
            )
          })}
        </div>

        {(card.backgroundMode ?? 'palette') === 'palette' && (
          <div className="grid grid-cols-2 gap-2">
            {CARD_PALETTES.map((pal) => {
              const selected = card.paletteId === pal.id
              return (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => {
                    updateField('paletteId', pal.id)
                    updateField('customTextColor', '')
                  }}
                  className="flex items-center gap-2 rounded-2xl border p-2 text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: selected ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                    borderColor: selected ? 'var(--accent-rose)' : 'var(--border-subtle)',
                  }}
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-full border"
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
        )}

        {card.backgroundMode === 'gradient' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {GRADIENT_PRESETS.map((grad) => {
                const selected =
                  card.gradientId === grad.id && !card.customGradientFrom
                return (
                  <button
                    key={grad.id}
                    type="button"
                    onClick={() =>
                      setCard((prev) => ({
                        ...prev,
                        gradientId: grad.id,
                        customGradientFrom: '',
                        customGradientTo: '',
                        customTextColor: '',
                      }))
                    }
                    className="flex items-center gap-2 rounded-2xl border p-2 text-left cursor-pointer"
                    style={{
                      backgroundColor: selected ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                      borderColor: selected ? 'var(--accent-rose)' : 'var(--border-subtle)',
                    }}
                  >
                    <span
                      className="h-6 w-6 shrink-0 rounded-full border"
                      style={{
                        background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                        borderColor: 'var(--border-strong)',
                      }}
                    />
                    <span className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {grad.name}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <label className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                <span>Start</span>
                <input
                  type="color"
                  value={card.customGradientFrom || '#FFF9F3'}
                  onChange={(e) =>
                    setCard((prev) => ({
                      ...prev,
                      customGradientFrom: e.target.value,
                      customGradientTo: prev.customGradientTo || '#F8DDE4',
                    }))
                  }
                  className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent"
                  aria-label="Custom gradient start color"
                />
              </label>
              <label className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                <span>End</span>
                <input
                  type="color"
                  value={card.customGradientTo || '#F8DDE4'}
                  onChange={(e) =>
                    setCard((prev) => ({
                      ...prev,
                      customGradientFrom: prev.customGradientFrom || '#FFF9F3',
                      customGradientTo: e.target.value,
                    }))
                  }
                  className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent"
                  aria-label="Custom gradient end color"
                />
              </label>
            </div>
          </div>
        )}

        {card.backgroundMode === 'solid' && (
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <span>Background Color:</span>
              <input
                type="color"
                value={card.customBgColor || '#FFF9F3'}
                onChange={(e) => updateField('customBgColor', e.target.value)}
                className="h-9 w-12 cursor-pointer rounded-xl border p-0.5"
                style={{ borderColor: 'var(--border-strong)' }}
                aria-label="Custom solid background color"
              />
            </label>
            <div className="flex gap-1.5">
              {['#FFF9F3', '#F8DDE4', '#E8E2F7', '#472C42', '#1F243E', '#EEF3EC'].map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => updateField('customBgColor', hex)}
                  className="h-7 w-7 rounded-full border cursor-pointer"
                  style={{ backgroundColor: hex, borderColor: 'var(--border-strong)' }}
                  aria-label={`Set background color ${hex}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Custom Text Color */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
          <label className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            <span>Text Color</span>
            <input
              type="color"
              value={card.customTextColor || '#472C42'}
              onChange={(e) => updateField('customTextColor', e.target.value)}
              className="h-8 w-10 cursor-pointer rounded-lg border p-0.5"
              style={{ borderColor: 'var(--border-strong)' }}
              aria-label="Custom text color"
            />
          </label>
          <div className="flex items-center gap-1.5">
            {['#472C42', '#2A1726', '#FFF9F3', '#D9B77E', '#B5546D'].map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => updateField('customTextColor', hex)}
                className="h-6 w-6 rounded-full border cursor-pointer"
                style={{ backgroundColor: hex, borderColor: 'var(--border-strong)' }}
                aria-label={`Set text color ${hex}`}
              />
            ))}
            {card.customTextColor && (
              <button
                type="button"
                onClick={() => updateField('customTextColor', '')}
                className="text-[0.7rem] font-semibold underline cursor-pointer ml-1"
                style={{ color: 'var(--accent-rose)' }}
              >
                Auto
              </button>
            )}
          </div>
        </div>
      </div>
    )

    const typographySection = (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {CARD_FONTS.map((font) => {
            const selected = card.fontId === font.id
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateField('fontId', font.id)}
                className="rounded-2xl border px-3.5 py-2.5 text-left transition-all cursor-pointer"
                style={{
                  backgroundColor: selected ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                  borderColor: selected ? 'var(--accent-rose)' : 'var(--border-subtle)',
                }}
              >
                <p className="text-base font-semibold" style={{ fontFamily: font.cssFamily, color: 'var(--text-primary)' }}>
                  {font.sampleText}
                </p>
                <p className="text-[0.7rem]" style={{ color: 'var(--text-muted)' }}>
                  {font.name} · {font.description}
                </p>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Font Size
            </p>
            <div className="grid grid-cols-4 gap-1">
              {(['sm', 'md', 'lg', 'xl'] as CardFontSize[]).map((sz) => {
                const active = (card.fontSize ?? 'md') === sz
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => updateField('fontSize', sz)}
                    className="rounded-xl border py-1.5 text-xs font-semibold uppercase cursor-pointer"
                    style={{
                      backgroundColor: active ? '#472C42' : 'var(--bg-canvas)',
                      borderColor: active ? '#472C42' : 'var(--border-subtle)',
                      color: active ? '#FFF9F3' : 'var(--text-primary)',
                    }}
                  >
                    {sz}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Alignment
            </p>
            <div className="grid grid-cols-3 gap-1">
              {(
                [
                  { id: 'left', icon: AlignLeft, label: 'Align left' },
                  { id: 'center', icon: AlignCenter, label: 'Align center' },
                  { id: 'right', icon: AlignRight, label: 'Align right' },
                ] as { id: CardTextAlign; icon: typeof AlignLeft; label: string }[]
              ).map((al) => {
                const Icon = al.icon
                const active = (card.textAlign ?? 'center') === al.id
                return (
                  <button
                    key={al.id}
                    type="button"
                    onClick={() => updateField('textAlign', al.id)}
                    aria-label={al.label}
                    className="flex items-center justify-center rounded-xl border py-1.5 cursor-pointer"
                    style={{
                      backgroundColor: active ? '#472C42' : 'var(--bg-canvas)',
                      borderColor: active ? '#472C42' : 'var(--border-subtle)',
                      color: active ? '#FFF9F3' : 'var(--text-primary)',
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )

    const decorSection = (
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Borders &amp; Paper Finishes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BACKGROUND_PATTERNS.map((pat) => {
              const selected = card.pattern === pat.id
              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => updateField('pattern', pat.id)}
                  className="rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: selected ? '#472C42' : 'var(--bg-canvas)',
                    borderColor: selected ? '#472C42' : 'var(--border-subtle)',
                    color: selected ? '#FFF9F3' : 'var(--text-primary)',
                  }}
                >
                  {pat.name}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Animated Effects (Hearts, Flowers, Stars, Confetti)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DECORATIVE_EFFECT_OPTIONS.map((eff) => {
              const active = (card.effects ?? []).includes(eff.id)
              return (
                <button
                  key={eff.id}
                  type="button"
                  onClick={() => toggleEffect(eff.id)}
                  aria-pressed={active}
                  className="rounded-2xl border px-3 py-2 text-left transition-colors cursor-pointer"
                  style={{
                    backgroundColor: active ? 'var(--bg-blush)' : 'var(--bg-canvas)',
                    borderColor: active ? 'var(--accent-rose)' : 'var(--border-subtle)',
                  }}
                >
                  <span className="block text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {eff.label}
                  </span>
                  <span className="block text-[0.68rem]" style={{ color: 'var(--text-muted)' }}>
                    {eff.description}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Corner Stickers (Up to 4)
          </p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-2">
            {STICKER_OPTIONS.map((stk) => {
              const active = (card.stickers ?? []).includes(stk.id)
              return (
                <button
                  key={stk.id}
                  type="button"
                  onClick={() => toggleSticker(stk.id)}
                  aria-pressed={active}
                  className="flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                  style={{
                    backgroundColor: active ? '#472C42' : 'var(--bg-canvas)',
                    borderColor: active ? '#472C42' : 'var(--border-subtle)',
                    color: active ? '#FFF9F3' : 'var(--text-primary)',
                  }}
                >
                  <span>{stk.symbol}</span>
                  <span className="truncate">{stk.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )

    if (mode === 'colors-type') {
      return (
        <div className="space-y-5">
          <div className="rounded-3xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Colors &amp; Gradients</h2>
            {colorSection}
          </div>
          <div className="rounded-3xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Typography &amp; Alignment</h2>
            {typographySection}
          </div>
        </div>
      )
    }

    if (mode === 'stickers-layout') {
      return (
        <div className="space-y-5">
          <div className="rounded-3xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Card Layout &amp; Artwork</h2>
            {layoutSection}
            {templateSection}
          </div>
          <div className="rounded-3xl border p-5 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Borders, Stickers &amp; Effects</h2>
            {decorSection}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {renderDesignAccordion('color', 'Colors & Gradients', 'Theme swatches, gradients & text hue', colorSection)}
        {renderDesignAccordion('typography', 'Typography & Alignment', '5 typefaces, size scale & alignment', typographySection)}
        {renderDesignAccordion('layout', 'Card Layout', 'Portrait, Landscape, or Square', layoutSection)}
        {renderDesignAccordion('decor', 'Borders, Stickers & Effects', 'Frames, corner seals, hearts & confetti', decorSection)}
        {renderDesignAccordion('template', 'Switch Card Artwork', `${activeTemplate.title} (${CARD_TEMPLATES.length} total)`, templateSection)}
      </div>
    )
  }

  const renderCenterPreview = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-full border p-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setPreviewSide('front')}
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
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
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
            style={{
              backgroundColor: previewSide === 'inside' ? '#472C42' : 'transparent',
              color: previewSide === 'inside' ? '#FFF9F3' : 'var(--text-secondary)',
            }}
          >
            Inside Message
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleReducedMotion}
            aria-pressed={reducedMotion}
            title="Toggle reduced motion animations"
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[0.7rem] font-semibold cursor-pointer"
            style={{
              backgroundColor: reducedMotion ? 'var(--bg-blush)' : 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            <EyeOff className="h-3 w-3" aria-hidden="true" />
            <span>{reducedMotion ? 'Motion Off' : 'Motion On'}</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewSide((s) => (s === 'front' ? 'inside' : 'front'))}
            className="inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Flip</span>
          </button>
        </div>
      </div>

      {loveOccasion && siblingTemplates.length > 1 && (
        <div
          className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-rose)' }}>
              {loveOccasionDate?.formattedLabel}
              {loveOccasionDate?.ruleNote ? ` · ${loveOccasionDate.ruleNote}` : ''} · {loveOccasion.name}
            </p>
            <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
              {loveOccasion.visualTheme}
            </p>
          </div>
          <div className="inline-flex rounded-full border p-0.5 shrink-0" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-subtle)' }}>
            {siblingTemplates.map((tpl, idx) => {
              const isCurrent = tpl.id === card.templateId
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleTemplateSwitch(tpl.id)}
                  className="rounded-full px-3 py-1 text-[0.7rem] font-semibold transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isCurrent ? '#472C42' : 'transparent',
                    color: isCurrent ? '#FFF9F3' : 'var(--text-secondary)',
                  }}
                >
                  Design {idx + 1}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[440px]">
        <GreetingCardPreview
          templateId={card.templateId}
          paletteId={card.paletteId}
          backgroundMode={card.backgroundMode}
          customBgColor={card.customBgColor}
          gradientId={card.gradientId}
          customGradientFrom={card.customGradientFrom}
          customGradientTo={card.customGradientTo}
          customTextColor={card.customTextColor}
          pattern={card.pattern}
          fontId={card.fontId}
          fontSize={card.fontSize}
          textAlign={card.textAlign}
          layout={card.layout}
          effects={card.effects}
          stickers={card.stickers}
          headline={card.headline}
          recipientName={card.recipientName}
          senderName={card.senderName}
          relationship={card.relationship}
          message={card.message}
          sealText={card.sealText}
          giftNote={card.giftNote}
          side={previewSide}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => handleDownload('png')}
          disabled={exportingFormat !== null}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer disabled:opacity-60"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{exportingFormat === 'png' ? 'Exporting...' : 'PNG'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleDownload('jpeg')}
          disabled={exportingFormat !== null}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer disabled:opacity-60"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{exportingFormat === 'jpeg' ? 'Exporting...' : 'JPG'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleDownload('pdf')}
          disabled={exportingFormat !== null}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer disabled:opacity-60"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
        >
          <FileText className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
          <span>{exportingFormat === 'pdf' ? 'Generating PDF...' : 'Download Complete Card (PDF)'}</span>
        </button>

        <button
          type="button"
          onClick={handleOpenShare}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#472C42] px-4 py-1.5 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
          <span>Share &amp; Send</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="paper-grain py-8 sm:py-12">
      <SeoHead
        title={`Personalize ${activeTemplate.title} — ${activeTemplate.occasion} Card Studio`}
        description={`Customize ${activeTemplate.title} (${activeTemplate.occasion}) with your own colors, calligraphy font, stickers, and message—then share via WhatsApp or PNG/JPG download.`}
        canonicalPath={templateId ? `/create/${activeTemplate.id}` : '/create'}
      />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Top Studio Toolbar */}
        <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              Card Personalization Studio
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {activeTemplate.title} · {activeTemplate.occasion}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setConfirmDeleteId(null)
                draftsDialogRef.current?.showModal()
              }}
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
              <span>Save Draft</span>
            </button>

            {confirmReset ? (
              <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs" style={{ backgroundColor: 'var(--bg-blush)', borderColor: 'var(--accent-rose)' }}>
                <span className="font-semibold text-[#2A1726]">Reset card?</span>
                <button
                  type="button"
                  onClick={handleResetCard}
                  className="rounded-full bg-[#472C42] px-2.5 py-0.5 font-semibold text-[#FFF9F3] cursor-pointer"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-1.5 font-semibold text-[#2A1726] cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}

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

        {validationError && (
          <p role="alert" className="mt-4 flex items-center gap-2 rounded-2xl border border-rose-400/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{validationError}</span>
          </p>
        )}

        {/* DESKTOP 3-PANEL STUDIO (lg+) */}
        <div className="mt-7 hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start">
          {/* Left Panel: Recipient & Message */}
          <div className="lg:col-span-4">{renderRecipientAndMessageControls()}</div>

          {/* Center Panel: Sticky Live Preview */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">{renderCenterPreview()}</div>

          {/* Right Panel: Collapsible Design Settings */}
          <div className="lg:col-span-4">{renderDesignControls('accordions')}</div>
        </div>

        {/* MOBILE STEP-BASED EDITOR (< lg) */}
        <div className="mt-6 space-y-6 lg:hidden">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {MOBILE_STEPS.map((step) => {
              const active = mobileStep === step.id
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setMobileStep(step.id)}
                  className="shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold cursor-pointer"
                  style={{
                    backgroundColor: active ? '#472C42' : 'var(--bg-surface)',
                    borderColor: active ? '#472C42' : 'var(--border-subtle)',
                    color: active ? '#FFF9F3' : 'var(--text-secondary)',
                  }}
                >
                  {step.label}
                </button>
              )
            })}
          </div>

          {mobileStep === 0 && renderRecipientAndMessageControls()}
          {mobileStep === 1 && renderDesignControls('colors-type')}
          {mobileStep === 2 && renderDesignControls('stickers-layout')}
          {mobileStep === 3 && renderCenterPreview()}

          {mobileStep < 3 && (
            <div
              className="rounded-3xl border p-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Live Preview
              </p>
              <div className="mx-auto max-w-xs">
                <GreetingCardPreview
                  templateId={card.templateId}
                  paletteId={card.paletteId}
                  backgroundMode={card.backgroundMode}
                  customBgColor={card.customBgColor}
                  gradientId={card.gradientId}
                  customGradientFrom={card.customGradientFrom}
                  customGradientTo={card.customGradientTo}
                  customTextColor={card.customTextColor}
                  pattern={card.pattern}
                  fontId={card.fontId}
                  fontSize={card.fontSize}
                  textAlign={card.textAlign}
                  layout={card.layout}
                  effects={card.effects}
                  stickers={card.stickers}
                  headline={card.headline}
                  recipientName={card.recipientName}
                  senderName={card.senderName}
                  relationship={card.relationship}
                  message={card.message}
                  sealText={card.sealText}
                  giftNote={card.giftNote}
                  side={previewSide}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          )}

          {/* Mobile Step Footer Navigation */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              disabled={mobileStep === 0}
              onClick={() => setMobileStep((s) => Math.max(0, s - 1))}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold disabled:opacity-40 cursor-pointer"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous</span>
            </button>

            {mobileStep < 3 ? (
              <button
                type="button"
                onClick={() => setMobileStep((s) => Math.min(3, s + 1))}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#472C42] px-5 py-2 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenShare}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#472C42] px-5 py-2 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
              >
                <Share2 className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Share Card</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Share & Export Modal */}
      <dialog
        ref={shareDialogRef}
        aria-labelledby="share-dialog-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="w-[min(94vw,38rem)] rounded-3xl p-0"
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
            Your card’s design and message are encoded directly inside this link—no account or server upload is needed. Drafts remain stored only in your own browser.
          </p>

          {shareMeta?.isLarge && (
            <div className="rounded-2xl border border-amber-400/50 bg-amber-500/10 p-3 text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <strong>Long link notice:</strong> Because this card includes extensive customizations, the URL is quite long ({shareMeta.url.length} characters). If a messaging app trims it, download the PNG or JPG image below to share reliably.
            </div>
          )}

          {/* Copyable Link */}
          <div className="space-y-2">
            <label htmlFor="generated-share-url" className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Unique Shareable URL
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

          {/* Share & Export Actions */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#256D4B] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Share on WhatsApp</span>
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
              onClick={() => handleDownload('png')}
              disabled={exportingFormat !== null}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-85 cursor-pointer disabled:opacity-60"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
              }}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{exportingFormat === 'png' ? 'Preparing PNG...' : 'Download PNG'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownload('jpeg')}
              disabled={exportingFormat !== null}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-85 cursor-pointer disabled:opacity-60"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
              }}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{exportingFormat === 'jpeg' ? 'Preparing JPG...' : 'Download JPG'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownload('pdf')}
              disabled={exportingFormat !== null}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-85 cursor-pointer disabled:opacity-60 sm:col-span-2"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
              }}
            >
              <FileText className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              <span>
                {exportingFormat === 'pdf'
                  ? 'Preparing 2-Page PDF...'
                  : 'Download Complete Card (PDF)'}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {shareMeta && (
              <Link
                to={`/card/${shareMeta.shortId}?d=${shareMeta.encoded}`}
                onClick={() => shareDialogRef.current?.close()}
                className="inline-flex flex-1 min-h-10 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold transition-colors hover:opacity-85"
                style={{
                  borderColor: 'var(--border-strong)',
                  backgroundColor: 'var(--bg-blush)',
                  color: '#2A1726',
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Open Recipient Preview</span>
              </Link>
            )}

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex flex-1 min-h-10 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold cursor-pointer"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Native Device Share</span>
              </button>
            )}
          </div>
        </div>
      </dialog>

      {/* Saved Drafts Modal with Delete Confirmation */}
      <dialog
        ref={draftsDialogRef}
        aria-labelledby="drafts-dialog-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="w-[min(94vw,38rem)] rounded-3xl p-0"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <h2 id="drafts-dialog-title" className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Saved Browser Drafts
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Saved locally in this browser only.
              </p>
            </div>
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
                const confirming = confirmDeleteId === d.id
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
                        showToast('success', 'Loaded saved draft.')
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

                    {confirming ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setDrafts(deleteDraft(d.id))
                            setConfirmDeleteId(null)
                            showToast('success', 'Draft deleted.')
                          }}
                          className="rounded-full bg-rose-700 px-3 py-1 text-xs font-semibold text-white cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-full border px-2.5 py-1 text-xs font-semibold cursor-pointer"
                          style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(d.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-500/10 cursor-pointer"
                        style={{ color: 'var(--text-muted)' }}
                        aria-label={`Delete draft for ${d.recipientName || 'Someone Special'}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </dialog>

      <Toast notice={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
