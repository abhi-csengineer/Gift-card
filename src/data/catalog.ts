import type {
  BackgroundPattern,
  BlogArticle,
  CardFontPreset,
  CardPalette,
  CardTemplate,
  CategoryInfo,
  CollectionInfo,
  FaqItem,
} from '../types/card'

export const CARD_PALETTES: CardPalette[] = [
  {
    id: 'warm-ivory',
    name: 'Warm Ivory & Plum',
    bg: '#FFF9F3',
    bgSecondary: '#F8DDE4',
    surface: '#FFFFFF',
    text: '#472C42',
    mutedText: '#7A5B72',
    accent: '#D67B91',
    foil: '#D9B77E',
    badgeBg: '#F8DDE4',
  },
  {
    id: 'soft-blush',
    name: 'Soft Blush Rose',
    bg: '#F8DDE4',
    bgSecondary: '#FFF9F3',
    surface: '#FFFDFB',
    text: '#472C42',
    mutedText: '#6F4F67',
    accent: '#B5546D',
    foil: '#C89E5E',
    badgeBg: '#FFF9F3',
  },
  {
    id: 'deep-plum',
    name: 'Midnight Plum & Gold',
    bg: '#472C42',
    bgSecondary: '#2E1B2B',
    surface: '#382234',
    text: '#FFF9F3',
    mutedText: '#E2CED8',
    accent: '#E9A6B5',
    foil: '#D9B77E',
    badgeBg: 'rgba(217, 183, 126, 0.2)',
  },
  {
    id: 'lavender-dusk',
    name: 'Lavender Reverie',
    bg: '#E8E2F7',
    bgSecondary: '#FFF9F3',
    surface: '#FAF8FF',
    text: '#3A2542',
    mutedText: '#644E70',
    accent: '#9C78C4',
    foil: '#C7A262',
    badgeBg: '#FFFFFF',
  },
  {
    id: 'champagne-linen',
    name: 'Champagne Gold',
    bg: '#FBF4E9',
    bgSecondary: '#EEDBC0',
    surface: '#FFFDF9',
    text: '#3E2735',
    mutedText: '#6E5462',
    accent: '#B88D48',
    foil: '#D9B77E',
    badgeBg: '#F3E3CA',
  },
  {
    id: 'rose-velvet',
    name: 'Dusty Rose Noir',
    bg: '#5B3249',
    bgSecondary: '#3F2132',
    surface: '#4C283C',
    text: '#FFF9F3',
    mutedText: '#F0CFD9',
    accent: '#F8DDE4',
    foil: '#E4C48E',
    badgeBg: 'rgba(248, 221, 228, 0.16)',
  },
]

export const BACKGROUND_PATTERNS: {
  id: BackgroundPattern
  name: string
  description: string
}[] = [
  { id: 'foil-arch', name: 'Gold Foil Arch', description: 'Delicate double-line editorial arch' },
  { id: 'vellum', name: 'Soft Vellum', description: 'Subtle gradient glow and clean margins' },
  { id: 'botanical-watermark', name: 'Botanical Veil', description: 'Airy floral sprigs along the border' },
  { id: 'starlight', name: 'Celestial Dust', description: 'Fine scattered gold starlight flecks' },
  { id: 'linen-minimal', name: 'Linen Letterpress', description: 'Crisp minimalist double-hairline frame' },
]

