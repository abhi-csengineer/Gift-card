import type { CategorySlug } from './card'

export type LoveCalendarMonthSlug =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'

export type LoveCalendarArtMotif =
  | 'crescent-vow'
  | 'wax-envelope'
  | 'rose-arch'
  | 'tulip-meadow'
  | 'champagne-horizon'
  | 'sunlit-locket'
  | 'velvet-lantern'
  | 'pressed-olive'
  | 'golden-bands'
  | 'linen-monogram'
  | 'warm-hearth'
  | 'starlight-bell'

export type LoveCalendarMessageTone =
  | 'Romantic'
  | 'Cute'
  | 'Emotional'
  | 'Funny'
  | 'Elegant'
  | 'Short & Meaningful'

export interface LoveCalendarMessageSuggestion {
  tone: LoveCalendarMessageTone
  text: string
}

export type LoveCalendarDateRule =
  | {
      kind: 'fixed'
      month: number
      day: number
    }
  | {
      kind: 'nth-weekday'
      month: number
      /** 0 = Sunday, 1 = Monday, ..., 6 = Saturday */
      weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6
      nth: number
      ruleLabel: string
    }

export interface LoveCalendarMonth {
  slug: LoveCalendarMonthSlug
  monthNumber: number
  name: string
  shortName: string
  collectionTitle: string
  seasonLabel: string
  description: string
  poeticLine: string
  accentColor: string
  softTintLight: string
  softTintDark: string
  motif: LoveCalendarArtMotif
  featuredTemplateIds: string[]
  exploreCategorySlug: CategorySlug
}

export interface LoveCalendarOccasion {
  id: string
  name: string
  monthSlug: LoveCalendarMonthSlug
  monthNumber: number
  dateRule: LoveCalendarDateRule
  shortDescription: string
  visualTheme: string
  featured: boolean
  motif: LoveCalendarArtMotif
  accentColor: string
  accentTint: string
  templateId: string
  templateIds: [string, string]
  exploreCategorySlug?: CategorySlug
  messageSuggestions: LoveCalendarMessageSuggestion[]
}

export interface LoveCalendarMilestone {
  id: string
  name: string
  chapterLabel: string
  shortDescription: string
  motif: LoveCalendarArtMotif
  accentColor: string
  accentTint: string
  templateId: string
  exploreCategorySlug?: CategorySlug
}

export type LoveCalendarOccasionCategory =
  | 'romantic'
  | 'appreciation'
  | 'fun'
  | 'cultural'

export type LoveCalendarDiscoveryFilter =
  | 'all'
  | LoveCalendarOccasionCategory
  | 'personal-milestone'

export interface UpcomingOccurrenceItem {
  occasion: LoveCalendarOccasion
  nextYear: number
  month: number
  day: number
  formattedDate: string
  ruleNote?: string
  daysRemaining: number
}

export type PersonalMilestoneType =
  | 'first-meeting'
  | 'first-date'
  | 'first-kiss'
  | 'relationship'
  | 'monthsary'
  | '50-days'
  | '100-days'
  | '6-months'
  | '1-year'
  | '500-days'
  | '1000-days'
  | 'engagement'
  | 'wedding'

export interface PersonalMilestoneDefinition {
  id: PersonalMilestoneType
  name: string
  shortLabel: string
  categoryKind: 'anniversary' | 'monthsary' | 'day-count' | 'half-year' | 'one-year'
  targetDays?: number
  targetMonths?: number
  shortDescription: string
  motif: LoveCalendarArtMotif
  accentColor: string
  accentTint: string
  templateId: string
  defaultHeadline: string
  messageSuggestions: LoveCalendarMessageSuggestion[]
}

export interface SavedPersonalMilestone {
  id: string
  type: PersonalMilestoneType
  date: string // YYYY-MM-DD
  partnerName?: string
  senderName?: string
  note?: string
  createdAt: string
  updatedAt: string
}

export interface PersonalMilestoneComputation {
  daysTogether: number
  isFutureStart: boolean
  isTodayStart: boolean
  nextEventTitle: string
  nextEventDate: string // YYYY-MM-DD
  nextEventFormatted: string
  daysRemaining: number
  isTodayMilestone: boolean
  statusHeadline: string
  secondaryNote?: string
  nextMonthsaryFormatted?: string
  nextMonthsaryDaysRemaining?: number
  nextDayMilestoneLabel?: string
  nextDayMilestoneFormatted?: string
  nextDayMilestoneRemaining?: number
  leapYearNote?: string
  yearsCompleted?: number
  monthsCompleted?: number
}

