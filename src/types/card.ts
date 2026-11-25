export type CategorySlug =
  | 'for-her'
  | 'for-him'
  | 'for-mom'
  | 'for-dad'
  | 'birthday'
  | 'anniversary'
  | 'love-romance'
  | 'friendship'
  | 'thank-you'
  | 'congratulations'
  | 'festivals'
  | 'just-because'

export type CollectionSlug =
  | 'romantic'
  | 'family-love'
  | 'birthday'
  | 'minimalist'
  | 'elegant'

export type ArtworkMotif =
  | 'botanical-arch'
  | 'celestial-moon'
  | 'champagne-toast'
  | 'pressed-wildflowers'
  | 'minimalist-monogram'
  | 'peony-bouquet'
  | 'heritage-compass'
  | 'festive-lanterns'
  | 'daisy-polaroid'
  | 'golden-laurel'
  | 'sunset-horizon'
  | 'cozy-teacup'

export type BackgroundPattern =
  | 'vellum'
  | 'foil-arch'
  | 'botanical-watermark'
  | 'starlight'
  | 'linen-minimal'

export type CardFontId =
  | 'editorial-serif'
  | 'handwritten-script'
  | 'literary-lora'
  | 'modern-sans'

export interface CardPalette {
  id: string
  name: string
  bg: string
  bgSecondary: string
  surface: string
  text: string
  mutedText: string
  accent: string
  foil: string
  badgeBg: string
}

export interface CardFontPreset {
  id: CardFontId
  name: string
  description: string
  cssFamily: string
  canvasFamily: string
  sampleText: string
}

export interface CategoryInfo {
  slug: CategorySlug
  name: string
  tagline: string
  accentBg: string
  iconName: string
  featuredCount: number
}

export interface CollectionInfo {
  slug: CollectionSlug
  name: string
  subtitle: string
  description: string
  mood: string
  accentColor: string
  surfaceTint: string
  templateIds: string[]
}

export interface CardTemplate {
  id: string
  title: string
  occasion: string
  category: CategorySlug
  categories: CategorySlug[]
  collection: CollectionSlug
  shortDescription: string
  motif: ArtworkMotif
  defaultPaletteId: string
  defaultPattern: BackgroundPattern
  defaultFontId: CardFontId
  defaultHeadline: string
  defaultMessage: string
  sealInitial: string
  featured?: boolean
  badge?: string
}

export interface PersonalizedCard {
  id: string
  templateId: string
  recipientName: string
  senderName: string
  headline: string
  message: string
  paletteId: string
  pattern: BackgroundPattern
  fontId: CardFontId
  sealText: string
  giftNote: string
  updatedAt: string
}

export interface BlogArticle {
  slug: string
  title: string
  category: string
  readTime: string
  publishedAt: string
  excerpt: string
  coverMotif: ArtworkMotif
  coverPaletteId: string
  sections: {
    heading: string
    paragraphs: string[]
    quote?: string
  }[]
  recommendedTemplateId: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}