export const CARD_FONTS: CardFontPreset[] = [
  {
    id: 'editorial-serif',
    name: 'Cormorant Editorial',
    description: 'Poetic luxury magazine serif',
    cssFamily: '"Cormorant Garamond", Georgia, serif',
    canvasFamily: 'Cormorant Garamond',
    sampleText: 'Always yours in every season',
  },
  {
    id: 'handwritten-script',
    name: 'Dancing Calligraphy',
    description: 'Graceful ink script with warm flourishes',
    cssFamily: '"Dancing Script", cursive',
    canvasFamily: 'Dancing Script',
    sampleText: 'Written straight from the heart',
  },
  {
    id: 'literary-lora',
    name: 'Lora Classic',
    description: 'Timeless literary letterpress',
    cssFamily: '"Lora", Georgia, serif',
    canvasFamily: 'Lora',
    sampleText: 'A quiet keepsake to treasure',
  },
  {
    id: 'modern-sans',
    name: 'Jakarta Modern',
    description: 'Clean, airy contemporary stationery',
    cssFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
    canvasFamily: 'Plus Jakarta Sans',
    sampleText: 'Simple words, deeply felt',
  },
]

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'for-her',
    name: 'For Her',
    tagline: 'Graceful keepsakes & botanical notes',
    accentBg: '#F8DDE4',
    iconName: 'Sparkles',
    featuredCount: 18,
  },
  {
    slug: 'for-him',
    name: 'For Him',
    tagline: 'Tailored minimalism & warm gratitude',
    accentBg: '#E8E2F7',
    iconName: 'Compass',
    featuredCount: 14,
  },
  {
    slug: 'for-mom',
    name: 'For Mom',
    tagline: 'Peonies, warmth & endless appreciation',
    accentBg: '#F8DDE4',
    iconName: 'Flower2',
    featuredCount: 16,
  },
  {
    slug: 'for-dad',
    name: 'For Dad',
    tagline: 'Heritage prints & heartfelt pride',
    accentBg: '#F3E5D0',
    iconName: 'Award',
    featuredCount: 12,
  },
  {
    slug: 'birthday',
    name: 'Birthday',
    tagline: 'Champagne toasts & candlelit wishes',
    accentBg: '#F6E7CF',
    iconName: 'Cake',
    featuredCount: 24,
  },
  {
    slug: 'anniversary',
    name: 'Anniversary',
    tagline: 'Gold-foil milestones & shared years',
    accentBg: '#F8DDE4',
    iconName: 'Gem',
    featuredCount: 15,
  },
  {
    slug: 'love-romance',
    name: 'Love & Romance',
    tagline: 'Moonlit letters & tender confessions',
    accentBg: '#F5D6DF',
    iconName: 'Heart',
    featuredCount: 22,
  },
  {
    slug: 'friendship',
    name: 'Friendship',
    tagline: 'Sunlit daisies & inside-joke notes',
    accentBg: '#E8E2F7',
    iconName: 'Sun',
    featuredCount: 13,
  },
  {
    slug: 'thank-you',
    name: 'Thank You',
    tagline: 'Pressed florals & sincere gratitude',
    accentBg: '#F4EAE0',
    iconName: 'MailHeart',
    featuredCount: 19,
  },
  {
    slug: 'congratulations',
    name: 'Congratulations',
    tagline: 'Golden laurels for proud moments',
    accentBg: '#F4E6CE',
    iconName: 'Trophy',
    featuredCount: 14,
  },
  {
    slug: 'festivals',
    name: 'Festivals',
    tagline: 'Glowing lanterns & seasonal joy',
    accentBg: '#EFE4F7',
    iconName: 'Flame',
    featuredCount: 17,
  },
  {
    slug: 'just-because',
    name: 'Just Because',
    tagline: 'Spontaneous warmth on ordinary days',
    accentBg: '#F8DDE4',
    iconName: 'Coffee',
    featuredCount: 16,
  },
]

