import { motion } from 'framer-motion'
import type { LoveCalendarArtMotif } from '../../types/loveCalendar'

interface LoveCalendarArtworkProps {
  motif: LoveCalendarArtMotif
  accentColor: string
  className?: string
}

export function LoveCalendarArtwork({ motif, accentColor, className = 'h-20 w-20' }: LoveCalendarArtworkProps) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`glow-${motif}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="48" cy="48" r="42" fill={`url(#glow-${motif})`} />
      <circle cx="48" cy="48" r="36" stroke={accentColor} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 4" />

      {motif === 'crescent-vow' && (
        <g>
          <path
            d="M54 22C42 23 33 33 33 46C33 59 42 69 55 71C47 72 39 69 34 63C29 57 27 49 29 41C31 32 39 24 49 22.5C50.7 22.2 52.3 22 54 22Z"
            fill="#D9B77E"
            fillOpacity="0.85"
          />
          <path d="M58 31L60 36L65 38L60 40L58 45L56 40L51 38L56 36L58 31Z" fill={accentColor} />
          <circle cx="65" cy="54" r="2.2" fill="#D9B77E" />
          <path d="M26 67C37 64 56 64 70 67" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.65" />
        </g>
      )}

      {motif === 'wax-envelope' && (
        <g>
          <rect x="20" y="29" width="56" height="38" rx="5" fill="#FFF9F3" stroke={accentColor} strokeWidth="1.6" />
          <path d="M21 31L48 51L75 31" stroke="#D9B77E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="50" r="8.5" fill={accentColor} />
          <circle cx="48" cy="50" r="6" stroke="#FFF9F3" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M48 47.4C46.9 46.2 45 46.5 44.6 48C44.2 49.4 45.6 51 48 52.8C50.4 51 51.8 49.4 51.4 48C51 46.5 49.1 46.2 48 47.4Z" fill="#FFF9F3" />
        </g>
      )}

      {motif === 'rose-arch' && (
        <g>
          <path d="M27 72V44C27 32.4 36.4 23 48 23C59.6 23 69 32.4 69 44V72" stroke="#D9B77E" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M32 72V45C32 36.2 39.2 29 48 29C56.8 29 64 36.2 64 45V72" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.65" />
          <circle cx="48" cy="24" r="5" fill={accentColor} />
          <circle cx="38" cy="28" r="3.5" fill="#E9A6B5" />
          <circle cx="58" cy="28" r="3.5" fill="#E9A6B5" />
          <path d="M31 35C27 33 25 36 28 39" stroke="#7A947E" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M65 35C69 33 71 36 68 39" stroke="#7A947E" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      )}

      {motif === 'tulip-meadow' && (
        <g>
          <path d="M48 70V41" stroke="#6E8E74" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M48 64C42 61 38 56 38 49C44 51 48 55 48 64Z" fill="#82A387" fillOpacity="0.65" />
          <path d="M48 60C54 57 58 52 58 45C52 47 48 51 48 60Z" fill="#82A387" fillOpacity="0.85" />
          <path d="M39 32C39 27 43 24 48 26C53 24 57 27 57 32C57 39 53 43 48 43C43 43 39 39 39 32Z" fill={accentColor} />
          <path d="M44 26L48 21L52 26" fill="#E9A6B5" />
          <circle cx="64" cy="30" r="2" fill="#D9B77E" />
          <circle cx="31" cy="35" r="1.8" fill="#D9B77E" />
        </g>
      )}

      {motif === 'champagne-horizon' && (
        <g>
          <path d="M22 61H74" stroke="#D9B77E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 61C32 52.2 39.2 45 48 45C56.8 45 64 52.2 64 61" fill={accentColor} fillOpacity="0.28" stroke={accentColor} strokeWidth="1.5" />
          <path d="M48 27V37M34 33L39 39M62 33L57 39" stroke="#D9B77E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M29 67H67" stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" />
        </g>
      )}

      {motif === 'sunlit-locket' && (
        <g>
          <path d="M48 18V27" stroke="#D9B77E" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="48" cy="29" r="3" stroke="#D9B77E" strokeWidth="1.5" />
          <circle cx="48" cy="51" r="18" fill="#FFF9F3" stroke="#D9B77E" strokeWidth="2" />
          <circle cx="48" cy="51" r="13.5" stroke={accentColor} strokeOpacity="0.45" strokeWidth="1" />
          <path d="M48 46.5C45.8 44 41.8 44.7 41 47.8C40.2 50.8 43 54.1 48 57.5C53 54.1 55.8 50.8 55 47.8C54.2 44.7 50.2 44 48 46.5Z" fill={accentColor} />
        </g>
      )}

      {motif === 'velvet-lantern' && (
        <g>
          <path d="M48 19V27" stroke="#D9B77E" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="34" y="30" width="28" height="34" rx="14" fill={accentColor} fillOpacity="0.18" stroke={accentColor} strokeWidth="1.8" />
          <path d="M40 31V63M56 31V63" stroke="#D9B77E" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M48 40C51 44 52 47 52 50C52 52.5 50.2 54.5 48 54.5C45.8 54.5 44 52.5 44 50C44 47 45 44 48 40Z" fill="#D9B77E" />
          <path d="M42 67H54" stroke="#D9B77E" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      {motif === 'pressed-olive' && (
        <g>
          <path d="M30 68C39 55 51 42 66 28" stroke="#7A947E" strokeWidth="1.7" strokeLinecap="round" />
          <ellipse cx="41" cy="49" rx="7" ry="3.2" transform="rotate(-38 41 49)" fill="#89A48D" />
          <ellipse cx="52" cy="39" rx="7" ry="3.2" transform="rotate(-38 52 39)" fill="#89A48D" />
          <ellipse cx="47" cy="57" rx="7" ry="3.2" transform="rotate(24 47 57)" fill={accentColor} fillOpacity="0.75" />
          <ellipse cx="58" cy="47" rx="7" ry="3.2" transform="rotate(24 58 47)" fill="#89A48D" fillOpacity="0.85" />
          <circle cx="66" cy="28" r="2.6" fill="#D9B77E" />
        </g>
      )}

      {motif === 'golden-bands' && (
        <g>
          <circle cx="41" cy="50" r="14" stroke="#D9B77E" strokeWidth="2.6" />
          <circle cx="55" cy="50" r="14" stroke={accentColor} strokeWidth="2.4" />
          <path d="M48 26L50 30L54 32L50 34L48 38L46 34L42 32L46 30L48 26Z" fill="#D9B77E" />
        </g>
      )}

      {motif === 'linen-monogram' && (
        <g>
          <rect x="25" y="24" width="46" height="48" rx="4" fill="#FFF9F3" stroke="#D9B77E" strokeWidth="1.6" />
          <rect x="30" y="29" width="36" height="38" rx="2" stroke={accentColor} strokeWidth="1.1" strokeOpacity="0.6" />
          <path d="M48 36V60M39 48H57" stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="48" cy="48" r="5" fill="#FFF9F3" stroke="#D9B77E" strokeWidth="1.6" />
        </g>
      )}

      {motif === 'warm-hearth' && (
        <g>
          <path d="M31 66H65" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
          <rect x="40" y="42" width="16" height="24" rx="3" fill="#FFF9F3" stroke={accentColor} strokeWidth="1.6" />
          <path d="M48 26C51.5 31 53 34.5 53 37.5C53 40.3 50.8 42.5 48 42.5C45.2 42.5 43 40.3 43 37.5C43 34.5 44.5 31 48 26Z" fill="#D9B77E" />
          <circle cx="33" cy="36" r="2" fill={accentColor} fillOpacity="0.6" />
          <circle cx="63" cy="34" r="2" fill="#D9B77E" />
        </g>
      )}

      {motif === 'starlight-bell' && (
        <g>
          <path d="M48 22L51 31L60 34L51 37L48 46L45 37L36 34L45 31L48 22Z" fill="#D9B77E" />
          <path d="M31 53L32.8 58L38 59.8L32.8 61.5L31 66.5L29.2 61.5L24 59.8L29.2 58L31 53Z" fill={accentColor} />
          <path d="M64 49L65.6 53L70 54.6L65.6 56.2L64 60.5L62.4 56.2L58 54.6L62.4 53L64 49Z" fill="#D9B77E" />
          <circle cx="48" cy="64" r="3" fill={accentColor} fillOpacity="0.7" />
        </g>
      )}
    </svg>
  )
}

export function LoveCalendarHeroIllustration({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[430px] select-none" aria-hidden="true">
      {/* Subtle aura */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2.5rem] opacity-60 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(233, 166, 181, 0.42), transparent 58%), radial-gradient(circle at 75% 75%, rgba(217, 183, 126, 0.34), transparent 60%)',
        }}
      />

      {/* Back sheet: Month ledger preview */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        className="relative rounded-[2rem] border p-6 sm:p-7"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase" style={{ color: 'var(--accent-gold)' }}>
              Annual Edition
            </p>
            <p className="mt-0.5 font-display text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              12 Chapters of Love
            </p>
          </div>
          <span className="font-display text-3xl italic font-semibold" style={{ color: 'var(--accent-rose)' }}>
            365
          </span>
        </div>

        {/* Mini botanical calendar grid */}
        <div className="mt-5 grid grid-cols-4 gap-2.5 text-center">
          {[
            { m: 'JAN', tint: '#FBF4E9', ink: '#472C42' },
            { m: 'FEB', tint: '#F8DDE4', ink: '#7B2944' },
            { m: 'MAR', tint: '#EDE7F8', ink: '#472C42' },
            { m: 'APR', tint: '#FCE8EE', ink: '#7B2944' },
            { m: 'MAY', tint: '#FCEAE1', ink: '#4D2B28' },
            { m: 'JUN', tint: '#F9EEDB', ink: '#472C42' },
            { m: 'JUL', tint: '#F6DCE4', ink: '#7B2944' },
            { m: 'AUG', tint: '#F5ECE1', ink: '#472C42' },
            { m: 'SEP', tint: '#F3E3E9', ink: '#7B2944' },
            { m: 'OCT', tint: '#F4E8D8', ink: '#4D2B28' },
            { m: 'NOV', tint: '#FAE6DC', ink: '#4D2B28' },
            { m: 'DEC', tint: '#EAE4F7', ink: '#362344' },
          ].map((cell, idx) => (
            <div
              key={cell.m}
              className="rounded-xl border px-2 py-2.5"
              style={{
                backgroundColor: cell.tint,
                borderColor: idx === 1 ? '#B5546D' : 'rgba(71, 44, 66, 0.1)',
                color: cell.ink,
              }}
            >
              <span className="block text-[0.65rem] font-semibold tracking-[0.14em]">{cell.m}</span>
              <span className="mt-0.5 block font-display text-sm italic">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Hand-crafted keepsake cards
          </span>
          <span className="text-xs font-semibold" style={{ color: 'var(--accent-rose)' }}>
            Jan — Dec
          </span>
        </div>
      </motion.div>

      {/* Overlapping wax-sealed Valentine / Romantic keepsake mini card */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 18, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.12, ease: 'easeOut' }}
        className="mt-[-2.25rem] ml-auto w-[78%] rounded-2xl border p-4 sm:p-5 backdrop-blur-sm"
        style={{
          backgroundColor: '#472C42',
          borderColor: 'rgba(217, 183, 126, 0.45)',
          color: '#FFF9F3',
          boxShadow: '0 20px 40px -16px rgba(42, 23, 38, 0.55)',
        }}
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF9F3]/10 border border-[#D9B77E]/40">
            <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none">
              <rect x="4" y="8" width="28" height="20" rx="3" stroke="#FFF9F3" strokeWidth="1.5" />
              <path d="M5 10L18 19.5L31 10" stroke="#D9B77E" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="18" cy="19.5" r="3.4" fill="#E9A6B5" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-[#D9B77E]">
              Featured Tradition
            </p>
            <p className="font-display text-lg font-semibold leading-snug text-[#FFF9F3]">
              February 14 · Valentine’s Day
            </p>
            <p className="text-xs text-[#E2CED8] truncate">
              Personalize and send in seconds
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
