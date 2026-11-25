import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MailOpen, RotateCw, Sparkles } from 'lucide-react'
import type { PersonalizedCard } from '../types/card'
import { getTemplateById } from '../data/catalog'
import { GreetingCardPreview } from './GreetingCardPreview'

interface EnvelopeRevealProps {
  card: PersonalizedCard
  opened: boolean
  onOpen: () => void
  side: 'front' | 'inside'
  onToggleSide: () => void
  reducedMotion?: boolean
}

export function EnvelopeReveal({
  card,
  opened,
  onOpen,
  side,
  onToggleSide,
  reducedMotion = false,
}: EnvelopeRevealProps) {
  const [unsealing, setUnsealing] = useState(false)
  const template = getTemplateById(card.templateId)

  const handleBreakSeal = () => {
    if (reducedMotion) {
      onOpen()
      return
    }
    setUnsealing(true)
    window.setTimeout(() => {
      setUnsealing(false)
      onOpen()
    }, 520)
  }

  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <motion.div
          key="sealed-envelope"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -12 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.4 }}
          className="mx-auto max-w-md space-y-6"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-gold)' }}>
            A Keepsake Has Arrived
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            For {card.recipientName || 'You'}
          </h1>
          {card.relationship?.trim() && (
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Addressed with love · {card.relationship.trim()}
            </p>
          )}

          {/* Interactive Sealed Envelope */}
          <button
            type="button"
            onClick={handleBreakSeal}
            disabled={unsealing}
            className="group relative mx-auto block w-full overflow-hidden rounded-[2rem] border p-8 sm:p-10 text-center transition-all hover:-translate-y-1 cursor-pointer"
            style={{
              background: 'linear-gradient(155deg, #472C42 0%, #311C2D 100%)',
              borderColor: 'rgba(217, 183, 126, 0.55)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Animated Top Flap */}
            <motion.div
              animate={
                unsealing && !reducedMotion
                  ? { rotateX: -145, opacity: 0.4 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                transformOrigin: 'top center',
                borderBottom: '1px solid rgba(217, 183, 126, 0.28)',
                background: 'linear-gradient(180deg, rgba(255,249,243,0.08) 0%, transparent 100%)',
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[2rem]"
            />

            {/* Rising Card Peek During Unsealing */}
            <motion.div
              animate={
                unsealing && !reducedMotion
                  ? { y: -26, opacity: 1 }
                  : { y: 12, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-x-10 top-6 h-16 rounded-t-xl border border-[#D9B77E]/40 bg-[#FFF9F3]/90"
            />

            <div className="pointer-events-none absolute inset-4 rounded-[1.4rem] border border-[#D9B77E]/30" />

            <div className="relative z-10 space-y-5 py-6">
              <motion.div
                animate={
                  unsealing && !reducedMotion
                    ? { scale: [1, 1.18, 0.85], opacity: [1, 1, 0.2] }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.45 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-[#FFF9F3] shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: '#C86A80',
                  boxShadow: 'inset 0 0 0 3px #D9B77E, 0 10px 25px rgba(0,0,0,0.35)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {(card.sealText || 'V').slice(0, 2).toUpperCase()}
              </motion.div>

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
                <span>{unsealing ? 'Opening Envelope...' : 'Break Seal & Open Card'}</span>
              </span>
            </div>
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="revealed-card"
          initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={
            reducedMotion
              ? { duration: 0.01 }
              : { duration: 0.55, type: 'spring', stiffness: 190, damping: 20 }
          }
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={onToggleSide}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{side === 'inside' ? 'View Front Cover' : 'Read Personal Note'}</span>
            </button>

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium"
              style={{ backgroundColor: 'var(--bg-blush)', color: '#2A1726' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#B5546D]" aria-hidden="true" />
              <span>Opened for {card.recipientName || 'You'}</span>
            </span>
          </div>

          <div
            className={`mx-auto ${
              card.layout === 'landscape'
                ? 'max-w-xl'
                : card.layout === 'square'
                  ? 'max-w-md'
                  : 'max-w-md'
            }`}
          >
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
              side={side}
              reducedMotion={reducedMotion}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
