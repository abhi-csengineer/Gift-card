export type CategorySlug =
  | 'girlfriend-boyfriend'
  | 'mother'
  | 'father'
  | 'parents'
  | 'husband-wife'
  | 'birthday'
  | 'anniversary'
  | 'friendship'
  | 'valentines-day'
  | 'thank-you'
  | 'congratulations'
  | 'festivals'
  | 'appreciation'
  | 'good-morning'
  | 'good-night'
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
  | 'morning-sunbeam'
  | 'velvet-heart-seal'
  | 'couple-rings'
  | 'olive-family-tree'
  | 'confetti-celebration'
  | 'butterfly-meadow'
  | 'starry-lullaby'
  | 'ribbon-giftbox'
  | 'tulip-greeting'
  | 'aurora-bloom'
  | 'fireworks-burst'
  | 'warm-embrace'
  | 'welsh-daffodil-heart'
  | 'rose-bloom'
  | 'engagement-ring-box'
  | 'chocolate-truffles'
  | 'plush-teddy-bear'
  | 'intertwined-hands-vow'
  | 'kiss-silhouette-hearts'
  | 'playful-comic-kapow'
  | 'playful-kick-bounce'
  | 'perfume-flacon'
  | 'charming-wink-note'
  | 'handwritten-wax-letter'
  | 'long-distance-moonmail'
  | 'self-love-botanical'
  | 'floral-emblem-grace'
  | 'white-rose-ivory'
  | 'sunburst-smile'
  | 'dark-cocoa-minimal'
  | 'book-and-rose'
  | 'olive-branch-kiss'
  | 'chinese-520-lantern'
  | 'carnival-rose-fiesta'
  | 'vinyl-headphones-duet'
  | 'wellness-heart-pulse'
  | 'tailored-gift-watch'
  | 'christmas-eve-tree'
  | 'christmas-holiday-hearth'
  | 'mixtape-voice-note'
  | 'crimson-kisses-letter'
  | 'calligraphic-heart-swirl'
  | 'berry-vine-sketch-heart'
  | 'quilled-butterfly-milestone'
  | 'milestone-time-counter'

export type BackgroundPattern =
  | 'vellum'
  | 'foil-arch'
  | 'botanical-watermark'
  | 'starlight'
  | 'linen-minimal'
  | 'double-gold'
  | 'scalloped-frame'
  | 'none'

export type CardFontId =
  | 'editorial-serif'
  | 'handwritten-script'
  | 'literary-lora'
  | 'modern-sans'
  | 'caveat-note'

export type CardLayout = 'portrait' | 'landscape' | 'square'

export type CardTextAlign = 'left' | 'center' | 'right'

export type CardFontSize = 'sm' | 'md' | 'lg' | 'xl'

export type DecorativeEffect =
  | 'hearts'
  | 'flowers'
  | 'stars'
  | 'confetti'

export type StickerId =
  | 'wax-heart'
  | 'pressed-rose'
  | 'gold-star'
  | 'butterfly'
  | 'sparkle-burst'
  | 'ribbon-bow'
  | 'sunbeam'
  | 'crescent'

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

export interface GradientPreset {
  id: string
  name: string
  from: string
  via: string
  to: string
  textColor: string
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

export type FrontCoverStyle =
  | 'atelier'
  | 'editorial-poster'
  | 'crest-medallion'
  | 'split-ribbon'

export type InsideMessageStyle =
  | 'classic'
  | 'letterpress-ruled'
  | 'poetic-framed'
  | 'keepsake-card'

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
  defaultEffects?: DecorativeEffect[]
  defaultStickers?: StickerId[]
  defaultLayout?: CardLayout
  frontStyle?: FrontCoverStyle
  insideStyle?: InsideMessageStyle
  sealInitial: string
  featured?: boolean
  badge?: string
  loveCalendarOccasionId?: string
}

export interface PersonalizedCard {
  id: string
  templateId: string
  recipientName: string
  senderName: string
  relationship?: string
  headline: string
  message: string
  paletteId: string
  backgroundMode?: 'palette' | 'solid' | 'gradient'
  customBgColor?: string
  gradientId?: string
  customGradientFrom?: string
  customGradientTo?: string
  customTextColor?: string
  pattern: BackgroundPattern
  fontId: CardFontId
  fontSize?: CardFontSize
  textAlign?: CardTextAlign
  layout?: CardLayout
  effects?: DecorativeEffect[]
  stickers?: StickerId[]
  sealText: string
  giftNote: string
  updatedAt: string
}

export interface BlogArticle {
  slug: string
  title: string
  seoTitle?: string
  category: string
  readTime: string
  publishedAt: string
  excerpt: string
  coverMotif: ArtworkMotif
  coverPaletteId: string
  occasionSlug?: CategorySlug
  sections: {
    heading: string
    paragraphs: string[]
    quote?: string
    examples?: string[]
  }[]
  conclusion?: string
  ctaLabel?: string
  recommendedTemplateId: string
}

export interface CategorySeoGuide {
  slug: CategorySlug
  seoTitle: string
  metaDescription: string
  heroHeadline: string
  introParagraph: string
  writingTips: string[]
  sampleWishes: string[]
  recommendedArticleSlug: string
  relatedSlugs: CategorySlug[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}
