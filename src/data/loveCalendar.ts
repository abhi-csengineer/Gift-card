import type {
  LoveCalendarDateRule,
  LoveCalendarMilestone,
  LoveCalendarMonth,
  LoveCalendarMonthSlug,
  LoveCalendarOccasion,
  LoveCalendarOccasionCategory,
  UpcomingOccurrenceItem,
} from '../types/loveCalendar'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function getNthWeekdayOfMonth(
  year: number,
  month1Based: number,
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  nth: number,
): number {
  const firstDayOfWeek = new Date(year, month1Based - 1, 1).getDay()
  const offset = (weekday - firstDayOfWeek + 7) % 7
  return 1 + offset + (nth - 1) * 7
}

export function resolveOccasionDate(
  rule: LoveCalendarDateRule,
  year: number = new Date().getFullYear(),
): {
  year: number
  month: number
  day: number
  formattedLabel: string
  ruleNote?: string
} {
  const day =
    rule.kind === 'fixed'
      ? rule.day
      : getNthWeekdayOfMonth(year, rule.month, rule.weekday, rule.nth)
  const monthName = MONTH_NAMES[rule.month - 1] ?? 'January'
  return {
    year,
    month: rule.month,
    day,
    formattedLabel: `${monthName} ${day}`,
    ruleNote: rule.kind === 'nth-weekday' ? rule.ruleLabel : undefined,
  }
}

export const LOVE_CALENDAR_MONTHS: LoveCalendarMonth[] = [
  {
    slug: 'january',
    monthNumber: 1,
    name: 'January',
    shortName: 'Jan',
    collectionTitle: 'Month of New Beginnings',
    seasonLabel: 'Quiet Winter · Fresh Pages',
    description:
      'Clean ivory stationery, midnight New Year fireworks, St. Dwynwen blooms, and warm promises for the year ahead together.',
    poeticLine: 'Every fresh calendar begins with someone worth writing to.',
    accentColor: '#9B7436',
    softTintLight: '#FBF4E9',
    softTintDark: '#2A2118',
    motif: 'crescent-vow',
    featuredTemplateIds: [
      'lc-new-years-day-fireworks',
      'lc-st-dwynwen-daffodil',
      'lc-spouses-day-rings',
    ],
    exploreCategorySlug: 'just-because',
  },
  {
    slug: 'february',
    monthNumber: 2,
    name: 'February',
    shortName: 'Feb',
    collectionTitle: 'Month of Love',
    seasonLabel: 'Velvet Bloom · Valentine Week & Beyond',
    description:
      'From crimson Rose Day petals, truffles, teddy bears, and promises to playful banter and heartfelt confessions.',
    poeticLine: 'Ink on linen outlasts a thousand fleeting messages.',
    accentColor: '#B5546D',
    softTintLight: '#F8DDE4',
    softTintDark: '#3A1F2D',
    motif: 'wax-envelope',
    featuredTemplateIds: [
      'lc-rose-day-crimson',
      'lc-propose-day-ringbox',
      'lc-valentines-imperial-rose',
    ],
    exploreCategorySlug: 'valentines-day',
  },
  {
    slug: 'march',
    monthNumber: 3,
    name: 'March',
    shortName: 'Mar',
    collectionTitle: 'Month of Togetherness',
    seasonLabel: 'Early Spring · Shared Steps',
    description:
      'Empowering floral tributes for Women’s Day, ivory White Day elegance, sunlit happiness, and spring proposals.',
    poeticLine: 'Side by side turns ordinary afternoons into landmarks.',
    accentColor: '#7F63A8',
    softTintLight: '#EDE7F8',
    softTintDark: '#2A223B',
    motif: 'tulip-meadow',
    featuredTemplateIds: [
      'lc-womens-day-emblem',
      'lc-white-day-ivoryrose',
      'lc-proposal-day-us-diamond',
    ],
    exploreCategorySlug: 'girlfriend-boyfriend',
  },
  {
    slug: 'april',
    monthNumber: 4,
    name: 'April',
    shortName: 'Apr',
    collectionTitle: 'Month of Romance',
    seasonLabel: 'Spring Petals · Literary & Cultural Love',
    description:
      'Korean Black Day monochrome keepsakes, Sant Jordi’s book-and-rose romance, and gentle Kiss & Make Up reconciliation.',
    poeticLine: 'Soft light, lingering words, and blossoms pressed in paper.',
    accentColor: '#C86A80',
    softTintLight: '#FCE8EE',
    softTintDark: '#38202B',
    motif: 'rose-arch',
    featuredTemplateIds: [
      'lc-black-day-monochrome',
      'lc-sant-jordi-bookrose',
      'lc-kiss-makeup-olive',
    ],
    exploreCategorySlug: 'girlfriend-boyfriend',
  },
  {
    slug: 'may',
    monthNumber: 5,
    name: 'May',
    shortName: 'May',
    collectionTitle: 'Month of Affection',
    seasonLabel: 'Warm Blossom · Tender Gestures',
    description:
      'Matching couple horizons and glowing crimson 520 lanterns expressing affection in timeless symbols.',
    poeticLine: 'Affection lives in the moments nobody asked you to notice.',
    accentColor: '#C96D59',
    softTintLight: '#FCEAE1',
    softTintDark: '#36211D',
    motif: 'sunlit-locket',
    featuredTemplateIds: [
      'lc-intl-couples-may-bands',
      'lc-520-day-lantern',
      'lc-520-day-gold',
    ],
    exploreCategorySlug: 'appreciation',
  },
  {
    slug: 'june',
    monthNumber: 6,
    name: 'June',
    shortName: 'Jun',
    collectionTitle: 'Month of Sweet Memories',
    seasonLabel: 'Early Summer · Samba & Soundtracks',
    description:
      'Festive Brazilian Dia dos Namorados blooms and shared summer playlists for World Music Day.',
    poeticLine: 'Some afternoons stay golden long after the sun sets.',
    accentColor: '#B88D48',
    softTintLight: '#F9EEDB',
    softTintDark: '#2E2519',
    motif: 'champagne-horizon',
    featuredTemplateIds: [
      'lc-dia-namorados-fiesta',
      'lc-music-day-duet',
      'lc-dia-namorados-rose',
    ],
    exploreCategorySlug: 'anniversary',
  },
  {
    slug: 'july',
    monthNumber: 7,
    name: 'July',
    shortName: 'Jul',
    collectionTitle: 'Month of Passion',
    seasonLabel: 'Midsummer · Moonlit Devotion',
    description:
      'Warm summer silhouettes for International Kissing Day and starry Apollo-era love letters under the Moon Day sky.',
    poeticLine: 'Unfiltered words for the love that moves you most.',
    accentColor: '#8E3552',
    softTintLight: '#F6DCE4',
    softTintDark: '#341B25',
    motif: 'velvet-lantern',
    featuredTemplateIds: [
      'lc-intl-kiss-peach',
      'lc-moon-day-celestial',
      'lc-moon-day-moonmail',
    ],
    exploreCategorySlug: 'girlfriend-boyfriend',
  },
  {
    slug: 'august',
    monthNumber: 8,
    name: 'August',
    shortName: 'Aug',
    collectionTitle: 'Month of Appreciation',
    seasonLabel: 'Late Summer · Sunlit Grace',
    description:
      'Blush tulip bouquets honoring National Girlfriend Day and warm portraits celebrating National Couples Day.',
    poeticLine: 'A heartfelt thank-you is its own kind of love letter.',
    accentColor: '#8B6B4A',
    softTintLight: '#F5ECE1',
    softTintDark: '#2C231B',
    motif: 'pressed-olive',
    featuredTemplateIds: [
      'lc-girlfriend-day-tulips',
      'lc-national-couples-aug-bands',
      'lc-girlfriend-day-butterflies',
    ],
    exploreCategorySlug: 'thank-you',
  },
  {
    slug: 'september',
    monthNumber: 9,
    name: 'September',
    shortName: 'Sep',
    collectionTitle: 'Month of Commitment',
    seasonLabel: 'Early Autumn · Heirloom Foil',
    description:
      'Dynamic third-Sunday tributes for Wife Appreciation Day alongside thoughtful wellness care on World Heart Day.',
    poeticLine: 'Devotion is choosing the same person through every season.',
    accentColor: '#7B2944',
    softTintLight: '#F3E3E9',
    softTintDark: '#2E1A23',
    motif: 'golden-bands',
    featuredTemplateIds: [
      'lc-wife-appreciation-peony',
      'lc-wife-appreciation-rings',
      'lc-world-heart-day-pulse',
    ],
    exploreCategorySlug: 'husband-wife',
  },
  {
    slug: 'october',
    monthNumber: 10,
    name: 'October',
    shortName: 'Oct',
    collectionTitle: 'Month of Celebrating Him',
    seasonLabel: 'Amber Crisp · Tailored Linen',
    description:
      'Tailored navy & brass keepsakes for National Boyfriend Day and cocoa pralines for Sweetest Day’s third Saturday.',
    poeticLine: 'Quiet strength and steady love deserve words of their own.',
    accentColor: '#8E6234',
    softTintLight: '#F4E8D8',
    softTintDark: '#2B2118',
    motif: 'linen-monogram',
    featuredTemplateIds: [
      'lc-boyfriend-day-navy',
      'lc-sweetest-day-praline',
      'lc-boyfriend-day-espresso',
    ],
    exploreCategorySlug: 'husband-wife',
  },
  {
    slug: 'november',
    monthNumber: 11,
    name: 'November',
    shortName: 'Nov',
    collectionTitle: 'Month of Gratitude',
    seasonLabel: 'Warm Hearth · Kindness & Self-Love',
    description:
      'Playful Singles’ Day independence, pastel World Kindness Day notes, and refined tributes for International Men’s Day.',
    poeticLine: 'Gratitude deepens every bond it touches.',
    accentColor: '#B46952',
    softTintLight: '#FAE6DC',
    softTintDark: '#33201B',
    motif: 'warm-hearth',
    featuredTemplateIds: [
      'lc-singles-day-selflove',
      'lc-kindness-day-wildflowers',
      'lc-mens-day-compass',
    ],
    exploreCategorySlug: 'thank-you',
  },
  {
    slug: 'december',
    monthNumber: 12,
    name: 'December',
    shortName: 'Dec',
    collectionTitle: 'Month of Magical Moments',
    seasonLabel: 'Winter Starlight · Festive Gold',
    description:
      'Glowing pine trees on Christmas Eve, crimson wreaths on Christmas Day, and champagne fireworks at midnight on New Year’s Eve.',
    poeticLine: 'End the year holding close the one who made it unforgettable.',
    accentColor: '#8A6EB8',
    softTintLight: '#EAE4F7',
    softTintDark: '#231F35',
    motif: 'starlight-bell',
    featuredTemplateIds: [
      'lc-christmas-eve-tree',
      'lc-christmas-day-wreath',
      'lc-nye-midnight-toast',
    ],
    exploreCategorySlug: 'festivals',
  },
]

