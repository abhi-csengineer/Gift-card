import { getFontById, getPaletteById, getTemplateById } from '../data/catalog'
import type { BackgroundPattern, CardFontId } from '../types/card'
import { CardArtwork } from './CardArtwork'

interface GreetingCardPreviewProps {
  templateId: string
  paletteId?: string
  pattern?: BackgroundPattern
  fontId?: CardFontId
  headline?: string
  recipientName?: string
  senderName?: string
  message?: string
  sealText?: string
  giftNote?: string
  side?: 'front' | 'inside'
  compact?: boolean
  className?: string
}

export function GreetingCardPreview({
  templateId,
  paletteId,
  pattern,
  fontId,
  headline,
  recipientName,
  senderName,
  message,
  sealText,
  giftNote,
  side = 'front',
  compact = false,
  className = '',
}: GreetingCardPreviewProps) {
  const template = getTemplateById(templateId)
  const palette = getPaletteById(paletteId ?? template.defaultPaletteId)
  const activePattern = pattern ?? template.defaultPattern
  const font = getFontById(fontId ?? template.defaultFontId)

  const displayHeadline = headline?.trim() || template.defaultHeadline
  const displayRecipient = recipientName?.trim() || 'Someone Special'
  const displaySender = senderName?.trim() || 'With Love'
  const displayMessage = message?.trim() || template.defaultMessage
  const displaySeal = (sealText?.trim() || template.sealInitial || 'V').slice(0, 2).toUpperCase()

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] select-none transition-colors duration-300 ${className}`}
      style={{
        background: `linear-gradient(150deg, ${palette.bg} 0%, ${palette.surface} 52%, ${palette.bgSecondary} 100%)`,
        color: palette.text,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute -top-14 -right-14 h-44 w-44 rounded-full blur-2xl opacity-45"
        style={{ backgroundColor: palette.accent }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-2xl opacity-35"
        style={{ backgroundColor: palette.foil }}
      />

      {/* Pattern overlays */}
      {activePattern === 'starlight' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(${palette.foil} 1.2px, transparent 1.2px)`,
            backgroundSize: '26px 26px',
          }}
        />
      )}

      {/* Editorial foil border */}
      <div
        className="pointer-events-none absolute inset-3 rounded-[1.1rem] border"
        style={{ borderColor: `${palette.foil}88` }}
      />
      {activePattern === 'linen-minimal' && (
        <div
          className="pointer-events-none absolute inset-4.5 rounded-[0.85rem] border"
          style={{ borderColor: `${palette.text}24` }}
        />
      )}
      {activePattern === 'foil-arch' && (
        <div
          className="pointer-events-none absolute inset-x-7 top-6 bottom-6 rounded-t-full rounded-b-xl border"
          style={{ borderColor: `${palette.foil}75` }}
        />
      )}
      {activePattern === 'botanical-watermark' && (
        <svg
          className="pointer-events-none absolute right-4 bottom-4 h-24 w-24 opacity-20"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M15 88C34 64 56 44 86 24" stroke={palette.foil} strokeWidth="2" />
          <ellipse cx="42" cy="60" rx="12" ry="5" transform="rotate(-35 42 60)" fill={palette.accent} />
          <ellipse cx="64" cy="44" rx="11" ry="5" transform="rotate(-35 64 44)" fill={palette.foil} />
        </svg>
      )}

      {side === 'front' ? (
        <div
          className={`relative z-10 flex h-full flex-col items-center justify-between text-center ${
            compact ? 'p-5 min-h-[270px]' : 'p-7 sm:p-9 min-h-[410px]'
          }`}
        >
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
            style={{
              backgroundColor: palette.badgeBg,
              color: palette.text,
              border: `1px solid ${palette.foil}55`,
            }}
          >
            {template.occasion}
          </span>

          <div className={compact ? 'my-2 h-28 w-36' : 'my-3 h-40 w-52'}>
            <CardArtwork
              motif={template.motif}
              accent={palette.accent}
              foil={palette.foil}
              text={palette.text}
            />
          </div>

          <div className="space-y-1.5 max-w-[26ch]">
            <h3
              className={compact ? 'text-xl leading-tight font-semibold' : 'text-2xl sm:text-3xl leading-tight font-semibold'}
              style={{ fontFamily: font.cssFamily }}
            >
              {displayHeadline}
            </h3>
            {!compact && (
              <p className="text-xs sm:text-sm tracking-wide" style={{ color: palette.mutedText }}>
                For <span className="font-semibold" style={{ color: palette.text }}>{displayRecipient}</span>
              </p>
            )}
          </div>

          {!compact && (
            <div className="mt-4 flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase" style={{ color: palette.mutedText }}>
              <span className="inline-block h-px w-5" style={{ backgroundColor: palette.foil }} />
              <span>Vellum &amp; Bloom</span>
              <span className="inline-block h-px w-5" style={{ backgroundColor: palette.foil }} />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative z-10 flex h-full flex-col items-center justify-between text-center ${
            compact ? 'p-6 min-h-[270px]' : 'p-8 sm:p-10 min-h-[410px]'
          }`}
        >
          <div className="space-y-1">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase" style={{ color: palette.mutedText }}>
              A Personal Note
            </p>
            <p
              className="text-xl sm:text-2xl italic font-medium"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: palette.accent }}
            >
              Dearest {displayRecipient},
            </p>
          </div>

          <div className="my-4 max-w-[32ch] space-y-4">
            <p
              className={`${font.id === 'handwritten-script' ? 'text-xl sm:text-2xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'} whitespace-pre-line`}
              style={{ fontFamily: font.cssFamily }}
            >
              {displayMessage}
            </p>

            {giftNote?.trim() && (
              <div
                className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: `${palette.foil}22`,
                  border: `1px solid ${palette.foil}80`,
                  color: palette.text,
                }}
              >
                <span>✦</span>
                <span>{giftNote.trim()}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <div className="space-y-0.5">
              <p className="text-[0.68rem] tracking-[0.18em] uppercase" style={{ color: palette.mutedText }}>
                With warmth &amp; love
              </p>
              <p
                className="text-xl sm:text-2xl font-semibold"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                {displaySender}
              </p>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold tracking-wider text-[#FFF9F3]"
              style={{
                backgroundColor: palette.accent,
                boxShadow: `inset 0 0 0 2px ${palette.foil}`,
                fontFamily: '"Cormorant Garamond", Georgia, serif',
              }}
              aria-hidden="true"
            >
              {displaySeal}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
