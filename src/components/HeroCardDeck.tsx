import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, RotateCw, Sparkles } from 'lucide-react'
import { GreetingCardPreview } from './GreetingCardPreview'

const HERO_DECK = [
  {
    id: 'rose-arch-anniversary',
    recipient: 'Elena',
    sender: 'Julian',
    label: 'Anniversary · Rose Arch',
  },
  {
    id: 'champagne-birthday-toast',
    recipient: 'Maya',
    sender: 'Sophia',
    label: 'Birthday · Champagne & Starlight',
  },
  {
    id: 'moonlit-velvet-love',
    recipient: 'Noah',
    sender: 'Claire',
    label: 'Love & Romance · Moonlit Letter',
  },
]

export function HeroCardDeck() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showInside, setShowInside] = useState(false)

  const activeCard = HERO_DECK[activeIndex]

  return (
    <div className="relative mx-auto w-full max-w-[460px] pt-4 pb-8 sm:py-6">
      {/* Ambient pastel backdrop aura */}
      <div
        className="pointer-events-none absolute -top-6 -left-6 h-56 w-56 rounded-full blur-3xl opacity-55"
        style={{ backgroundColor: 'var(--bg-blush)' }}
      />
      <div
        className="pointer-events-none absolute -right-4 bottom-2 h-60 w-60 rounded-full blur-3xl opacity-65"
        style={{ backgroundColor: 'var(--bg-lavender)' }}
      />

      {/* Decorative floating envelope & wax seal badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-30 mb-4 flex items-center justify-between gap-2 rounded-2xl border px-3.5 py-2 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-semibold text-[#FFF9F3]"
            style={{ backgroundColor: '#472C42', border: '1px solid #D9B77E' }}
          >
            ✦
          </span>
          <span>Click any card to inspect · {activeCard.label}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowInside((prev) => !prev)}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-blush)',
            color: 'var(--text-primary)',
          }}
        >
          <RotateCw className="h-3 w-3" aria-hidden="true" />
          <span>{showInside ? 'Front' : 'Inside'}</span>
        </button>
      </motion.div>

      {/* Stacked Fanned Cards */}
      <div className="relative h-[430px] sm:h-[460px] w-full">
        {HERO_DECK.map((item, idx) => {
          const offset = (idx - activeIndex + HERO_DECK.length) % HERO_DECK.length
          const isFront = offset === 0
          const rotate = offset === 0 ? 0 : offset === 1 ? 6 : -6
          const translateX = offset === 0 ? 0 : offset === 1 ? 26 : -24
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
                opacity: offset === 0 ? 1 : 0.88,
              }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              style={{ zIndex }}
              onClick={() => {
                if (!isFront) {
                  setActiveIndex(idx)
                  setShowInside(false)
                }
              }}
              className={`absolute inset-x-4 top-0 mx-auto max-w-[330px] ${
                isFront ? 'cursor-default' : 'cursor-pointer hover:brightness-105'
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

      {/* Bottom Deck Switcher & Quick Personalize Pill */}
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
                width: idx === activeIndex ? '2rem' : '0.625rem',
                backgroundColor: idx === activeIndex ? 'var(--accent-rose)' : 'var(--border-strong)',
              }}
            />
          ))}
        </div>

        <Link
          to={`/create/${activeCard.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all hover:-translate-y-0.5"
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