export const LOVE_CALENDAR_OCCASIONS: LoveCalendarOccasion[] = [
  // ==================== 1. JANUARY ====================
  {
    id: 'new-years-day-jan-1',
    name: "New Year's Day",
    monthSlug: 'january',
    monthNumber: 1,
    dateRule: { kind: 'fixed', month: 1, day: 1 },
    shortDescription:
      'Midnight sky fireworks, golden stars, and champagne wishes for 365 fresh days together.',
    visualTheme: 'Fireworks, golden stars, midnight sky',
    featured: true,
    motif: 'starlight-bell',
    accentColor: '#9B7436',
    accentTint: '#FBF4E9',
    templateId: 'lc-new-years-day-fireworks',
    templateIds: ['lc-new-years-day-fireworks', 'lc-new-years-day-champagne'],
    exploreCategorySlug: 'festivals',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Every calendar page ahead feels brighter because I get to turn them beside you. Happy New Year, my love.',
      },
      {
        tone: 'Elegant',
        text: 'May this brand-new year grace us with calm mornings, bold dreams, and timeless joy together.',
      },
      {
        tone: 'Cute',
        text: 'New year, same favorite person to steal blankets from and laugh with until midnight!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Cheers to 365 new chapters with my favorite person.',
      },
    ],
  },
  {
    id: 'national-hugging-day-jan-21',
    name: 'National Hugging Day',
    monthSlug: 'january',
    monthNumber: 1,
    dateRule: { kind: 'fixed', month: 1, day: 21 },
    shortDescription:
      'Soft peach and rose embrace silhouettes celebrating the comfort of holding someone close.',
    visualTheme: 'Warm embrace, hugging silhouettes, soft pink & peach',
    featured: false,
    motif: 'warm-hearth',
    accentColor: '#C96D59',
    accentTint: '#FCEAE1',
    templateId: 'lc-hugging-day-peach',
    templateIds: ['lc-hugging-day-peach', 'lc-hugging-day-cozy'],
    exploreCategorySlug: 'just-because',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'If I could bottle how safe and peaceful I feel in your arms, I would hand it to you today.',
      },
      {
        tone: 'Cute',
        text: 'Consider this card an official voucher for one extra-long, zero-rush bear hug!',
      },
      {
        tone: 'Emotional',
        text: 'Even on heavy days, one quiet hug from you reminds me I never carry anything alone.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Saving my warmest hug for you today.',
      },
    ],
  },
  {
    id: 'st-dwynwens-day-jan-25',
    name: "St. Dwynwen's Day",
    monthSlug: 'january',
    monthNumber: 1,
    dateRule: { kind: 'fixed', month: 1, day: 25 },
    shortDescription:
      'Honoring Wales’s beloved patron saint of lovers with golden daffodils, hearts, and botanical arches.',
    visualTheme: 'Welsh romantic tradition, daffodils & floral hearts',
    featured: false,
    motif: 'rose-arch',
    accentColor: '#B5546D',
    accentTint: '#F8DDE4',
    templateId: 'lc-st-dwynwen-daffodil',
    templateIds: ['lc-st-dwynwen-daffodil', 'lc-st-dwynwen-arch'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Dydd Santes Dwynwen Hapus—may our love always stay gentle, loyal, and deeply rooted.',
      },
      {
        tone: 'Elegant',
        text: 'In the old Welsh tradition of devotion, I send you flowers of gratitude and every warm wish.',
      },
      {
        tone: 'Emotional',
        text: 'True peace is loving someone who treats your heart gently in every season.',
      },
    ],
  },
  {
    id: 'national-spouses-day-jan-26',
    name: 'National Spouses Day',
    monthSlug: 'january',
    monthNumber: 1,
    dateRule: { kind: 'fixed', month: 1, day: 26 },
    shortDescription:
      'Intertwined wedding bands and refined linen letterpress praising life beside your spouse.',
    visualTheme: 'Wedding rings, heirloom vows, timeless romance',
    featured: false,
    motif: 'golden-bands',
    accentColor: '#7B2944',
    accentTint: '#F3E3E9',
    templateId: 'lc-spouses-day-rings',
    templateIds: ['lc-spouses-day-rings', 'lc-spouses-day-hearth'],
    exploreCategorySlug: 'husband-wife',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Choosing you was effortless; loving you through every ordinary day since has been my favorite privilege.',
      },
      {
        tone: 'Funny',
        text: 'Happy Spouses Day to the only person I tolerate sharing a thermostat and grocery cart with forever!',
      },
      {
        tone: 'Emotional',
        text: 'Thank you for being home, anchor, and partner in every sense of the word.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Still choosing you every single morning.',
      },
    ],
  },

  // ==================== 2. FEBRUARY ====================
  {
    id: 'rose-day-feb-7',
    name: 'Rose Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 7 },
    shortDescription:
      'Layered crimson roses, drifting petals, and silk pink botanical arrangements kicking off Valentine Week.',
    visualTheme: 'Realistic roses, floral arrangements, red & pink petals',
    featured: true,
    motif: 'rose-arch',
    accentColor: '#C92A4C',
    accentTint: '#FADBE3',
    templateId: 'lc-rose-day-crimson',
    templateIds: ['lc-rose-day-crimson', 'lc-rose-day-bouquet'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Every crimson petal carries a quiet thank-you for the beauty and joy you bring into my world. Happy Rose Day!',
      },
      {
        tone: 'Cute',
        text: 'Fresh roses fade in a week, so I sent one that stays in bloom forever!',
      },
      {
        tone: 'Elegant',
        text: 'A single timeless bloom for the person whose grace brightens every room.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'A rose for the one who makes life bloom.',
      },
    ],
  },
  {
    id: 'propose-day-feb-8',
    name: 'Propose Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 8 },
    shortDescription:
      'Velvet engagement ring boxes and champagne foil vows designed for unforgettable proposals.',
    visualTheme: 'Engagement rings, proposal scenes, romantic twilight',
    featured: false,
    motif: 'golden-bands',
    accentColor: '#7B2944',
    accentTint: '#F8DDE4',
    templateId: 'lc-propose-day-ringbox',
    templateIds: ['lc-propose-day-ringbox', 'lc-propose-day-vow'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Every road I picture in my future feels brighter with your hand in mine. Will you stay mine forever?',
      },
      {
        tone: 'Emotional',
        text: 'Out of all the places life could carry us, my favorite destination is simply wherever we go together.',
      },
      {
        tone: 'Cute',
        text: 'Officially asking you to keep putting up with me for the next eighty winters or so!',
      },
    ],
  },
  {
    id: 'chocolate-day-feb-9',
    name: 'Chocolate Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 9 },
    shortDescription:
      'Warm cocoa brown and cream stationery illustrated with artisan chocolate squares and truffles.',
    visualTheme: 'Chocolate bars, truffles, cocoa brown & cream',
    featured: false,
    motif: 'warm-hearth',
    accentColor: '#7A4228',
    accentTint: '#F1DFCE',
    templateId: 'lc-chocolate-day-truffles',
    templateIds: ['lc-chocolate-day-truffles', 'lc-chocolate-day-espresso'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Cute',
        text: 'Dark chocolate comes close, yet nothing melts my heart faster than your smile. Happy Chocolate Day!',
      },
      {
        tone: 'Funny',
        text: 'I love you almost enough to share the last truffle in the box—almost!',
      },
      {
        tone: 'Romantic',
        text: 'You bring rich warmth and sweetness into even the quietest afternoons.',
      },
    ],
  },
  {
    id: 'teddy-day-feb-10',
    name: 'Teddy Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 10 },
    shortDescription:
      'Sweet pastel plush teddy bear stationery stitched with warm honey tones and cozy ribbons.',
    visualTheme: 'Adorable teddy bears, plush textures, warm pastels',
    featured: false,
    motif: 'sunlit-locket',
    accentColor: '#C98967',
    accentTint: '#FAE6DC',
    templateId: 'lc-teddy-day-plush',
    templateIds: ['lc-teddy-day-plush', 'lc-teddy-day-ribbon'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Cute',
        text: 'Whenever I am not right beside you, let this soft little teddy bear stand in for my squeeze!',
      },
      {
        tone: 'Romantic',
        text: 'You make chilly nights feel safe, playful, and impossibly cozy. Happy Teddy Day!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Soft hearts, warm cuddles, and endless smiles for you.',
      },
    ],
  },
  {
    id: 'promise-day-feb-11',
    name: 'Promise Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 11 },
    shortDescription:
      'Intertwined infinity motifs and wax-sealed pledge notes crafted for sincere lifelong promises.',
    visualTheme: 'Promise notes, intertwined infinity symbols, gold foil',
    featured: false,
    motif: 'crescent-vow',
    accentColor: '#7F63A8',
    accentTint: '#EDE7F8',
    templateId: 'lc-promise-day-infinity',
    templateIds: ['lc-promise-day-infinity', 'lc-promise-day-sealed'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'I promise to listen with patience, cheer loudest in your corner, and protect your peace.',
      },
      {
        tone: 'Romantic',
        text: 'No grand speeches needed—just my steady word that you never walk any season alone.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Always in your corner, today and every year ahead.',
      },
    ],
  },
  {
    id: 'hug-day-feb-12',
    name: 'Hug Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 12 },
    shortDescription:
      'Warm embracing silhouettes in golden peach tones celebrating cozy hugs and safe harbor.',
    visualTheme: 'Warm embracing couples, sunset peach cozy warmth',
    featured: false,
    motif: 'champagne-horizon',
    accentColor: '#D96D68',
    accentTint: '#FCE2D6',
    templateId: 'lc-hug-day-embrace',
    templateIds: ['lc-hug-day-embrace', 'lc-hug-day-sunset'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'No words heal a long week the way one unhurried hug from you does. Happy Hug Day.',
      },
      {
        tone: 'Romantic',
        text: 'Home is not a street address—it is wherever your arms wrap around me.',
      },
      {
        tone: 'Cute',
        text: 'Redeemable immediately for unlimited hugs and zero letting go first!',
      },
    ],
  },
  {
    id: 'kiss-day-feb-13',
    name: 'Kiss Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 13 },
    shortDescription:
      'Velvet crimson kiss silhouettes and dusk starlight honoring tender affection.',
    visualTheme: 'Romantic silhouettes, soft kiss motifs, crimson hearts',
    featured: false,
    motif: 'velvet-lantern',
    accentColor: '#B5546D',
    accentTint: '#F8DDE4',
    templateId: 'lc-kiss-day-velvet',
    templateIds: ['lc-kiss-day-velvet', 'lc-kiss-day-noir'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'One soft kiss on the forehead for calm, one on the hand for devotion, and one just because I adore you.',
      },
      {
        tone: 'Cute',
        text: 'Every line inside this envelope is basically a kiss waiting to happen!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Sealed with warmth and waiting for tonight.',
      },
    ],
  },
  {
    id: 'valentines-day-feb-14',
    name: "Valentine's Day",
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 14 },
    shortDescription:
      'Imperial crimson roses, velvet plum seals, and heirloom gold stationery for February 14.',
    visualTheme: 'Luxury crimson roses, wax seals, gold foil romance',
    featured: true,
    motif: 'wax-envelope',
    accentColor: '#B5546D',
    accentTint: '#F8DDE4',
    templateId: 'lc-valentines-imperial-rose',
    templateIds: ['lc-valentines-imperial-rose', 'lc-valentines-velvet-letter'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Out of every story and every ordinary Tuesday, my favorite place in the world is right beside you.',
      },
      {
        tone: 'Emotional',
        text: 'Thank you for loving me with patience, humor, and warmth in ways words barely capture.',
      },
      {
        tone: 'Cute',
        text: 'Happy Valentine’s Day to my favorite person to do mundane errands and big adventures with!',
      },
      {
        tone: 'Elegant',
        text: 'With timeless devotion, deep gratitude, and a heart entirely yours.',
      },
    ],
  },
  {
    id: 'slap-day-feb-15',
    name: 'Slap Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 15 },
    shortDescription:
      'Playful pop-art comic bursts and cheeky banter for lighthearted laughs—completely friendly and non-violent.',
    visualTheme: 'Playful comic-style expressions, humorous upbeat typography',
    featured: false,
    motif: 'champagne-horizon',
    accentColor: '#E04D6B',
    accentTint: '#FFE3E8',
    templateId: 'lc-slap-day-comic',
    templateIds: ['lc-slap-day-comic', 'lc-slap-day-roast'],
    exploreCategorySlug: 'just-because',
    messageSuggestions: [
      {
        tone: 'Funny',
        text: 'Consider this a tiny, harmless comic-book cheek-boop for stealing my fries—followed immediately by a grin!',
      },
      {
        tone: 'Cute',
        text: 'Skipping all anti-Valentine clichés for one playful nudge: stop being impossibly hard to stay mad at!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Zero drama, 100% friendly roast and laughter.',
      },
    ],
  },
  {
    id: 'kick-day-feb-16',
    name: 'Kick Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 16 },
    shortDescription:
      'Upbeat cartoon energy celebrating kicking bad moods, dull routines, and stress cleanly out the door.',
    visualTheme: 'Cartoon bounce motif, playful upbeat pop colors',
    featured: false,
    motif: 'sunlit-locket',
    accentColor: '#E07A48',
    accentTint: '#FCEBC4',
    templateId: 'lc-kick-day-bounce',
    templateIds: ['lc-kick-day-bounce', 'lc-kick-day-sunshine'],
    exploreCategorySlug: 'friendship',
    messageSuggestions: [
      {
        tone: 'Funny',
        text: 'Kicking boring routines, Monday blues, and unread emails straight out the door—let’s go grab dessert!',
      },
      {
        tone: 'Cute',
        text: 'The only thing getting kicked today is your to-do list. Put your feet up and smile!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Kick off bad vibes and welcome brighter mornings.',
      },
    ],
  },
  {
    id: 'perfume-day-feb-17',
    name: 'Perfume Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 17 },
    shortDescription:
      'Atelier crystal perfume flacons and botanical fragrance notes in alabaster & lavender dusk.',
    visualTheme: 'Luxury perfume bottles, delicate florals, atelier bottle',
    featured: false,
    motif: 'tulip-meadow',
    accentColor: '#9A6D7E',
    accentTint: '#EAE5DC',
    templateId: 'lc-perfume-day-flacon',
    templateIds: ['lc-perfume-day-flacon', 'lc-perfume-day-petals'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Elegant',
        text: 'Certain scents turn an ordinary hallway into a cherished memory in half a second. You make every room unforgettable.',
      },
      {
        tone: 'Romantic',
        text: 'Top notes of laughter, heart notes of patience, and lingering warmth—that is what loving you feels like.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Unforgettable grace in every passing moment.',
      },
    ],
  },
  {
    id: 'flirting-day-feb-18',
    name: 'Flirting Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 18 },
    shortDescription:
      'Playful wink cards and charming banter typography designed to spark effortless butterflies.',
    visualTheme: 'Cute wink motifs, charming banter, blush & peach',
    featured: false,
    motif: 'wax-envelope',
    accentColor: '#D67B91',
    accentTint: '#F8DDE4',
    templateId: 'lc-flirting-day-wink',
    templateIds: ['lc-flirting-day-wink', 'lc-flirting-day-spark'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Funny',
        text: 'Excuse me—just an official reminder that you are still absurdly cute even in mismatched socks.',
      },
      {
        tone: 'Romantic',
        text: 'I was going to send a subtle hint, then realized flirting works better when I just ask you out tonight.',
      },
      {
        tone: 'Cute',
        text: 'Warning: still hopelessly crushed out on you!',
      },
    ],
  },
  {
    id: 'confession-day-feb-19',
    name: 'Confession Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 19 },
    shortDescription:
      'Wax-sealed ink letters and twilight confessions crafted for feelings spoken straight from the heart.',
    visualTheme: 'Handwritten letters, wax seals, soft twilight lighting',
    featured: false,
    motif: 'wax-envelope',
    accentColor: '#8E3552',
    accentTint: '#F6DCE4',
    templateId: 'lc-confession-day-waxletter',
    templateIds: ['lc-confession-day-waxletter', 'lc-confession-day-twilight'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'I carried these words quietly long enough: you are the person I look for in every room and hope to know for years.',
      },
      {
        tone: 'Romantic',
        text: 'Honestly? From our very first real conversation, my heart already knew it was you.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Finally putting my truest feelings into ink.',
      },
    ],
  },
  {
    id: 'missing-day-feb-20',
    name: 'Missing Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 20 },
    shortDescription:
      'Crescent moonlight and paper-plane mail bridging miles of longing across any time zone.',
    visualTheme: 'Long-distance moonlight, letters, starry skies',
    featured: false,
    motif: 'crescent-vow',
    accentColor: '#7F63A8',
    accentTint: '#EDE7F8',
    templateId: 'lc-missing-day-moonmail',
    templateIds: ['lc-missing-day-moonmail', 'lc-missing-day-window'],
    exploreCategorySlug: 'good-night',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'Different cities, different clocks, same sky tonight. Missing your voice beside me more than words carry.',
      },
      {
        tone: 'Cute',
        text: 'Every time something funny happens today, my first instinct is still to turn and tell you first.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Counting down the miles until next time.',
      },
    ],
  },
  {
    id: 'breakup-day-feb-21',
    name: 'Breakup Day',
    monthSlug: 'february',
    monthNumber: 2,
    dateRule: { kind: 'fixed', month: 2, day: 21 },
    shortDescription:
      'Restorative sage botanicals centered on healing, emotional clarity, self-respect, and peaceful closure.',
    visualTheme: 'Healing sage botanicals, calm morning light, peaceful closure',
    featured: false,
    motif: 'pressed-olive',
    accentColor: '#689378',
    accentTint: '#E1ECE4',
    templateId: 'lc-breakup-day-healing',
    templateIds: ['lc-breakup-day-healing', 'lc-breakup-day-selflove'],
    exploreCategorySlug: 'just-because',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'Some chapters end so both hearts can breathe and grow whole again. Wishing you clarity, kindness, and calm mornings ahead.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Choosing gentle closure, self-respect, and brighter mornings ahead.',
      },
      {
        tone: 'Elegant',
        text: 'May you meet every tomorrow with quiet courage, peace of mind, and deep tenderness toward yourself.',
      },
    ],
  },

  // ==================== 3. MARCH ====================
  {
    id: 'international-womens-day-mar-8',
    name: "International Women's Day",
    monthSlug: 'march',
    monthNumber: 3,
    dateRule: { kind: 'fixed', month: 3, day: 8 },
    shortDescription:
      'Botanical grace emblems and spring peony bouquets celebrating women’s courage and brilliance.',
    visualTheme: 'Botanical crest, peonies, empowering tribute',
    featured: true,
    motif: 'tulip-meadow',
    accentColor: '#7F63A8',
    accentTint: '#EDE7F8',
    templateId: 'lc-womens-day-emblem',
    templateIds: ['lc-womens-day-emblem', 'lc-womens-day-peonies'],
    exploreCategorySlug: 'appreciation',
    messageSuggestions: [
      {
        tone: 'Elegant',
        text: 'Your courage lifts rooms, your empathy softens hard days, and your vision inspires everyone lucky enough to know you.',
      },
      {
        tone: 'Emotional',
        text: 'Thank you for leading with both quiet strength and boundless kindness. Happy Women’s Day!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Celebrating your brilliance, grace, and strength today.',
      },
    ],
  },
  {
    id: 'white-day-mar-14',
    name: 'White Day',
    monthSlug: 'march',
    monthNumber: 3,
    dateRule: { kind: 'fixed', month: 3, day: 14 },
    shortDescription:
      'Alabaster white roses and crisp silver-ivory gift keepsakes returning affection threefold.',
    visualTheme: 'White roses, white chocolate, ivory & silver',
    featured: false,
    motif: 'linen-monogram',
    accentColor: '#8D99AE',
    accentTint: '#ECEEF2',
    templateId: 'lc-white-day-ivoryrose',
    templateIds: ['lc-white-day-ivoryrose', 'lc-white-day-confection'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'In the spirit of White Day, thank you for loving first—here is all my affection returned in kind.',
      },
      {
        tone: 'Cute',
        text: 'Bringing you white roses, sweet treats, and triple the warmth you sent my way!',
      },
      {
        tone: 'Elegant',
        text: 'Pure gratitude wrapped in ivory linen and quiet devotion.',
      },
    ],
  },
  {
    id: 'international-day-of-happiness-mar-20',
    name: 'International Day of Happiness',
    monthSlug: 'march',
    monthNumber: 3,
    dateRule: { kind: 'fixed', month: 3, day: 20 },
    shortDescription:
      'Sunlit buttercream rays and cheerful daisy snapshots honoring everyday joy together.',
    visualTheme: 'Sunshine, daisies, joyful buttercream colors',
    featured: false,
    motif: 'sunlit-locket',
    accentColor: '#E07A48',
    accentTint: '#FCEBC4',
    templateId: 'lc-happiness-day-sunburst',
    templateIds: ['lc-happiness-day-sunburst', 'lc-happiness-day-daisies'],
    exploreCategorySlug: 'just-because',
    messageSuggestions: [
      {
        tone: 'Cute',
        text: 'Happiness rarely comes in grand boxes—for me, it looks just like laughing with you over nothing at all!',
      },
      {
        tone: 'Romantic',
        text: 'Thank you for turning grey afternoons sunny simply by walking into the room.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Choosing joy, laughter, and sunlit mornings with you.',
      },
    ],
  },
  {
    id: 'national-proposal-day-mar-20',
    name: 'National Proposal Day (US)',
    monthSlug: 'march',
    monthNumber: 3,
    dateRule: { kind: 'fixed', month: 3, day: 20 },
    shortDescription:
      'Spring solitaire rings and gold floral arches crafted for meaningful engagement moments.',
    visualTheme: 'Proposal rings, romantic spring surprises, gold arch',
    featured: false,
    motif: 'golden-bands',
    accentColor: '#B88D48',
    accentTint: '#F9EEDB',
    templateId: 'lc-proposal-day-us-diamond',
    templateIds: ['lc-proposal-day-us-diamond', 'lc-proposal-day-us-arch'],
    exploreCategorySlug: 'anniversary',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Spring arrives with one simple truth: I want to build every season and memory ahead beside you.',
      },
      {
        tone: 'Emotional',
        text: 'Whether today starts our engagement or celebrates the day we said yes, my heart chooses you always.',
      },
      {
        tone: 'Elegant',
        text: 'Here is to a lifetime sealed with warmth, loyalty, and shared wonder.',
      },
    ],
  },

  // ==================== 4. APRIL ====================
  {
    id: 'black-day-apr-14',
    name: 'Black Day (South Korea)',
    monthSlug: 'april',
    monthNumber: 4,
    dateRule: { kind: 'fixed', month: 4, day: 14 },
    shortDescription:
      'Tasteful monochrome charcoal & dark cocoa designs celebrating Korea’s playful April 14 tradition.',
    visualTheme: 'Tasteful monochrome, dark chocolate & espresso culture',
    featured: false,
    motif: 'linen-monogram',
    accentColor: '#6D4C41',
    accentTint: '#EAE5E1',
    templateId: 'lc-black-day-monochrome',
    templateIds: ['lc-black-day-monochrome', 'lc-black-day-cocoa'],
    exploreCategorySlug: 'friendship',
    messageSuggestions: [
      {
        tone: 'Funny',
        text: 'Whether it’s jajangmyeon, dark espresso, or chocolate tonight—flying solo still deserves top-tier company!',
      },
      {
        tone: 'Cute',
        text: 'Who needs roses when you have dark cocoa and best friends who always show up? Happy Black Day!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Good food, proud independence, and great friends tonight.',
      },
    ],
  },
  {
    id: 'sant-jordi-apr-23',
    name: "Sant Jordi / Lovers' Day",
    monthSlug: 'april',
    monthNumber: 4,
    dateRule: { kind: 'fixed', month: 4, day: 23 },
    shortDescription:
      'Catalan-inspired book-and-rose emblems uniting literary romance with crimson blossoms.',
    visualTheme: 'Roses, open books, Catalan literary romance',
    featured: true,
    motif: 'rose-arch',
    accentColor: '#C92A4C',
    accentTint: '#FADBE3',
    templateId: 'lc-sant-jordi-bookrose',
    templateIds: ['lc-sant-jordi-bookrose', 'lc-sant-jordi-ramble'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'In the spirit of Sant Jordi: a red rose for passion, a good book for quiet evenings, and my whole heart for you.',
      },
      {
        tone: 'Elegant',
        text: 'Feliç Diada de Sant Jordi—my favorite stories are the chapters we still have ahead of us.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'A rose, a page, and endless love on Sant Jordi.',
      },
    ],
  },
  {
    id: 'kiss-and-make-up-day-apr-25',
    name: 'Kiss and Make Up Day',
    monthSlug: 'april',
    monthNumber: 4,
    dateRule: { kind: 'fixed', month: 4, day: 25 },
    shortDescription:
      'Olive branch and blush heart stationery inviting gentle forgiveness, peace, and warm reconciliations.',
    visualTheme: 'Olive branch, gentle kisses, peace & forgiveness',
    featured: false,
    motif: 'pressed-olive',
    accentColor: '#689378',
    accentTint: '#E1ECE4',
    templateId: 'lc-kiss-makeup-olive',
    templateIds: ['lc-kiss-makeup-olive', 'lc-kiss-makeup-peace'],
    exploreCategorySlug: 'husband-wife',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'No stubborn argument ever mattered more than keeping your heart close. Truce and warm tea tonight?',
      },
      {
        tone: 'Romantic',
        text: 'My favorite part of our story is how gently we always find our way back to the same team.',
      },
      {
        tone: 'Cute',
        text: 'Trading pride for a kiss—always on your side!',
      },
    ],
  },

  // ==================== 5. MAY ====================
  {
    id: 'international-couples-day-may-5',
    name: 'International Couples Day',
    monthSlug: 'may',
    monthNumber: 5,
    dateRule: { kind: 'fixed', month: 5, day: 5 },
    shortDescription:
      'Matching golden rings and sunlit horizons honoring shared playlists, inside jokes, and togetherness.',
    visualTheme: 'Matching gold bands, couple horizon, shared memories',
    featured: false,
    motif: 'golden-bands',
    accentColor: '#B88D48',
    accentTint: '#F9EEDB',
    templateId: 'lc-intl-couples-may-bands',
    templateIds: ['lc-intl-couples-may-bands', 'lc-intl-couples-may-horizon'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Here is to shared playlists, finished sentences, and building a world that belongs just to us.',
      },
      {
        tone: 'Cute',
        text: 'Still my favorite human to match coffee orders and weekend adventures with!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Every season feels sweeter side by side.',
      },
    ],
  },
  {
    id: '520-day-may-20',
    name: '520 Day',
    monthSlug: 'may',
    monthNumber: 5,
    dateRule: { kind: 'fixed', month: 5, day: 20 },
    shortDescription:
      'Crimson silk lanterns bearing the Chinese romantic numerals “520” (Wo Ai Ni) in gold foil.',
    visualTheme: 'Chinese crimson lantern, gold 520 numerals',
    featured: true,
    motif: 'velvet-lantern',
    accentColor: '#C92A4C',
    accentTint: '#FADBE3',
    templateId: 'lc-520-day-lantern',
    templateIds: ['lc-520-day-lantern', 'lc-520-day-gold'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: '520 — Three playful numbers meaning “I love you.” Sending endless warmth and devotion today.',
      },
      {
        tone: 'Cute',
        text: 'Happy 520 Day! You are loved in numbers, words, and every little moment in between.',
      },
      {
        tone: 'Elegant',
        text: 'Beneath glowing silk lanterns, wishing us lasting fortune, harmony, and gentle love.',
      },
    ],
  },

  // ==================== 6. JUNE ====================
  {
    id: 'dia-dos-namorados-jun-12',
    name: 'Dia dos Namorados',
    monthSlug: 'june',
    monthNumber: 6,
    dateRule: { kind: 'fixed', month: 6, day: 12 },
    shortDescription:
      'Lush Brazilian floral fiestas and crimson rosewater notes celebrating June 12 romance.',
    visualTheme: 'Brazilian romantic blooms, festive floral ribbons',
    featured: false,
    motif: 'rose-arch',
    accentColor: '#C96D59',
    accentTint: '#FCEAE1',
    templateId: 'lc-dia-namorados-fiesta',
    templateIds: ['lc-dia-namorados-fiesta', 'lc-dia-namorados-rose'],
    exploreCategorySlug: 'valentines-day',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Feliz Dia dos Namorados! Warm flowers, music, and a heart endlessly grateful for sharing life with you.',
      },
      {
        tone: 'Cute',
        text: 'Celebrating love Brazilian-style today—with extra warmth, dancing, and sweets for two!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Com todo o meu amor, today and always.',
      },
    ],
  },
  {
    id: 'world-music-day-jun-21',
    name: 'World Music Day',
    monthSlug: 'june',
    monthNumber: 6,
    dateRule: { kind: 'fixed', month: 6, day: 21 },
    shortDescription:
      'Studio headphones, dancing music notes, and sunny solstice playlists for couples in harmony.',
    visualTheme: 'Musical notes, shared headphones, joyful solstice',
    featured: false,
    motif: 'champagne-horizon',
    accentColor: '#4A5F8C',
    accentTint: '#E8EDF7',
    templateId: 'lc-music-day-duet',
    templateIds: ['lc-music-day-duet', 'lc-music-day-sunshine'],
    exploreCategorySlug: 'friendship',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Every road trip, kitchen slow-dance, and shared earbud feels like its own soundtrack beside you.',
      },
      {
        tone: 'Cute',
        text: 'Press play on our favorite playlist tonight—living-room dancing starts at eight!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Life sounds infinitely sweeter with you in harmony.',
      },
    ],
  },

  // ==================== 7. JULY ====================
  {
    id: 'international-kissing-day-jul-6',
    name: 'International Kissing Day',
    monthSlug: 'july',
    monthNumber: 7,
    dateRule: { kind: 'fixed', month: 7, day: 6 },
    shortDescription:
      'Soft peach and crimson silhouettes capturing midsummer romance and affectionate sparks.',
    visualTheme: 'Romantic silhouettes, soft pink, peach & crimson',
    featured: false,
    motif: 'wax-envelope',
    accentColor: '#C92A4C',
    accentTint: '#FADBE3',
    templateId: 'lc-intl-kiss-peach',
    templateIds: ['lc-intl-kiss-peach', 'lc-intl-kiss-crimson'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'From quiet morning hellos to breathless goodnights, every kiss with you still feels like the first spark.',
      },
      {
        tone: 'Cute',
        text: 'No long speech needed today—just come claim your midsummer kiss tonight!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Warm summer nights and endless affection.',
      },
    ],
  },
  {
    id: 'moon-day-jul-20',
    name: 'Moon Day',
    monthSlug: 'july',
    monthNumber: 7,
    dateRule: { kind: 'fixed', month: 7, day: 20 },
    shortDescription:
      'Dreamy indigo starlight, gleaming crescent moons, and celestial long-distance romance.',
    visualTheme: 'Moonlight, stars, dreamy celestial night skies',
    featured: false,
    motif: 'crescent-vow',
    accentColor: '#505B8F',
    accentTint: '#E6E9F5',
    templateId: 'lc-moon-day-celestial',
    templateIds: ['lc-moon-day-celestial', 'lc-moon-day-moonmail'],
    exploreCategorySlug: 'good-night',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Look up at the moon tonight—every mile between us shrinks under the same silver glow.',
      },
      {
        tone: 'Emotional',
        text: 'Love you to the moon and back, through every phase and every quiet midnight.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Under one starry sky, always yours.',
      },
    ],
  },

  // ==================== 8. AUGUST ====================
  {
    id: 'national-girlfriend-day-aug-1',
    name: 'National Girlfriend Day',
    monthSlug: 'august',
    monthNumber: 8,
    dateRule: { kind: 'fixed', month: 8, day: 1 },
    shortDescription:
      'Fresh blush tulips and sunlit meadow butterflies dedicated to celebrating your girlfriend.',
    visualTheme: 'Tulips, butterflies, warm affectionate stationery',
    featured: true,
    motif: 'tulip-meadow',
    accentColor: '#C86A80',
    accentTint: '#FCE8EE',
    templateId: 'lc-girlfriend-day-tulips',
    templateIds: ['lc-girlfriend-day-tulips', 'lc-girlfriend-day-butterflies'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Thank you for bringing warmth, laughter, and gentle beauty into every week. Happy Girlfriend Day!',
      },
      {
        tone: 'Cute',
        text: 'Official reminder: you still give me butterflies every single time you walk in!',
      },
      {
        tone: 'Emotional',
        text: 'You deserve every bouquet, thoughtful pause, and reminder of how deeply loved you are.',
      },
    ],
  },
  {
    id: 'national-couples-day-aug-18',
    name: 'National Couples Day',
    monthSlug: 'august',
    monthNumber: 8,
    dateRule: { kind: 'fixed', month: 8, day: 18 },
    shortDescription:
      'Gold portrait crests and sunset embrace cards honoring memories built as a team.',
    visualTheme: 'Matching hearts, couple emblems, shared summer memories',
    featured: false,
    motif: 'golden-bands',
    accentColor: '#B88D48',
    accentTint: '#F9EEDB',
    templateId: 'lc-national-couples-aug-bands',
    templateIds: ['lc-national-couples-aug-bands', 'lc-national-couples-aug-embrace'],
    exploreCategorySlug: 'anniversary',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Two hearts, one story—from inside jokes to big milestones, life feels best as us.',
      },
      {
        tone: 'Funny',
        text: 'Happy Couples Day to my favorite teammate at assembling furniture and deciding dinner!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Stronger, happier, and grateful for us.',
      },
    ],
  },

  // ==================== 9. SEPTEMBER ====================
  {
    id: 'wife-appreciation-day-sep',
    name: 'Wife Appreciation Day',
    monthSlug: 'september',
    monthNumber: 9,
    dateRule: {
      kind: 'nth-weekday',
      month: 9,
      weekday: 0,
      nth: 3,
      ruleLabel: 'Third Sunday of September',
    },
    shortDescription:
      'Heirloom peonies and velvet plum wedding rings celebrating an extraordinary wife (3rd Sunday of September).',
    visualTheme: 'Elegant peonies, wedding bands, gratitude & devotion',
    featured: true,
    motif: 'golden-bands',
    accentColor: '#7B2944',
    accentTint: '#F3E3E9',
    templateId: 'lc-wife-appreciation-peony',
    templateIds: ['lc-wife-appreciation-peony', 'lc-wife-appreciation-rings'],
    exploreCategorySlug: 'husband-wife',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'For the thousand thoughtful things you do seamlessly every week—and for making our home gentle—thank you, my love.',
      },
      {
        tone: 'Romantic',
        text: 'Marrying you was only chapter one; watching your grace every day since is my proudest joy.',
      },
      {
        tone: 'Elegant',
        text: 'Today celebrates your warmth, wisdom, and steady heart. So blessed to call you my wife.',
      },
    ],
  },
  {
    id: 'world-heart-day-sep-29',
    name: 'World Heart Day',
    monthSlug: 'september',
    monthNumber: 9,
    dateRule: { kind: 'fixed', month: 9, day: 29 },
    shortDescription:
      'Wellness pulse hearts and calming sage botanicals encouraging care, rest, and heartfelt gratitude.',
    visualTheme: 'Wellness heart pulse, soothing sage & ivory care',
    featured: false,
    motif: 'pressed-olive',
    accentColor: '#689378',
    accentTint: '#E1ECE4',
    templateId: 'lc-world-heart-day-pulse',
    templateIds: ['lc-world-heart-day-pulse', 'lc-world-heart-day-sage'],
    exploreCategorySlug: 'appreciation',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'Your heart pours so much steadiness into everyone around you—please rest, breathe, and care for yourself too.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Wishing your wonderful heart lasting health, calm, and joy.',
      },
      {
        tone: 'Elegant',
        text: 'A gentle reminder on World Heart Day of how deeply your presence and wellbeing matter.',
      },
    ],
  },

  // ==================== 10. OCTOBER ====================
  {
    id: 'national-boyfriend-day-oct-3',
    name: 'National Boyfriend Day',
    monthSlug: 'october',
    monthNumber: 10,
    dateRule: { kind: 'fixed', month: 10, day: 3 },
    shortDescription:
      'Tailored navy, brushed brass, and autumn linen monogram keepsakes celebrating him.',
    visualTheme: 'Tailored navy & brass, autumn linen, thoughtful gift',
    featured: true,
    motif: 'linen-monogram',
    accentColor: '#8E6234',
    accentTint: '#F4E8D8',
    templateId: 'lc-boyfriend-day-navy',
    templateIds: ['lc-boyfriend-day-navy', 'lc-boyfriend-day-espresso'],
    exploreCategorySlug: 'girlfriend-boyfriend',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Thank you for every steady hand, terrible joke that still cracks me up, and quiet moment you make effortless.',
      },
      {
        tone: 'Cute',
        text: 'Happy Boyfriend Day to the guy who somehow still makes my heart race!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Proud of you, grateful for you, and lucky you are mine.',
      },
    ],
  },
  {
    id: 'sweetest-day-oct',
    name: 'Sweetest Day',
    monthSlug: 'october',
    monthNumber: 10,
    dateRule: {
      kind: 'nth-weekday',
      month: 10,
      weekday: 6,
      nth: 3,
      ruleLabel: 'Third Saturday of October',
    },
    shortDescription:
      'Artisan chocolates, ribbons, and treat parcels honoring Sweetest Day gestures (3rd Saturday of October).',
    visualTheme: 'Sweets, chocolates, ribbon parcels & affectionate treats',
    featured: false,
    motif: 'warm-hearth',
    accentColor: '#7A4228',
    accentTint: '#F1DFCE',
    templateId: 'lc-sweetest-day-praline',
    templateIds: ['lc-sweetest-day-praline', 'lc-sweetest-day-parcel'],
    exploreCategorySlug: 'appreciation',
    messageSuggestions: [
      {
        tone: 'Cute',
        text: 'Sweetest Day celebrates people who brighten lives effortlessly—and nobody does it quite like you!',
      },
      {
        tone: 'Romantic',
        text: 'Sending warm sweets, a ribbon-tied note, and gratitude for every kindness you show.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'A sweet little note for the sweetest soul I know.',
      },
    ],
  },

  // ==================== 11. NOVEMBER ====================
  {
    id: 'singles-day-nov-11',
    name: "Singles' Day",
    monthSlug: 'november',
    monthNumber: 11,
    dateRule: { kind: 'fixed', month: 11, day: 11 },
    shortDescription:
      'Botanical self-love wreaths and midnight confetti toasts cheering independence and self-worth.',
    visualTheme: 'Self-love eucalyptus, confetti toast, confident celebration',
    featured: false,
    motif: 'pressed-olive',
    accentColor: '#689378',
    accentTint: '#E1ECE4',
    templateId: 'lc-singles-day-selflove',
    templateIds: ['lc-singles-day-selflove', 'lc-singles-day-confetti'],
    exploreCategorySlug: 'congratulations',
    messageSuggestions: [
      {
        tone: 'Funny',
        text: 'Happy 11.11! Treat yourself to the good pastries, guard your peace, and own the entire bed tonight!',
      },
      {
        tone: 'Elegant',
        text: 'Whole, radiant, and setting your own pace—cheers to becoming someone you love coming home to.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Celebrating self-love, freedom, and your brightest chapter.',
      },
    ],
  },
  {
    id: 'world-kindness-day-nov-13',
    name: 'World Kindness Day',
    monthSlug: 'november',
    monthNumber: 11,
    dateRule: { kind: 'fixed', month: 11, day: 13 },
    shortDescription:
      'Pressed wildflowers and pastel notes thanking people whose gentle kindness mends hard days.',
    visualTheme: 'Wildflower kindness notes, warm pastel stationery',
    featured: false,
    motif: 'tulip-meadow',
    accentColor: '#C86A80',
    accentTint: '#FCE8EE',
    templateId: 'lc-kindness-day-wildflowers',
    templateIds: ['lc-kindness-day-wildflowers', 'lc-kindness-day-letter'],
    exploreCategorySlug: 'thank-you',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'Thank you for every gentle word, held door, and thoughtful check-in. You leave people kinder just by knowing you.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Small kindnesses make the biggest difference—thank you for yours.',
      },
      {
        tone: 'Cute',
        text: 'Passing along a pocketful of sunshine and heartfelt thanks today!',
      },
    ],
  },
  {
    id: 'international-mens-day-nov-19',
    name: "International Men's Day",
    monthSlug: 'november',
    monthNumber: 11,
    dateRule: { kind: 'fixed', month: 11, day: 19 },
    shortDescription:
      'Tailored navy compass and walnut timepiece cards honoring integrity, warmth, and steady leadership.',
    visualTheme: 'Heritage compass, brushed brass watch, refined gratitude',
    featured: false,
    motif: 'linen-monogram',
    accentColor: '#4A5F8C',
    accentTint: '#E8EDF7',
    templateId: 'lc-mens-day-compass',
    templateIds: ['lc-mens-day-compass', 'lc-mens-day-watch'],
    exploreCategorySlug: 'appreciation',
    messageSuggestions: [
      {
        tone: 'Emotional',
        text: 'Thank you for leading with patience, showing up when life gets heavy, and caring fiercely for the people you love.',
      },
      {
        tone: 'Elegant',
        text: 'Saluting your steady character, quiet generosity, and integrity on International Men’s Day.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Deeply appreciated for all that you are and do.',
      },
    ],
  },

  // ==================== 12. DECEMBER ====================
  {
    id: 'christmas-eve-dec-24',
    name: 'Christmas Eve',
    monthSlug: 'december',
    monthNumber: 12,
    dateRule: { kind: 'fixed', month: 12, day: 24 },
    shortDescription:
      'Glowing evergreen trees, snowflakes, and candlelit stillness wrapped in romantic winter warmth.',
    visualTheme: 'Glowing pine trees, snowflakes, candlelit winter sky',
    featured: false,
    motif: 'starlight-bell',
    accentColor: '#2E6B4E',
    accentTint: '#E0ECE5',
    templateId: 'lc-christmas-eve-tree',
    templateIds: ['lc-christmas-eve-tree', 'lc-christmas-eve-lantern'],
    exploreCategorySlug: 'festivals',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'The tree is glowing, the street is hushed, and holding you close makes every winter tradition feel brand new.',
      },
      {
        tone: 'Emotional',
        text: 'May tonight wrap our home in soft candlelight, music, and peaceful gratitude.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Quiet magic and warm hearts on Christmas Eve.',
      },
    ],
  },
  {
    id: 'christmas-day-dec-25',
    name: 'Christmas Day',
    monthSlug: 'december',
    monthNumber: 12,
    dateRule: { kind: 'fixed', month: 12, day: 25 },
    shortDescription:
      'Holly wreaths, ruby crimson gift parcels, and festive evergreen warmth for December 25.',
    visualTheme: 'Holly wreaths, crimson gift boxes, snow & warmth',
    featured: true,
    motif: 'warm-hearth',
    accentColor: '#C92A4C',
    accentTint: '#FADBE3',
    templateId: 'lc-christmas-day-wreath',
    templateIds: ['lc-christmas-day-wreath', 'lc-christmas-day-gifts'],
    exploreCategorySlug: 'festivals',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'No gift wrapped beneath the tree ever compares to waking up grateful for your laughter and love.',
      },
      {
        tone: 'Cute',
        text: 'Wishing you cozy socks, second helpings of dessert, and all the holiday magic today!',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Merry Christmas filled with peace, warmth, and love.',
      },
    ],
  },
  {
    id: 'new-years-eve-dec-31',
    name: "New Year's Eve",
    monthSlug: 'december',
    monthNumber: 12,
    dateRule: { kind: 'fixed', month: 12, day: 31 },
    shortDescription:
      'Champagne toasts and midnight gold fireworks celebrating the final countdown together.',
    visualTheme: 'Midnight fireworks, champagne flutes, celebratory gold',
    featured: false,
    motif: 'starlight-bell',
    accentColor: '#9B7436',
    accentTint: '#FBF4E9',
    templateId: 'lc-nye-midnight-toast',
    templateIds: ['lc-nye-midnight-toast', 'lc-nye-golden-fireworks'],
    exploreCategorySlug: 'festivals',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'As the clock counts down the final seconds of this year, save the midnight kiss for me.',
      },
      {
        tone: 'Emotional',
        text: 'Closing out December 31 with a grateful heart—thank you for every memory we built this year.',
      },
      {
        tone: 'Cute',
        text: 'Ready to ring in midnight with champagne, confetti, and my favorite human!',
      },
    ],
  },
]

