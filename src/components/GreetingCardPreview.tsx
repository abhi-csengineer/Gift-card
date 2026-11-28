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

function CornerFiligree({
  color,
  compact,
}: {
  color: string
  compact: boolean
}) {
  const sizeClass = compact ? 'h-4.5 w-4.5' : 'h-7 w-7 sm:h-8 sm:w-8'
  const offsetClass = compact ? 'top-3 left-3' : 'top-4 left-4'
  const corners = [
    { pos: offsetClass, rot: 'rotate-0' },
    { pos: compact ? 'top-3 right-3' : 'top-4 right-4', rot: 'rotate-90' },
    { pos: compact ? 'bottom-3 right-3' : 'bottom-4 right-4', rot: 'rotate-180' },
    { pos: compact ? 'bottom-3 left-3' : 'bottom-4 left-4', rot: '-rotate-90' },
  ]

  return (
    <>
      {corners.map((corner, idx) => (
        <svg
          key={idx}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 opacity-75 ${sizeClass} ${corner.pos} ${corner.rot}`}
        >
          <path
            d="M3 22V7C3 4.79 4.79 3 7 3H22"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="8" cy="8" r="1.4" fill={color} />
        </svg>
      ))}
    </>
  )
}

function BokehBackdrop({ accent, foil }: { accent: string; foil: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-6 left-4 h-24 w-24 rounded-full blur-md opacity-45"
        style={{ background: `radial-gradient(circle, #FFF3CC 0%, ${foil}66 55%, transparent 75%)` }}
      />
      <div
        className="absolute top-10 right-6 h-20 w-20 rounded-full blur-md opacity-40"
        style={{ background: `radial-gradient(circle, #FFE5EC 0%, ${accent}55 55%, transparent 75%)` }}
      />
      <div
        className="absolute bottom-14 left-8 h-16 w-16 rounded-full blur-sm opacity-35"
        style={{ background: `radial-gradient(circle, #FFF5D6 0%, ${foil}55 60%, transparent 75%)` }}
      />
      <div
        className="absolute bottom-8 right-10 h-28 w-28 rounded-full blur-lg opacity-35"
        style={{ background: `radial-gradient(circle, ${accent}66 0%, ${foil}33 55%, transparent 75%)` }}
      />
      {/* Crisp golden fairy light dots */}
      <span className="absolute top-[16%] left-[12%] h-2.5 w-2.5 rounded-full opacity-55 blur-[1px]" style={{ backgroundColor: '#FFE8A3' }} />
      <span className="absolute top-[24%] right-[14%] h-3 w-3 rounded-full opacity-50 blur-[1px]" style={{ backgroundColor: '#FFD6A5' }} />
      <span className="absolute top-[52%] left-[8%] h-2 w-2 rounded-full opacity-45 blur-[0.5px]" style={{ backgroundColor: foil }} />
      <span className="absolute bottom-[24%] right-[10%] h-2.5 w-2.5 rounded-full opacity-50 blur-[1px]" style={{ backgroundColor: '#FFE8A3' }} />
    </div>
  )
}

function BrushStrokeBanner({
  text,
  bgColor,
  textColor,
  compact,
  heartColor,
}: {
  text: string
  bgColor: string
  textColor: string
  compact?: boolean
  heartColor?: string
}) {
  return (
    <div className="relative inline-flex items-center justify-center max-w-full px-4 py-1.5">
      <svg
        viewBox="0 0 280 42"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-xs"
        aria-hidden="true"
      >
        <path
          d="M10 8C48 4 118 6 176 5C224 4 256 6 272 9C268 15 276 22 271 29C267 35 242 36 196 36C128 36 58 38 14 35C4 32 12 24 6 18C2 13 6 10 10 8Z"
          fill={bgColor}
        />
      </svg>
      <span
        className={`relative z-10 inline-flex items-center gap-1.5 font-semibold tracking-wide ${
          compact ? 'text-[0.68rem]' : 'text-xs sm:text-sm'
        }`}
        style={{
          color: textColor,
          fontFamily: '"Caveat", "Dancing Script", cursive',
          fontSize: compact ? '0.92rem' : '1.12rem',
          lineHeight: 1.15,
        }}
      >
        <span className="truncate">{text}</span>
        {heartColor && <span style={{ color: heartColor }} aria-hidden="true">♡</span>}
      </span>
    </div>
  )
}

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
  const displaySeal = (sealText?.trim() || template.sealInitial || 'C').slice(0, 2).toUpperCase()

  let backgroundStyle = `linear-gradient(155deg, ${palette.bg} 0%, ${palette.surface} 46%, ${palette.bgSecondary} 100%)`
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
    ? 'text-[1.32rem] leading-[1.08]'
    : fontSize === 'sm'
      ? 'text-2xl sm:text-3xl leading-tight'
      : fontSize === 'lg'
        ? 'text-3xl sm:text-[2.6rem] leading-[1.06]'
        : fontSize === 'xl'
          ? 'text-4xl sm:text-[2.85rem] leading-[1.04]'
          : 'text-3xl sm:text-[2.25rem] leading-[1.08]'

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

  // Determine high-contrast brush banner colors that pop warmly against light or dark cards
  const isDarkText = resolvedText.toLowerCase().startsWith('#1') ||
    resolvedText.toLowerCase().startsWith('#2') ||
    resolvedText.toLowerCase().startsWith('#3') ||
    resolvedText.toLowerCase().startsWith('#4') ||
    resolvedText.toLowerCase().startsWith('#5')
  const frontRibbonBg = isDarkText ? '#F9C95A' : '#FFF3D4'
  const frontRibbonText = '#2A1726'

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] select-none transition-colors duration-300 ${ratioClass} ${className}`}
      style={{
        background: backgroundStyle,
        color: resolvedText,
        boxShadow:
          'var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.52), inset 0 -1px 0 rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.16)',
      }}
    >
      {/* Dreamy Warm Bokeh Lights & Satin Sheen */}
      <BokehBackdrop accent={palette.accent} foil={palette.foil} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.22) 0%, transparent 62%, rgba(0,0,0,0.06) 100%), linear-gradient(128deg, rgba(255,255,255,0.2) 0%, transparent 42%, rgba(255,255,255,0.06) 100%)',
        }}
      />

      {/* Pattern overlays */}
      {activePattern === 'starlight' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage: `radial-gradient(${palette.foil} 1.3px, transparent 1.3px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {activePattern !== 'none' && (
        <>
          <div
            className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-[1.15rem] border"
            style={{ borderColor: `${palette.foil}8C` }}
          />
          <CornerFiligree color={palette.foil} compact={compact} />
        </>
      )}

      {(activePattern === 'linen-minimal' || activePattern === 'double-gold') && (
        <div
          className="pointer-events-none absolute inset-4 sm:inset-4.5 rounded-[0.85rem] border"
          style={{
            borderColor: activePattern === 'double-gold' ? palette.foil : `${resolvedText}28`,
          }}
        />
      )}

      {activePattern === 'scalloped-frame' && (
        <div
          className="pointer-events-none absolute inset-4 rounded-[1rem] border-2 border-dashed"
          style={{ borderColor: `${palette.accent}70` }}
        />
      )}

      {activePattern === 'foil-arch' && (
        <div
          className="pointer-events-none absolute inset-x-7 top-6 bottom-6 rounded-t-full rounded-b-xl border"
          style={{ borderColor: `${palette.foil}88` }}
        />
      )}

      {activePattern === 'botanical-watermark' && (
        <>
          <svg
            className="pointer-events-none absolute right-4 bottom-4 h-24 w-24 opacity-25"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path d="M15 88C34 64 56 44 86 24" stroke={palette.foil} strokeWidth="2" />
            <ellipse cx="42" cy="60" rx="12" ry="5" transform="rotate(-35 42 60)" fill={palette.accent} />
            <ellipse cx="64" cy="44" rx="11" ry="5" transform="rotate(-35 64 44)" fill={palette.foil} />
          </svg>
          <svg
            className="pointer-events-none absolute left-4 top-4 h-20 w-20 rotate-180 opacity-20"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path d="M15 88C34 64 56 44 86 24" stroke={palette.foil} strokeWidth="2" />
            <ellipse cx="42" cy="60" rx="11" ry="4.5" transform="rotate(-35 42 60)" fill={palette.accent} />
          </svg>
        </>
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
                backgroundColor: `${palette.foil}34`,
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
            compact ? 'p-4 items-center text-center' : `p-6 sm:p-8 ${alignClass}`
          }`}
        >
          {/* Distinct front cover ribbon band for split-ribbon style */}
          {template.frontStyle === 'split-ribbon' && (
            <div
              className="pointer-events-none absolute inset-x-0 top-[24%] h-[46%] opacity-25"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${palette.accent} 50%, transparent 100%)`,
                borderTop: `1px solid ${palette.foil}`,
                borderBottom: `1px solid ${palette.foil}`,
              }}
              aria-hidden="true"
            />
          )}

          {/* Engraved Occasion Header */}
          <div
            className={`relative z-10 flex items-center gap-2 ${
              textAlign === 'center' || compact
                ? 'justify-center'
                : textAlign === 'right'
                  ? 'justify-end'
                  : 'justify-start'
            }`}
          >
            <span className="h-px w-4 opacity-75" style={{ backgroundColor: palette.foil }} aria-hidden="true" />
            <span
              className="text-[0.6rem] sm:text-[0.66rem] font-semibold tracking-[0.22em] uppercase"
              style={{ color: resolvedText, opacity: 0.85 }}
            >
              {template.occasion}
            </span>
            <span className="h-px w-4 opacity-75" style={{ backgroundColor: palette.foil }} aria-hidden="true" />
          </div>

          {/* Lush Central Scene Stage */}
          <div
            className={`relative z-10 flex items-center justify-center ${
              compact
                ? 'my-0.5 h-36 w-48 mx-auto'
                : layout === 'landscape'
                  ? 'my-1 h-32 w-44 self-center'
                  : 'my-1 h-48 w-64 self-center'
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${palette.foil}2E 0%, ${palette.accent}18 50%, transparent 74%)`,
              }}
              aria-hidden="true"
            />
            {template.frontStyle === 'crest-medallion' && (
              <>
                <div
                  className="pointer-events-none absolute inset-2 rounded-full border"
                  style={{
                    backgroundColor: `${palette.foil}14`,
                    borderColor: `${palette.foil}78`,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-4 rounded-full border border-dashed"
                  style={{ borderColor: `${palette.foil}55` }}
                  aria-hidden="true"
                />
              </>
            )}
            <CardArtwork
              motif={template.motif}
              accent={palette.accent}
              foil={palette.foil}
              text={resolvedText}
            />
          </div>

          {/* Expressive Script Headline + Doodles + Brush Swash + Highlight Ribbon */}
          <div
            className={`relative z-10 flex flex-col gap-1.5 max-w-[27ch] ${
              textAlign === 'center' || compact
                ? 'items-center text-center'
                : textAlign === 'right'
                  ? 'items-end text-right'
                  : 'items-start text-left'
            }`}
          >
            <div className="relative inline-flex items-center gap-2">
              {!compact && (
                <svg viewBox="0 0 18 18" className="h-4 w-4 shrink-0 opacity-90" fill="none" aria-hidden="true">
                  <path d="M14 5L5 3M14 10L3 11M15 14L8 17" stroke="#F4B83A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
              <h3
                className={`${headlineSizeClass} font-semibold tracking-[-0.015em]`}
                style={{ fontFamily: font.cssFamily, color: resolvedText }}
              >
                {displayHeadline}
              </h3>
              {!compact && (
                <svg viewBox="0 0 22 20" className="h-5 w-5 shrink-0 opacity-90" fill="none" aria-hidden="true">
                  <path
                    d="M11 17C11 17 3 11.8 3 6.8C3 4.2 5 2.5 7.3 2.5C9 2.5 10.3 3.4 11 4.7C11.7 3.4 13 2.5 14.7 2.5C17 2.5 19 4.2 19 6.8C19 11.8 11 17 11 17Z"
                    stroke="#F4B83A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Curved painted brush-stroke underline */}
            <svg
              viewBox="0 0 160 12"
              className={compact ? 'h-2 w-24' : 'h-2.5 w-36'}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 9C44 3 112 2 156 6"
                stroke="#F4B83A"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>

            {/* Painted Brush-Stroke Accent Ribbon */}
            {!compact ? (
              <div className="pt-0.5">
                <BrushStrokeBanner
                  text={
                    relationship?.trim()
                      ? `For ${displayRecipient} · ${relationship.trim()}`
                      : `Warmest wishes for ${displayRecipient}`
                  }
                  bgColor={frontRibbonBg}
                  textColor={frontRibbonText}
                  heartColor={palette.accent}
                />
              </div>
            ) : (
              <p
                className="text-[0.72rem] font-medium opacity-80"
                style={{ fontFamily: '"Caveat", "Dancing Script", cursive' }}
              >
                With love &amp; joy ♡
              </p>
            )}
          </div>

          {!compact && (
            <div className="relative z-10 mt-1 flex items-center gap-2 self-center text-[0.62rem] tracking-[0.22em] uppercase opacity-75">
              <span className="inline-block h-px w-5" style={{ backgroundColor: palette.foil }} />
              <span>Cardelle</span>
              <span className="inline-block h-px w-5" style={{ backgroundColor: palette.foil }} />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative z-10 flex h-full flex-col justify-between ${
            compact ? 'p-5 items-center text-center' : `p-6 sm:p-8 ${alignClass}`
          }`}
        >
          <div className="space-y-1 w-full">
            <div
              className={`flex flex-wrap items-center gap-2 text-[0.64rem] tracking-[0.2em] uppercase opacity-75 ${
                textAlign === 'center' || compact
                  ? 'justify-center'
                  : textAlign === 'right'
                    ? 'justify-end'
                    : 'justify-start'
              }`}
            >
              <span>{template.occasion}</span>
              {relationship?.trim() && (
                <>
                  <span>·</span>
                  <span>For {relationship.trim()}</span>
                </>
              )}
            </div>
            <p
              className="text-2xl sm:text-[1.75rem] italic font-semibold"
              style={{ fontFamily: '"Dancing Script", "Cormorant Garamond", cursive', color: palette.accent }}
            >
              Dearest {displayRecipient},
            </p>
            <svg
              viewBox="0 0 140 10"
              className={`h-2 w-28 ${
                textAlign === 'center' || compact
                  ? 'mx-auto'
                  : textAlign === 'right'
                    ? 'ml-auto'
                    : ''
              }`}
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 7C42 2 98 2 137 6" stroke={palette.foil} strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>

          <div
            className={`my-2.5 w-full max-w-[34ch] space-y-3 ${layout === 'landscape' ? 'my-1.5' : ''} ${
              template.insideStyle === 'poetic-framed'
                ? 'rounded-2xl border px-5 py-4'
                : template.insideStyle === 'letterpress-ruled'
                  ? 'border-y py-4'
                  : ''
            }`}
            style={
              template.insideStyle === 'poetic-framed'
                ? {
                    backgroundColor: `${palette.foil}16`,
                    borderColor: `${palette.foil}66`,
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28)',
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

            <div className="pt-1">
              <BrushStrokeBanner
                text={giftNote?.trim() || 'Keep smiling, keep shining!'}
                bgColor={frontRibbonBg}
                textColor={frontRibbonText}
                heartColor={palette.accent}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 self-center text-center">
            <BrushStrokeBanner
              text={`With love, ${displaySender}`}
              bgColor={isDarkText ? '#2A1726' : palette.accent}
              textColor="#FFF9F3"
              heartColor="#F9C95A"
            />
            {/* Sculpted 3D Wax Seal */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold tracking-wider text-[#FFF9F3]"
              style={{
                background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.34), transparent 58%), ${palette.accent}`,
                boxShadow: `0 5px 12px rgba(0, 0, 0, 0.22), inset 0 0 0 2px ${palette.foil}, inset 0 -2px 4px rgba(0, 0, 0, 0.25)`,
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
