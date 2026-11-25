import { motion } from 'framer-motion'
import type { DecorativeEffect } from '../types/card'

interface CardEffectsProps {
  effects?: DecorativeEffect[]
  accent: string
  foil: string
  reducedMotion?: boolean
}

const FLOATING_SEEDS = [
  { x: '10%', delay: 0, duration: 5.4, size: 13 },
  { x: '24%', delay: 0.9, duration: 6.1, size: 11 },
  { x: '42%', delay: 0.4, duration: 5.8, size: 14 },
  { x: '62%', delay: 1.3, duration: 6.4, size: 12 },
  { x: '78%', delay: 0.7, duration: 5.2, size: 13 },
  { x: '90%', delay: 1.6, duration: 6.0, size: 11 },
]

export function CardEffects({
  effects = [],
  accent,
  foil,
  reducedMotion = false,
}: CardEffectsProps) {
  if (!effects.length) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20" aria-hidden="true">
      {effects.includes('hearts') &&
        FLOATING_SEEDS.map((seed, idx) =>
          reducedMotion ? (
            <span
              key={`heart-static-${idx}`}
              className="absolute opacity-40"
              style={{ left: seed.x, top: `${15 + idx * 13}%`, color: accent, fontSize: seed.size }}
            >
              ♥
            </span>
          ) : (
            <motion.span
              key={`heart-${idx}`}
              initial={{ y: '105%', opacity: 0 }}
              animate={{
                y: ['105%', '-15%'],
                opacity: [0, 0.55, 0.55, 0],
              }}
              transition={{
                duration: seed.duration,
                delay: seed.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-0"
              style={{ left: seed.x, color: accent, fontSize: seed.size }}
            >
              ♥
            </motion.span>
          ),
        )}

      {effects.includes('flowers') &&
        FLOATING_SEEDS.map((seed, idx) =>
          reducedMotion ? (
            <span
              key={`flower-static-${idx}`}
              className="absolute opacity-35"
              style={{ left: seed.x, top: `${10 + idx * 14}%`, color: idx % 2 === 0 ? accent : foil, fontSize: seed.size + 1 }}
            >
              ❀
            </span>
          ) : (
            <motion.span
              key={`flower-${idx}`}
              initial={{ y: '-10%', opacity: 0, rotate: 0 }}
              animate={{
                y: ['-10%', '108%'],
                opacity: [0, 0.5, 0.5, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: seed.duration + 0.8,
                delay: seed.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-0"
              style={{ left: seed.x, color: idx % 2 === 0 ? accent : foil, fontSize: seed.size + 1 }}
            >
              ❀
            </motion.span>
          ),
        )}

      {effects.includes('stars') &&
        FLOATING_SEEDS.map((seed, idx) =>
          reducedMotion ? (
            <span
              key={`star-static-${idx}`}
              className="absolute opacity-50"
              style={{ left: seed.x, top: `${12 + idx * 14}%`, color: foil, fontSize: seed.size }}
            >
              ✦
            </span>
          ) : (
            <motion.span
              key={`star-${idx}`}
              animate={{
                opacity: [0.2, 0.85, 0.2],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: 2.8 + idx * 0.4,
                delay: seed.delay * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute"
              style={{ left: seed.x, top: `${10 + idx * 14}%`, color: foil, fontSize: seed.size }}
            >
              ✦
            </motion.span>
          ),
        )}

      {effects.includes('confetti') &&
        [0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
          const colors = [accent, foil, '#E9A6B5', '#9C78C4']
          const left = `${8 + idx * 12}%`
          if (reducedMotion) {
            return (
              <span
                key={`conf-static-${idx}`}
                className="absolute h-1.5 w-3 rounded-full opacity-45"
                style={{
                  left,
                  top: `${14 + (idx % 4) * 20}%`,
                  backgroundColor: colors[idx % colors.length],
                  transform: `rotate(${idx * 25}deg)`,
                }}
              />
            )
          }
          return (
            <motion.span
              key={`conf-${idx}`}
              initial={{ y: '-8%', opacity: 0, rotate: 0 }}
              animate={{
                y: ['-8%', '108%'],
                opacity: [0, 0.7, 0.7, 0],
                rotate: [0, 260],
              }}
              transition={{
                duration: 4.5 + (idx % 3) * 0.8,
                delay: idx * 0.35,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-0 h-1.5 w-3 rounded-full"
              style={{
                left,
                backgroundColor: colors[idx % colors.length],
              }}
            />
          )
        })}
    </div>
  )
}