export const RELATIONSHIP_MILESTONES: LoveCalendarMilestone[] = [
  {
    id: 'milestone-first-sparks',
    name: 'First Date & Early Sparks',
    chapterLabel: 'Beginning Chapter',
    shortDescription:
      'Capture the warmth of your favorite early memories, inside jokes, and the moment everything shifted.',
    motif: 'champagne-horizon',
    accentColor: '#C96D59',
    accentTint: '#FCEAE1',
    templateId: 'sunset-horizon-note',
    exploreCategorySlug: 'girlfriend-boyfriend',
  },
  {
    id: 'milestone-anniversary',
    name: 'Anniversary Years',
    chapterLabel: 'Shared Years',
    shortDescription:
      'Mark one month, one year, or decades together with heirloom gold arches and keepsake devotion.',
    motif: 'rose-arch',
    accentColor: '#B5546D',
    accentTint: '#F8DDE4',
    templateId: 'rose-arch-anniversary',
    exploreCategorySlug: 'anniversary',
  },
  {
    id: 'milestone-moving-in',
    name: 'Shared Home & Everyday Rituals',
    chapterLabel: 'Together Under One Roof',
    shortDescription:
      'Celebrate slow Sunday mornings, spare keys, and building a calm life together in small ways.',
    motif: 'warm-hearth',
    accentColor: '#9B7436',
    accentTint: '#FBF4E9',
    templateId: 'espresso-morning-note',
    exploreCategorySlug: 'just-because',
  },
  {
    id: 'milestone-engagement',
    name: 'Proposal & Engagement',
    chapterLabel: 'The Yes Moment',
    shortDescription:
      'Timeless gold-foil keepsakes crafted to announce a promise or tuck a private note beside the ring.',
    motif: 'golden-bands',
    accentColor: '#B88D48',
    accentTint: '#F9EEDB',
    templateId: 'golden-rings-spouse',
    exploreCategorySlug: 'husband-wife',
  },
  {
    id: 'milestone-vows',
    name: 'Wedding & Vow Renewal',
    chapterLabel: 'Forever Vows',
    shortDescription:
      'Velvet plum and ivory letterpress tributes worthy of reading aloud on wedding mornings and renewals.',
    motif: 'velvet-lantern',
    accentColor: '#7B2944',
    accentTint: '#F3E3E9',
    templateId: 'anniversary-velvet-years',
    exploreCategorySlug: 'husband-wife',
  },
  {
    id: 'milestone-long-distance',
    name: 'Across the Miles & Reunions',
    chapterLabel: 'Worth Every Mile',
    shortDescription:
      'Bridge different time zones with starlit good-night wishes and countdown notes until your next embrace.',
    motif: 'crescent-vow',
    accentColor: '#7F63A8',
    accentTint: '#EDE7F8',
    templateId: 'moonlit-velvet-love',
    exploreCategorySlug: 'good-night',
  },
]

