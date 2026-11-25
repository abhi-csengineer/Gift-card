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
          <path d="M72 152C68 122 78 96 96 76" stroke={text} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="64" cy="126" rx="11" ry="6" transform="rotate(-35 64 126)" fill={accent} fillOpacity="0.45" />
          <ellipse cx="86" cy="112" rx="10" ry="5.5" transform="rotate(28 86 112)" fill={foil} fillOpacity="0.45" />
          <ellipse cx="75" cy="94" rx="10" ry="5.5" transform="rotate(-24 75 94)" fill={accent} fillOpacity="0.55" />
          <circle cx="120" cy="82" r="24" fill={accent} fillOpacity="0.22" />
          <circle cx="120" cy="82" r="15" fill={accent} fillOpacity="0.55" />
          <path
            d="M112 80C112 75 117 72 121 74C125 76 126 82 122 86C117 90 110 87 110 81"
            stroke={text}
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M168 152C170 124 160 98 143 80" stroke={text} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="174" cy="126" rx="11" ry="6" transform="rotate(34 174 126)" fill={foil} fillOpacity="0.45" />
          <ellipse cx="154" cy="110" rx="10" ry="5.5" transform="rotate(-25 154 110)" fill={accent} fillOpacity="0.5" />
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
          <path
            d="M128 48C105.909 48 88 65.909 88 88C88 110.091 105.909 128 128 128C136.178 128 143.784 125.545 150.116 121.333C133.541 120.237 120.444 106.449 120.444 89.6C120.444 72.751 133.541 58.963 150.116 57.867C143.784 53.655 136.178 48 128 48Z"
            fill={foil}
          />
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
          <g transform="rotate(-12 96 105)">
            <path d="M84 52H108L104 98C103.5 104 98.5 108 96 108C93.5 108 88.5 104 88 98L84 52Z" fill={accent} fillOpacity="0.35" stroke={foil} strokeWidth="1.6" />
            <line x1="96" y1="108" x2="96" y2="146" stroke={foil} strokeWidth="1.6" />
            <line x1="84" y1="146" x2="108" y2="146" stroke={foil} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M86 68H106" stroke={foil} strokeOpacity="0.65" strokeWidth="1" />
          </g>
          <g transform="rotate(12 144 105)">
            <path d="M132 52H156L152 98C151.5 104 146.5 108 144 108C141.5 108 136.5 104 136 98L132 52Z" fill={foil} fillOpacity="0.28" stroke={foil} strokeWidth="1.6" />
            <line x1="144" y1="108" x2="144" y2="146" stroke={foil} strokeWidth="1.6" />
            <line x1="132" y1="146" x2="156" y2="146" stroke={foil} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M134 68H154" stroke={foil} strokeOpacity="0.65" strokeWidth="1" />
          </g>
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
          <path d="M120 162V104" stroke={text} strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M120 144C102 132 90 116 86 96" stroke={text} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M120 144C138 132 150 116 154 96" stroke={text} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="98" cy="134" rx="16" ry="7" transform="rotate(-32 98 134)" fill={foil} fillOpacity="0.4" />
          <ellipse cx="142" cy="134" rx="16" ry="7" transform="rotate(32 142 134)" fill={foil} fillOpacity="0.4" />
          <circle cx="84" cy="92" r="18" fill={accent} fillOpacity="0.45" />
          <circle cx="84" cy="92" r="10" fill={accent} fillOpacity="0.7" />
          <circle cx="156" cy="92" r="18" fill={accent} fillOpacity="0.45" />
          <circle cx="156" cy="92" r="10" fill={accent} fillOpacity="0.7" />
          <circle cx="120" cy="76" r="32" fill={accent} fillOpacity="0.3" />
          <circle cx="110" cy="72" r="18" fill={accent} fillOpacity="0.55" />
          <circle cx="130" cy="72" r="18" fill={accent} fillOpacity="0.55" />
          <circle cx="120" cy="84" r="18" fill={accent} fillOpacity="0.65" />
          <circle cx="120" cy="76" r="10" fill={foil} />
          <path d="M106 150C114 146 126 146 134 150" stroke={foil} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )

    case 'heritage-compass':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="94" r="62" stroke={foil} strokeWidth="1.6" />
          <circle cx="120" cy="94" r="52" stroke={text} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="120" cy="94" r="38" stroke={foil} strokeOpacity="0.6" strokeWidth="1" />
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
          <path d="M114 146C78 138 62 104 72 68C78 48 92 38 106 34" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M126 146C162 138 178 104 168 68C162 48 148 38 134 34" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
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
          <path d="M120 68L125 84L142 84L128 94L133 110L120 100L107 110L112 94L98 84L115 84L120 68Z" fill={foil} />
        </svg>
      )

    case 'pressed-wildflowers':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 164C120 130 116 92 106 46" stroke={text} strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M120 164C126 132 138 96 154 58" stroke={text} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M120 164C104 134 86 106 78 72" stroke={text} strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="106" cy="46" r="11" fill={accent} fillOpacity="0.65" />
          <circle cx="106" cy="46" r="4" fill={foil} />
          <circle cx="154" cy="58" r="10" fill={foil} fillOpacity="0.65" />
          <circle cx="154" cy="58" r="3.5" fill={text} fillOpacity="0.6" />
          <circle cx="78" cy="72" r="9" fill={accent} fillOpacity="0.5" />
          <ellipse cx="96" cy="112" rx="12" ry="4.5" transform="rotate(-35 96 112)" fill={foil} fillOpacity="0.5" />
          <ellipse cx="136" cy="118" rx="12" ry="4.5" transform="rotate(35 136 118)" fill={accent} fillOpacity="0.45" />
          <rect x="106" y="146" width="28" height="10" rx="2" transform="rotate(-6 120 151)" fill={foil} fillOpacity="0.65" />
        </svg>
      )

    case 'daisy-polaroid':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="64" y="26" width="112" height="136" rx="8" fill={foil} fillOpacity="0.16" stroke={foil} strokeWidth="1.4" />
          <rect x="76" y="38" width="88" height="84" rx="4" fill={accent} fillOpacity="0.2" />
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
          <line x1="88" y1="10" x2="88" y2="54" stroke={foil} strokeWidth="1.2" />
          <line x1="152" y1="10" x2="152" y2="42" stroke={foil} strokeWidth="1.2" />
          <line x1="120" y1="10" x2="120" y2="68" stroke={foil} strokeWidth="1.4" />
          <rect x="72" y="54" width="32" height="44" rx="14" fill={accent} fillOpacity="0.55" stroke={foil} strokeWidth="1.5" />
          <line x1="88" y1="98" x2="88" y2="114" stroke={foil} strokeWidth="1.5" />
          <rect x="100" y="68" width="40" height="54" rx="18" fill={foil} fillOpacity="0.38" stroke={foil} strokeWidth="1.8" />
          <circle cx="120" cy="95" r="9" fill={foil} fillOpacity="0.85" />
          <line x1="120" y1="122" x2="120" y2="146" stroke={foil} strokeWidth="1.8" />
          <rect x="136" y="42" width="32" height="44" rx="14" fill={accent} fillOpacity="0.45" stroke={foil} strokeWidth="1.5" />
          <line x1="152" y1="86" x2="152" y2="104" stroke={foil} strokeWidth="1.5" />
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

    case 'morning-sunbeam':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="96" r="34" fill={foil} fillOpacity="0.65" />
          <circle cx="120" cy="96" r="22" fill={accent} fillOpacity="0.45" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="120"
              y1="44"
              x2="120"
              y2="28"
              stroke={foil}
              strokeWidth="1.8"
              strokeLinecap="round"
              transform={`rotate(${deg} 120 96)`}
            />
          ))}
          <path d="M48 144C78 132 102 138 122 144C142 150 166 146 192 136" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )

    case 'velvet-heart-seal':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="56" fill={accent} fillOpacity="0.22" stroke={foil} strokeWidth="1.5" />
          <circle cx="120" cy="95" r="44" stroke={foil} strokeWidth="1.2" strokeDasharray="3 3" />
          <path
            d="M120 124C120 124 88 103 88 82C88 71 97 64 106 64C113 64 118 68 120 73C122 68 127 64 134 64C143 64 152 71 152 82C152 103 120 124 120 124Z"
            fill={accent}
            stroke={foil}
            strokeWidth="1.6"
          />
          <path d="M168 48L170 54L176 56L170 58L168 64L166 58L160 56L166 54L168 48Z" fill={foil} />
          <path d="M70 124L72 130L78 132L72 134L70 140L68 134L62 132L68 130L70 124Z" fill={foil} />
        </svg>
      )

    case 'couple-rings':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="102" cy="96" r="36" stroke={foil} strokeWidth="2.8" />
          <circle cx="102" cy="96" r="31" stroke={foil} strokeOpacity="0.45" strokeWidth="1" />
          <circle cx="138" cy="96" r="36" stroke={accent} strokeWidth="2.8" />
          <circle cx="138" cy="96" r="31" stroke={foil} strokeOpacity="0.45" strokeWidth="1" />
          <path d="M120 34L123 44L133 47L123 50L120 60L117 50L107 47L117 44L120 34Z" fill={foil} />
          <circle cx="120" cy="148" r="3" fill={accent} />
        </svg>
      )

    case 'olive-family-tree':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 158V84" stroke={text} strokeOpacity="0.65" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M120 128C100 116 86 98 76 74" stroke={text} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M120 120C140 108 156 90 166 68" stroke={text} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="86" cy="92" rx="14" ry="6" transform="rotate(-30 86 92)" fill={accent} fillOpacity="0.65" />
          <ellipse cx="76" cy="70" rx="12" ry="5.5" transform="rotate(-48 76 70)" fill={foil} fillOpacity="0.6" />
          <ellipse cx="152" cy="88" rx="14" ry="6" transform="rotate(30 152 88)" fill={accent} fillOpacity="0.65" />
          <ellipse cx="164" cy="66" rx="12" ry="5.5" transform="rotate(42 164 66)" fill={foil} fillOpacity="0.6" />
          <ellipse cx="120" cy="60" rx="14" ry="7" fill={accent} fillOpacity="0.7" />
          <path d="M90 158H150" stroke={foil} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'confetti-celebration':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="96" r="46" fill={foil} fillOpacity="0.14" />
          <path d="M120 46L125 66L145 71L125 76L120 96L115 76L95 71L115 66L120 46Z" fill={foil} />
          <path d="M70 60C82 68 86 80 78 92" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M168 58C156 68 156 80 166 92" stroke={foil} strokeWidth="2.4" strokeLinecap="round" />
          <rect x="64" y="114" width="14" height="6" rx="3" transform="rotate(-24 71 117)" fill={accent} />
          <rect x="158" y="118" width="14" height="6" rx="3" transform="rotate(28 165 121)" fill={foil} />
          <circle cx="96" cy="128" r="5" fill={accent} fillOpacity="0.75" />
          <circle cx="144" cy="130" r="4" fill={foil} />
          <circle cx="120" cy="144" r="5.5" fill={accent} />
        </svg>
      )

    case 'butterfly-meadow':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 132V76" stroke={text} strokeWidth="2" strokeLinecap="round" />
          <path d="M120 82C100 50 64 56 68 84C72 104 98 106 120 98Z" fill={accent} fillOpacity="0.55" stroke={foil} strokeWidth="1.3" />
          <path d="M120 82C140 50 176 56 172 84C168 104 142 106 120 98Z" fill={accent} fillOpacity="0.55" stroke={foil} strokeWidth="1.3" />
          <path d="M120 100C98 104 78 122 88 136C98 148 114 134 120 116Z" fill={foil} fillOpacity="0.5" stroke={foil} strokeWidth="1.2" />
          <path d="M120 100C142 104 162 122 152 136C142 148 126 134 120 116Z" fill={foil} fillOpacity="0.5" stroke={foil} strokeWidth="1.2" />
          <circle cx="88" cy="78" r="4" fill="#FFF9F3" fillOpacity="0.7" />
          <circle cx="152" cy="78" r="4" fill="#FFF9F3" fillOpacity="0.7" />
        </svg>
      )

    case 'starry-lullaby':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="64" fill={foil} fillOpacity="0.09" />
          <path
            d="M118 46C95 48 78 68 80 92C82 116 102 134 126 132C136 131 145 127 151 120C134 122 118 110 116 92C114 74 126 57 142 52C134 47 126 45 118 46Z"
            fill={foil}
          />
          <circle cx="156" cy="72" r="4" fill={accent} />
          <circle cx="168" cy="100" r="2.5" fill={foil} />
          <circle cx="72" cy="64" r="2.5" fill={foil} />
          <path d="M148 136L151 144L159 147L151 150L148 158L145 150L137 147L145 144L148 136Z" fill={foil} />
        </svg>
      )

    case 'ribbon-giftbox':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="74" y="76" width="92" height="72" rx="10" fill={accent} fillOpacity="0.28" stroke={foil} strokeWidth="1.8" />
          <rect x="68" y="64" width="104" height="20" rx="6" fill={foil} fillOpacity="0.32" stroke={foil} strokeWidth="1.6" />
          <line x1="120" y1="64" x2="120" y2="148" stroke={foil} strokeWidth="2.4" />
          <ellipse cx="104" cy="54" rx="16" ry="9" transform="rotate(-20 104 54)" stroke={foil} strokeWidth="1.8" fill={accent} fillOpacity="0.28" />
          <ellipse cx="136" cy="54" rx="16" ry="9" transform="rotate(20 136 54)" stroke={foil} strokeWidth="1.8" fill={accent} fillOpacity="0.28" />
          <circle cx="120" cy="58" r="5" fill={foil} />
        </svg>
      )

    case 'tulip-greeting':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 158V94" stroke={text} strokeOpacity="0.6" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M98 156C96 132 104 114 118 110" stroke={text} strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M142 156C144 132 136 114 122 110" stroke={text} strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M92 64C92 48 104 42 120 56C136 42 148 48 148 64C148 88 134 100 120 100C106 100 92 88 92 64Z" fill={accent} fillOpacity="0.62" stroke={foil} strokeWidth="1.4" />
          <path d="M108 54C114 42 126 42 132 54" stroke={foil} strokeWidth="1.4" />
          <ellipse cx="102" cy="132" rx="14" ry="5" transform="rotate(-35 102 132)" fill={foil} fillOpacity="0.45" />
          <ellipse cx="138" cy="132" rx="14" ry="5" transform="rotate(35 138 132)" fill={foil} fillOpacity="0.45" />
        </svg>
      )

    case 'aurora-bloom':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="58" stroke={foil} strokeOpacity="0.45" strokeWidth="1.4" />
          <circle cx="120" cy="95" r="40" fill={accent} fillOpacity="0.2" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="66"
              rx="10"
              ry="22"
              transform={`rotate(${deg} 120 95)`}
              fill={deg % 120 === 0 ? accent : foil}
              fillOpacity="0.48"
            />
          ))}
          <circle cx="120" cy="95" r="10" fill={foil} />
        </svg>
      )

    case 'fireworks-burst':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="86" r="56" fill={foil} fillOpacity="0.1" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="120"
              y1="86"
              x2="120"
              y2={deg % 60 === 0 ? '30' : '44'}
              stroke={deg % 60 === 0 ? foil : accent}
              strokeWidth={deg % 60 === 0 ? '2' : '1.4'}
              strokeLinecap="round"
              transform={`rotate(${deg} 120 86)`}
            />
          ))}
          <circle cx="120" cy="86" r="8" fill={foil} />
          <path d="M64 46L66.5 53L73.5 55.5L66.5 58L64 65L61.5 58L54.5 55.5L61.5 53L64 46Z" fill={foil} />
          <path d="M178 44L180 50L186 52L180 54L178 60L176 54L170 52L176 50L178 44Z" fill={accent} />
          <circle cx="76" cy="140" r="3" fill={accent} />
          <circle cx="164" cy="138" r="3" fill={foil} />
          <path d="M64 156C94 148 146 148 176 156" stroke={foil} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'warm-embrace':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="96" r="58" fill={accent} fillOpacity="0.16" />
          <circle cx="99" cy="60" r="14" fill={accent} fillOpacity="0.85" />
          <circle cx="141" cy="64" r="13" fill={foil} fillOpacity="0.9" />
          <path d="M74 146C74 108 86 88 106 88C116 88 122 94 126 104L126 146H74Z" fill={accent} fillOpacity="0.6" />
          <path d="M166 146C166 112 154 92 134 92C124 92 118 98 114 108L114 146H166Z" fill={foil} fillOpacity="0.55" />
          <path d="M90 108C108 118 134 114 150 100" stroke={text} strokeOpacity="0.65" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M150 116C132 126 106 124 90 112" stroke={text} strokeOpacity="0.55" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M120 34C120 34 111 28 111 22C111 19 113.5 16.5 116.5 16.5C118.4 16.5 119.5 17.6 120 18.8C120.5 17.6 121.6 16.5 123.5 16.5C126.5 16.5 129 19 129 22C129 28 120 34 120 34Z" fill={accent} />
        </svg>
      )

    case 'welsh-daffodil-heart':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path
            d="M120 148C120 148 70 116 70 80C70 60 86 48 102 48C111 48 117 53 120 60C123 53 129 48 138 48C154 48 170 60 170 80C170 116 120 148 120 148Z"
            stroke={foil}
            strokeWidth="1.8"
            fill={accent}
            fillOpacity="0.16"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="69"
              rx="8"
              ry="16"
              transform={`rotate(${deg} 120 92)`}
              fill={foil}
              fillOpacity="0.72"
            />
          ))}
          <circle cx="120" cy="92" r="11" fill={accent} stroke="#FFF9F3" strokeWidth="1.6" />
          <path d="M90 132C102 140 138 140 150 132" stroke={text} strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'rose-bloom':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 162V106" stroke="#5E8266" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="101" cy="136" rx="16" ry="7" transform="rotate(-32 101 136)" fill="#6C9174" fillOpacity="0.78" />
          <ellipse cx="139" cy="128" rx="16" ry="7" transform="rotate(30 139 128)" fill="#6C9174" fillOpacity="0.85" />
          <circle cx="120" cy="76" r="34" fill={accent} fillOpacity="0.28" />
          <path d="M92 78C92 56 106 44 120 44C134 44 148 56 148 78C148 96 136 108 120 108C104 108 92 96 92 78Z" fill={accent} fillOpacity="0.85" />
          <path d="M104 72C104 60 112 52 120 52C128 52 136 60 136 72C136 84 128 92 120 92C112 92 104 84 104 72Z" fill={accent} stroke="#FFF9F3" strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M113 72C113 66 117 62 121 64C125 66 126 72 122 76C118 80 112 77 112 72" stroke="#FFF9F3" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="82" cy="152" rx="7" ry="4" transform="rotate(-20 82 152)" fill={accent} fillOpacity="0.7" />
          <ellipse cx="158" cy="150" rx="7" ry="4" transform="rotate(24 158 150)" fill={accent} fillOpacity="0.7" />
        </svg>
      )

    case 'engagement-ring-box':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="92" r="58" fill={foil} fillOpacity="0.12" />
          <rect x="78" y="88" width="84" height="58" rx="12" fill={accent} fillOpacity="0.28" stroke={foil} strokeWidth="1.8" />
          <path d="M78 106H162" stroke={foil} strokeWidth="1.4" />
          <circle cx="120" cy="74" r="22" stroke={foil} strokeWidth="3.2" />
          <polygon points="120,38 131,50 120,60 109,50" fill="#FFF9F3" stroke={foil} strokeWidth="1.6" />
          <path d="M120 22L122 29L129 31L122 33L120 40L118 33L111 31L118 29L120 22Z" fill={foil} />
          <circle cx="88" cy="52" r="2.2" fill={foil} />
          <circle cx="152" cy="54" r="2.2" fill={accent} />
        </svg>
      )

    case 'chocolate-truffles':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="64" y="42" width="112" height="106" rx="12" fill={foil} fillOpacity="0.2" stroke={foil} strokeWidth="1.6" />
          <rect x="74" y="54" width="42" height="36" rx="6" fill={accent} fillOpacity="0.75" stroke="#FFF9F3" strokeOpacity="0.45" strokeWidth="1" />
          <rect x="124" y="54" width="42" height="36" rx="6" fill={accent} fillOpacity="0.9" stroke="#FFF9F3" strokeOpacity="0.45" strokeWidth="1" />
          <circle cx="95" cy="118" r="18" fill={accent} fillOpacity="0.88" stroke={foil} strokeWidth="1.4" />
          <path d="M84 114C90 108 100 108 106 114" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="145" cy="118" r="18" fill={foil} fillOpacity="0.75" stroke={accent} strokeWidth="1.4" />
          <path d="M135 112L155 124M135 124L155 112" stroke="#FFF9F3" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'plush-teddy-bear':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="88" cy="56" r="15" fill={accent} fillOpacity="0.75" />
          <circle cx="88" cy="56" r="7" fill={foil} fillOpacity="0.7" />
          <circle cx="152" cy="56" r="15" fill={accent} fillOpacity="0.75" />
          <circle cx="152" cy="56" r="7" fill={foil} fillOpacity="0.7" />
          <ellipse cx="120" cy="126" rx="36" ry="34" fill={accent} fillOpacity="0.68" />
          <circle cx="120" cy="78" r="30" fill={accent} fillOpacity="0.82" />
          <ellipse cx="120" cy="85" rx="14" ry="11" fill="#FFF9F3" fillOpacity="0.9" />
          <circle cx="110" cy="73" r="3" fill={text} />
          <circle cx="130" cy="73" r="3" fill={text} />
          <ellipse cx="120" cy="81" rx="4.5" ry="3.2" fill={text} />
          <path d="M120 132C120 132 108 124 108 117C108 113 111 110 115 110C117.5 110 119 111.5 120 113C121 111.5 122.5 110 125 110C129 110 132 113 132 117C132 124 120 132 120 132Z" fill="#FFF9F3" stroke={foil} strokeWidth="1.4" />
        </svg>
      )

    case 'intertwined-hands-vow':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path
            d="M78 96C78 82 90 72 103 76C112 79 116 88 120 96C124 104 128 113 137 116C150 120 162 110 162 96C162 82 150 72 137 76C128 79 124 88 120 96C116 104 112 113 103 116C90 120 78 110 78 96Z"
            stroke={foil}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M78 96C78 82 90 72 103 76C112 79 116 88 120 96C124 104 128 113 137 116C150 120 162 110 162 96"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M120 44L122 50L128 52L122 54L120 60L118 54L112 52L118 50L120 44Z" fill={foil} />
          <path d="M84 138H156" stroke={foil} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'kiss-silhouette-hearts':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="56" fill={accent} fillOpacity="0.16" />
          <path d="M74 96C88 82 104 80 120 88C136 80 152 82 166 96C148 99 134 99 120 96C106 99 92 99 74 96Z" fill={accent} />
          <path d="M78 99C94 118 110 120 120 116C130 120 146 118 162 99C144 102 132 102 120 99C108 102 96 102 78 99Z" fill={accent} fillOpacity="0.82" />
          <path d="M160 54C160 54 152 48 152 43C152 40 154.5 38 157 38C158.6 38 159.5 39 160 40C160.5 39 161.4 38 163 38C165.5 38 168 40 168 43C168 48 160 54 160 54Z" fill={foil} />
          <circle cx="80" cy="58" r="2.5" fill={foil} />
        </svg>
      )

    case 'playful-comic-kapow':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <polygon
            points="120,26 138,56 172,44 158,76 190,94 156,110 168,144 134,132 120,164 106,132 72,144 84,110 50,94 82,76 68,44 102,56"
            fill={accent}
            fillOpacity="0.25"
            stroke={foil}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="120" cy="95" r="30" fill="#FFF9F3" stroke={accent} strokeWidth="2.2" />
          <path d="M108 88C110 85 113 85 115 88" stroke={text} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M125 88H133" stroke={text} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M109 102C115 109 125 109 131 102" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )

    case 'playful-kick-bounce':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="94" r="54" stroke={foil} strokeWidth="1.6" strokeDasharray="6 6" />
          <path d="M74 114L104 82L134 94L154 74L168 88L142 126H74V114Z" fill={accent} fillOpacity="0.6" stroke={text} strokeWidth="2" strokeLinejoin="round" />
          <path d="M74 126H168" stroke={foil} strokeWidth="4" strokeLinecap="round" />
          <path d="M56 76L68 82M62 60L76 68" stroke={foil} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M166 44L169 52L177 55L169 58L166 66L163 58L155 55L163 52L166 44Z" fill={foil} />
        </svg>
      )

    case 'perfume-flacon':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="108" y="34" width="24" height="18" rx="4" fill={foil} stroke={text} strokeOpacity="0.45" strokeWidth="1.2" />
          <rect x="102" y="52" width="36" height="10" rx="3" fill={foil} fillOpacity="0.6" />
          <rect x="82" y="64" width="76" height="86" rx="18" fill={accent} fillOpacity="0.22" stroke={foil} strokeWidth="1.8" />
          <rect x="96" y="84" width="48" height="46" rx="6" fill="#FFF9F3" fillOpacity="0.92" stroke={foil} strokeWidth="1.2" />
          <path d="M110 107H130M120 97V117" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="62" cy="70" r="3" fill={accent} />
          <circle cx="178" cy="64" r="3" fill={foil} />
        </svg>
      )

    case 'charming-wink-note':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="66" y="42" width="108" height="106" rx="22" fill={accent} fillOpacity="0.18" stroke={foil} strokeWidth="1.8" />
          <circle cx="102" cy="86" r="5" fill={text} />
          <path d="M128 87C132 82 138 82 142 87" stroke={text} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M104 108C114 118 128 118 138 106" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M164 46C164 46 156 40 156 35C156 32 158.5 30 161 30C162.5 30 163.5 31 164 32C164.5 31 165.5 30 167 30C169.5 30 172 32 172 35C172 40 164 46 164 46Z" fill={accent} />
        </svg>
      )

    case 'handwritten-wax-letter':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="64" y="34" width="112" height="122" rx="8" fill="#FFF9F3" stroke={foil} strokeWidth="1.8" />
          <line x1="84" y1="62" x2="156" y2="62" stroke={text} strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="84" y1="80" x2="148" y2="80" stroke={text} strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="84" y1="98" x2="136" y2="98" stroke={text} strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="142" cy="128" r="18" fill={accent} stroke={foil} strokeWidth="2" />
          <path d="M142 122C140 120 136 121 135 124C134 127 137 130 142 134C147 130 150 127 149 124C148 121 144 120 142 122Z" fill="#FFF9F3" />
        </svg>
      )

    case 'long-distance-moonmail':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path
            d="M94 46C76 48 64 64 66 82C68 98 82 110 98 108C105 107 111 104 115 99C102 100 90 90 89 77C88 64 96 52 108 48C103 46 98 45 94 46Z"
            fill={foil}
          />
          <path d="M74 134C102 126 124 112 152 84" stroke={foil} strokeWidth="1.6" strokeDasharray="4 4" />
          <polygon points="144,74 182,66 160,102 154,84" fill={accent} stroke="#FFF9F3" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="152" cy="44" r="2.5" fill={foil} />
          <circle cx="176" cy="126" r="2.5" fill={accent} />
        </svg>
      )

    case 'self-love-botanical':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="52" stroke={foil} strokeOpacity="0.65" strokeWidth="1.6" />
          <path d="M120 138V74" stroke="#6C9174" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="102" cy="108" rx="14" ry="6" transform="rotate(-36 102 108)" fill="#7EA386" fillOpacity="0.78" />
          <ellipse cx="138" cy="108" rx="14" ry="6" transform="rotate(36 138 108)" fill="#7EA386" fillOpacity="0.78" />
          <ellipse cx="104" cy="86" rx="12" ry="5.5" transform="rotate(-32 104 86)" fill={accent} fillOpacity="0.65" />
          <ellipse cx="136" cy="86" rx="12" ry="5.5" transform="rotate(32 136 86)" fill={accent} fillOpacity="0.65" />
          <circle cx="120" cy="64" r="12" fill={foil} fillOpacity="0.85" />
        </svg>
      )

    case 'floral-emblem-grace':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="78" r="34" stroke={foil} strokeWidth="2.4" fill={accent} fillOpacity="0.14" />
          <line x1="120" y1="112" x2="120" y2="154" stroke={foil} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="104" y1="134" x2="136" y2="134" stroke={foil} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="94" cy="56" r="10" fill={accent} fillOpacity="0.8" />
          <circle cx="146" cy="56" r="10" fill={accent} fillOpacity="0.8" />
          <circle cx="120" cy="44" r="11" fill={foil} fillOpacity="0.85" />
        </svg>
      )

    case 'white-rose-ivory':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="92" r="56" fill={foil} fillOpacity="0.14" />
          <path d="M120 158V108" stroke={text} strokeOpacity="0.45" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="120" cy="78" r="30" fill="#FFFFFF" stroke={foil} strokeWidth="1.5" />
          <circle cx="120" cy="76" r="20" fill="#FAF8F5" stroke={accent} strokeWidth="1.2" />
          <path d="M111 75C111 69 116 66 121 68C125 70 126 76 121 80C116 84 109 80 109 74" stroke={foil} strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="98" cy="132" rx="14" ry="6" transform="rotate(-32 98 132)" fill={foil} fillOpacity="0.35" />
          <ellipse cx="142" cy="132" rx="14" ry="6" transform="rotate(32 142 132)" fill={foil} fillOpacity="0.35" />
        </svg>
      )

    case 'sunburst-smile':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="95" r="38" fill={foil} fillOpacity="0.82" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="120"
              y1="44"
              x2="120"
              y2="30"
              stroke={accent}
              strokeWidth="2.4"
              strokeLinecap="round"
              transform={`rotate(${deg} 120 95)`}
            />
          ))}
          <circle cx="107" cy="88" r="3.5" fill={text} />
          <circle cx="133" cy="88" r="3.5" fill={text} />
          <path d="M104 103C110 113 130 113 136 103" stroke={text} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )

    case 'dark-cocoa-minimal':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M72 86H168C166 120 146 138 120 138C94 138 74 120 72 86Z" fill={accent} fillOpacity="0.85" stroke={foil} strokeWidth="1.8" />
          <path d="M90 142H150" stroke={foil} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="94" y1="68" x2="152" y2="42" stroke={foil} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="100" y1="76" x2="162" y2="54" stroke={foil} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="120" cy="112" r="7" fill={foil} fillOpacity="0.85" />
        </svg>
      )

    case 'book-and-rose':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M64 66C84 58 106 60 120 70C134 60 156 58 176 66V138C156 130 134 132 120 142C106 132 84 130 64 138V66Z" fill="#FFF9F3" stroke={foil} strokeWidth="1.8" />
          <line x1="120" y1="70" x2="120" y2="142" stroke={foil} strokeWidth="1.5" />
          <circle cx="144" cy="96" r="14" fill={accent} />
          <path d="M138 95C138 91 142 89 145 91C148 93 148 97 145 99" stroke="#FFF9F3" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M126 116L144 96" stroke="#6C9174" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case 'olive-branch-kiss':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M68 136C96 114 130 88 170 56" stroke="#6C9174" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="98" cy="108" rx="13" ry="5" transform="rotate(-38 98 108)" fill="#7EA386" />
          <ellipse cx="126" cy="86" rx="13" ry="5" transform="rotate(-38 126 86)" fill="#7EA386" />
          <ellipse cx="116" cy="112" rx="12" ry="5" transform="rotate(22 116 112)" fill={foil} />
          <path d="M148 118C148 118 134 108 134 99C134 94 138 90 143 90C146 90 147.5 92 148 93.5C148.5 92 150 90 153 90C158 90 162 94 162 99C162 108 148 118 148 118Z" fill={accent} />
        </svg>
      )

    case 'chinese-520-lantern':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <line x1="120" y1="22" x2="120" y2="42" stroke={foil} strokeWidth="2" />
          <rect x="78" y="42" width="84" height="82" rx="34" fill={accent} stroke={foil} strokeWidth="2.2" />
          <rect x="98" y="38" width="44" height="10" rx="3" fill={foil} />
          <rect x="98" y="120" width="44" height="10" rx="3" fill={foil} />
          <text x="120" y="92" textAnchor="middle" fill="#FFF9F3" fontSize="26" fontWeight="700" fontFamily="Georgia, serif">
            520
          </text>
          <line x1="120" y1="130" x2="120" y2="162" stroke={foil} strokeWidth="2.2" />
          <line x1="112" y1="142" x2="112" y2="160" stroke={accent} strokeWidth="1.6" />
          <line x1="128" y1="142" x2="128" y2="160" stroke={accent} strokeWidth="1.6" />
        </svg>
      )

    case 'carnival-rose-fiesta':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="92" r="54" stroke={foil} strokeWidth="1.6" strokeDasharray="4 4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="64"
              rx="10"
              ry="20"
              transform={`rotate(${deg} 120 92)`}
              fill={deg % 90 === 0 ? accent : foil}
              fillOpacity="0.65"
            />
          ))}
          <circle cx="120" cy="92" r="14" fill="#FFF9F3" stroke={accent} strokeWidth="2" />
          <path d="M74 148C94 138 146 138 166 148" stroke={foil} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )

    case 'vinyl-headphones-duet':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M74 114V92C74 66.595 94.595 46 120 46C145.405 46 166 66.595 166 92V114" stroke={foil} strokeWidth="3.2" strokeLinecap="round" />
          <rect x="64" y="96" width="20" height="36" rx="9" fill={accent} stroke={foil} strokeWidth="1.6" />
          <rect x="156" y="96" width="20" height="36" rx="9" fill={accent} stroke={foil} strokeWidth="1.6" />
          <circle cx="110" cy="122" r="7" fill={text} />
          <path d="M117 122V86L138 80V114" stroke={text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="131" cy="114" r="7" fill={accent} />
        </svg>
      )

    case 'wellness-heart-pulse':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path
            d="M120 148C120 148 70 116 70 80C70 60 86 48 102 48C111 48 117 53 120 60C123 53 129 48 138 48C154 48 170 60 170 80C170 116 120 148 120 148Z"
            fill={accent}
            fillOpacity="0.25"
            stroke={accent}
            strokeWidth="2.2"
          />
          <path
            d="M78 92H100L110 70L122 112L134 84L142 92H164"
            stroke={foil}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'tailored-gift-watch':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <rect x="106" y="28" width="28" height="34" rx="4" fill={accent} fillOpacity="0.7" stroke={foil} strokeWidth="1.5" />
          <rect x="106" y="128" width="28" height="34" rx="4" fill={accent} fillOpacity="0.7" stroke={foil} strokeWidth="1.5" />
          <circle cx="120" cy="95" r="36" fill="#FFF9F3" stroke={foil} strokeWidth="3" />
          <circle cx="120" cy="95" r="28" stroke={accent} strokeOpacity="0.45" strokeWidth="1.2" />
          <path d="M120 75V95L134 104" stroke={text} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="120" cy="95" r="3.5" fill={foil} />
        </svg>
      )

    case 'christmas-eve-tree':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M120 38L150 82H134L162 118H142L170 148H70L98 118H78L106 82H90L120 38Z" fill={accent} fillOpacity="0.78" stroke={foil} strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="112" y="148" width="16" height="16" rx="2" fill={foil} />
          <path d="M120 20L123 28L131 31L123 34L120 42L117 34L109 31L117 28L120 20Z" fill={foil} />
          <circle cx="110" cy="96" r="4" fill="#FFF9F3" />
          <circle cx="132" cy="108" r="4" fill={foil} />
          <circle cx="102" cy="130" r="4" fill={foil} />
          <circle cx="136" cy="134" r="4" fill="#FFF9F3" />
        </svg>
      )

    case 'christmas-holiday-hearth':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <circle cx="120" cy="92" r="48" stroke={accent} strokeWidth="14" strokeOpacity="0.72" />
          <circle cx="120" cy="92" r="48" stroke={foil} strokeWidth="1.8" strokeDasharray="6 6" />
          <path d="M110 132L120 144L130 132" stroke={foil} strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="106" cy="144" rx="14" ry="7" transform="rotate(-24 106 144)" fill={foil} fillOpacity="0.82" />
          <ellipse cx="134" cy="144" rx="14" ry="7" transform="rotate(24 134 144)" fill={foil} fillOpacity="0.82" />
          <circle cx="90" cy="58" r="4" fill={foil} />
          <circle cx="150" cy="58" r="4" fill={foil} />
          <circle cx="120" cy="44" r="5" fill={accent} />
        </svg>
      )

    case 'cozy-teacup':
    default:
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <path d="M104 64C100 54 108 46 104 36" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M122 58C118 48 126 40 122 30" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M138 66C134 56 142 48 138 38" stroke={foil} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M78 82H162V104C162 126.091 144.091 144 122 144H118C95.909 144 78 126.091 78 104V82Z" fill={accent} fillOpacity="0.3" stroke={text} strokeOpacity="0.7" strokeWidth="1.6" />
          <path d="M162 90H170C176.627 90 182 95.373 182 102C182 108.627 176.627 114 170 114H161" stroke={text} strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="120" cy="148" rx="54" ry="8" fill={foil} fillOpacity="0.4" stroke={foil} strokeWidth="1.3" />
          <path d="M120 118C120 118 110 111 110 104.5C110 101 112.8 98.5 116 98.5C118 98.5 119.3 99.6 120 100.8C120.7 99.6 122 98.5 124 98.5C127.2 98.5 130 101 130 104.5C130 111 120 118 120 118Z" fill={accent} />
        </svg>
      )
  }
}
