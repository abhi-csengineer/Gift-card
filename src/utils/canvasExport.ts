import { getFontById, getPaletteById, getTemplateById } from '../data/catalog'
import type { ArtworkMotif, PersonalizedCard } from '../types/card'

function wrapTextLines(
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
      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)
  }

  return lines
}

function drawMotifEmblem(
  ctx: CanvasRenderingContext2D,
  motif: ArtworkMotif,
  cx: number,
  cy: number,
  accent: string,
  foil: string,
  text: string,
) {
  ctx.save()
  ctx.translate(cx, cy)

  // Soft aura circle
  const aura = ctx.createRadialGradient(0, 0, 10, 0, 0, 120)
  aura.addColorStop(0, `${accent}30`)
  aura.addColorStop(1, 'transparent')
  ctx.fillStyle = aura
  ctx.beginPath()
  ctx.arc(0, 0, 120, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = foil
  ctx.lineWidth = 2.5

  if (motif === 'celestial-moon') {
    ctx.fillStyle = foil
    ctx.beginPath()
    ctx.arc(-8, 0, 38, 0.35 * Math.PI, 1.65 * Math.PI, false)
    ctx.arc(10, -6, 30, 1.55 * Math.PI, 0.45 * Math.PI, true)
    ctx.closePath()
    ctx.fill()

    // Stars
    const stars = [
      [42, -32, 7],
      [-50, -36, 5],
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
    ctx.arc(0, 0, 52, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = accent
    ctx.beginPath()
    ctx.arc(0, 0, 40, 0, Math.PI * 2)
    ctx.stroke()
    // Compass / laurel star
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
  } else if (motif === 'champagne-toast' || motif === 'festive-lanterns') {
    // Festive diamond starburst
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
  } else {
    // Botanical floral medallion
    for (let i = 0; i < 6; i++) {
      ctx.save()
      ctx.rotate((i * Math.PI) / 3)
      ctx.fillStyle = i % 2 === 0 ? `${accent}AA` : `${foil}99`
      ctx.beginPath()
      ctx.ellipse(0, -28, 16, 26, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = text + '40'
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

export async function exportCardToPng(card: PersonalizedCard): Promise<void> {
  if (typeof document === 'undefined') return
  await document.fonts.ready

  const width = 1200
  const height = 1600
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context unavailable')

  const palette = getPaletteById(card.paletteId)
  const font = getFontById(card.fontId)
  const template = getTemplateById(card.templateId)

  // 1. Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height)
  grad.addColorStop(0, palette.bg)
  grad.addColorStop(0.55, palette.surface)
  grad.addColorStop(1, palette.bgSecondary)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // 2. Soft ambient glow circles
  const glow1 = ctx.createRadialGradient(220, 260, 20, 220, 260, 420)
  glow1.addColorStop(0, `${palette.accent}22`)
  glow1.addColorStop(1, 'transparent')
  ctx.fillStyle = glow1
  ctx.fillRect(0, 0, width, height)

  const glow2 = ctx.createRadialGradient(980, 1320, 20, 980, 1320, 460)
  glow2.addColorStop(0, `${palette.foil}26`)
  glow2.addColorStop(1, 'transparent')
  ctx.fillStyle = glow2
  ctx.fillRect(0, 0, width, height)

  // 3. Pattern details
  if (card.pattern === 'starlight') {
    ctx.fillStyle = `${palette.foil}99`
    for (let i = 0; i < 42; i++) {
      const sx = ((i * 211) % 1060) + 70
      const sy = ((i * 347) % 1460) + 70
      const sr = (i % 3) + 1.5
      ctx.beginPath()
      ctx.arc(sx, sy, sr, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 4. Outer & inner foil editorial frames
  ctx.strokeStyle = `${palette.foil}AA`
  ctx.lineWidth = 2.5
  ctx.strokeRect(56, 56, width - 112, height - 112)

  ctx.strokeStyle = `${palette.text}28`
  ctx.lineWidth = 1.2
  ctx.strokeRect(74, 74, width - 148, height - 148)

  if (card.pattern === 'foil-arch') {
    ctx.save()
    ctx.strokeStyle = `${palette.foil}CC`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(150, 1440)
    ctx.lineTo(150, 480)
    ctx.arc(width / 2, 480, width / 2 - 150, Math.PI, 0, false)
    ctx.lineTo(width - 150, 1440)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  // 5. Occasion pill
  ctx.save()
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif'
  const occasionLabel = template.occasion.toUpperCase()
  const pillWidth = ctx.measureText(occasionLabel).width + 64
  ctx.fillStyle = palette.badgeBg
  ctx.beginPath()
  ctx.roundRect(width / 2 - pillWidth / 2, 130, pillWidth, 52, 26)
  ctx.fill()
  ctx.fillStyle = palette.text
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(occasionLabel, width / 2, 156)
  ctx.restore()

  // 6. Central decorative emblem
  drawMotifEmblem(ctx, template.motif, width / 2, 315, palette.accent, palette.foil, palette.text)

  // 7. Headline
  ctx.fillStyle = palette.text
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.font = `600 66px "${font.canvasFamily}", Georgia, serif`
  const headlineLines = wrapTextLines(ctx, card.headline || template.defaultHeadline, 820)
  let cursorY = 490
  for (const line of headlineLines.slice(0, 2)) {
    ctx.fillText(line, width / 2, cursorY)
    cursorY += 78
  }

  // Divider ornament
  ctx.strokeStyle = palette.foil
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(width / 2 - 90, cursorY + 8)
  ctx.lineTo(width / 2 + 90, cursorY + 8)
  ctx.stroke()
  cursorY += 74

  // 8. Recipient salutation
  ctx.fillStyle = palette.accent
  ctx.font = `italic 500 38px "Cormorant Garamond", Georgia, serif`
  const recipient = card.recipientName.trim() || 'Someone Special'
  ctx.fillText(`Dearest ${recipient},`, width / 2, cursorY)
  cursorY += 76

  // 9. Heartfelt message
  ctx.fillStyle = palette.text
  const bodySize = font.id === 'handwritten-script' ? 44 : 34
  const bodyLineHeight = font.id === 'handwritten-script' ? 60 : 54
  ctx.font = `400 ${bodySize}px "${font.canvasFamily}", Georgia, serif`
  const msgLines = wrapTextLines(
    ctx,
    card.message.trim() || template.defaultMessage,
    800,
  ).slice(0, 9)

  for (const line of msgLines) {
    if (line === '') {
      cursorY += bodyLineHeight * 0.55
    } else {
      ctx.fillText(line, width / 2, cursorY)
      cursorY += bodyLineHeight
    }
  }

  // 10. Optional gift note badge
  if (card.giftNote.trim()) {
    const giftY = Math.max(cursorY + 34, 1180)
    ctx.save()
    ctx.fillStyle = `${palette.foil}25`
    ctx.strokeStyle = `${palette.foil}AA`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(width / 2 - 310, giftY, 620, 74, 20)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = palette.text
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif'
    ctx.textBaseline = 'middle'
    ctx.fillText(`✦  ${card.giftNote.trim().slice(0, 56)}`, width / 2, giftY + 37)
    ctx.restore()
  }

  // 11. Wax seal & Sender sign-off
  const signOffY = 1345
  ctx.fillStyle = palette.mutedText
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif'
  ctx.fillText('WITH WARMTH & LOVE', width / 2, signOffY - 40)

  ctx.fillStyle = palette.text
  ctx.font = `600 46px "Cormorant Garamond", Georgia, serif`
  ctx.fillText(card.senderName.trim() || 'Always Yours', width / 2, signOffY + 14)

  // Seal monogram
  ctx.save()
  ctx.fillStyle = palette.accent
  ctx.beginPath()
  ctx.arc(width / 2, 1445, 34, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = palette.foil
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(width / 2, 1445, 27, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = '#FFF9F3'
  ctx.font = '600 28px "Cormorant Garamond", Georgia, serif'
  ctx.textBaseline = 'middle'
  ctx.fillText((card.sealText || template.sealInitial || 'V').slice(0, 2).toUpperCase(), width / 2, 1447)
  ctx.restore()

  // Colophon
  ctx.fillStyle = palette.mutedText
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif'
  ctx.fillText('VELLUM & BLOOM  ·  BESPOKE DIGITAL STATIONERY', width / 2, 1515)

  // Download PNG
  const slug = recipient
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = `vellum-bloom-card-${slug || 'keepsake'}.png`
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  link.remove()
}