export function getLoveCalendarMonth(slug: string | undefined): LoveCalendarMonth | undefined {
  if (!slug) return undefined
  return LOVE_CALENDAR_MONTHS.find((month) => month.slug === slug.toLowerCase())
}

export function getLoveCalendarOccasionById(id: string | undefined): LoveCalendarOccasion | undefined {
  if (!id) return undefined
  return LOVE_CALENDAR_OCCASIONS.find((o) => o.id === id)
}

export function getAdjacentLoveMonths(slug: LoveCalendarMonthSlug): {
  prev: LoveCalendarMonth
  next: LoveCalendarMonth
} {
  const index = LOVE_CALENDAR_MONTHS.findIndex((month) => month.slug === slug)
  const safeIndex = index === -1 ? 0 : index
  const prev = LOVE_CALENDAR_MONTHS[(safeIndex + 11) % 12]
  const next = LOVE_CALENDAR_MONTHS[(safeIndex + 1) % 12]
  return { prev, next }
}

export function getOccasionsByMonth(
  monthSlug: LoveCalendarMonthSlug,
  year: number = new Date().getFullYear(),
): LoveCalendarOccasion[] {
  return LOVE_CALENDAR_OCCASIONS.filter((item) => item.monthSlug === monthSlug).sort((a, b) => {
    const dayA = resolveOccasionDate(a.dateRule, year).day
    const dayB = resolveOccasionDate(b.dateRule, year).day
    return dayA - dayB
  })
}

