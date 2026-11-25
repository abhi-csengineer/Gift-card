import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  STICKER_OPTIONS,
  getFontById,
  getGradientById,
  getPaletteById,
  getTemplateById,
} from '../data/catalog'
import type { ArtworkMotif, CardLayout, CardPalette, PersonalizedCard } from '../types/card'
import { CardArtwork } from '../components/CardArtwork'

export function getCardCanvasDimensions(
  layout: CardLayout = 'portrait',
  scale = 1,
): { width: number; height: number } {
  const baseW = layout === 'landscape' ? 1600 : layout === 'square' ? 1400 : 1200
  const baseH = layout === 'landscape' ? 1200 : layout === 'square' ? 1400 : 1600
  return {
    width: Math.round(baseW * scale),
    height: Math.round(baseH * scale),
  }
}

export function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const paragraphs = text.split('\n')
  const lines: string[] = []

  for (const para of paragraphs) {
    const trimmed = para.trim()
    if (!trimmed) {
      lines.push('')
      continue
    }
    const words = trimmed.split(/\s+/)
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      if (ctx.measureText(testLine).width > maxWidth) {
        if (currentLine) {
          lines.push(currentLine)
          currentLine = ''
        }
        if (ctx.measureText(word).width > maxWidth) {
          // Break unusually long tokens cleanly so text never clips horizontally
          let chunk = ''
          for (const ch of Array.from(word)) {
            const nextChunk = chunk + ch
            if (ctx.measureText(nextChunk).width > maxWidth && chunk) {
              lines.push(chunk)
              chunk = ch
            } else {
              chunk = nextChunk
            }
          }
          currentLine = chunk
        } else {
          currentLine = word
        }
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)
  }

  return lines
}

