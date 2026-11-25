import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarHeart,
  Check,
  Edit3,
  Heart,
  Lock,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react'
import {
  PERSONAL_MILESTONE_TYPES,
  buildMilestoneStudioUrl,
  calculatePersonalMilestoneStats,
  getPersonalMilestoneDefinition,
  parseIsoDateParts,
} from '../../data/personalMilestones'
import type {
  PersonalMilestoneType,
  SavedPersonalMilestone,
} from '../../types/loveCalendar'
import { LoveCalendarArtwork } from './LoveCalendarArtwork'

interface OurLittleForeverSectionProps {
  referenceDate: Date
  savedMilestones: SavedPersonalMilestone[]
  onSaveMilestone: (input: {
    id?: string
    type: PersonalMilestoneType
    date: string
    partnerName?: string
    senderName?: string
    note?: string
  }) => void
  onDeleteMilestone: (id: string) => void
  searchQuery?: string
}

export function OurLittleForeverSection({
  referenceDate,
  savedMilestones,
  onSaveMilestone,
  onDeleteMilestone,
  searchQuery = '',
}: OurLittleForeverSectionProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<PersonalMilestoneType>('relationship')
  const [dateInput, setDateInput] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [note, setNote] = useState('')
  const [formError, setFormError] = useState('')
  const [savedNotice, setSavedNotice] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return PERSONAL_MILESTONE_TYPES
    return PERSONAL_MILESTONE_TYPES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.shortLabel.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q),
    )
  }, [searchQuery])

  const computedSaved = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return savedMilestones
      .map((saved) => ({
        saved,
        def: getPersonalMilestoneDefinition(saved.type),
        stats: calculatePersonalMilestoneStats(saved, referenceDate),
      }))
      .filter(({ saved, def, stats }) => {
        if (!q) return true
        return (
          def.name.toLowerCase().includes(q) ||
          stats.nextEventTitle.toLowerCase().includes(q) ||
          (saved.partnerName?.toLowerCase().includes(q) ?? false) ||
          (saved.note?.toLowerCase().includes(q) ?? false)
        )
      })
      .sort((a, b) => a.stats.daysRemaining - b.stats.daysRemaining)
  }, [referenceDate, savedMilestones, searchQuery])

  const resetForm = () => {
    setEditingId(null)
    setSelectedType('relationship')
    setDateInput('')
    setPartnerName('')
    setSenderName('')
    setNote('')
    setFormError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setSavedNotice('')

    if (!dateInput || !parseIsoDateParts(dateInput)) {
      setFormError('Please select a valid milestone date.')
      return
    }

    onSaveMilestone({
      id: editingId ?? undefined,
      type: selectedType,
      date: dateInput,
      partnerName,
      senderName,
      note,
    })

    const label = getPersonalMilestoneDefinition(selectedType).name
    setSavedNotice(editingId ? `Updated ${label}.` : `Saved ${label} to this browser.`)
    resetForm()
  }

  const startEdit = (saved: SavedPersonalMilestone) => {
    setEditingId(saved.id)
    setSelectedType(saved.type)
    setDateInput(saved.date)
    setPartnerName(saved.partnerName ?? '')
    setSenderName(saved.senderName ?? '')
    setNote(saved.note ?? '')
    setFormError('')
    setSavedNotice('')
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const preselectMilestoneType = (type: PersonalMilestoneType) => {
    setEditingId(null)
    setSelectedType(type)
    setFormError('')
    setSavedNotice('')
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section
      id="our-little-forever"
      aria-labelledby="heading-our-little-forever"
      className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8"
    >
      <div
        className="rounded-[2.25rem] border p-6 sm:p-10 lg:p-12"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Header */}
        <div className="border-b pb-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <p
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: 'var(--accent-rose)' }}
          >
            <CalendarHeart className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Personal Relationship Milestones</span>
          </p>
          <h2
            id="heading-our-little-forever"
            className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            OUR LITTLE FOREVER
          </h2>
          <p
            className="mt-2 font-display text-xl sm:text-2xl italic"
            style={{ color: 'var(--accent-rose)' }}
          >
            “Some dates aren’t on the calendar. They’re written in your heart.”
          </p>
          <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Track your First Meeting, First Date Anniversary, First Kiss Anniversary, monthly monthsaries, Relationship and Wedding Anniversaries, and 50, 100, 500, or 1,000 Days Together—stored privately in your browser and ready to turn into custom keepsake cards.
          </p>
        </div>

        {/* Personal Date Creator + Saved Milestones Tracker */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Personal Date Creator Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-5 rounded-3xl border p-5 sm:p-6 space-y-4"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {editingId ? 'Edit Personal Date' : 'Personal Date Creator'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-semibold underline cursor-pointer"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  Cancel edit
                </button>
              )}
            </div>

            <div>
              <label
                htmlFor="milestone-type-select"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Milestone Type
              </label>
              <select
                id="milestone-type-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as PersonalMilestoneType)}
                className="w-full rounded-2xl border px-3.5 py-2.5 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                {PERSONAL_MILESTONE_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="milestone-date-input"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Important Date
              </label>
              <input
                id="milestone-date-input"
                type="date"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value)
                  setFormError('')
                }}
                className="w-full rounded-2xl border px-3.5 py-2.5 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="milestone-partner-name"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Partner Name (Optional)
                </label>
                <input
                  id="milestone-partner-name"
                  type="text"
                  maxLength={40}
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g., Maya"
                  className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="milestone-sender-name"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Your Name (Optional)
                </label>
                <input
                  id="milestone-sender-name"
                  type="text"
                  maxLength={40}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Aarav"
                  className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="milestone-note-input"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Memory Note (Optional)
              </label>
              <input
                id="milestone-note-input"
                type="text"
                maxLength={120}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Coffee shop in the rain"
                className="w-full rounded-2xl border px-3.5 py-2 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            {formError && (
              <p role="alert" className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                {formError}
              </p>
            )}
            {savedNotice && (
              <p role="status" className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--accent-rose)' }}>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{savedNotice}</span>
              </p>
            )}

            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#472C42] px-5 py-2.5 text-sm font-semibold text-[#FFF9F3] cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              <span>{editingId ? 'Save Changes' : 'Save Personal Milestone'}</span>
            </button>

            {/* Clear localStorage & Privacy Explanation */}
            <div
              className="flex items-start gap-2.5 rounded-2xl border p-3 text-xs leading-relaxed"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-muted)',
              }}
            >
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D9B77E]" aria-hidden="true" />
              <span>
                No account required. Personal dates are saved privately in this browser’s{' '}
                <code className="font-mono text-[0.68rem]">localStorage</code> and are not synchronized across devices.
              </span>
            </div>
          </form>

          {/* Right: Saved Milestones & Smart Calculations */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Your Saved Dates ({computedSaved.length})
              </h3>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Sorted by nearest upcoming celebration
              </span>
            </div>

            {computedSaved.length === 0 ? (
              <div
                className="rounded-3xl border border-dashed p-8 text-center space-y-3"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                <Heart className="mx-auto h-7 w-7" style={{ color: 'var(--accent-rose)' }} aria-hidden="true" />
                <p className="font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  No personal dates saved yet
                </p>
                <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Add your first meeting, first kiss, monthsary, or anniversary date on the left to calculate days together, upcoming milestones, and one-click personalized cards.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {computedSaved.map(({ saved, def, stats }) => (
                  <article
                    key={saved.id}
                    className="rounded-3xl border p-5 transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className="shrink-0 rounded-2xl p-1.5"
                          style={{ backgroundColor: def.accentTint }}
                        >
                          <LoveCalendarArtwork
                            motif={def.motif}
                            accentColor={def.accentColor}
                            className="h-14 w-14"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: def.accentColor }}>
                            {def.name}
                            {saved.partnerName ? ` · With ${saved.partnerName}` : ''}
                          </p>
                          <h4 className="mt-1 font-display text-xl sm:text-2xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                            {stats.statusHeadline}
                          </h4>
                          {stats.secondaryNote && (
                            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                              {stats.secondaryNote}
                            </p>
                          )}
                          {saved.note && (
                            <p className="mt-1 text-xs italic" style={{ color: 'var(--text-muted)' }}>
                              “{saved.note}”
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                          {stats.daysRemaining === 0
                            ? 'Today!'
                            : stats.daysRemaining === 1
                              ? 'Tomorrow'
                              : `${stats.daysRemaining} days left`}
                        </p>
                        <p className="mt-0.5 font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {stats.nextEventFormatted}
                        </p>
                      </div>
                    </div>

                    {/* Smart Secondary Insights: Days Together / Monthsary / Next Day Milestone / Leap Year */}
                    <div
                      className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-3 text-xs"
                      style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                    >
                      <span>Start date: {saved.date}</span>
                      {stats.nextMonthsaryFormatted && (
                        <span>
                          Next monthsary: {stats.nextMonthsaryFormatted} (
                          {stats.nextMonthsaryDaysRemaining === 0
                            ? 'today'
                            : `in ${stats.nextMonthsaryDaysRemaining}d`}
                          )
                        </span>
                      )}
                      {stats.nextDayMilestoneLabel && stats.nextDayMilestoneFormatted && (
                        <span>
                          Next landmark: {stats.nextDayMilestoneLabel} ({stats.nextDayMilestoneFormatted})
                        </span>
                      )}
                      {stats.leapYearNote && <span>{stats.leapYearNote}</span>}
                    </div>

                    {/* Card Action + Edit / Delete Controls */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
                      <Link
                        to={buildMilestoneStudioUrl(def, saved, stats)}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#472C42] px-4 py-1.5 text-xs font-semibold text-[#FFF9F3]"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                        <span>Create Card</span>
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(saved)}
                          className="inline-flex min-h-9 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold cursor-pointer hover:opacity-85"
                          style={{
                            borderColor: 'var(--border-strong)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Edit</span>
                        </button>

                        {confirmDeleteId === saved.id ? (
                          <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--accent-rose)' }}>
                            <span style={{ color: 'var(--text-primary)' }}>Delete?</span>
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteMilestone(saved.id)
                                setConfirmDeleteId(null)
                                if (editingId === saved.id) resetForm()
                              }}
                              className="rounded-full bg-[#472C42] px-2 py-0.5 text-[0.7rem] font-semibold text-[#FFF9F3] cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-1 text-[0.7rem] font-semibold cursor-pointer"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(saved.id)}
                            aria-label={`Delete ${def.name}`}
                            className="inline-flex min-h-9 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer hover:opacity-85"
                            style={{
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--text-muted)',
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* All 13 Personal Milestone Templates & Trackers */}
        <div className="mt-12 border-t pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent-gold)' }}>
                All 13 Personal Milestones
              </p>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Every Relationship Chapter Worth Remembering
              </h3>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Track a date or jump straight into designing a keepsake card
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCatalog.map((def) => (
              <article
                key={def.id}
                className="group flex flex-col justify-between rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]" style={{ color: def.accentColor }}>
                        {def.shortLabel}
                      </p>
                      <h4 className="mt-1 font-display text-xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {def.name}
                      </h4>
                    </div>
                    <div className="shrink-0 rounded-2xl p-1" style={{ backgroundColor: def.accentTint }}>
                      <LoveCalendarArtwork
                        motif={def.motif}
                        accentColor={def.accentColor}
                        className="h-12 w-12"
                      />
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {def.shortDescription}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                  <Link
                    to={buildMilestoneStudioUrl(def)}
                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#472C42] px-3.5 py-1.5 text-xs font-semibold text-[#FFF9F3]"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                    <span>Create Card</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => preselectMilestoneType(def.id)}
                    className="inline-flex min-h-9 items-center justify-center rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer hover:opacity-85"
                    style={{
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Track Date
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