export function getFeaturedOccasions(): LoveCalendarOccasion[] {
  return LOVE_CALENDAR_OCCASIONS.filter((item) => item.featured)
}

const OCCASION_CATEGORY_MAP: Record<string, LoveCalendarOccasionCategory[]> = {
  'new-years-day-jan-1': ['romantic', 'cultural'],
  'national-hugging-day-jan-21': ['appreciation', 'romantic'],
  'st-dwynwens-day-jan-25': ['cultural', 'romantic'],
  'national-spouses-day-jan-26': ['appreciation', 'romantic'],
  'rose-day-feb-7': ['romantic'],
  'propose-day-feb-8': ['romantic'],
  'chocolate-day-feb-9': ['romantic', 'fun'],
  'teddy-day-feb-10': ['fun', 'romantic'],
  'promise-day-feb-11': ['romantic'],
  'hug-day-feb-12': ['romantic', 'appreciation'],
  'kiss-day-feb-13': ['romantic'],
  'valentines-day-feb-14': ['romantic', 'cultural'],
  'slap-day-feb-15': ['fun'],
  'kick-day-feb-16': ['fun'],
  'perfume-day-feb-17': ['romantic', 'fun'],
  'flirting-day-feb-18': ['fun', 'romantic'],
  'confession-day-feb-19': ['romantic'],
  'missing-day-feb-20': ['romantic'],
  'breakup-day-feb-21': ['appreciation'],
  'international-womens-day-mar-8': ['appreciation', 'cultural'],
  'white-day-mar-14': ['cultural', 'romantic'],
  'international-day-of-happiness-mar-20': ['fun', 'appreciation'],
  'national-proposal-day-mar-20': ['romantic'],
  'black-day-apr-14': ['cultural', 'fun'],
  'sant-jordi-apr-23': ['cultural', 'romantic'],
  'kiss-and-make-up-day-apr-25': ['romantic', 'appreciation'],
  'international-couples-day-may-5': ['romantic'],
  '520-day-may-20': ['cultural', 'romantic'],
  'dia-dos-namorados-jun-12': ['cultural', 'romantic'],
  'world-music-day-jun-21': ['fun', 'cultural'],
  'international-kissing-day-jul-6': ['romantic', 'fun'],
  'moon-day-jul-20': ['romantic'],
  'national-girlfriend-day-aug-1': ['romantic', 'appreciation'],
  'national-couples-day-aug-18': ['romantic'],
  'wife-appreciation-day-sep': ['appreciation', 'romantic'],
  'world-heart-day-sep-29': ['appreciation', 'cultural'],
  'national-boyfriend-day-oct-3': ['romantic', 'appreciation'],
  'sweetest-day-oct': ['appreciation', 'romantic', 'cultural'],
  'singles-day-nov-11': ['cultural', 'fun'],
  'world-kindness-day-nov-13': ['appreciation'],
  'international-mens-day-nov-19': ['appreciation', 'cultural'],
  'christmas-eve-dec-24': ['cultural', 'romantic'],
  'christmas-day-dec-25': ['cultural', 'appreciation'],
  'new-years-eve-dec-31': ['fun', 'romantic'],
}