export const SPECIAL_COLLECTIONS: CollectionInfo[] = [
  {
    slug: 'romantic',
    name: 'Romantic Collection',
    subtitle: 'Poetic Love Letters',
    description:
      'Velvet plum tones, blush botanicals, and moonlit vows crafted for anniversaries, date nights, and quiet "I love you" moments.',
    mood: 'Tender · Intimate · Velvet',
    accentColor: '#C86A80',
    surfaceTint: '#F8DDE4',
    templateIds: ['rose-arch-anniversary', 'moonlit-velvet-love', 'sunset-horizon-note'],
  },
  {
    slug: 'family-love',
    name: 'Family Love Collection',
    subtitle: 'Heartfelt Home Keepsakes',
    description:
      'Warm peony watercolors and heritage motifs honoring mothers, fathers, siblings, and the people who raised us with steady grace.',
    mood: 'Warm · Nostalgic · Grounded',
    accentColor: '#9B7436',
    surfaceTint: '#F7EAD8',
    templateIds: ['peony-note-for-mom', 'heritage-compass-dad', 'pressed-wildflower-thanks'],
  },
  {
    slug: 'birthday',
    name: 'Birthday Collection',
    subtitle: 'Luminous Celebrations',
    description:
      'Effervescent champagne confetti, sunlit blooms, and celebratory gold foil made to turn another year around the sun into a keepsake.',
    mood: 'Joyful · Radiant · Festive',
    accentColor: '#B88D48',
    surfaceTint: '#F6E7CF',
    templateIds: ['champagne-birthday-toast', 'daisy-sunshine-friend', 'festive-lantern-glow'],
  },
  {
    slug: 'minimalist',
    name: 'Minimalist Collection',
    subtitle: 'Quiet Editorial Restraint',
    description:
      'Crisp letterpress margins, generous ivory whitespace, and refined monogram typography where every word carries deliberate weight.',
    mood: 'Calm · Modern · Architectural',
    accentColor: '#472C42',
    surfaceTint: '#E8E2F7',
    templateIds: ['linen-monogram-him', 'cozy-just-because', 'pressed-wildflower-thanks'],
  },
  {
    slug: 'elegant',
    name: 'Elegant Collection',
    subtitle: 'Heirloom Gold Foil',
    description:
      'Laurel wreaths, arched frames, and champagne-gold accents designed for milestone achievements, weddings, and unforgettable toasts.',
    mood: 'Refined · Ceremonial · Timeless',
    accentColor: '#A98040',
    surfaceTint: '#F3E5D0',
    templateIds: ['golden-laurel-congrats', 'rose-arch-anniversary', 'champagne-birthday-toast'],
  },
]

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'rose-arch-anniversary',
    title: 'Rose Arch Keepsake',
    occasion: 'Anniversary',
    category: 'anniversary',
    categories: ['anniversary', 'love-romance', 'for-her'],
    collection: 'romantic',
    shortDescription: 'Delicate blush roses twining around a champagne-gold editorial arch.',
    motif: 'botanical-arch',
    defaultPaletteId: 'warm-ivory',
    defaultPattern: 'foil-arch',
    defaultFontId: 'editorial-serif',
    defaultHeadline: 'Every Year With You',
    defaultMessage:
      'Thank you for turning ordinary mornings into my favorite memories. Here is to every chapter still waiting for us.',
    sealInitial: 'A',
    featured: true,
    badge: 'Bestseller',
  },
  {
    id: 'champagne-birthday-toast',
    title: 'Champagne & Starlight',
    occasion: 'Birthday',
    category: 'birthday',
    categories: ['birthday', 'for-her', 'congratulations'],
    collection: 'birthday',
    shortDescription: 'Effervescent gold sparkles and a celebratory toast on midnight plum.',
    motif: 'champagne-toast',
    defaultPaletteId: 'deep-plum',
    defaultPattern: 'starlight',
    defaultFontId: 'editorial-serif',
    defaultHeadline: 'A Toast to Your New Year',
    defaultMessage:
      'May this next year bring you fearless joy, gentle mornings, and everything you have quietly wished for.',
    sealInitial: 'B',
    featured: true,
    badge: 'Staff Pick',
  },
  {
    id: 'moonlit-velvet-love',
    title: 'Moonlit Crescent Letter',
    occasion: 'Love & Romance',
    category: 'love-romance',
    categories: ['love-romance', 'for-her', 'anniversary'],
    collection: 'romantic',
    shortDescription: 'Celestial lavender crescents and delicate constellations for night-sky romantics.',
    motif: 'celestial-moon',
    defaultPaletteId: 'lavender-dusk',
    defaultPattern: 'starlight',
    defaultFontId: 'handwritten-script',
    defaultHeadline: 'Under Every Moon',
    defaultMessage:
      'No matter how busy the world gets, you remain my favorite place to return to at the end of every day.',
    sealInitial: 'L',
    featured: true,
    badge: 'Romantic',
  },
  {
    id: 'peony-note-for-mom',
    title: 'Morning Peony Letter',
    occasion: 'For Mom',
    category: 'for-mom',
    categories: ['for-mom', 'thank-you', 'birthday'],
    collection: 'family-love',
    shortDescription: 'Soft painted peonies and warm blush stationery crafted especially for Mom.',
    motif: 'peony-bouquet',
    defaultPaletteId: 'soft-blush',
    defaultPattern: 'botanical-watermark',
    defaultFontId: 'literary-lora',
    defaultHeadline: 'For Everything You Are',
    defaultMessage:
      'Your patience, warmth, and quiet strength shaped my whole world. I hope today wraps you in the same love you always give.',
    sealInitial: 'M',
    featured: true,
  },
  {
    id: 'heritage-compass-dad',
    title: 'True North Heritage',
    occasion: 'For Dad',
    category: 'for-dad',
    categories: ['for-dad', 'for-him', 'thank-you'],
    collection: 'family-love',
    shortDescription: 'Gold-line compass rose on tailored champagne linen for fathers & mentors.',
    motif: 'heritage-compass',
    defaultPaletteId: 'champagne-linen',
    defaultPattern: 'linen-minimal',
    defaultFontId: 'literary-lora',
    defaultHeadline: 'Thank You for Guiding the Way',
    defaultMessage:
      'Through every season, your steady wisdom and quiet kindness have been my compass. Grateful for you today and always.',
    sealInitial: 'D',
    featured: true,
  },
  {
    id: 'golden-laurel-congrats',
    title: 'Gilded Laurel Milestone',
    occasion: 'Congratulations',
    category: 'congratulations',
    categories: ['congratulations', 'for-him', 'for-her'],
    collection: 'elegant',
    shortDescription: 'Hand-drawn golden laurel wreath framing a proud milestone announcement.',
    motif: 'golden-laurel',
    defaultPaletteId: 'deep-plum',
    defaultPattern: 'foil-arch',
    defaultFontId: 'editorial-serif',
    defaultHeadline: 'So Proud of You',
    defaultMessage:
      'Every late evening and quiet ounce of dedication led right here. Celebrate every second of this well-earned moment.',
    sealInitial: 'C',
    featured: true,
    badge: 'New',
  },
  {
    id: 'pressed-wildflower-thanks',
    title: 'Pressed Meadow Gratitude',
    occasion: 'Thank You',
    category: 'thank-you',
    categories: ['thank-you', 'just-because', 'for-mom'],
    collection: 'minimalist',
    shortDescription: 'Botanical meadow stems pressed onto warm vellum with generous breathing room.',
    motif: 'pressed-wildflowers',
    defaultPaletteId: 'warm-ivory',
    defaultPattern: 'botanical-watermark',
    defaultFontId: 'literary-lora',
    defaultHeadline: 'With Sincere Gratitude',
    defaultMessage:
      'Your thoughtfulness meant more than words can neatly hold. Thank you for showing up with such kindness.',
    sealInitial: 'T',
    featured: true,
  },
  {
    id: 'daisy-sunshine-friend',
    title: 'Sunlit Daisy Note',
    occasion: 'Friendship',
    category: 'friendship',
    categories: ['friendship', 'birthday', 'just-because'],
    collection: 'birthday',
    shortDescription: 'Bright daisies and joyful handwritten charm for your dearest friend.',
    motif: 'daisy-polaroid',
    defaultPaletteId: 'lavender-dusk',
    defaultPattern: 'vellum',
    defaultFontId: 'handwritten-script',
    defaultHeadline: 'Life Is Brighter With You',
    defaultMessage:
      'Thank you for every laugh-until-we-cry afternoon, honest conversation, and unshakeable loyalty.',
    sealInitial: 'F',
    featured: true,
  },
  {
    id: 'linen-monogram-him',
    title: 'Atelier Monogram Folio',
    occasion: 'For Him',
    category: 'for-him',
    categories: ['for-him', 'birthday', 'anniversary'],
    collection: 'minimalist',
    shortDescription: 'Architectural double-border crest with clean modern typography.',
    motif: 'minimalist-monogram',
    defaultPaletteId: 'champagne-linen',
    defaultPattern: 'linen-minimal',
    defaultFontId: 'modern-sans',
    defaultHeadline: 'Celebrating You Today',
    defaultMessage:
      'Wishing you calm mornings, bold adventures, and moments worth remembering long after the day ends.',
    sealInitial: 'H',
  },
  {
    id: 'festive-lantern-glow',
    title: 'Warm Lanterns & Joy',
    occasion: 'Festivals',
    category: 'festivals',
    categories: ['festivals', 'congratulations', 'family-love' as never].filter(
      (c): c is CardTemplate['categories'][number] => c !== ('family-love' as never),
    ),
    collection: 'birthday',
    shortDescription: 'Glowing festive lanterns and golden filigree radiating warmth and abundance.',
    motif: 'festive-lanterns',
    defaultPaletteId: 'rose-velvet',
    defaultPattern: 'starlight',
    defaultFontId: 'editorial-serif',
    defaultHeadline: 'Warmest Festive Wishes',
    defaultMessage:
      'May your home glow with laughter, your table overflow with warmth, and the season ahead bless everyone you hold dear.',
    sealInitial: 'J',
  },
  {
    id: 'sunset-horizon-note',
    title: 'Rosewater Horizon',
    occasion: 'For Her',
    category: 'for-her',
    categories: ['for-her', 'love-romance', 'just-because'],
    collection: 'romantic',
    shortDescription: 'Layered dusk gradient horizon with delicate gold sunbeams.',
    motif: 'sunset-horizon',
    defaultPaletteId: 'soft-blush',
    defaultPattern: 'vellum',
    defaultFontId: 'editorial-serif',
    defaultHeadline: 'Thinking of You',
    defaultMessage:
      'Just a quiet reminder across the miles that you are deeply cherished, admired, and on my mind today.',
    sealInitial: 'R',
  },
  {
    id: 'cozy-just-because',
    title: 'Afternoon Tea & Quiet Joy',
    occasion: 'Just Because',
    category: 'just-because',
    categories: ['just-because', 'friendship', 'thank-you'],
    collection: 'minimalist',
    shortDescription: 'A warm porcelain teacup sketch inviting someone to pause and breathe.',
    motif: 'cozy-teacup',
    defaultPaletteId: 'warm-ivory',
    defaultPattern: 'vellum',
    defaultFontId: 'literary-lora',
    defaultHeadline: 'A Little Pause for You',
    defaultMessage:
      'No big milestone needed—just sending a cup of warmth, a deep breath, and a reminder that I am cheering for you.',
    sealInitial: 'W',
  },
]

