import type {
  PersonalMilestoneComputation,
  PersonalMilestoneDefinition,
  PersonalMilestoneType,
  SavedPersonalMilestone,
} from '../types/loveCalendar'
import { sanitizeTextInput } from '../utils/cardStorage'

const PERSONAL_MILESTONES_STORAGE_KEY = 'cardelle_personal_milestones_v1'
const LEGACY_PERSONAL_MILESTONES_STORAGE_KEY = 'vellum_bloom_personal_milestones_v1'
const MS_PER_DAY = 86_400_000

const FULL_MONTH_NAMES = [
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

export const PERSONAL_MILESTONE_TYPES: PersonalMilestoneDefinition[] = [
  {
    id: 'first-meeting',
    name: 'First Meeting Anniversary',
    shortLabel: 'First Meeting',
    categoryKind: 'anniversary',
    shortDescription:
      'Celebrate the exact day your paths crossed and an ordinary hour quietly changed everything.',
    motif: 'crescent-vow',
    accentColor: '#7F63A8',
    accentTint: '#EDE7F8',
    templateId: 'lc-missing-day-moonmail',
    defaultHeadline: 'The Day We First Met',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Looking back, the moment our eyes first met was the luckiest pause in my entire life.',
      },
      {
        tone: 'Emotional',
        text: 'Neither of us knew on that first day how much home we would find in one another.',
      },
      {
        tone: 'Cute',
        text: 'Still replaying our very first hello and smiling like it happened yesterday.',
      },
    ],
  },
  {
    id: 'first-date',
    name: 'First Date Anniversary',
    shortLabel: 'First Date',
    categoryKind: 'anniversary',
    shortDescription:
      'Honor nervous laughter, lingering coffee or dinner conversations, and the spark that stayed.',
    motif: 'champagne-horizon',
    accentColor: '#C96D59',
    accentTint: '#FCEAE1',
    templateId: 'sunset-horizon-note',
    defaultHeadline: 'Still My Favorite Date',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'After all this time, going out with you still gives me the very same butterflies as our first date.',
      },
      {
        tone: 'Cute',
        text: 'I knew before dessert arrived that one date with you would never be enough.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'From our first table for two to forever—happy first date anniversary.',
      },
    ],
  },
  {
    id: 'first-kiss',
    name: 'First Kiss Anniversary',
    shortLabel: 'First Kiss',
    categoryKind: 'anniversary',
    shortDescription:
      'Remember the quiet heartbeat and unmistakable warmth of your very first kiss.',
    motif: 'rose-arch',
    accentColor: '#B5546D',
    accentTint: '#F8DDE4',
    templateId: 'lc-kiss-day-velvet',
    defaultHeadline: 'Since Our Very First Kiss',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'The whole world went wonderfully quiet the second we shared our first kiss.',
      },
      {
        tone: 'Emotional',
        text: 'Every kiss since then still carries the trace of that first unforgettable promise.',
      },
      {
        tone: 'Cute',
        text: 'Happy anniversary to the best first kiss—and every sweet encore since.',
      },
    ],
  },
  {
    id: 'relationship',
    name: 'Relationship Anniversary',
    shortLabel: 'Relationship Anniversary',
    categoryKind: 'anniversary',
    shortDescription:
      'Mark the official chapter you chose each other and began writing your shared story.',
    motif: 'wax-envelope',
    accentColor: '#8C314B',
    accentTint: '#F8DDE4',
    templateId: 'rose-arch-anniversary',
    defaultHeadline: 'Another Year of Us',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Choosing you remains my favorite decision—not only on our anniversary, but every ordinary morning.',
      },
      {
        tone: 'Emotional',
        text: 'Thank you for patience, laughter, and standing beside me through every season we have shared.',
      },
      {
        tone: 'Elegant',
        text: 'To the chapter we are writing together—may every year ahead grow even richer in grace and joy.',
      },
    ],
  },
  {
    id: 'monthsary',
    name: 'Monthly Anniversary (Monthsary)',
    shortLabel: 'Monthsary',
    categoryKind: 'monthsary',
    shortDescription:
      'Celebrate every new month together—because big love deserves small monthly keepsakes too.',
    motif: 'sunlit-locket',
    accentColor: '#C86A80',
    accentTint: '#FCE8EE',
    templateId: 'lc-confession-day-waxletter',
    defaultHeadline: 'Happy Monthsary, My Love',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Another month has flown by, and somehow I adore you even more than I did last month.',
      },
      {
        tone: 'Cute',
        text: 'Happy monthsary! Here is to thirty more days of shared snacks, bad jokes, and warm hugs.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Every month with you feels lighter, warmer, and closer to home.',
      },
    ],
  },
  {
    id: '50-days',
    name: '50 Days Together',
    shortLabel: '50 Days',
    categoryKind: 'day-count',
    targetDays: 50,
    shortDescription:
      'Fifty sunlit days of new memories, late-night calls, and discovering how naturally you fit.',
    motif: 'tulip-meadow',
    accentColor: '#D08B3E',
    accentTint: '#FBF4E9',
    templateId: 'lc-happiness-day-sunburst',
    defaultHeadline: '50 Bright Days Together',
    messageSuggestions: [
      {
        tone: 'Cute',
        text: 'Fifty days down and my phone is already full of my favorite memories with you.',
      },
      {
        tone: 'Romantic',
        text: 'In just fifty days, you have turned ordinary weekdays into something I look forward to.',
      },
      {
        tone: 'Short & Meaningful',
        text: '50 days together—and the very best chapters are still ahead of us.',
      },
    ],
  },
  {
    id: '100-days',
    name: '100 Days Together',
    shortLabel: '100 Days',
    categoryKind: 'day-count',
    targetDays: 100,
    shortDescription:
      'A beloved romantic tradition marking your first hundred days side by side.',
    motif: 'velvet-lantern',
    accentColor: '#B5546D',
    accentTint: '#F8DDE4',
    templateId: 'lc-520-day-lantern',
    defaultHeadline: '100 Days Side by Side',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'One hundred days together, and you have already become my favorite place to rest my heart.',
      },
      {
        tone: 'Emotional',
        text: 'It is amazing how a hundred days can feel both like a blink and like I have known you forever.',
      },
      {
        tone: 'Cute',
        text: 'Happy 100 Days! Thank you for making every single one of these hundred days brighter.',
      },
    ],
  },
  {
    id: '6-months',
    name: '6 Months Together',
    shortLabel: '6 Months',
    categoryKind: 'half-year',
    targetMonths: 6,
    shortDescription:
      'Half a year of shared seasons, inside jokes, and growing steadily closer.',
    motif: 'pressed-olive',
    accentColor: '#5B7C67',
    accentTint: '#E9F2EC',
    templateId: 'lc-national-couples-aug-embrace',
    defaultHeadline: 'Six Wonderful Months',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Half a year with you has been the sweetest chapter I have ever stepped into.',
      },
      {
        tone: 'Emotional',
        text: 'Six months of learning each other’s rhythms, quirks, and quiet comfort—and I cherish every bit of it.',
      },
      {
        tone: 'Short & Meaningful',
        text: 'Happy 6-month anniversary to the person who makes half a year feel effortless.',
      },
    ],
  },
  {
    id: '1-year',
    name: '1 Year Together',
    shortLabel: '1 Year',
    categoryKind: 'one-year',
    targetMonths: 12,
    shortDescription:
      'All four seasons walked together—your very first full orbit around the sun as a couple.',
    motif: 'rose-arch',
    accentColor: '#8C314B',
    accentTint: '#F8DDE4',
    templateId: 'lc-rose-day-crimson',
    defaultHeadline: 'Our First Full Year',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Three hundred and sixty-five days of choosing each other—and I would happily begin year one all over again.',
      },
      {
        tone: 'Emotional',
        text: 'Through every high, quiet evening, and season change this past year, having you beside me meant everything.',
      },
      {
        tone: 'Elegant',
        text: 'Happy 1st Anniversary—may this first year be only the preface to a long, luminous story.',
      },
    ],
  },
  {
    id: '500-days',
    name: '500 Days Together',
    shortLabel: '500 Days',
    categoryKind: 'day-count',
    targetDays: 500,
    shortDescription:
      'Five hundred days of quiet loyalty, shared mornings, and love that keeps deepening.',
    motif: 'starlight-bell',
    accentColor: '#9B7436',
    accentTint: '#FBF4E9',
    templateId: 'lc-intl-couples-may-bands',
    defaultHeadline: '500 Days of Togetherness',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Today marks 500 days of togetherness—and every single day has taught me a kinder way to love.',
      },
      {
        tone: 'Emotional',
        text: 'Five hundred sunrises shared in thought or side by side. Thank you for being my steady anchor.',
      },
      {
        tone: 'Cute',
        text: '500 days together and still not even slightly tired of hearing about your day!',
      },
    ],
  },
  {
    id: '1000-days',
    name: '1000 Days Together',
    shortLabel: '1000 Days',
    categoryKind: 'day-count',
    targetDays: 1000,
    shortDescription:
      'A rare, shimmering thousand-day landmark honoring devotion built one day at a time.',
    motif: 'linen-monogram',
    accentColor: '#472C42',
    accentTint: '#F3E3E9',
    templateId: 'lc-spouses-day-hearth',
    defaultHeadline: 'A Thousand Days With You',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'One thousand days of memories woven together—each one proof that real love grows richer with time.',
      },
      {
        tone: 'Elegant',
        text: 'A thousand days, countless small kindnesses, and a bond I treasure more deeply than words can hold.',
      },
      {
        tone: 'Short & Meaningful',
        text: '1,000 days of us—grateful for every mile behind us and every tomorrow ahead.',
      },
    ],
  },
  {
    id: 'engagement',
    name: 'Engagement Anniversary',
    shortLabel: 'Engagement',
    categoryKind: 'anniversary',
    shortDescription:
      'Revisit the heartbeat of your “Yes” moment and the promise that shaped your future.',
    motif: 'golden-bands',
    accentColor: '#B88D48',
    accentTint: '#F9EEDB',
    templateId: 'lc-proposal-day-us-diamond',
    defaultHeadline: 'To the Day We Said Yes',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'I would say yes to you in every lifetime, on every quiet morning, and in every crowded room.',
      },
      {
        tone: 'Emotional',
        text: 'Remembering the exact breath we promised forever still brings tears of gratitude to my eyes.',
      },
      {
        tone: 'Elegant',
        text: 'Happy Engagement Anniversary—here is to the vow we made and the life we continue to build.',
      },
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding Anniversary',
    shortLabel: 'Wedding Anniversary',
    categoryKind: 'anniversary',
    shortDescription:
      'Heirloom gold and letterpress devotion celebrating the vows you spoke and live every day.',
    motif: 'warm-hearth',
    accentColor: '#7B2944',
    accentTint: '#F3E3E9',
    templateId: 'anniversary-velvet-years',
    defaultHeadline: 'Happy Wedding Anniversary',
    messageSuggestions: [
      {
        tone: 'Romantic',
        text: 'Every year since our wedding day, you remain my favorite partner, confidant, and home.',
      },
      {
        tone: 'Emotional',
        text: 'Our wedding vows were just the opening lines—thank you for writing the real beauty with me every day since.',
      },
      {
        tone: 'Elegant',
        text: 'To the life we have built and the grace of growing side by side—Happy Wedding Anniversary.',
      },
    ],
  },
]