export function getOccasionCalendarCategories(
  occasion: LoveCalendarOccasion,
): LoveCalendarOccasionCategory[] {
  return OCCASION_CATEGORY_MAP[occasion.id] ?? ['romantic']
}

export function getNextOccasionOccurrence(
  rule: LoveCalendarDateRule,
  referenceDate: Date = new Date(),
): {
  nextYear: number
  month: number
  day: number
  formattedDate: string
  ruleNote?: string
  daysRemaining: number
} {
  const thisYear = referenceDate.getFullYear()
  const todayUtc = Date.UTC(thisYear, referenceDate.getMonth(), referenceDate.getDate())
  const MS_PER_DAY = 86_400_000

  const thisYearResolved = resolveOccasionDate(rule, thisYear)
  const thisYearTargetUtc = Date.UTC(thisYear, thisYearResolved.month - 1, thisYearResolved.day)

  if (thisYearTargetUtc >= todayUtc) {
    return {
      nextYear: thisYear,
      month: thisYearResolved.month,
      day: thisYearResolved.day,
      formattedDate: `${thisYearResolved.formattedLabel}, ${thisYear}`,
      ruleNote: thisYearResolved.ruleNote,
      daysRemaining: Math.round((thisYearTargetUtc - todayUtc) / MS_PER_DAY),
    }
  }

  const nextYear = thisYear + 1
  const nextYearResolved = resolveOccasionDate(rule, nextYear)
  const nextYearTargetUtc = Date.UTC(nextYear, nextYearResolved.month - 1, nextYearResolved.day)

  return {
    nextYear,
    month: nextYearResolved.month,
    day: nextYearResolved.day,
    formattedDate: `${nextYearResolved.formattedLabel}, ${nextYear}`,
    ruleNote: nextYearResolved.ruleNote,
    daysRemaining: Math.max(0, Math.round((nextYearTargetUtc - todayUtc) / MS_PER_DAY)),
  }
}