function drawMotifEmblemFallback(
  ctx: CanvasRenderingContext2D,
  motif: ArtworkMotif,
  cx: number,
  cy: number,
  accent: string,
  foil: string,
  text: string,
  scale = 1,
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)

  const aura = ctx.createRadialGradient(0, 0, 10, 0, 0, 110)
  aura.addColorStop(0, `${accent}30`)
  aura.addColorStop(1, 'transparent')
  ctx.fillStyle = aura
  ctx.beginPath()
  ctx.arc(0, 0, 110, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = foil
  ctx.lineWidth = 2.5

  if (motif === 'celestial-moon' || motif === 'starry-lullaby') {
    ctx.fillStyle = foil
    ctx.beginPath()
    ctx.arc(-6, 0, 38, 0.35 * Math.PI, 1.65 * Math.PI, false)
    ctx.arc(12, -5, 30, 1.55 * Math.PI, 0.45 * Math.PI, true)
    ctx.closePath()
    ctx.fill()

    const stars = [
      [42, -30, 8],
      [-50, -34, 5],
      [34, 34, 6],
    ]
    for (const [sx, sy, sr] of stars) {
      ctx.beginPath()
      ctx.moveTo(sx, sy - sr)
      ctx.lineTo(sx, sy + sr)
      ctx.moveTo(sx - sr, sy)
      ctx.lineTo(sx + sr, sy)
      ctx.stroke()
    }
  } else if (motif === 'golden-laurel' || motif === 'heritage-compass') {
    ctx.beginPath()
    ctx.arc(0, 0, 50, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = accent
    ctx.beginPath()
    ctx.arc(0, 0, 38, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = foil
    ctx.beginPath()
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4
      const r = i % 2 === 0 ? 28 : 10
      const px = Math.cos(angle) * r
      const py = Math.sin(angle) * r
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()
  } else if (motif === 'velvet-heart-seal') {
    ctx.fillStyle = accent
    ctx.beginPath()
    ctx.arc(0, 0, 44, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = foil
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(0, 0, 36, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = '#FFF9F3'
    ctx.beginPath()
    ctx.moveTo(0, 18)
    ctx.bezierCurveTo(-24, 2, -24, -20, -10, -20)
    ctx.bezierCurveTo(-3, -20, 0, -13, 0, -13)
    ctx.bezierCurveTo(0, -13, 3, -20, 10, -20)
    ctx.bezierCurveTo(24, -20, 24, 2, 0, 18)
    ctx.fill()
  } else if (motif === 'couple-rings') {
    ctx.strokeStyle = foil
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(-18, 0, 28, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = accent
    ctx.beginPath()
    ctx.arc(18, 0, 28, 0, Math.PI * 2)
    ctx.stroke()
  } else if (motif === 'morning-sunbeam' || motif === 'sunset-horizon') {
    ctx.fillStyle = foil
    ctx.beginPath()
    ctx.arc(0, 4, 28, 0, Math.PI * 2)
    ctx.fill()
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * 36, 4 + Math.sin(a) * 36)
      ctx.lineTo(Math.cos(a) * 50, 4 + Math.sin(a) * 50)
      ctx.stroke()
    }
    ctx.strokeStyle = accent
    ctx.beginPath()
    ctx.moveTo(-56, 36)
    ctx.quadraticCurveTo(0, 20, 56, 36)
    ctx.stroke()
  } else if (
    motif === 'confetti-celebration' ||
    motif === 'champagne-toast' ||
    motif === 'festive-lanterns'
  ) {
    ctx.fillStyle = foil
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6
      const r = i % 2 === 0 ? 48 : 26
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(0, 0, 14, 0, Math.PI * 2)
    ctx.fillStyle = accent
    ctx.fill()
    ctx.strokeStyle = foil
    ctx.stroke()
  } else if (motif === 'ribbon-giftbox') {
    ctx.fillStyle = `${accent}35`
    ctx.strokeStyle = foil
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.roundRect(-34, -22, 68, 56, 10)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, -22)
    ctx.lineTo(0, 34)
    ctx.moveTo(-34, 4)
    ctx.lineTo(34, 4)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(-12, -30, 14, 8, -0.35, 0, Math.PI * 2)
    ctx.ellipse(12, -30, 14, 8, 0.35, 0, Math.PI * 2)
    ctx.stroke()
  } else {
    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.rotate((i * Math.PI) / 3)
      ctx.fillStyle = i % 2 === 0 ? `${accent}AA` : `${foil}99`
      ctx.beginPath()
      ctx.ellipse(0, -26, 15, 24, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = `${text}40`
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()
    }
    ctx.beginPath()
    ctx.arc(0, 0, 12, 0, Math.PI * 2)
    ctx.fillStyle = foil
    ctx.fill()
  }

  ctx.restore()
}

function loadSvgImage(svgMarkup: string, drawW: number, drawH: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const withAttrs = svgMarkup.replace(
      '<svg ',
      `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(drawW)}" height="${Math.round(drawH)}" `,
    )
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(withAttrs)}`
  })
}

async function drawSvgArtwork(
  ctx: CanvasRenderingContext2D,
  motif: ArtworkMotif,
  cx: number,
  cy: number,
  drawW: number,
  drawH: number,
  accent: string,
  foil: string,
  textColor: string,
  fallbackScale: number,
): Promise<void> {
  try {
    const svgMarkup = renderToStaticMarkup(
      createElement(CardArtwork, {
        motif,
        accent,
        foil,
        text: textColor,
      }),
    )
    const img = await loadSvgImage(svgMarkup, drawW, drawH)
    ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH)
  } catch {
    drawMotifEmblemFallback(ctx, motif, cx, cy, accent, foil, textColor, fallbackScale)
  }
}

function drawDecorativeOverlay(
  ctx: CanvasRenderingContext2D,
  card: PersonalizedCard,
  width: number,
  height: number,
  accent: string,
  foil: string,
  unit: number,
) {
  const effects = card.effects ?? []
  const stickers = card.stickers ?? []

  if (effects.includes('confetti')) {
    const colors = [accent, foil, '#E9A6B5', '#D9B77E', '#9C78C4']
    for (let i = 0; i < 28; i++) {
      const px = ((i * 257 * unit) % Math.max(100, width - 180 * unit)) + 90 * unit
      const py = ((i * 193 * unit) % Math.max(100, height - 200 * unit)) + 100 * unit
      ctx.save()
      ctx.translate(px, py)
      ctx.rotate((i * 37 * Math.PI) / 180)
      ctx.fillStyle = `${colors[i % colors.length]}88`
      ctx.fillRect(-7 * unit, -3 * unit, 14 * unit, 6 * unit)
      ctx.restore()
    }
  }

  if (effects.includes('hearts')) {
    const spots = [
      [140 * unit, 220 * unit],
      [width - 140 * unit, 230 * unit],
      [155 * unit, height - 220 * unit],
      [width - 155 * unit, height - 230 * unit],
    ]
    ctx.fillStyle = `${accent}77`
    ctx.font = `${Math.round(32 * unit)}px serif`
    ctx.textAlign = 'center'
    for (const [hx, hy] of spots) {
      ctx.fillText('♥', hx, hy)
    }
  }

  if (effects.includes('flowers')) {
    const spots = [
      [135 * unit, 190 * unit],
      [width - 135 * unit, 190 * unit],
      [145 * unit, height - 180 * unit],
      [width - 145 * unit, height - 180 * unit],
    ]
    ctx.fillStyle = `${accent}88`
    ctx.font = `${Math.round(34 * unit)}px serif`
    ctx.textAlign = 'center'
    for (const [fx, fy] of spots) {
      ctx.fillText('❀', fx, fy)
    }
  }

  if (effects.includes('stars')) {
    const spots = [
      [175 * unit, 175 * unit],
      [width - 175 * unit, 185 * unit],
      [185 * unit, height - 250 * unit],
      [width - 185 * unit, height - 250 * unit],
    ]
    ctx.fillStyle = `${foil}AA`
    ctx.font = `${Math.round(28 * unit)}px serif`
    ctx.textAlign = 'center'
    for (const [sx, sy] of spots) {
      ctx.fillText('✦', sx, sy)
    }
  }

  if (stickers.length > 0) {
    const positions = [
      [width - 130 * unit, 135 * unit],
      [130 * unit, 135 * unit],
      [width - 130 * unit, height - 140 * unit],
      [130 * unit, height - 140 * unit],
    ]
    stickers.slice(0, 4).forEach((stickerId, idx) => {
      const opt = STICKER_OPTIONS.find((s) => s.id === stickerId)
      if (!opt) return
      const [sx, sy] = positions[idx]
      ctx.save()
      ctx.fillStyle = `${foil}30`
      ctx.strokeStyle = foil
      ctx.lineWidth = 2 * unit
      ctx.beginPath()
      ctx.arc(sx, sy, 28 * unit, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = accent
      ctx.font = `${Math.round(26 * unit)}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(opt.symbol, sx, sy + unit)
      ctx.restore()
    })
  }
}

