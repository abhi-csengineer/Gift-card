import {
  STICKER_OPTIONS,
  getFontById,
  getGradientById,
  getPaletteById,
  getTemplateById,
} from '../data/catalog'
import type {
  BackgroundPattern,
  CardFontId,
  CardFontSize,
  CardLayout,
  CardTextAlign,
  DecorativeEffect,
  StickerId,
} from '../types/card'
import { CardArtwork } from './CardArtwork'
import { CardEffects } from './CardEffects'

interface GreetingCardPreviewProps {
  templateId: string
  paletteId?: string
  backgroundMode?: 'palette' | 'solid' | 'gradient'
  customBgColor?: string
  gradientId?: string
  customGradientFrom?: string
  customGradientTo?: string
  customTextColor?: string
  pattern?: BackgroundPattern
  fontId?: CardFontId
  fontSize?: CardFontSize
  textAlign?: CardTextAlign
  layout?: CardLayout
  effects?: DecorativeEffect[]
  stickers?: StickerId[]
  headline?: string
  recipientName?: string
  senderName?: string
  relationship?: string
  message?: string
  sealText?: string
  giftNote?: string
  side?: 'front' | 'inside'
  compact?: boolean
  reducedMotion?: boolean
  className?: string
}

const STICKER_POSITIONS = [
  'top-5 right-5',
  'top-5 left-5',
  'bottom-5 right-5',
  'bottom-5 left-5',
]

