import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, RotateCw, Sparkles } from 'lucide-react'
import { GreetingCardPreview } from './GreetingCardPreview'

const HERO_DECK = [
  {
    id: 'confetti-birthday-spark',
    recipient: 'Maya',
    sender: 'Sophia',
    label: 'Birthday · Cake, Candles & Balloons',
  },
  {
    id: 'mixtape-love-note',
    recipient: 'Liam',
    sender: 'Aria',
    label: 'Love Note · Our Forever Song Mixtape',
  },
  {
    id: 'crimson-kisses-note',
    recipient: 'Elena',
    sender: 'Julian',
    label: "Valentine's · Every Second Crimson Kisses",
  },
]

export function HeroCardDeck() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showInside, setShowInside] = useState(false)

  const activeCard = HERO_DECK[activeIndex]

  return (
    <div className="relative mx-auto w-full max-w-[460px] pt-4 pb-8 sm:py-6">
      {/* Multi-color luminous pastel backdrop aura */}
      <div
        className="pointer-events-none absolute -top-8 -left-8 h-60 w-60 rounded-full blur-3xl opacity-75"
        style={{ backgroundColor: '#FFB3CA' }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-10 h-56 w-56 rounded-full blur-3xl opacity-70"
        style={{ backgroundColor: '#FFD98E' }}
      />
      <div
        className="pointer-events-none absolute -bottom-4 left-6 h-60 w-60 rounded-full blur-3xl opacity-70"
        style={{ backgroundColor: '#C6B7FF' }}
      />

      {/* Frosted Studio Card Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-30 mb-5 flex items-center justify-between gap-2 rounded-2xl border px-4 py-2.5 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--border-strong)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div className="min-w-0 flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#E88B1F]" aria-hidden="true" />
          <span className="truncate">{activeCard.label}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowInside((prev) => !prev)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-105 cursor-pointer"
          style={{
            background: 'var(--gradient-cta)',
          }}
        >
          <RotateCw className="h-3 w-3" aria-hidden="true" />
          <span>{showInside ? 'View Front' : 'Open Inside'}</span>
        </button>
      </motion.div>

      {/* Stacked Fanned Cards */}
      <div className="relative h-[440px] sm:h-[470px] w-full">
        {HERO_DECK.map((item, idx) => {
          const offset = (idx - activeIndex + HERO_DECK.length) % HERO_DECK.length
          const isFront = offset === 0
          const rotate = offset === 0 ? 0 : offset === 1 ? 6.5 : -6.5
          const translateX = offset === 0 ? 0 : offset === 1 ? 28 : -26
          const translateY = offset === 0 ? 0 : offset === 1 ? 14 : 20
          const scale = offset === 0 ? 1 : offset === 1 ? 0.94 : 0.9
          const zIndex = offset === 0 ? 20 : offset === 1 ? 10 : 5

          return (
            <motion.div
              key={item.id}
              animate={{
                rotate,
                x: translateX,
                y: translateY,
                scale,
                opacity: offset === 0 ? 1 : 0.9,
              }}
              whileHover={!isFront ? { y: translateY - 6, scale: scale + 0.02 } : undefined}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              style={{
                zIndex,
                filter: isFront
                  ? 'drop-shadow(0 24px 38px rgba(42, 23, 38, 0.24))'
                  : 'drop-shadow(0 12px 20px rgba(42, 23, 38, 0.16))',
              }}
              onClick={() => {
                if (!isFront) {
                  setActiveIndex(idx)
                  setShowInside(false)
                }
              }}
              className={`absolute inset-x-4 top-0 mx-auto max-w-[335px] ${
                isFront ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <GreetingCardPreview
                templateId={item.id}
                recipientName={item.recipient}
                senderName={item.sender}
                side={isFront && showInside ? 'inside' : 'front'}
                className="w-full"
              />
            </motion.div>
          )
        })}
      </div>

      {/* Bottom Deck Switcher & Quick Personalize Action */}
      <div className="relative z-30 mt-3 flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Featured Hero Cards">
          {HERO_DECK.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Select ${item.label}`}
              onClick={() => {
                setActiveIndex(idx)
                setShowInside(false)
              }}
              className="h-2.5 rounded-full transition-all cursor-pointer"
              style={{
                width: idx === activeIndex ? '2.2rem' : '0.625rem',
                backgroundColor: idx === activeIndex ? 'var(--accent-rose)' : 'var(--border-strong)',
              }}
            />
          ))}
        </div>

        <Link
          to={`/create/${activeCard.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all hover:-translate-y-0.5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
          <span>Personalize This Card</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