function resolveCardTheme(card: PersonalizedCard): {
  palette: CardPalette
  textColor: string
} {
  const template = getTemplateById(card.templateId)
  const palette = getPaletteById(card.paletteId || template.defaultPaletteId)
  const gradientPreset = getGradientById(card.gradientId)

  let textColor = card.customTextColor || palette.text
  if (card.backgroundMode === 'gradient' && !card.customTextColor && !card.customGradientFrom) {
    textColor = gradientPreset.textColor
  }
  return { palette, textColor }
}

function drawCardBackdropAndBorders(
  ctx: CanvasRenderingContext2D,
  card: PersonalizedCard,
  width: number,
  height: number,
  palette: CardPalette,
  textColor: string,
  unit: number,
) {
  const gradientPreset = getGradientById(card.gradientId)

  // 1. Background
  if (card.backgroundMode === 'solid' && card.customBgColor) {
    ctx.fillStyle = card.customBgColor
    ctx.fillRect(0, 0, width, height)
  } else if (card.backgroundMode === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, width, height)
    if (card.customGradientFrom && card.customGradientTo) {
      grad.addColorStop(0, card.customGradientFrom)
      grad.addColorStop(1, card.customGradientTo)
    } else {
      grad.addColorStop(0, gradientPreset.from)
      grad.addColorStop(0.5, gradientPreset.via)
      grad.addColorStop(1, gradientPreset.to)
    }
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
  } else {
    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, palette.bg)
    grad.addColorStop(0.55, palette.surface)
    grad.addColorStop(1, palette.bgSecondary)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
  }

  // 2. Ambient glow
  const glow1 = ctx.createRadialGradient(
    width * 0.2,
    height * 0.18,
    20 * unit,
    width * 0.2,
    height * 0.18,
    420 * unit,
  )
  glow1.addColorStop(0, `${palette.accent}24`)
  glow1.addColorStop(1, 'transparent')
  ctx.fillStyle = glow1
  ctx.fillRect(0, 0, width, height)

  const glow2 = ctx.createRadialGradient(
    width * 0.82,
    height * 0.84,
    20 * unit,
    width * 0.82,
    height * 0.84,
    460 * unit,
  )
  glow2.addColorStop(0, `${palette.foil}28`)
  glow2.addColorStop(1, 'transparent')
  ctx.fillStyle = glow2
  ctx.fillRect(0, 0, width, height)

  // 3. Pattern & Borders
  const template = getTemplateById(card.templateId)
  const activePattern = card.pattern ?? template.defaultPattern

  if (activePattern === 'starlight') {
    ctx.fillStyle = `${palette.foil}99`
    for (let i = 0; i < 46; i++) {
      const sx = ((i * 211 * unit) % Math.max(80, width - 140 * unit)) + 70 * unit
      const sy = ((i * 347 * unit) % Math.max(80, height - 140 * unit)) + 70 * unit
      const sr = ((i % 3) + 1.5) * unit
      ctx.beginPath()
      ctx.arc(sx, sy, sr, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  if (activePattern === 'botanical-watermark') {
    ctx.save()
    ctx.globalAlpha = 0.22
    const wx = width - 260 * unit
    const wy = height - 260 * unit
    ctx.translate(wx, wy)
    ctx.scale(2.1 * unit, 2.1 * unit)
    ctx.strokeStyle = palette.foil
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(15, 88)
    ctx.bezierCurveTo(34, 64, 56, 44, 86, 24)
    ctx.stroke()

    ctx.save()
    ctx.translate(42, 60)
    ctx.rotate((-35 * Math.PI) / 180)
    ctx.fillStyle = palette.accent
    ctx.beginPath()
    ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.translate(64, 44)
    ctx.rotate((-35 * Math.PI) / 180)
    ctx.fillStyle = palette.foil
    ctx.beginPath()
    ctx.ellipse(0, 0, 11, 5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.restore()
  }

  if (activePattern !== 'none') {
    const outerPad = 52 * unit
    ctx.strokeStyle = `${palette.foil}AA`
    ctx.lineWidth = 2.5 * unit
    ctx.beginPath()
    ctx.roundRect(outerPad, outerPad, width - outerPad * 2, height - outerPad * 2, 26 * unit)
    ctx.stroke()

    if (activePattern === 'linen-minimal' || activePattern === 'double-gold') {
      const innerPad = 72 * unit
      ctx.strokeStyle = activePattern === 'double-gold' ? palette.foil : `${textColor}30`
      ctx.lineWidth = 1.5 * unit
      ctx.beginPath()
      ctx.roundRect(innerPad, innerPad, width - innerPad * 2, height - innerPad * 2, 18 * unit)
      ctx.stroke()
    }

    if (activePattern === 'scalloped-frame') {
      ctx.strokeStyle = `${palette.accent}88`
      ctx.lineWidth = 2 * unit
      for (let x = 76 * unit; x <= width - 76 * unit; x += 34 * unit) {
        ctx.beginPath()
        ctx.arc(x, 66 * unit, 10 * unit, 0, Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x, height - 66 * unit, 10 * unit, Math.PI, 0)
        ctx.stroke()
      }
    }

    if (activePattern === 'foil-arch') {
      ctx.save()
      ctx.strokeStyle = `${palette.foil}CC`
      ctx.lineWidth = 2 * unit
      const inset = 110 * unit
      const archR = width / 2 - inset
      const topArcCenterY = Math.min(440 * unit, height * 0.36)
      ctx.beginPath()
      ctx.moveTo(inset, height - 96 * unit)
      ctx.lineTo(inset, topArcCenterY)
      ctx.arc(width / 2, topArcCenterY, archR, Math.PI, 0, false)
      ctx.lineTo(width - inset, height - 96 * unit)
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }
  }

  // 4. Decorative stickers & effect visuals
  drawDecorativeOverlay(ctx, card, width, height, palette.accent, palette.foil, unit)
}

/**
 * Renders either the Front Cover ('front') or Inside Message ('inside') page
 * matching the live GreetingCardPreview component for PDF / print exports.
 */
export async function renderCardSideToCanvas(
  card: PersonalizedCard,
  side: 'front' | 'inside',
  scale = 1.25,
): Promise<HTMLCanvasElement> {
  if (typeof document === 'undefined') {
    throw new Error('Document environment is unavailable for rendering.')
  }
  await document.fonts.ready

  const layout = card.layout ?? 'portrait'
  const { width, height } = getCardCanvasDimensions(layout, scale)
  const unit = scale

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context unavailable')

  const template = getTemplateById(card.templateId)
  const font = getFontById(card.fontId || template.defaultFontId)
  const { palette, textColor } = resolveCardTheme(card)

  drawCardBackdropAndBorders(ctx, card, width, height, palette, textColor, unit)

  const textAlign = card.textAlign ?? 'center'
  const padX = 135 * unit
  const contentWidth = width - padX * 2
  const anchorX =
    textAlign === 'left' ? padX : textAlign === 'right' ? width - padX : width / 2
  const sizeScale =
    card.fontSize === 'sm' ? 0.88 : card.fontSize === 'lg' ? 1.12 : card.fontSize === 'xl' ? 1.24 : 1

  const displayHeadline = card.headline?.trim() || template.defaultHeadline
  const displayRecipient = card.recipientName?.trim() || 'Someone Special'
  const displaySender = card.senderName?.trim() || 'With Love'
  const displayMessage = card.message?.trim() || template.defaultMessage
  const displaySeal = (card.sealText?.trim() || template.sealInitial || 'V').slice(0, 2).toUpperCase()
  const relationship = card.relationship?.trim() || ''

  if (side === 'front') {
    // 1. Occasion & optional relationship pill(s)
    ctx.save()
    ctx.font = `600 ${Math.round(20 * unit)}px "Plus Jakarta Sans", sans-serif`
    const occText = template.occasion.toUpperCase()
    const occW = Math.min(contentWidth, ctx.measureText(occText).width + 58 * unit)
    const relText = relationship ? `For ${relationship}` : ''
    const relW = relText
      ? Math.min(contentWidth * 0.55, ctx.measureText(relText).width + 44 * unit)
      : 0
    const gap = relText ? 14 * unit : 0
    const totalPillsW = occW + gap + relW
    const pillY = (layout === 'landscape' ? 105 : 120) * unit
    const pillH = 48 * unit

    let pillStartX = width / 2 - totalPillsW / 2
    if (textAlign === 'left') pillStartX = padX
    else if (textAlign === 'right') pillStartX = width - padX - totalPillsW

    // Occasion pill
    ctx.fillStyle = palette.badgeBg
    ctx.strokeStyle = `${palette.foil}88`
    ctx.lineWidth = 1.5 * unit
    ctx.beginPath()
    ctx.roundRect(pillStartX, pillY, occW, pillH, pillH / 2)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(occText, pillStartX + occW / 2, pillY + pillH / 2, occW - 24 * unit)

    // Relationship pill
    if (relText) {
      const rx = pillStartX + occW + gap
      ctx.fillStyle = `${palette.foil}38`
      ctx.beginPath()
      ctx.roundRect(rx, pillY, relW, pillH, pillH / 2)
      ctx.fill()
      ctx.fillStyle = textColor
      ctx.fillText(relText, rx + relW / 2, pillY + pillH / 2, relW - 20 * unit)
    }
    ctx.restore()

    // 2. Central SVG Artwork (exact CardArtwork component)
    const artW = (layout === 'landscape' ? 470 : 590) * unit
    const artH = Math.round(artW * (190 / 240))
    const artCy = layout === 'landscape' ? height * 0.41 : height * 0.42

    if (template.frontStyle === 'split-ribbon') {
      ctx.save()
      ctx.globalAlpha = 0.2
      ctx.fillStyle = palette.accent
      ctx.fillRect(0, height * 0.26, width, height * 0.42)
      ctx.globalAlpha = 0.75
      ctx.strokeStyle = palette.foil
      ctx.lineWidth = 1.6 * unit
      ctx.beginPath()
      ctx.moveTo(0, height * 0.26)
      ctx.lineTo(width, height * 0.26)
      ctx.moveTo(0, height * 0.68)
      ctx.lineTo(width, height * 0.68)
      ctx.stroke()
      ctx.restore()
    } else if (template.frontStyle === 'crest-medallion') {
      ctx.save()
      ctx.fillStyle = `${palette.foil}18`
      ctx.strokeStyle = `${palette.foil}75`
      ctx.lineWidth = 2 * unit
      ctx.beginPath()
      ctx.arc(width / 2, artCy, Math.min(artW, artH) * 0.48, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }

    await drawSvgArtwork(
      ctx,
      template.motif,
      width / 2,
      artCy,
      artW,
      artH,
      palette.accent,
      palette.foil,
      textColor,
      layout === 'landscape' ? 1.1 * unit : 1.35 * unit,
    )

    // 3. Headline + Recipient line (auto-fitted cleanly above watermark)
    const bottomFooterY = height - (layout === 'landscape' ? 108 : 130) * unit
    const headlineZoneTop = artCy + artH / 2 + (layout === 'landscape' ? 28 : 42) * unit
    if (template.frontStyle === 'editorial-poster') {
      ctx.save()
      ctx.strokeStyle = palette.foil
      ctx.lineWidth = 2 * unit
      ctx.beginPath()
      ctx.moveTo(width / 2 - 56 * unit, headlineZoneTop - 16 * unit)
      ctx.lineTo(width / 2 + 56 * unit, headlineZoneTop - 16 * unit)
      ctx.stroke()
      ctx.restore()
    }
    const maxHeadlineHeight = Math.max(120 * unit, bottomFooterY - 72 * unit - headlineZoneTop)

    let headlinePx = Math.round((layout === 'landscape' ? 62 : 70) * sizeScale * unit)
    let headlineLines: string[] = []
    let lineH = 0

    while (headlinePx >= 34 * unit) {
      ctx.font = `600 ${headlinePx}px "${font.canvasFamily}", Georgia, serif`
      headlineLines = wrapTextLines(ctx, displayHeadline, contentWidth)
      lineH = Math.round(headlinePx * 1.18)
      if (headlineLines.length * lineH <= maxHeadlineHeight) break
      headlinePx -= Math.round(4 * unit)
    }

    ctx.fillStyle = textColor
    ctx.textAlign = textAlign
    ctx.textBaseline = 'alphabetic'
    ctx.font = `600 ${headlinePx}px "${font.canvasFamily}", Georgia, serif`

    const totalTextBlockH = headlineLines.length * lineH + 54 * unit
    let cursorY = headlineZoneTop + Math.max(0, (maxHeadlineHeight - totalTextBlockH) * 0.35) + headlinePx * 0.85

    for (const line of headlineLines) {
      ctx.fillText(line, anchorX, cursorY)
      cursorY += lineH
    }

    // Recipient line: "For {displayRecipient}"
    ctx.save()
    ctx.globalAlpha = 0.84
    ctx.fillStyle = textColor
    const recPx = Math.round(30 * unit)
    ctx.font = `500 ${recPx}px "Plus Jakarta Sans", sans-serif`
    ctx.fillText(`For ${displayRecipient}`, anchorX, cursorY + 18 * unit, contentWidth)
    ctx.restore()

    // 4. Bottom Cardelle ornament
    ctx.save()
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.75
    ctx.font = `600 ${Math.round(18 * unit)}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const brandText = 'CARDELLE'
    const brandW = ctx.measureText(brandText).width
    ctx.fillText(brandText, width / 2, bottomFooterY)
    ctx.strokeStyle = palette.foil
    ctx.lineWidth = 1.8 * unit
    ctx.beginPath()
    ctx.moveTo(width / 2 - brandW / 2 - 48 * unit, bottomFooterY)
    ctx.lineTo(width / 2 - brandW / 2 - 18 * unit, bottomFooterY)
    ctx.moveTo(width / 2 + brandW / 2 + 18 * unit, bottomFooterY)
    ctx.lineTo(width / 2 + brandW / 2 + 48 * unit, bottomFooterY)
    ctx.stroke()
    ctx.restore()

    return canvas
  }

  // INSIDE PAGE ('inside')
  // 1. Top Occasion Eyebrow + Salutation
  const topY = (layout === 'landscape' ? 128 : 155) * unit
  ctx.save()
  ctx.textAlign = textAlign
  ctx.textBaseline = 'alphabetic'
  ctx.globalAlpha = 0.78
  ctx.fillStyle = textColor
  ctx.font = `600 ${Math.round(19 * unit)}px "Plus Jakarta Sans", sans-serif`
  const eyebrow = relationship
    ? `${template.occasion.toUpperCase()}  ·  FOR ${relationship.toUpperCase()}`
    : template.occasion.toUpperCase()
  ctx.fillText(eyebrow, anchorX, topY, contentWidth)
  ctx.restore()

  const salutationPx = Math.round((layout === 'landscape' ? 44 : 50) * unit)
  ctx.fillStyle = palette.accent
  ctx.textAlign = textAlign
  ctx.textBaseline = 'alphabetic'
  ctx.font = `italic 500 ${salutationPx}px "Cormorant Garamond", Georgia, serif`
  const salutationLines = wrapTextLines(ctx, `Dearest ${displayRecipient},`, contentWidth)
  let salutationY = topY + 56 * unit
  for (const sLine of salutationLines.slice(0, 2)) {
    ctx.fillText(sLine, anchorX, salutationY)
    salutationY += Math.round(salutationPx * 1.15)
  }

  // 2. Bottom Sign-off & Wax Seal geometry (reserve safe bottom zone)
  const sealCenterY = height - (layout === 'landscape' ? 115 : 140) * unit
  const signOffNameY = sealCenterY - 58 * unit
  const signOffLabelY = signOffNameY - 48 * unit
  const middleTop = salutationY + 24 * unit
  const middleBottom = signOffLabelY - 46 * unit
  const availableMiddleH = Math.max(180 * unit, middleBottom - middleTop)

  // 3. Auto-fit full message + optional gift note so long messages NEVER clip
  const giftNoteText = card.giftNote?.trim() || ''
  let bodyPx = Math.round(
    (font.id === 'handwritten-script' || font.id === 'caveat-note' ? 46 : 36) * sizeScale * unit,
  )
  const minBodyPx = Math.round(20 * unit)
  let msgLines: string[] = []
  let lineHeight = 0
  let giftLines: string[] = []
  let giftBoxH = 0
  let giftPx = Math.round(23 * unit)

  const measureInsideBlock = () => {
    ctx.font = `400 ${bodyPx}px "${font.canvasFamily}", Georgia, serif`
    lineHeight = Math.round(bodyPx * 1.48)
    msgLines = wrapTextLines(ctx, displayMessage, contentWidth)
    let msgH = 0
    for (const line of msgLines) {
      msgH += line === '' ? lineHeight * 0.55 : lineHeight
    }

    giftBoxH = 0
    giftLines = []
    if (giftNoteText) {
      ctx.font = `500 ${giftPx}px "Plus Jakarta Sans", sans-serif`
      giftLines = wrapTextLines(ctx, `✦  ${giftNoteText}`, contentWidth - 72 * unit)
      giftBoxH = Math.max(62 * unit, giftLines.length * (giftPx * 1.35) + 28 * unit) + 28 * unit
    }
    return msgH + giftBoxH
  }

  while (measureInsideBlock() > availableMiddleH && bodyPx > minBodyPx) {
    bodyPx -= Math.round(2 * unit)
    if (giftNoteText && giftPx > 18 * unit && bodyPx < 28 * unit) {
      giftPx = Math.round(19 * unit)
    }
  }

  const totalBlockH = measureInsideBlock()
  let msgCursorY = middleTop + Math.max(0, (availableMiddleH - totalBlockH) * 0.45) + bodyPx * 0.85

  if (template.insideStyle === 'poetic-framed') {
    const boxTop = msgCursorY - bodyPx - 18 * unit
    const boxH = msgLines.length * lineHeight + 48 * unit
    ctx.save()
    ctx.fillStyle = `${palette.foil}16`
    ctx.strokeStyle = `${palette.foil}70`
    ctx.lineWidth = 1.6 * unit
    ctx.beginPath()
    ctx.roundRect(padX - 24 * unit, boxTop, contentWidth + 48 * unit, Math.max(120 * unit, boxH), 24 * unit)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  } else if (template.insideStyle === 'letterpress-ruled') {
    const ruleStart = msgCursorY + 12 * unit
    ctx.save()
    ctx.strokeStyle = `${palette.foil}44`
    ctx.lineWidth = 1.2 * unit
    for (let i = 0; i < Math.max(2, msgLines.length); i++) {
      const ry = ruleStart + i * lineHeight
      ctx.beginPath()
      ctx.moveTo(padX, ry)
      ctx.lineTo(width - padX, ry)
      ctx.stroke()
    }
    ctx.restore()
  } else if (template.insideStyle === 'keepsake-card') {
    ctx.save()
    ctx.strokeStyle = palette.foil
    ctx.lineWidth = 1.4 * unit
    ctx.beginPath()
    ctx.moveTo(width / 2 - 70 * unit, middleTop - 8 * unit)
    ctx.lineTo(width / 2 + 70 * unit, middleTop - 8 * unit)
    ctx.stroke()
    ctx.restore()
  }

  ctx.fillStyle = textColor
  ctx.textAlign = textAlign
  ctx.textBaseline = 'alphabetic'
  ctx.font = `400 ${bodyPx}px "${font.canvasFamily}", Georgia, serif`

  for (const line of msgLines) {
    if (line === '') {
      msgCursorY += lineHeight * 0.55
    } else {
      ctx.fillText(line, anchorX, msgCursorY)
      msgCursorY += lineHeight
    }
  }

  // Optional gift note pill
  if (giftNoteText && giftLines.length > 0) {
    const giftY = msgCursorY + 12 * unit
    const pillH = Math.max(58 * unit, giftLines.length * (giftPx * 1.35) + 26 * unit)
    ctx.font = `500 ${giftPx}px "Plus Jakarta Sans", sans-serif`
    const widestLine = Math.max(...giftLines.map((l) => ctx.measureText(l).width))
    const boxW = Math.min(contentWidth, Math.max(260 * unit, widestLine + 76 * unit))
    let boxX = width / 2 - boxW / 2
    if (textAlign === 'left') boxX = padX
    else if (textAlign === 'right') boxX = width - padX - boxW

    ctx.save()
    ctx.fillStyle = `${palette.foil}28`
    ctx.strokeStyle = `${palette.foil}99`
    ctx.lineWidth = 1.6 * unit
    ctx.beginPath()
    ctx.roundRect(boxX, giftY, boxW, pillH, Math.min(28 * unit, pillH / 2))
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const firstLineY = giftY + pillH / 2 - ((giftLines.length - 1) * giftPx * 1.35) / 2
    giftLines.forEach((gLine, idx) => {
      ctx.fillText(gLine, boxX + boxW / 2, firstLineY + idx * giftPx * 1.35)
    })
    ctx.restore()
  }

  // Sign-off & Wax Seal
  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.globalAlpha = 0.78
  ctx.fillStyle = textColor
  ctx.font = `500 ${Math.round(19 * unit)}px "Plus Jakarta Sans", sans-serif`
  ctx.fillText('WITH WARMTH & LOVE', width / 2, signOffLabelY)
  ctx.restore()

  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.font = `600 ${Math.round(44 * unit)}px "Cormorant Garamond", Georgia, serif`
  ctx.fillText(displaySender, width / 2, signOffNameY, contentWidth)

  ctx.save()
  ctx.fillStyle = palette.accent
  ctx.beginPath()
  ctx.arc(width / 2, sealCenterY, 32 * unit, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = palette.foil
  ctx.lineWidth = 2.2 * unit
  ctx.beginPath()
  ctx.arc(width / 2, sealCenterY, 26 * unit, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = '#FFF9F3'
  ctx.font = `600 ${Math.round(24 * unit)}px "Cormorant Garamond", Georgia, serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(displaySeal, width / 2, sealCenterY + unit)
  ctx.restore()

  return canvas
}

/**
 * Existing PNG/JPG single-image export preserved cleanly.
 */
export async function exportCardToImage(
  card: PersonalizedCard,
  format: 'png' | 'jpeg' = 'png',
): Promise<void> {
  if (typeof document === 'undefined') return
  await document.fonts.ready

  const layout = card.layout ?? 'portrait'
  const { width, height } = getCardCanvasDimensions(layout, 1)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context unavailable')

  const template = getTemplateById(card.templateId)
  const font = getFontById(card.fontId)
  const { palette, textColor } = resolveCardTheme(card)

  drawCardBackdropAndBorders(ctx, card, width, height, palette, textColor, 1)

  // Occasion & optional relationship pill
  const labelText = card.relationship?.trim()
    ? `${template.occasion.toUpperCase()}  ·  FOR ${card.relationship.trim().toUpperCase()}`
    : template.occasion.toUpperCase()

  ctx.save()
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif'
  const pillWidth = Math.min(width - 260, ctx.measureText(labelText).width + 60)
  ctx.fillStyle = palette.badgeBg
  ctx.beginPath()
  ctx.roundRect(width / 2 - pillWidth / 2, 95, pillWidth, 48, 24)
  ctx.fill()
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(labelText, width / 2, 119)
  ctx.restore()

  // Motif Emblem
  const emblemY = layout === 'landscape' ? 235 : 265
  const emblemW = layout === 'landscape' ? 245 : 285
  const emblemH = Math.round(emblemW * (190 / 240))
  await drawSvgArtwork(
    ctx,
    template.motif,
    width / 2,
    emblemY,
    emblemW,
    emblemH,
    palette.accent,
    palette.foil,
    textColor,
    layout === 'landscape' ? 0.78 : 0.92,
  )

  // Alignment calculations
  const textAlign = card.textAlign ?? 'center'
  const contentWidth = width - 280
  const anchorX =
    textAlign === 'left' ? 140 : textAlign === 'right' ? width - 140 : width / 2

  ctx.textAlign = textAlign
  ctx.textBaseline = 'alphabetic'

  // Headline
  const sizeScale =
    card.fontSize === 'sm' ? 0.88 : card.fontSize === 'lg' ? 1.12 : card.fontSize === 'xl' ? 1.24 : 1
  ctx.fillStyle = textColor
  const headlinePx = Math.round((layout === 'landscape' ? 52 : 58) * sizeScale)
  ctx.font = `600 ${headlinePx}px "${font.canvasFamily}", Georgia, serif`
  const headlineLines = wrapTextLines(ctx, card.headline || template.defaultHeadline, contentWidth)

  let cursorY = layout === 'landscape' ? 360 : 415
  for (const line of headlineLines.slice(0, 2)) {
    ctx.fillText(line, anchorX, cursorY)
    cursorY += headlinePx * 1.16
  }

  // Divider ornament
  ctx.strokeStyle = palette.foil
  ctx.lineWidth = 2
  ctx.beginPath()
  const lineStart = textAlign === 'left' ? 140 : textAlign === 'right' ? width - 300 : width / 2 - 80
  ctx.moveTo(lineStart, cursorY + 4)
  ctx.lineTo(lineStart + 160, cursorY + 4)
  ctx.stroke()
  cursorY += layout === 'landscape' ? 54 : 66

  // Salutation
  ctx.fillStyle = palette.accent
  ctx.font = `italic 500 36px "Cormorant Garamond", Georgia, serif`
  const recipient = card.recipientName.trim() || 'Someone Special'
  ctx.fillText(`Dearest ${recipient},`, anchorX, cursorY)
  cursorY += layout === 'landscape' ? 54 : 66

  // Message
  ctx.fillStyle = textColor
  const baseBody = font.id === 'handwritten-script' || font.id === 'caveat-note' ? 40 : 32
  const bodyPx = Math.round(baseBody * sizeScale)
  const lineHeight = Math.round(bodyPx * 1.48)
  ctx.font = `400 ${bodyPx}px "${font.canvasFamily}", Georgia, serif`
  const maxLines = layout === 'landscape' ? 6 : 9
  const msgLines = wrapTextLines(
    ctx,
    card.message.trim() || template.defaultMessage,
    contentWidth,
  ).slice(0, maxLines)

  for (const line of msgLines) {
    if (line === '') {
      cursorY += lineHeight * 0.5
    } else {
      ctx.fillText(line, anchorX, cursorY)
      cursorY += lineHeight
    }
  }

  // Optional gift note
  if (card.giftNote?.trim()) {
    const giftY = Math.min(height - 230, cursorY + 26)
    ctx.save()
    ctx.fillStyle = `${palette.foil}25`
    ctx.strokeStyle = `${palette.foil}AA`
    ctx.lineWidth = 1.5
    const boxW = Math.min(640, width - 220)
    ctx.beginPath()
    ctx.roundRect(width / 2 - boxW / 2, giftY, boxW, 60, 20)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = textColor
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`✦  ${card.giftNote.trim().slice(0, 60)}`, width / 2, giftY + 30)
    ctx.restore()
  }

  // Sign-off & Seal
  const signOffY = height - (layout === 'landscape' ? 135 : 175)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = `${textColor}99`
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif'
  ctx.fillText('WITH WARMTH & LOVE', width / 2, signOffY - 36)

  ctx.fillStyle = textColor
  ctx.font = `600 42px "Cormorant Garamond", Georgia, serif`
  ctx.fillText(card.senderName.trim() || 'Always Yours', width / 2, signOffY + 12)

  ctx.save()
  ctx.fillStyle = palette.accent
  ctx.beginPath()
  ctx.arc(width / 2, height - 96, 30, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = palette.foil
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(width / 2, height - 96, 24, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = '#FFF9F3'
  ctx.font = '600 24px "Cormorant Garamond", Georgia, serif'
  ctx.textBaseline = 'middle'
  ctx.fillText(
    (card.sealText || template.sealInitial || 'C').slice(0, 2).toUpperCase(),
    width / 2,
    height - 95,
  )
  ctx.restore()

  const slug = recipient
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png'
  const ext = format === 'jpeg' ? 'jpg' : 'png'
  const dataUrl = canvas.toDataURL(mime, format === 'jpeg' ? 0.95 : undefined)

  const link = document.createElement('a')
  link.download = `cardelle-card-${slug || 'keepsake'}.${ext}`
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export async function exportCardToPng(card: PersonalizedCard): Promise<void> {
  return exportCardToImage(card, 'png')
}
