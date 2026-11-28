import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CARDELLE_FESTIVE_COLORS,
  resolveCelebrationColors,
  shouldTriggerConfetti,
} from './confettiCelebration'

test('shouldTriggerConfetti respects reducedMotion and OS preference flags', () => {
  assert.equal(shouldTriggerConfetti(true, false), false)
  assert.equal(shouldTriggerConfetti(false, true), false)
  assert.equal(shouldTriggerConfetti(true, true), false)
  assert.equal(shouldTriggerConfetti(false, false), true)
})

test('resolveCelebrationColors prioritizes palette accent and foil without duplicates', () => {
  const colors = resolveCelebrationColors(
    {
      accent: '#d67b91',
      foil: '#d9b77e',
      bgSecondary: '#F8DDE4',
    },
    {
      customGradientFrom: '#FF5E8A', // matches festive color case-insensitively
      customGradientTo: '#7942D6',
    },
  )

  assert.equal(colors[0], '#D67B91')
  assert.equal(colors[1], '#D9B77E')
  assert.ok(colors.includes('#FF5E8A'))
  assert.ok(colors.includes('#7942D6'))
  assert.equal(new Set(colors).size, colors.length)
  assert.equal(colors.length, 6)
})

test('resolveCelebrationColors falls back to Cardelle festive colors when no palette is given', () => {
  const colors = resolveCelebrationColors(undefined)
  assert.deepEqual(colors, [...CARDELLE_FESTIVE_COLORS])
})
