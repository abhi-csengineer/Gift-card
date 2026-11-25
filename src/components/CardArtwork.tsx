import type { ArtworkMotif } from '../types/card'

interface CardArtworkProps {
  motif: ArtworkMotif
  accent: string
  foil: string
  text: string
  className?: string
}

export function CardArtwork({ motif, accent, foil, text, className = 'w-full h-full' }: CardArtworkProps) {
  switch (motif) {
    case 'botanical-arch':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path
            d="M42 178V88C42 44.922 76.922 10 120 10C163.078 10 198 44.922 198 88V178"
            stroke={foil}
            strokeWidth="1.5"
          />
          <path
            d="M52 178V90C52 52.445 82.445 22 120 22C157.555 22 188 52.445 188 90V178"
            stroke={foil}
            strokeWidth="0.9"
            strokeOpacity="0.55"
            strokeDasharray="3 4"
          />
          {/* Left botanical stem */}
          <path d="M72 152C68 122 78 96 96 76" stroke={text} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="64" cy="126" rx="11" ry="6" transform="rotate(-35 64 126)" fill={accent} fillOpacity="0.45" />
          <ellipse cx="86" cy="112" rx="10" ry="5.5" transform="rotate(28 86 112)" fill={foil} fillOpacity="0.45" />
          <ellipse cx="75" cy="94" rx="10" ry="5.5" transform="rotate(-24 75 94)" fill={accent} fillOpacity="0.55" />
          {/* Central rose bloom */}
          <circle cx="120" cy="82" r="24" fill={accent} fillOpacity="0.22" />
          <circle cx="120" cy="82" r="15" fill={accent} fillOpacity="0.55" />
          <path
            d="M112 80C112 75 117 72 121 74C125 76 126 82 122 86C117 90 110 87 110 81"
            stroke={text}
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Right botanical sprig */}
          <path d="M168 152C170 124 160 98 143 80" stroke={text} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="174" cy="126" rx="11" ry="6" transform="rotate(34 174 126)" fill={foil} fillOpacity="0.45" />
          <ellipse cx="154" cy="110" rx="10" ry="5.5" transform="rotate(-25 154 110)" fill={accent} fillOpacity="0.5" />
          {/* Gold sparkles */}
          <path d="M120 38L122 44L128 46L122 48L120 54L118 48L112 46L118 44L120 38Z" fill={foil} />
          <circle cx="95" cy="54" r="2.2" fill={foil} />
          <circle cx="145" cy="54" r="2.2" fill={foil} />
        </svg>
      )

    case 'celestial-moon':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="92" r="66" stroke={foil} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="120" cy="92" r="50" fill={accent} fillOpacity="0.14" />
          {/* Crescent moon */}
          <path
            d="M128 48C105.909 48 88 65.909 88 88C88 110.091 105.909 128 128 128C136.178 128 143.784 125.545 150.116 121.333C133.541 120.237 120.444 106.449 120.444 89.6C120.444 72.751 133.541 58.963 150.116 57.867C143.784 53.655 136.178 48 128 48Z"
            fill={foil}
          />
          {/* North star */}
          <path d="M156 54L159 64L169 67L159 70L156 80L153 70L143 67L153 64L156 54Z" fill={accent} />
          <path d="M74 62L75.8 68L82 69.8L75.8 71.6L74 77.6L72.2 71.6L66 69.8L72.2 68L74 62Z" fill={foil} />
          <path d="M168 116L169.5 121L174.5 122.5L169.5 124L168 129L166.5 124L161.5 122.5L166.5 121L168 116Z" fill={foil} />
          <circle cx="88" cy="134" r="2.5" fill={accent} />
          <circle cx="144" cy="144" r="2" fill={foil} />
          <circle cx="62" cy="102" r="1.8" fill={foil} />
        </svg>
      )

    case 'champagne-toast':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="62" fill={foil} fillOpacity="0.1" />
          {/* Left flute */}
          <g transform="rotate(-12 96 105)">
            <path d="M84 52H108L104 98C103.5 104 98.5 108 96 108C93.5 108 88.5 104 88 98L84 52Z" fill={accent} fillOpacity="0.35" stroke={foil} strokeWidth="1.6" />
            <line x1="96" y1="108" x2="96" y2="146" stroke={foil} strokeWidth="1.6" />
            <line x1="84" y1="146" x2="108" y2="146" stroke={foil} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M86 68H106" stroke={foil} strokeOpacity="0.65" strokeWidth="1" />
          </g>
          {/* Right flute */}
          <g transform="rotate(12 144 105)">
            <path d="M132 52H156L152 98C151.5 104 146.5 108 144 108C141.5 108 136.5 104 136 98L132 52Z" fill={foil} fillOpacity="0.28" stroke={foil} strokeWidth="1.6" />
            <line x1="144" y1="108" x2="144" y2="146" stroke={foil} strokeWidth="1.6" />
            <line x1="132" y1="146" x2="156" y2="146" stroke={foil} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M134 68H154" stroke={foil} strokeOpacity="0.65" strokeWidth="1" />
          </g>
          {/* Rising effervescence & stars */}
          <path d="M120 26L122.5 34L130.5 36.5L122.5 39L120 47L117.5 39L109.5 36.5L117.5 34L120 26Z" fill={foil} />
          <circle cx="108" cy="40" r="2.5" fill={accent} />
          <circle cx="132" cy="42" r="2.5" fill={foil} />
          <circle cx="120" cy="60" r="2" fill={foil} />
          <circle cx="72" cy="70" r="2.2" fill={foil} />
          <circle cx="168" cy="72" r="2.2" fill={accent} />
        </svg>
      )

    case 'peony-bouquet':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          {/* Stems */}
          <path d="M120 162V104" stroke={text} strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M120 144C102 132 90 116 86 96" stroke={text} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M120 144C138 132 150 116 154 96" stroke={text} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
          {/* Leaves */}
          <ellipse cx="98" cy="134" rx="16" ry="7" transform="rotate(-32 98 134)" fill={foil} fillOpacity="0.4" />
          <ellipse cx="142" cy="134" rx="16" ry="7" transform="rotate(32 142 134)" fill={foil} fillOpacity="0.4" />
          {/* Side buds */}
          <circle cx="84" cy="92" r="18" fill={accent} fillOpacity="0.45" />
          <circle cx="84" cy="92" r="10" fill={accent} fillOpacity="0.7" />
          <circle cx="156" cy="92" r="18" fill={accent} fillOpacity="0.45" />
          <circle cx="156" cy="92" r="10" fill={accent} fillOpacity="0.7" />
          {/* Center lush peony */}
          <circle cx="120" cy="76" r="32" fill={accent} fillOpacity="0.3" />
          <circle cx="110" cy="72" r="18" fill={accent} fillOpacity="0.55" />
          <circle cx="130" cy="72" r="18" fill={accent} fillOpacity="0.55" />
          <circle cx="120" cy="84" r="18" fill={accent} fillOpacity="0.65" />
          <circle cx="120" cy="76" r="10" fill={foil} />
          {/* Ribbon */}
          <path d="M106 150C114 146 126 146 134 150" stroke={foil} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )

    case 'heritage-compass':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="94" r="62" stroke={foil} strokeWidth="1.6" />
          <circle cx="120" cy="94" r="52" stroke={text} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="120" cy="94" r="38" stroke={foil} strokeOpacity="0.6" strokeWidth="1" />
          {/* Compass points */}
          <path d="M120 38L128 86L176 94L128 102L120 150L112 102L64 94L112 86L120 38Z" fill={foil} fillOpacity="0.35" stroke={foil} strokeWidth="1.4" />
          <path d="M90 64L120 88L150 64L126 94L150 124L120 100L90 124L114 94L90 64Z" fill={accent} fillOpacity="0.45" />
          <circle cx="120" cy="94" r="7" fill={text} />
          <circle cx="120" cy="94" r="3" fill={foil} />
        </svg>
      )

    case 'golden-laurel':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="94" r="56" fill={foil} fillOpacity="0.1" />
          {/* Left wreath arc */}
          <path d="M114 146C78 138 62 104 72 68C78 48 92 38 106 34" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          {/* Right wreath arc */}
          <path d="M126 146C162 138 178 104 168 68C162 48 148 38 134 34" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          {/* Leaves along arcs */}
          {[
            [76, 122, -45],
            [68, 98, -20],
            [72, 74, 15],
            [86, 52, 40],
            [164, 122, 45],
            [172, 98, 20],
            [168, 74, -15],
            [154, 52, -40],
          ].map(([cx, cy, rot], idx) => (
            <ellipse
              key={idx}
              cx={cx}
              cy={cy}
              rx="10"
              ry="4.5"
              transform={`rotate(${rot} ${cx} ${cy})`}
              fill={idx % 2 === 0 ? foil : accent}
              fillOpacity="0.7"
            />
          ))}
          {/* Star crest */}
          <path d="M120 68L125 84L142 84L128 94L133 110L120 100L107 110L112 94L98 84L115 84L120 68Z" fill={foil} />
        </svg>
      )

    case 'pressed-wildflowers':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 164C120 130 116 92 106 46" stroke={text} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M120 164C126 132 138 96 154 58" stroke={text} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M120 164C104 134 86 106 78 72" stroke={text} strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" />
          {/* Delicate blossoms */}
          <circle cx="106" cy="46" r="11" fill={accent} fillOpacity="0.65" />
          <circle cx="106" cy="46" r="4" fill={foil} />
          <circle cx="154" cy="58" r="10" fill={foil} fillOpacity="0.65" />
          <circle cx="154" cy="58" r="3.5" fill={text} fillOpacity="0.6" />
          <circle cx="78" cy="72" r="9" fill={accent} fillOpacity="0.5" />
          <ellipse cx="96" cy="112" rx="12" ry="4.5" transform="rotate(-35 96 112)" fill={foil} fillOpacity="0.5" />
          <ellipse cx="136" cy="118" rx="12" ry="4.5" transform="rotate(35 136 118)" fill={accent} fillOpacity="0.45" />
          {/* Tape strip */}
          <rect x="106" y="146" width="28" height="10" rx="2" transform="rotate(-6 120 151)" fill={foil} fillOpacity="0.65" />
        </svg>
      )

    case 'daisy-polaroid':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="64" y="26" width="112" height="136" rx="8" fill={foil} fillOpacity="0.16" stroke={foil} strokeWidth="1.4" />
          <rect x="76" y="38" width="88" height="84" rx="4" fill={accent} fillOpacity="0.2" />
          {/* Daisy petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="64"
              rx="6"
              ry="15"
              transform={`rotate(${deg} 120 80)`}
              fill="#FFF9F3"
              fillOpacity="0.92"
              stroke={text}
              strokeOpacity="0.2"
            />
          ))}
          <circle cx="120" cy="80" r="10" fill={foil} />
          <path d="M92 140H148" stroke={text} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case 'minimalist-monogram':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="58" y="24" width="124" height="142" rx="4" stroke={foil} strokeWidth="1.5" />
          <rect x="66" y="32" width="108" height="126" rx="2" stroke={text} strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="120" cy="95" r="34" stroke={foil} strokeWidth="1.4" />
          <path d="M106 108L120 74L134 108M111 98H129" stroke={text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="94" y1="142" x2="146" y2="142" stroke={foil} strokeWidth="1.2" />
        </svg>
      )

    case 'festive-lanterns':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          {/* Hanging cords */}
          <line x1="88" y1="10" x2="88" y2="54" stroke={foil} strokeWidth="1.2" />
          <line x1="152" y1="10" x2="152" y2="42" stroke={foil} strokeWidth="1.2" />
          <line x1="120" y1="10" x2="120" y2="68" stroke={foil} strokeWidth="1.4" />
          {/* Left lantern */}
          <rect x="72" y="54" width="32" height="44" rx="14" fill={accent} fillOpacity="0.55" stroke={foil} strokeWidth="1.5" />
          <line x1="88" y1="98" x2="88" y2="114" stroke={foil} strokeWidth="1.5" />
          {/* Center lantern */}
          <rect x="100" y="68" width="40" height="54" rx="18" fill={foil} fillOpacity="0.38" stroke={foil} strokeWidth="1.8" />
          <circle cx="120" cy="95" r="9" fill={foil} fillOpacity="0.85" />
          <line x1="120" y1="122" x2="120" y2="146" stroke={foil} strokeWidth="1.8" />
          {/* Right lantern */}
          <rect x="136" y="42" width="32" height="44" rx="14" fill={accent} fillOpacity="0.45" stroke={foil} strokeWidth="1.5" />
          <line x1="152" y1="86" x2="152" y2="104" stroke={foil} strokeWidth="1.5" />
          {/* Glow sparkles */}
          <circle cx="62" cy="118" r="2.2" fill={foil} />
          <circle cx="178" cy="112" r="2.5" fill={foil} />
          <circle cx="120" cy="158" r="2.5" fill={accent} />
        </svg>
      )

    case 'sunset-horizon':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M56 164V92C56 56.654 84.654 28 120 28C155.346 28 184 56.654 184 92V164H56Z" fill={accent} fillOpacity="0.2" stroke={foil} strokeWidth="1.5" />
          <circle cx="120" cy="96" r="28" fill={foil} fillOpacity="0.65" />
          <path d="M62 126C82 118 100 120 120 126C140 132 158 130 178 124V164H62V126Z" fill={accent} fillOpacity="0.45" />
          <path d="M62 142C86 136 106 140 126 144C146 148 164 144 178 140V164H62V142Z" fill={text} fillOpacity="0.22" />
        </svg>
      )

    case 'cozy-teacup':
    default:
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          {/* Steam wisps */}
          <path d="M104 64C100 54 108 46 104 36" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M122 58C118 48 126 40 122 30" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M138 66C134 56 142 48 138 38" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          {/* Teacup */}
          <path d="M78 82H162V104C162 126.091 144.091 144 122 144H118C95.909 144 78 126.091 78 104V82Z" fill={accent} fillOpacity="0.3" stroke={text} strokeOpacity="0.7" strokeWidth="1.6" />
          <path d="M162 90H170C176.627 90 182 95.373 182 102C182 108.627 176.627 114 170 114H161" stroke={text} strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />
          {/* Saucer */}
          <ellipse cx="120" cy="148" rx="54" ry="8" fill={foil} fillOpacity="0.4" stroke={foil} strokeWidth="1.3" />
          {/* Little heart on cup */}
          <path d="M120 118C120 118 110 111 110 104.5C110 101 112.8 98.5 116 98.5C118 98.5 119.3 99.6 120 100.8C120.7 99.6 122 98.5 124 98.5C127.2 98.5 130 101 130 104.5C130 111 120 118 120 118Z" fill={accent} />
        </svg>
      )
  }
}
