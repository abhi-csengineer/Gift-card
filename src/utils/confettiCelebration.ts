import confetti from 'canvas-confetti'
import type { CardPalette } from '../types/card'

export const CARDELLE_FESTIVE_COLORS = [
  '#FF5E8A',
  '#FFA94D',
  '#845EF7',
  '#20C997',
  '#F0B43A',
] as const

const HEX_COLOR_RE = /^#[0-9A-Fa-f]{6}$/

export function shouldTriggerConfetti(
  reducedMotion: boolean,
  osReducedMotion?: boolean,
): boolean {
  if (reducedMotion) return false
  if (typeof osReducedMotion === 'boolean') {
    return !osReducedMotion
  }
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return false
  }
  return true
}

export function resolveCelebrationColors(
  palette?: Pick<CardPalette, 'accent' | 'foil' | 'bgSecondary'>,
  customColors?: {
    customBgColor?: string
    customGradientFrom?: string
    customGradientTo?: string
  },
): string[] {
  const candidates = [
    palette?.accent,
    palette?.foil,
    customColors?.customGradientFrom,
    customColors?.customGradientTo,
    customColors?.customBgColor,
    ...CARDELLE_FESTIVE_COLORS,
  ]

  const seen = new Set<string>()
  const resolved: string[] = []

  for (const raw of candidates) {
    if (!raw || !HEX_COLOR_RE.test(raw)) continue
    const normalized = raw.toUpperCase()
    if (!seen.has(normalized)) {
      seen.add(normalized)
      resolved.push(normalized)
    }
  }

  return resolved.slice(0, 6)
}

export interface ConfettiCelebrationOptions {
  palette?: Pick<CardPalette, 'accent' | 'foil' | 'bgSecondary'>
  customBgColor?: string
  customGradientFrom?: string
  customGradientTo?: string
  reducedMotion: boolean
  canvas?: HTMLCanvasElement | null
  variant?: 'share' | 'export'
}

export function triggerCardCompletionConfetti(
  options: ConfettiCelebrationOptions,
): () => void {
  if (typeof window === 'undefined') return () => {}
  if (!shouldTriggerConfetti(options.reducedMotion)) return () => {}

  const colors = resolveCelebrationColors(options.palette, {
    customBgColor: options.customBgColor,
    customGradientFrom: options.customGradientFrom,
    customGradientTo: options.customGradientTo,
  })

  const timeouts: number[] = []
  let activeLauncher: confetti.CreateTypes | null = null

  try {
    const fire = options.canvas
      ? (activeLauncher = confetti.create(options.canvas, {
          resize: true,
          useWorker: false,
        }))
      : confetti

    const safeFire = (confettiOptions: confetti.Options) => {
      try {
        void fire({
          ...confettiOptions,
          colors,
          disableForReducedMotion: true,
        })
      } catch {
        // Ignore headless or canvas-unavailable environments
      }
    }

    if (options.variant === 'export') {
      safeFire({
        particleCount: 48,
        spread: 74,
        startVelocity: 40,
        origin: { x: 0.5, y: 0.58 },
        scalar: 0.92,
        ticks: 190,
      })
    } else {
      // Celebratory dual side cannons + center burst on card completion
      safeFire({
        particleCount: 44,
        angle: 60,
        spread: 60,
        startVelocity: 46,
        origin: { x: 0.14, y: 0.68 },
        scalar: 0.95,
        ticks: 215,
      })

      safeFire({
        particleCount: 44,
        angle: 120,
        spread: 60,
        startVelocity: 46,
        origin: { x: 0.86, y: 0.68 },
        scalar: 0.95,
        ticks: 215,
      })

      timeouts.push(
        window.setTimeout(() => {
          safeFire({
            particleCount: 54,
            spread: 88,
            startVelocity: 36,
            gravity: 0.92,
            origin: { x: 0.5, y: 0.44 },
            scalar: 1,
            ticks: 225,
          })
        }, 150),
      )

      timeouts.push(
        window.setTimeout(() => {
          safeFire({
            particleCount: 26,
            spread: 112,
            startVelocity: 28,
            drift: 0.15,
            origin: { x: 0.5, y: 0.34 },
            scalar: 0.8,
            ticks: 200,
          })
        }, 320),
      )
    }
  } catch {
    return () => {}
  }

  return () => {
    for (const id of timeouts) {
      window.clearTimeout(id)
    }
    try {
      if (activeLauncher) {
        activeLauncher.reset()
      } else {
        confetti.reset()
      }
    } catch {
      // Ignore cleanup failures
    }
  }
}