export function getPersonalMilestoneDefinition(
  type: PersonalMilestoneType | string | null | undefined,
): PersonalMilestoneDefinition {
  return (
    PERSONAL_MILESTONE_TYPES.find((item) => item.id === type) ??
    PERSONAL_MILESTONE_TYPES[3] // relationship anniversary fallback
  )
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function daysInMonth(year: number, month1Based: number): number {
  return new Date(Date.UTC(year, month1Based, 0)).getUTCDate()
}

export function parseIsoDateParts(
  isoDate: string,
): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  if (month < 1 || month > 12) return null
  const maxDay = daysInMonth(year, month)
  if (day < 1 || day > maxDay) return null
  return { year, month, day }
}

export function formatUtcDateLabel(utcMs: number): string {
  const d = new Date(utcMs)
  const monthName = FULL_MONTH_NAMES[d.getUTCMonth()] ?? 'January'
  return `${monthName} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export function utcMsToIsoDate(utcMs: number): string {
  const d = new Date(utcMs)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDaysUtc(year: number, month: number, day: number, daysToAdd: number): number {
  return Date.UTC(year, month - 1, day) + daysToAdd * MS_PER_DAY
}

export function addMonthsClampedUtc(
  year: number,
  month: number,
  day: number,
  monthsToAdd: number,
): { utcMs: number; year: number; month: number; day: number } {
  const zeroBasedMonth = month - 1 + monthsToAdd
  const targetYear = year + Math.floor(zeroBasedMonth / 12)
  const targetMonth = ((zeroBasedMonth % 12) + 12) % 12 + 1
  const clampedDay = Math.min(day, daysInMonth(targetYear, targetMonth))
  return {
    utcMs: Date.UTC(targetYear, targetMonth - 1, clampedDay),
    year: targetYear,
    month: targetMonth,
    day: clampedDay,
  }
}

export function resolveAnnualDateSafe(
  origMonth: number,
  origDay: number,
  targetYear: number,
): { utcMs: number; month: number; day: number; leapAdjusted: boolean } {
  if (origMonth === 2 && origDay === 29 && !isLeapYear(targetYear)) {
    return {
      utcMs: Date.UTC(targetYear, 1, 28),
      month: 2,
      day: 28,
      leapAdjusted: true,
    }
  }
  const safeDay = Math.min(origDay, daysInMonth(targetYear, origMonth))
  return {
    utcMs: Date.UTC(targetYear, origMonth - 1, safeDay),
    month: origMonth,
    day: safeDay,
    leapAdjusted: false,
  }
}

function getOrdinal(n: number): string {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

const DAY_MILESTONE_LADDER = [50, 100, 200, 365, 500, 750, 1000, 1500, 2000, 2500, 3000, 3650, 5000]

export function calculatePersonalMilestoneStats(
  milestone: SavedPersonalMilestone,
  referenceDate: Date = new Date(),
): PersonalMilestoneComputation {
  const def = getPersonalMilestoneDefinition(milestone.type)
  const parts = parseIsoDateParts(milestone.date)
  const todayUtc = Date.UTC(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  )

  if (!parts) {
    return {
      daysTogether: 0,
      isFutureStart: false,
      isTodayStart: true,
      nextEventTitle: def.name,
      nextEventDate: utcMsToIsoDate(todayUtc),
      nextEventFormatted: formatUtcDateLabel(todayUtc),
      daysRemaining: 0,
      isTodayMilestone: true,
      statusHeadline: 'Choose a valid milestone date to calculate your countdown.',
    }
  }

  const startUtc = Date.UTC(parts.year, parts.month - 1, parts.day)
  const rawDiff = Math.round((todayUtc - startUtc) / MS_PER_DAY)
  const isFutureStart = rawDiff < 0
  const isTodayStart = rawDiff === 0
  const daysTogether = Math.max(0, rawDiff)

  // Always compute next monthsary & next day milestone from start date for helpful insights
  const rawMonthsElapsed = Math.max(
    0,
    (referenceDate.getFullYear() - parts.year) * 12 + (referenceDate.getMonth() + 1 - parts.month),
  )
  let nextMonthOffset = isFutureStart ? 1 : rawMonthsElapsed
  let monthsaryCandidate = addMonthsClampedUtc(parts.year, parts.month, parts.day, nextMonthOffset)
  if (monthsaryCandidate.utcMs < todayUtc || nextMonthOffset === 0) {
    nextMonthOffset = Math.max(1, nextMonthOffset + 1)
    monthsaryCandidate = addMonthsClampedUtc(parts.year, parts.month, parts.day, nextMonthOffset)
  }
  const nextMonthsaryDaysRemaining = Math.max(
    0,
    Math.round((monthsaryCandidate.utcMs - todayUtc) / MS_PER_DAY),
  )
  const nextMonthsaryFormatted = formatUtcDateLabel(monthsaryCandidate.utcMs)

  // Next day milestone in ladder
  const nextDayTarget = DAY_MILESTONE_LADDER.find((d) => d >= daysTogether) ?? daysTogether + 100
  const nextDayTargetUtc = addDaysUtc(parts.year, parts.month, parts.day, nextDayTarget)
  const nextDayMilestoneRemaining = Math.max(0, Math.round((nextDayTargetUtc - todayUtc) / MS_PER_DAY))
  const nextDayMilestoneFormatted = formatUtcDateLabel(nextDayTargetUtc)
  const nextDayMilestoneLabel = `${nextDayTarget.toLocaleString()} Days Together`

  // Exact target date for fixed day-count types (50, 100, 500, 1000 days)
  if (def.categoryKind === 'day-count' && def.targetDays) {
    const targetUtc = addDaysUtc(parts.year, parts.month, parts.day, def.targetDays)
    const remaining = Math.round((targetUtc - todayUtc) / MS_PER_DAY)

    if (remaining === 0) {
      return {
        daysTogether,
        isFutureStart,
        isTodayStart,
        nextEventTitle: def.name,
        nextEventDate: utcMsToIsoDate(targetUtc),
        nextEventFormatted: formatUtcDateLabel(targetUtc),
        daysRemaining: 0,
        isTodayMilestone: true,
        statusHeadline: `Today marks ${def.targetDays.toLocaleString()} days of togetherness.`,
        secondaryNote: `Celebrated from ${formatUtcDateLabel(startUtc)}.`,
        nextMonthsaryFormatted,
        nextMonthsaryDaysRemaining,
        nextDayMilestoneLabel,
        nextDayMilestoneFormatted,
        nextDayMilestoneRemaining,
      }
    }

    if (remaining > 0) {
      return {
        daysTogether,
        isFutureStart,
        isTodayStart,
        nextEventTitle: def.name,
        nextEventDate: utcMsToIsoDate(targetUtc),
        nextEventFormatted: formatUtcDateLabel(targetUtc),
        daysRemaining: remaining,
        isTodayMilestone: false,
        statusHeadline: isFutureStart
          ? `Starts in ${Math.abs(rawDiff)} ${Math.abs(rawDiff) === 1 ? 'day' : 'days'} · ${def.name} arrives ${formatUtcDateLabel(targetUtc)}.`
          : `You've been together for ${daysTogether.toLocaleString()} ${daysTogether === 1 ? 'day' : 'days'}.`,
        secondaryNote: `${remaining} ${remaining === 1 ? 'day' : 'days'} until ${def.name} (${formatUtcDateLabel(targetUtc)}).`,
        nextMonthsaryFormatted,
        nextMonthsaryDaysRemaining,
        nextDayMilestoneLabel,
        nextDayMilestoneFormatted,
        nextDayMilestoneRemaining,
      }
    }

    // Target day count has already passed -> surface next day milestone or next annual anniversary cleanly
    return {
      daysTogether,
      isFutureStart,
      isTodayStart,
      nextEventTitle: nextDayMilestoneLabel,
      nextEventDate: utcMsToIsoDate(nextDayTargetUtc),
      nextEventFormatted: nextDayMilestoneFormatted,
      daysRemaining: nextDayMilestoneRemaining,
      isTodayMilestone: nextDayMilestoneRemaining === 0,
      statusHeadline: `You've been together for ${daysTogether.toLocaleString()} days.`,
      secondaryNote: `${def.name} passed on ${formatUtcDateLabel(targetUtc)} · Next milestone: ${nextDayMilestoneLabel} on ${nextDayMilestoneFormatted}.`,
      nextMonthsaryFormatted,
      nextMonthsaryDaysRemaining,
      nextDayMilestoneLabel,
      nextDayMilestoneFormatted,
      nextDayMilestoneRemaining,
    }
  }

  // Monthly Anniversary (Monthsary)
  if (def.categoryKind === 'monthsary') {
    const monthsCompleted = Math.max(0, nextMonthOffset - (nextMonthsaryDaysRemaining > 0 ? 1 : 0))
    const isTodayMonthsary = nextMonthsaryDaysRemaining === 0 && !isFutureStart
    return {
      daysTogether,
      isFutureStart,
      isTodayStart,
      monthsCompleted,
      nextEventTitle: `${getOrdinal(nextMonthOffset)} Monthsary`,
      nextEventDate: utcMsToIsoDate(monthsaryCandidate.utcMs),
      nextEventFormatted: nextMonthsaryFormatted,
      daysRemaining: nextMonthsaryDaysRemaining,
      isTodayMilestone: isTodayMonthsary,
      statusHeadline: isTodayMonthsary
        ? `Today marks your ${getOrdinal(nextMonthOffset)} Monthsary (${daysTogether.toLocaleString()} days together).`
        : isFutureStart
          ? `Starts in ${Math.abs(rawDiff)} days.`
          : `You've been together for ${daysTogether.toLocaleString()} ${daysTogether === 1 ? 'day' : 'days'}.`,
      secondaryNote: isTodayMonthsary
        ? 'Celebrate another month side by side.'
        : `Next monthly anniversary (${getOrdinal(nextMonthOffset)}): ${nextMonthsaryFormatted}.`,
      nextMonthsaryFormatted,
      nextMonthsaryDaysRemaining,
      nextDayMilestoneLabel,
      nextDayMilestoneFormatted,
      nextDayMilestoneRemaining,
    }
  }

  // 6 Months Together
  if (def.categoryKind === 'half-year') {
    const halfYearCandidate = addMonthsClampedUtc(parts.year, parts.month, parts.day, 6)
    const remaining = Math.round((halfYearCandidate.utcMs - todayUtc) / MS_PER_DAY)

    if (remaining >= 0) {
      return {
        daysTogether,
        isFutureStart,
        isTodayStart,
        nextEventTitle: '6 Months Together',
        nextEventDate: utcMsToIsoDate(halfYearCandidate.utcMs),
        nextEventFormatted: formatUtcDateLabel(halfYearCandidate.utcMs),
        daysRemaining: remaining,
        isTodayMilestone: remaining === 0,
        statusHeadline:
          remaining === 0
            ? `Today marks 6 Months Together (${daysTogether.toLocaleString()} days)!`
            : isFutureStart
              ? `Starts in ${Math.abs(rawDiff)} days.`
              : `You've been together for ${daysTogether.toLocaleString()} ${daysTogether === 1 ? 'day' : 'days'}.`,
        secondaryNote:
          remaining === 0
            ? 'Half a year of shared memories.'
            : `6 Months Together arrives in ${remaining} ${remaining === 1 ? 'day' : 'days'} (${formatUtcDateLabel(halfYearCandidate.utcMs)}).`,
        nextMonthsaryFormatted,
        nextMonthsaryDaysRemaining,
        nextDayMilestoneLabel,
        nextDayMilestoneFormatted,
        nextDayMilestoneRemaining,
      }
    }
  }

  // Annual anniversaries (First Meeting, First Date, First Kiss, Relationship, 1 Year, Engagement, Wedding)
  let nextYear = Math.max(parts.year + 1, referenceDate.getFullYear())
  let candidate = resolveAnnualDateSafe(parts.month, parts.day, nextYear)
  if (candidate.utcMs < todayUtc) {
    nextYear += 1
    candidate = resolveAnnualDateSafe(parts.month, parts.day, nextYear)
  }
  const anniversaryNumber = Math.max(1, nextYear - parts.year)
  const remaining = Math.max(0, Math.round((candidate.utcMs - todayUtc) / MS_PER_DAY))
  const isTodayAnniv = remaining === 0
  const leapYearNote = candidate.leapAdjusted
    ? `Feb 29 milestone observed on Feb 28 in ${nextYear}`
    : undefined

  let statusHeadline = `You've been together for ${daysTogether.toLocaleString()} ${daysTogether === 1 ? 'day' : 'days'}.`
  if (isFutureStart) {
    statusHeadline = `Countdown starts in ${Math.abs(rawDiff)} ${Math.abs(rawDiff) === 1 ? 'day' : 'days'}.`
  } else if (isTodayAnniv) {
    statusHeadline = `Today is your ${getOrdinal(anniversaryNumber)} ${def.shortLabel}!`
  } else if (anniversaryNumber === 1 && remaining <= 45) {
    statusHeadline = `Your first anniversary is coming soon (${remaining} ${remaining === 1 ? 'day' : 'days'} away).`
  } else if (DAY_MILESTONE_LADDER.includes(daysTogether)) {
    statusHeadline = `Today marks ${daysTogether.toLocaleString()} days of togetherness.`
  }

  return {
    daysTogether,
    isFutureStart,
    isTodayStart,
    yearsCompleted: Math.max(0, anniversaryNumber - (remaining === 0 ? 0 : 1)),
    nextEventTitle: `${getOrdinal(anniversaryNumber)} ${def.shortLabel}`,
    nextEventDate: utcMsToIsoDate(candidate.utcMs),
    nextEventFormatted: formatUtcDateLabel(candidate.utcMs),
    daysRemaining: remaining,
    isTodayMilestone: isTodayAnniv,
    statusHeadline,
    secondaryNote: isTodayAnniv
      ? `${daysTogether.toLocaleString()} days celebrated together.`
      : `${getOrdinal(anniversaryNumber)} milestone on ${formatUtcDateLabel(candidate.utcMs)}.`,
    nextMonthsaryFormatted,
    nextMonthsaryDaysRemaining,
    nextDayMilestoneLabel,
    nextDayMilestoneFormatted,
    nextDayMilestoneRemaining,
    leapYearNote,
  }
}

