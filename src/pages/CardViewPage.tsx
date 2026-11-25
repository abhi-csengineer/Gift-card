import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, MailOpen, RotateCw, Sparkles } from 'lucide-react'
import { CARD_TEMPLATES, getTemplateById } from '../data/catalog'
import { decodeCardPayload } from '../utils/cardStorage'
import { exportCardToPng } from '../utils/canvasExport'
import { GreetingCardPreview } from '../components/GreetingCardPreview'

export function CardViewPage() {
  const [searchParams] = useSearchParams()
  const encoded = searchParams.get('d')

  const card = useMemo(() => {
    if (encoded) {
      const decoded = decodeCardPayload(encoded)
      if (decoded) return decoded
    }
    const fallback = CARD_TEMPLATES[0]
    return {
      id: 'sample',
      templateId: fallback.id,
      recipientName: 'Someone Wonderful',
      senderName: 'Vellum & Bloom',
      headline: fallback.defaultHeadline,
      message: fallback.defaultMessage,
      paletteId: fallback.defaultPaletteId,
      pattern: fallback.defaultPattern,
      fontId: fallback.defaultFontId,
      sealText: fallback.sealInitial,
      giftNote: '',
      updatedAt: new Date().toISOString(),
    }
  }, [encoded])

  const [opened, setOpened] = useState(false)
  const [side, setSide] = useState<'front' | 'inside'>('inside')
  const [downloading, setDownloading] = useState(false)

  const template = getTemplateById(card.templateId)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await exportCardToPng(card)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="paper-grain py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-md space-y-6"
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                A Keepsake Has Arrived
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                For {card.recipientName || 'You'}
              </h1>

              {/* Sealed Digital Envelope */}
              <button
                type="button"
                onClick={() => setOpened(true)}
                className="group relative mx-auto block w-full overflow-hidden rounded-[2rem] border p-10 text-center transition-all hover:-translate-y-1 cursor-pointer"
                style={{
                  background: 'linear-gradient(155deg, #472C42 0%, #311C2D 100%)',
                  borderColor: 'rgba(217, 183, 126, 0.55)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="pointer-events-none absolute inset-4 rounded-[1.4rem] border border-[#D9B77E]/30" />
                <div className="relative z-10 space-y-5 py-6">
                  <div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-[#FFF9F3] shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: '#C86A80',
                      boxShadow: 'inset 0 0 0 3px #D9B77E, 0 10px 25px rgba(0,0,0,0.35)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {(card.sealText || 'V').slice(0, 2).toUpperCase()}
                  </div>

                  <div className="space-y-1.5 text-[#FFF9F3]">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#D9B77E]">
                      From {card.senderName || 'Someone Special'}
                    </p>
                    <p className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      {template.occasion} Keepsake
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF9F3] px-5 py-2.5 text-xs font-semibold text-[#472C42]">
                    <MailOpen className="h-4 w-4 text-[#B5546D]" aria-hidden="true" />
                    <span>Break Seal &amp; Open Card</span>
                  </span>
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 22 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setSide((s) => (s === 'front' ? 'inside' : 'front'))}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{side === 'inside' ? 'View Front Artwork' : 'Read Personal Note'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{downloading ? 'Preparing PNG...' : 'Save Keepsake PNG'}</span>
                </button>
              </div>

              <div className="mx-auto max-w-md">
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
                  side={side}
                />
              </div>

              <div className="pt-4">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                  <span>Send a Card Back</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