export function getUpcomingOccasions(
  referenceDate: Date = new Date(),
  limit = 9,
): UpcomingOccurrenceItem[] {
  return LOVE_CALENDAR_OCCASIONS.map((occasion) => {
    const next = getNextOccasionOccurrence(occasion.dateRule, referenceDate)
    return {
      occasion,
      nextYear: next.nextYear,
      month: next.month,
      day: next.day,
      formattedDate: next.formattedDate,
      ruleNote: next.ruleNote,
      daysRemaining: next.daysRemaining,
    }
  })
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, limit)
}

export function searchLoveCalendar(
  query: string,
  year: number = new Date().getFullYear(),
): {
  months: LoveCalendarMonth[]
  occasions: LoveCalendarOccasion[]
  milestones: LoveCalendarMilestone[]
} {
  const q = query.trim().toLowerCase()
  if (!q) {
    return {
      months: LOVE_CALENDAR_MONTHS,
      occasions: LOVE_CALENDAR_OCCASIONS,
      milestones: RELATIONSHIP_MILESTONES,
    }
  }

  return {
    months: LOVE_CALENDAR_MONTHS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.collectionTitle.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.seasonLabel.toLowerCase().includes(q),
    ),
    occasions: LOVE_CALENDAR_OCCASIONS.filter((o) => {
      const resolved = resolveOccasionDate(o.dateRule, year)
      return (
        o.name.toLowerCase().includes(q) ||
        resolved.formattedLabel.toLowerCase().includes(q) ||
        (resolved.ruleNote?.toLowerCase().includes(q) ?? false) ||
        o.visualTheme.toLowerCase().includes(q) ||
        o.shortDescription.toLowerCase().includes(q) ||
        o.monthSlug.includes(q)
      )
    }),
    milestones: RELATIONSHIP_MILESTONES.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.chapterLabel.toLowerCase().includes(q) ||
        m.shortDescription.toLowerCase().includes(q),
    ),
  }
}