export function buildMilestoneStudioUrl(
  def: PersonalMilestoneDefinition,
  saved?: SavedPersonalMilestone,
  stats?: PersonalMilestoneComputation,
): string {
  const params = new URLSearchParams()
  params.set('milestone', def.id)
  if (saved?.partnerName?.trim()) params.set('replyTo', saved.partnerName.trim())
  if (saved?.senderName?.trim()) params.set('from', saved.senderName.trim())

  if (saved && stats) {
    const headline =
      stats.isTodayMilestone && stats.nextEventTitle
        ? stats.nextEventTitle
        : def.defaultHeadline
    params.set('headline', headline)

    const baseSuggestion = def.messageSuggestions[0]?.text ?? ''
    const customLine =
      stats.daysTogether > 0
        ? `${stats.statusHeadline} ${baseSuggestion}`.trim()
        : baseSuggestion
    if (customLine) params.set('msg', customLine.slice(0, 400))
  }

  return `/create/${def.templateId}?${params.toString()}`
}

const VALID_MILESTONE_TYPE_SET = new Set<string>(PERSONAL_MILESTONE_TYPES.map((t) => t.id))

export function loadPersonalMilestones(): SavedPersonalMilestone[] {
  try {
    const raw =
      localStorage.getItem(PERSONAL_MILESTONES_STORAGE_KEY) ??
      localStorage.getItem(LEGACY_PERSONAL_MILESTONES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (item): item is SavedPersonalMilestone =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.type === 'string' &&
          VALID_MILESTONE_TYPE_SET.has(item.type) &&
          typeof item.date === 'string' &&
          Boolean(parseIsoDateParts(item.date)),
      )
      .slice(0, 40)
  } catch {
    return []
  }
}