export function GreetingCardPreview({
  templateId,
  paletteId,
  backgroundMode = 'palette',
  customBgColor,
  gradientId,
  customGradientFrom,
  customGradientTo,
  customTextColor,
  pattern,
  fontId,
  fontSize = 'md',
  textAlign = 'center',
  layout = 'portrait',
  effects,
  stickers,
  headline,
  recipientName,
  senderName,
  relationship,
  message,
  sealText,
  giftNote,
  side = 'front',
  compact = false,
  reducedMotion = false,
  className = '',
}: GreetingCardPreviewProps) {
  const template = getTemplateById(templateId)
  const palette = getPaletteById(paletteId ?? template.defaultPaletteId)
  const gradientPreset = getGradientById(gradientId)
  const activePattern = pattern ?? template.defaultPattern
  const font = getFontById(fontId ?? template.defaultFontId)
  const activeEffects = effects ?? template.defaultEffects ?? []
  const activeStickers = stickers ?? template.defaultStickers ?? []

  const displayHeadline = headline?.trim() || template.defaultHeadline
  const displayRecipient = recipientName?.trim() || 'Someone Special'
  const displaySender = senderName?.trim() || 'With Love'
  const displayMessage = message?.trim() || template.defaultMessage
  const displaySeal = (sealText?.trim() || template.sealInitial || 'V').slice(0, 2).toUpperCase()

  let backgroundStyle = `linear-gradient(150deg, ${palette.bg} 0%, ${palette.surface} 52%, ${palette.bgSecondary} 100%)`
  let resolvedText = customTextColor || palette.text

  if (backgroundMode === 'solid' && customBgColor) {
    backgroundStyle = customBgColor
  } else if (backgroundMode === 'gradient') {
    if (customGradientFrom && customGradientTo) {
      backgroundStyle = `linear-gradient(145deg, ${customGradientFrom} 0%, ${customGradientTo} 100%)`
    } else {
      backgroundStyle = `linear-gradient(145deg, ${gradientPreset.from} 0%, ${gradientPreset.via} 50%, ${gradientPreset.to} 100%)`
      if (!customTextColor) {
        resolvedText = gradientPreset.textColor
      }
    }
  }

  const ratioClass = compact
    ? 'aspect-[3/4]'
    : layout === 'landscape'
      ? 'aspect-[4/3]'
      : layout === 'square'
        ? 'aspect-square'
        : 'aspect-[3/4]'

  const alignClass =
    textAlign === 'left'
      ? 'items-start text-left'
      : textAlign === 'right'
        ? 'items-end text-right'
        : 'items-center text-center'

  const headlineSizeClass = compact
    ? 'text-xl leading-tight'
    : fontSize === 'sm'
      ? 'text-xl sm:text-2xl leading-tight'
      : fontSize === 'lg'
        ? 'text-3xl sm:text-4xl leading-tight'
        : fontSize === 'xl'
          ? 'text-3xl sm:text-[2.5rem] leading-[1.1]'
          : 'text-2xl sm:text-3xl leading-tight'

  const bodySizeClass =
    font.id === 'handwritten-script' || font.id === 'caveat-note'
      ? fontSize === 'sm'
        ? 'text-lg leading-relaxed'
        : fontSize === 'lg'
          ? 'text-2xl sm:text-[1.7rem] leading-relaxed'
          : fontSize === 'xl'
            ? 'text-3xl leading-snug'
            : 'text-xl sm:text-2xl leading-relaxed'
      : fontSize === 'sm'
        ? 'text-sm leading-relaxed'
        : fontSize === 'lg'
          ? 'text-lg sm:text-xl leading-relaxed'
          : fontSize === 'xl'
            ? 'text-xl sm:text-2xl leading-relaxed'
            : 'text-base sm:text-lg leading-relaxed'

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] select-none transition-colors duration-300 ${ratioClass} ${className}`}
      style={{
        background: backgroundStyle,
        color: resolvedText,
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

      {activePattern !== 'none' && (
        <div
          className="pointer-events-none absolute inset-3 rounded-[1.1rem] border"
          style={{ borderColor: `${palette.foil}88` }}
        />
      )}

      {(activePattern === 'linen-minimal' || activePattern === 'double-gold') && (
        <div
          className="pointer-events-none absolute inset-4.5 rounded-[0.85rem] border"
          style={{
            borderColor: activePattern === 'double-gold' ? palette.foil : `${resolvedText}26`,
          }}
        />
      )}

      {activePattern === 'scalloped-frame' && (
        <div
          className="pointer-events-none absolute inset-4 rounded-[1rem] border-2 border-dashed"
          style={{ borderColor: `${palette.accent}66` }}
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

      {/* Floating decorative animations (on full preview) */}
      {!compact && activeEffects.length > 0 && (
        <CardEffects
          effects={activeEffects}
          accent={palette.accent}
          foil={palette.foil}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Corner Stickers */}
      {!compact &&
        activeStickers.slice(0, 4).map((stickerId, idx) => {
          const sticker = STICKER_OPTIONS.find((s) => s.id === stickerId)
          if (!sticker) return null
          return (
            <span
              key={`${stickerId}-${idx}`}
              className={`pointer-events-none absolute z-20 flex h-8 w-8 items-center justify-center rounded-full border text-sm shadow-xs ${STICKER_POSITIONS[idx]}`}
              style={{
                backgroundColor: `${palette.foil}28`,
                borderColor: palette.foil,
                color: palette.accent,
              }}
              aria-hidden="true"
            >
              {sticker.symbol}
            </span>
          )
        })}

      {side === 'front' ? (
        <div
          className={`relative z-10 flex h-full flex-col justify-between ${
            compact ? 'p-5 items-center text-center' : `p-7 sm:p-9 ${alignClass}`
          }`}
        >
          {/* Distinct front cover ribbon band for split-ribbon style */}
          {template.frontStyle === 'split-ribbon' && (
            <div
              className="pointer-events-none absolute inset-x-0 top-[26%] h-[42%] opacity-20"
              style={{
                backgroundColor: palette.accent,
                borderTop: `1px solid ${palette.foil}`,
                borderBottom: `1px solid ${palette.foil}`,
              }}
              aria-hidden="true"
            />
          )}

          <div className={`relative z-10 flex flex-wrap items-center gap-1.5 ${textAlign === 'center' || compact ? 'justify-center' : ''}`}>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
              style={{
                backgroundColor: palette.badgeBg,
                color: resolvedText,
                border: `1px solid ${palette.foil}55`,
              }}
            >
              {template.occasion}
            </span>
            {!compact && relationship?.trim() && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide"
                style={{
                  backgroundColor: `${palette.foil}22`,
                  color: resolvedText,
                }}
              >
                For {relationship.trim()}
              </span>
            )}
          </div>

          <div
            className={`relative z-10 flex items-center justify-center ${
              compact
                ? 'my-2 h-28 w-36 mx-auto'
                : layout === 'landscape'
                  ? 'my-1 h-28 w-36 self-center'
                  : 'my-2 h-40 w-52 self-center'
            }`}
          >
            {template.frontStyle === 'crest-medallion' && (
              <div
                className="pointer-events-none absolute inset-2 rounded-full border"
                style={{
                  backgroundColor: `${palette.foil}14`,
                  borderColor: `${palette.foil}66`,
                }}
                aria-hidden="true"
              />
            )}
            <CardArtwork
              motif={template.motif}
              accent={palette.accent}
              foil={palette.foil}
              text={resolvedText}
            />
          </div>

          <div className="relative z-10 space-y-1.5 max-w-[26ch]">
            {template.frontStyle === 'editorial-poster' && (
              <div
                className="mx-auto mb-2 h-px w-16"
                style={{ backgroundColor: palette.foil }}
                aria-hidden="true"
              />
            )}
            <h3
              className={`${headlineSizeClass} font-semibold`}
              style={{ fontFamily: font.cssFamily }}
            >
              {displayHeadline}
            </h3>
            {!compact && (
              <p className="text-xs sm:text-sm tracking-wide opacity-80">
                For <span className="font-semibold">{displayRecipient}</span>
              </p>
            )}
          </div>

          {!compact && (
            <div className="relative z-10 mt-2 flex items-center gap-2 self-center text-[0.68rem] tracking-[0.18em] uppercase opacity-75">
              <span className="inline-block h-px w-5" style={{ backgroundColor: palette.foil }} />
              <span>Vellum &amp; Bloom</span>
              <span className="inline-block h-px w-5" style={{ backgroundColor: palette.foil }} />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative z-10 flex h-full flex-col justify-between ${
            compact ? 'p-6 items-center text-center' : `p-7 sm:p-9 ${alignClass}`
          }`}
        >
          <div className="space-y-1 w-full">
            <div className={`flex flex-wrap items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase opacity-75 ${textAlign === 'center' || compact ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
              <span>{template.occasion}</span>
              {relationship?.trim() && (
                <>
                  <span>·</span>
                  <span>For {relationship.trim()}</span>
                </>
              )}
            </div>
            <p
              className="text-xl sm:text-2xl italic font-medium"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: palette.accent }}
            >
              Dearest {displayRecipient},
            </p>
            {template.insideStyle === 'keepsake-card' && (
              <div className="pt-1 flex items-center justify-center gap-2" aria-hidden="true">
                <span className="h-px w-10" style={{ backgroundColor: palette.foil }} />
                <span className="text-xs" style={{ color: palette.foil }}>✦</span>
                <span className="h-px w-10" style={{ backgroundColor: palette.foil }} />
              </div>
            )}
          </div>

          <div
            className={`my-3 w-full max-w-[34ch] space-y-3 ${layout === 'landscape' ? 'my-2' : ''} ${
              template.insideStyle === 'poetic-framed'
                ? 'rounded-2xl border px-5 py-4'
                : template.insideStyle === 'letterpress-ruled'
                  ? 'border-y py-4'
                  : ''
            }`}
            style={
              template.insideStyle === 'poetic-framed'
                ? {
                    backgroundColor: `${palette.foil}14`,
                    borderColor: `${palette.foil}60`,
                  }
                : template.insideStyle === 'letterpress-ruled'
                  ? {
                      borderColor: `${palette.foil}55`,
                      backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 30px, ${palette.foil}28 31px)`,
                    }
                  : undefined
            }
          >
            <p
              className={`${bodySizeClass} whitespace-pre-line`}
              style={{ fontFamily: font.cssFamily }}
            >
              {displayMessage}
            </p>

            {giftNote?.trim() && (
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: `${palette.foil}22`,
                  border: `1px solid ${palette.foil}80`,
                  color: resolvedText,
                }}
              >
                <span>✦</span>
                <span>{giftNote.trim()}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 self-center text-center">
            <div className="space-y-0.5">
              <p className="text-[0.65rem] tracking-[0.18em] uppercase opacity-75">
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
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold tracking-wider text-[#FFF9F3]"
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