export const MESSAGE_PROMPTS: Record<string, string[]> = {
  Birthday: [
    'May this year unfold gently and surprise you with joy in the most unexpected places.',
    'Here is to another chapter of loud laughter, quiet peace, and unforgettable memories together.',
    'You bring so much light into everyone else’s days—today, I hope the world pours it right back to you.',
  ],
  Anniversary: [
    'Looking back at our years together still feels like my favorite story to tell.',
    'Thank you for choosing me in the small Tuesday moments just as much as the big celebrations.',
    'Every season with you gets warmer, steadier, and sweeter.',
  ],
  'Love & Romance': [
    'Even in a crowded room, my heart still knows right where you are.',
    'You make ordinary days feel like keepsakes I never want to misplace.',
    'I love the life we are building—quietly, patiently, and side by side.',
  ],
  'Thank You': [
    'Your kindness arrived at the exact moment I needed it most. I will not forget it.',
    'Thank you for your generosity, your time, and the care you put into everything you do.',
    'Words feel small next to what you did, so please accept this little note filled with real gratitude.',
  ],
  Default: [
    'Just wanted to pause the rush of the week and send something thoughtful your way.',
    'You are deeply appreciated more often than you probably realize.',
    'Sending warmth, encouragement, and a gentle smile across the miles today.',
  ],
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'art-of-writing-a-card-they-keep',
    title: 'The Art of Writing a Greeting Card Someone Actually Keeps',
    category: 'Writing Craft',
    readTime: '4 min read',
    publishedAt: 'November 18, 2026',
    excerpt:
      'Why specific small memories outshine grand clichés—and a simple three-part rhythm to write a note that stays in someone’s heart.',
    coverMotif: 'botanical-arch',
    coverPaletteId: 'warm-ivory',
    recommendedTemplateId: 'rose-arch-anniversary',
    sections: [
      {
        heading: 'Start with one specific memory, not a greeting-card cliché',
        paragraphs: [
          'The most memorable messages rarely begin with sweeping generalizations. Instead of "You are the best friend ever," anchor your opening sentence in a real moment: the rainy coffee walk, the voice note they sent at midnight, or the laugh you shared last winter.',
          'Specificity signals attention—and attention is the rarest gift we can give another person.',
        ],
        quote: 'People rarely remember the fanciest phrase; they remember the exact moment you noticed who they really are.',
      },
      {
        heading: 'Follow the Three-Beat Keepsake Rhythm',
        paragraphs: [
          'First, name what you appreciate about them right now. Second, share a brief wish for the season ahead—something tailored to their actual life, whether that is rest, courage, or joyful celebration. Third, close with warmth that sounds unmistakably like your own speaking voice.',
        ],
      },
    ],
  },
  {
    slug: 'why-just-because-notes-matter-most',
    title: 'Why "Just Because" Cards Create the Deepest Emotional Impact',
    category: 'Thoughtful Living',
    readTime: '3 min read',
    publishedAt: 'November 10, 2026',
    excerpt:
      'Calendar holidays are expected; an unprompted Tuesday card arrives when nobody expects it—and carries twice the magic.',
    coverMotif: 'cozy-teacup',
    coverPaletteId: 'soft-blush',
    recommendedTemplateId: 'cozy-just-because',
    sections: [
      {
        heading: 'The surprise of unscheduled kindness',
        paragraphs: [
          'On birthdays and anniversaries, everyone expects their phone to light up. Yet the quietest, hardest weeks of the year rarely have a banner on the calendar.',
          'Sending a personalized digital card on an ordinary afternoon says something unmistakable: I did not need a reminder to think of you.',
        ],
        quote: 'An unprompted note on a Tuesday afternoon can shift the entire weight of someone’s week.',
      },
      {
        heading: 'Keep it effortless and sincere',
        paragraphs: [
          'Two or three honest sentences paired with calm ivory typography are more than enough. You do not need an essay to make someone feel seen.',
        ],
      },
    ],
  },
  {
    slug: 'pairing-typography-and-color-to-mood',
    title: 'How Color & Typography Quietly Shape the Emotion of Your Card',
    category: 'Design Notes',
    readTime: '5 min read',
    publishedAt: 'November 2, 2026',
    excerpt:
      'From candlelit plum and champagne gold to airy lavender and handwritten script—choosing stationery finishes that match your sentiment.',
    coverMotif: 'celestial-moon',
    coverPaletteId: 'lavender-dusk',
    recommendedTemplateId: 'moonlit-velvet-love',
    sections: [
      {
        heading: 'Matching paper tone to occasion',
        paragraphs: [
          'Warm ivory and soft blush invite intimacy and gentle affection—ideal for mothers, partners, and heartfelt thank-yous. Deep plum paired with champagne gold brings evening elegance to milestone birthdays and anniversaries.',
          'Meanwhile, lavender dusk creates a dreamy, reflective mood suited to romance and long-distance friendship notes.',
        ],
      },
      {
        heading: 'When to pick serif vs. handwritten script',
        paragraphs: [
          'Use an editorial serif when you want your words to feel timeless and heirloom-like. Reach for handwritten calligraphy when your message reads like an intimate, whispered note.',
        ],
      },
    ],
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-free',
    category: 'Getting Started',
    question: 'Do I need an account to create and send a digital card?',
    answer:
      'No sign-up is required. You can choose any card, personalize every word, preview your design, download a high-resolution PNG image, and generate a shareable link immediately in your browser.',
  },
  {
    id: 'faq-share-link',
    category: 'Sharing & Delivery',
    question: 'How does the shareable link work without a backend?',
    answer:
      'Your personalized card styling, names, and message are securely encoded directly into the shareable link URL. When your recipient opens the link on any device, they see a sealed digital envelope that opens to reveal your exact card.',
  },
  {
    id: 'faq-whatsapp',
    category: 'Sharing & Delivery',
    question: 'Can I send my card via WhatsApp or download it as an image?',
    answer:
      'Yes. Once you finish personalizing your card in the studio, you can send the link directly to WhatsApp with a pre-formatted greeting, copy the link to any messaging app, or export a crisp portrait PNG using our HTML5 Canvas renderer.',
  },
  {
    id: 'faq-drafts',
    category: 'Privacy & Storage',
    question: 'Where are my saved drafts and preferences stored?',
    answer:
      'Drafts, favorites, and your light/dark theme preference are saved locally in your browser via LocalStorage. Nothing is uploaded to third-party servers.',
  },
  {
    id: 'faq-part2',
    category: 'Platform Roadmap',
    question: 'Are monetary gift balances or scheduled deliveries coming soon?',
    answer:
      'Yes! Part 1 focuses on our tactile digital greeting studio, curated collections, instant sharing, and image exports. Part 2 expands the experience with digital gift vouchers, scheduled delivery, and richer interactive keepsakes.',
  },
]

export function getPaletteById(id: string): CardPalette {
  return CARD_PALETTES.find((p) => p.id === id) ?? CARD_PALETTES[0]
}

export function getFontById(id: string): CardFontPreset {
  return CARD_FONTS.find((f) => f.id === id) ?? CARD_FONTS[0]
}

export function getTemplateById(id: string): CardTemplate {
  return CARD_TEMPLATES.find((t) => t.id === id) ?? CARD_TEMPLATES[0]
}