export function savePersonalMilestone(
  input: Omit<SavedPersonalMilestone, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
): SavedPersonalMilestone[] {
  const nowIso = new Date().toISOString()
  const existing = loadPersonalMilestones()
  const cleanPartner = sanitizeTextInput(input.partnerName ?? '', 40).trim()
  const cleanSender = sanitizeTextInput(input.senderName ?? '', 40).trim()
  const cleanNote = sanitizeTextInput(input.note ?? '', 120).trim()

  const existingMatch = input.id ? existing.find((m) => m.id === input.id) : undefined
  const record: SavedPersonalMilestone = {
    id: existingMatch?.id ?? `pm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: VALID_MILESTONE_TYPE_SET.has(input.type) ? input.type : 'relationship',
    date: input.date,
    partnerName: cleanPartner || undefined,
    senderName: cleanSender || undefined,
    note: cleanNote || undefined,
    createdAt: existingMatch?.createdAt ?? nowIso,
    updatedAt: nowIso,
  }

  const next = [record, ...existing.filter((m) => m.id !== record.id)].slice(0, 40)
  try {
    localStorage.setItem(PERSONAL_MILESTONES_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage quota errors
  }
  return next
}

export function deletePersonalMilestone(id: string): SavedPersonalMilestone[] {
  const next = loadPersonalMilestones().filter((m) => m.id !== id)
  try {
    localStorage.setItem(PERSONAL_MILESTONES_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors
  }
  return next
}
