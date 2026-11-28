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

  // 2b. Dreamy warm bokeh lights & fairy light dots matching GreetingCardPreview
  const bokehOrbs: [number, number, number, string, number][] = [
    [width * 0.14, height * 0.1, 130 * unit, '#FFF3CC', 0.42],
    [width * 0.86, height * 0.16, 115 * unit, '#FFE5EC', 0.36],
    [width * 0.16, height * 0.84, 95 * unit, '#FFF5D6', 0.32],
    [width * 0.84, height * 0.88, 150 * unit, palette.accent, 0.2],
  ]
  for (const [bx, by, br, col, alpha] of bokehOrbs) {
    ctx.save()
    ctx.globalAlpha = alpha
    const bGrad = ctx.createRadialGradient(bx, by, 4 * unit, bx, by, br)
    bGrad.addColorStop(0, col)
    bGrad.addColorStop(0.55, `${palette.foil}66`)
    bGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = bGrad
    ctx.beginPath()
    ctx.arc(bx, by, br, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const fairyDots: [number, number, number, string, number][] = [
    [width * 0.12, height * 0.16, 9 * unit, '#FFE8A3', 0.52],
    [width * 0.86, height * 0.24, 11 * unit, '#FFD6A5', 0.48],
    [width * 0.08, height * 0.52, 7 * unit, palette.foil, 0.45],
    [width * 0.9, height * 0.76, 9 * unit, '#FFE8A3', 0.5],
  ]
  for (const [fx, fy, fr, col, alpha] of fairyDots) {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.arc(fx, fy, fr, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

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

    // Corner filigree L-brackets matching GreetingCardPreview
    const cPad = 68 * unit
    const cArm = 46 * unit
    ctx.save()
    ctx.strokeStyle = palette.foil
    ctx.fillStyle = palette.foil
    ctx.globalAlpha = 0.78
    ctx.lineWidth = 2.2 * unit
    ctx.lineCap = 'round'
    const corners: [number, number, number, number][] = [
      [cPad, cPad, 1, 1],
      [width - cPad, cPad, -1, 1],
      [width - cPad, height - cPad, -1, -1],
      [cPad, height - cPad, 1, -1],
    ]
    for (const [cx, cy, sx, sy] of corners) {
      ctx.beginPath()
      ctx.moveTo(cx, cy + sy * cArm)
      ctx.lineTo(cx, cy)
      ctx.lineTo(cx + sx * cArm, cy)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx + sx * 12 * unit, cy + sy * 12 * unit, 3.2 * unit, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

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

function isDarkHexColor(hex: string): boolean {
  const clean = hex.trim().toLowerCase()
  return (
    clean.startsWith('#1') ||
    clean.startsWith('#2') ||
    clean.startsWith('#3') ||
    clean.startsWith('#4') ||
    clean.startsWith('#5')
  )
}

function drawCurvedBrushUnderline(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  y: number,
  spanWidth: number,
  color: string,
  unit: number,
) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 5 * unit
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(centerX - spanWidth / 2, y + 4 * unit)
  ctx.bezierCurveTo(
    centerX - spanWidth * 0.18,
    y - 5 * unit,
    centerX + spanWidth * 0.22,
    y - 6 * unit,
    centerX + spanWidth / 2,
    y + 1 * unit,
  )
  ctx.stroke()
  ctx.restore()
}

function drawBrushStrokeBannerOnCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  text: string,
  bgColor: string,
  bannerTextColor: string,
  heartColor: string,
  maxBannerWidth: number,
  fontPx: number,
  unit: number,
) {
  ctx.save()
  ctx.font = `600 ${fontPx}px "Caveat", "Dancing Script", cursive`
  const display = `${text}  ♡`
  const measured = ctx.measureText(display).width
  const bannerW = Math.min(maxBannerWidth, Math.max(240 * unit, measured + 76 * unit))
  const bannerH = Math.max(52 * unit, fontPx * 1.55)
  const left = centerX - bannerW / 2
  const top = centerY - bannerH / 2

  ctx.shadowColor = 'rgba(42, 23, 38, 0.14)'
  ctx.shadowBlur = 10 * unit
  ctx.shadowOffsetY = 4 * unit
  ctx.fillStyle = bgColor
  ctx.beginPath()
  ctx.moveTo(left + 14 * unit, top + 6 * unit)
  ctx.bezierCurveTo(
    left + bannerW * 0.25,
    top + 1 * unit,
    left + bannerW * 0.72,
    top + 3 * unit,
    left + bannerW - 10 * unit,
    top + 7 * unit,
  )
  ctx.bezierCurveTo(
    left + bannerW + 2 * unit,
    top + bannerH * 0.35,
    left + bannerW - 4 * unit,
    top + bannerH * 0.72,
    left + bannerW - 14 * unit,
    top + bannerH - 5 * unit,
  )
  ctx.bezierCurveTo(
    left + bannerW * 0.65,
    top + bannerH - 1 * unit,
    left + bannerW * 0.28,
    top + bannerH + 1 * unit,
    left + 12 * unit,
    top + bannerH - 6 * unit,
  )
  ctx.bezierCurveTo(
    left - 2 * unit,
    top + bannerH * 0.72,
    left + 4 * unit,
    top + bannerH * 0.34,
    left + 14 * unit,
    top + 6 * unit,
  )
  ctx.closePath()
  ctx.fill()

  ctx.shadowColor = 'transparent'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const pureTextW = ctx.measureText(text).width
  const heartW = ctx.measureText(' ♡').width
  const totalW = Math.min(bannerW - 36 * unit, pureTextW + heartW)
  const textX = centerX - heartW / 2
  ctx.fillStyle = bannerTextColor
  ctx.fillText(text, textX, centerY + unit, bannerW - 56 * unit)
  ctx.fillStyle = heartColor
  ctx.fillText(' ♡', textX + Math.min(pureTextW, bannerW - 56 * unit) / 2 + heartW * 0.45, centerY + unit)
  ctx.restore()
  return { totalW, bannerH }
}

function drawSculptedWaxSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  accent: string,
  foil: string,
  sealText: string,
  unit: number,
) {
  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.24)'
  ctx.shadowBlur = 14 * unit
  ctx.shadowOffsetY = 6 * unit
  ctx.fillStyle = accent
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = 'transparent'
  const sheen = ctx.createRadialGradient(
    cx - radius * 0.35,
    cy - radius * 0.35,
    2 * unit,
    cx,
    cy,
    radius,
  )
  sheen.addColorStop(0, 'rgba(255, 255, 255, 0.36)')
  sheen.addColorStop(0.6, 'transparent')
  sheen.addColorStop(1, 'rgba(0, 0, 0, 0.2)')
  ctx.fillStyle = sheen
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = foil
  ctx.lineWidth = 2.2 * unit
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 0.81, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = '#FFF9F3'
  ctx.font = `600 ${Math.round(radius * 0.75)}px "Cormorant Garamond", Georgia, serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(sealText, cx, cy + unit)
  ctx.restore()
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
    // 1. Engraved stationery crest header
    ctx.save()
    ctx.font = `600 ${Math.round(20 * unit)}px "Plus Jakarta Sans", sans-serif`
    const occText = template.occasion.toUpperCase()
    const occW = Math.min(contentWidth * 0.78, ctx.measureText(occText).width + 16 * unit)
    const headerY = (layout === 'landscape' ? 124 : 140) * unit
    const lineLen = 36 * unit

    ctx.textBaseline = 'middle'
    let headerCenterX = width / 2
    if (textAlign === 'left') {
      headerCenterX = padX + occW / 2 + lineLen + 14 * unit
    } else if (textAlign === 'right') {
      headerCenterX = width - padX - occW / 2 - lineLen - 14 * unit
    }

    ctx.strokeStyle = `${palette.foil}BF`
    ctx.lineWidth = 1.8 * unit
    ctx.beginPath()
    ctx.moveTo(headerCenterX - occW / 2 - 12 * unit - lineLen, headerY)
    ctx.lineTo(headerCenterX - occW / 2 - 12 * unit, headerY)
    ctx.moveTo(headerCenterX + occW / 2 + 12 * unit, headerY)
    ctx.lineTo(headerCenterX + occW / 2 + 12 * unit + lineLen, headerY)
    ctx.stroke()

    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.85
    ctx.textAlign = 'center'
    ctx.fillText(occText, headerCenterX, headerY, occW)

    if (relationship) {
      ctx.font = `italic 500 ${Math.round(25 * unit)}px "Cormorant Garamond", Georgia, serif`
      ctx.fillStyle = palette.accent
      ctx.globalAlpha = 0.9
      ctx.fillText(`For ${relationship}`, headerCenterX, headerY + 34 * unit, contentWidth)
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

    // Curved golden brush-stroke underline below headline
    const underlineX =
      textAlign === 'left'
        ? padX + 135 * unit
        : textAlign === 'right'
          ? width - padX - 135 * unit
          : width / 2
    drawCurvedBrushUnderline(ctx, underlineX, cursorY - lineH * 0.56, 260 * unit, '#F4B83A', unit)

    // Painted Brush-Stroke Accent Ribbon for recipient / relationship
    const isDark = isDarkHexColor(textColor)
    const frontRibbonBg = isDark ? '#F9C95A' : '#FFF3D4'
    const frontRibbonLabel = relationship
      ? `For ${displayRecipient} · ${relationship}`
      : `Warmest wishes for ${displayRecipient}`
    const ribbonCenterX =
      textAlign === 'left'
        ? padX + 210 * unit
        : textAlign === 'right'
          ? width - padX - 210 * unit
          : width / 2
    drawBrushStrokeBannerOnCanvas(
      ctx,
      ribbonCenterX,
      cursorY + 28 * unit,
      frontRibbonLabel,
      frontRibbonBg,
      '#2A1726',
      palette.accent,
      contentWidth,
      Math.round(32 * unit),
      unit,
    )

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
  const signOffBannerY = sealCenterY - 68 * unit
  const middleTop = salutationY + 30 * unit
  const middleBottom = signOffBannerY - 56 * unit
  const availableMiddleH = Math.max(180 * unit, middleBottom - middleTop)

  // 3. Auto-fit full message + brush highlight banner so long messages NEVER clip
  const giftNoteText = card.giftNote?.trim() || 'Keep smiling, keep shining!'
  let bodyPx = Math.round(
    (font.id === 'handwritten-script' || font.id === 'caveat-note' ? 46 : 36) * sizeScale * unit,
  )
  const minBodyPx = Math.round(20 * unit)
  let msgLines: string[] = []
  let lineHeight = 0
  const bannerReserveH = 86 * unit

  const measureInsideBlock = () => {
    ctx.font = `400 ${bodyPx}px "${font.canvasFamily}", Georgia, serif`
    lineHeight = Math.round(bodyPx * 1.48)
    msgLines = wrapTextLines(ctx, displayMessage, contentWidth)
    let msgH = 0
    for (const line of msgLines) {
      msgH += line === '' ? lineHeight * 0.55 : lineHeight
    }
    return msgH + bannerReserveH
  }

  while (measureInsideBlock() > availableMiddleH && bodyPx > minBodyPx) {
    bodyPx -= Math.round(2 * unit)
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

  // Painted highlight brush banner (gift note or joyful default)
  const isDark = isDarkHexColor(textColor)
  const insideRibbonBg = isDark ? '#F9C95A' : '#FFF3D4'
  const insideRibbonX =
    textAlign === 'left'
      ? padX + 200 * unit
      : textAlign === 'right'
        ? width - padX - 200 * unit
        : width / 2
  drawBrushStrokeBannerOnCanvas(
    ctx,
    insideRibbonX,
    msgCursorY + 34 * unit,
    giftNoteText,
    insideRibbonBg,
    '#2A1726',
    palette.accent,
    contentWidth,
    Math.round(31 * unit),
    unit,
  )

  // Sign-off Dark Plum Brush Banner & Sculpted Wax Seal
  drawBrushStrokeBannerOnCanvas(
    ctx,
    width / 2,
    signOffBannerY,
    `With love, ${displaySender}`,
    isDark ? '#2A1726' : '#582854',
    '#FFF9F3',
    '#F9C95A',
    contentWidth,
    Math.round(34 * unit),
    unit,
  )

  drawSculptedWaxSeal(ctx, width / 2, sealCenterY, 32 * unit, palette.accent, palette.foil, displaySeal, unit)

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

  // Curved golden brush-stroke underline ornament
  drawCurvedBrushUnderline(
    ctx,
    textAlign === 'left' ? 260 : textAlign === 'right' ? width - 260 : width / 2,
    cursorY - headlinePx * 0.45,
    240,
    '#F4B83A',
    1,
  )
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
  const maxLines = layout === 'landscape' ? 5 : 8
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

  // Painted brush-stroke highlight banner (gift note or joyful default)
  const isDark = isDarkHexColor(textColor)
  const bannerLabel = card.giftNote?.trim() || 'Keep smiling, keep shining!'
  const bannerY = Math.min(height - 245, cursorY + 34)
  drawBrushStrokeBannerOnCanvas(
    ctx,
    width / 2,
    bannerY,
    bannerLabel,
    isDark ? '#F9C95A' : '#FFF3D4',
    '#2A1726',
    palette.accent,
    width - 220,
    30,
    1,
  )

  // Sign-off Dark Plum Brush Banner & Sculpted Wax Seal
  const signOffBannerY = height - (layout === 'landscape' ? 155 : 172)
  drawBrushStrokeBannerOnCanvas(
    ctx,
    width / 2,
    signOffBannerY,
    `With love, ${card.senderName.trim() || 'Always Yours'}`,
    isDark ? '#2A1726' : '#582854',
    '#FFF9F3',
    '#F9C95A',
    width - 220,
    32,
    1,
  )

  drawSculptedWaxSeal(
    ctx,
    width / 2,
    height - 92,
    30,
    palette.accent,
    palette.foil,
    (card.sealText || template.sealInitial || 'C').slice(0, 2).toUpperCase(),
    1,
  )

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
