import { getTemplateById } from '../data/catalog'
import type { CardLayout, PersonalizedCard } from '../types/card'
import { renderCardSideToCanvas } from './canvasExport'

export function getPdfPageConfig(layout: CardLayout = 'portrait'): {
  orientation: 'portrait' | 'landscape'
  widthPt: number
  heightPt: number
} {
  if (layout === 'landscape') {
    return {
      orientation: 'landscape',
      widthPt: 576, // 8 inches (4:3)
      heightPt: 432, // 6 inches
    }
  }
  if (layout === 'square') {
    return {
      orientation: 'portrait',
      widthPt: 504, // 7 inches (1:1)
      heightPt: 504,
    }
  }
  return {
    orientation: 'portrait',
    widthPt: 432, // 6 inches (3:4)
    heightPt: 576, // 8 inches
  }
}

export function buildPdfFilename(card: PersonalizedCard): string {
  const template = getTemplateById(card.templateId)
  const occasionSlug = template.occasion
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `cardelle-${occasionSlug || 'greeting'}-card.pdf`
}

export function validateCardForPdf(card: PersonalizedCard | null | undefined): PersonalizedCard {
  if (!card || typeof card !== 'object') {
    throw new Error('Card details are missing. Please customize a card before downloading.')
  }
  if (!card.templateId || typeof card.templateId !== 'string' || !card.templateId.trim()) {
    throw new Error('Please choose a greeting card template before downloading your PDF.')
  }
  const hasHeadline = typeof card.headline === 'string' && card.headline.trim().length > 0
  const hasMessage = typeof card.message === 'string' && card.message.trim().length > 0
  if (!hasHeadline && !hasMessage) {
    throw new Error('Please add a headline or heartfelt message before downloading your PDF.')
  }
  return card
}

export async function buildCardPdfDocument(card: PersonalizedCard) {
  const validCard = validateCardForPdf(card)

  if (typeof document === 'undefined') {
    throw new Error('PDF generation requires a browser environment.')
  }

  const layout = validCard.layout ?? 'portrait'
  const pageConfig = getPdfPageConfig(layout)

  const [frontCanvas, insideCanvas, jspdfModule] = await Promise.all([
    renderCardSideToCanvas(validCard, 'front', 1.25),
    renderCardSideToCanvas(validCard, 'inside', 1.25),
    import('jspdf'),
  ])

  const { jsPDF } = jspdfModule
  const doc = new jsPDF({
    orientation: pageConfig.orientation,
    unit: 'pt',
    format: [pageConfig.widthPt, pageConfig.heightPt],
    compress: true,
  })

  const template = getTemplateById(validCard.templateId)
  const recipient = validCard.recipientName?.trim() || 'Someone Special'
  doc.setProperties({
    title: `${validCard.headline?.trim() || template.defaultHeadline} — For ${recipient}`,
    subject: `${template.occasion} Digital Greeting Card`,
    creator: 'Cardelle',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  const frontDataUrl = frontCanvas.toDataURL('image/png')
  doc.addImage(frontDataUrl, 'PNG', 0, 0, pageWidth, pageHeight, 'front-cover', 'FAST')

  doc.addPage([pageConfig.widthPt, pageConfig.heightPt], pageConfig.orientation)
  const insideDataUrl = insideCanvas.toDataURL('image/png')
  doc.addImage(insideDataUrl, 'PNG', 0, 0, pageWidth, pageHeight, 'inside-message', 'FAST')

  const filename = buildPdfFilename(validCard)
  return { doc, filename }
}

/**
 * Generates a single two-page high-resolution PDF entirely in the browser:
 * - Page 1: Complete Front Cover
 * - Page 2: Complete Inside Message
 * Both pages share consistent dimensions and orientation matching the card layout.
 */
export async function exportCardToPdf(card: PersonalizedCard): Promise<string> {
  const { doc, filename } = await buildCardPdfDocument(card)
  doc.save(filename)
  return filename
}
