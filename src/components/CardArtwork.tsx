import type { ArtworkMotif } from '../types/card'

interface CardArtworkProps {
  motif: ArtworkMotif
  accent: string
  foil: string
  text: string
  className?: string
}

function getSvgToken(motif: string, accent: string, foil: string): string {
  const safeA = accent.replace(/[^a-z0-9]/gi, '').slice(0, 8) || 'a'
  const safeF = foil.replace(/[^a-z0-9]/gi, '').slice(0, 8) || 'f'
  return `${motif}-${safeA}-${safeF}`
}

function ArtworkDefs({
  token,
  accent,
  foil,
}: {
  token: string
  accent: string
  foil: string
}) {
  return (
    <defs>
      <linearGradient id={`foil-${token}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF3D4" stopOpacity="0.95" />
        <stop offset="45%" stopColor={foil} stopOpacity="1" />
        <stop offset="100%" stopColor={foil} stopOpacity="0.72" />
      </linearGradient>
      <radialGradient id={`petal-${token}`} cx="40%" cy="35%" r="68%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="55%" stopColor={accent} stopOpacity="0.88" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.58" />
      </radialGradient>
      <radialGradient id={`aura-${token}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={foil} stopOpacity="0.3" />
        <stop offset="55%" stopColor={accent} stopOpacity="0.14" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

export function CardArtwork({ motif, accent, foil, text, className = 'w-full h-full' }: CardArtworkProps) {
  const token = getSvgToken(motif, accent, foil)
  const foilUrl = `url(#foil-${token})`
  const petalUrl = `url(#petal-${token})`
  const auraUrl = `url(#aura-${token})`

  switch (motif) {
    case 'botanical-arch':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="94" r="78" fill={auraUrl} />
          <path
            d="M42 178V88C42 44.922 76.922 10 120 10C163.078 10 198 44.922 198 88V178"
            stroke={foilUrl}
            strokeWidth="1.8"
          />
          <path
            d="M52 178V90C52 52.445 82.445 22 120 22C157.555 22 188 52.445 188 90V178"
            stroke={foil}
            strokeWidth="1"
            strokeOpacity="0.55"
            strokeDasharray="3 4"
          />
          <path d="M72 156C68 124 78 96 98 76" stroke={text} strokeOpacity="0.65" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="63" cy="128" rx="12" ry="6" transform="rotate(-35 63 128)" fill={petalUrl} fillOpacity="0.72" />
          <ellipse cx="86" cy="114" rx="11" ry="5.5" transform="rotate(28 86 114)" fill={foilUrl} fillOpacity="0.7" />
          <ellipse cx="75" cy="95" rx="11" ry="5.5" transform="rotate(-24 75 95)" fill={petalUrl} fillOpacity="0.82" />
          {/* Layered central rose */}
          <circle cx="120" cy="84" r="28" fill={accent} fillOpacity="0.2" />
          <circle cx="111" cy="80" r="14" fill={petalUrl} fillOpacity="0.78" />
          <circle cx="129" cy="80" r="14" fill={petalUrl} fillOpacity="0.78" />
          <circle cx="120" cy="90" r="14" fill={petalUrl} fillOpacity="0.88" />
          <circle cx="120" cy="82" r="11" fill={accent} fillOpacity="0.72" />
          <path
            d="M113 80C113 75 117 72 121 74C125 76 126 82 122 86C117 90 111 87 111 81"
            stroke="#FFF9F3"
            strokeOpacity="0.72"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="120" cy="82" r="3.2" fill={foilUrl} />
          <path d="M168 156C170 124 160 98 143 80" stroke={text} strokeOpacity="0.65" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="174" cy="128" rx="12" ry="6" transform="rotate(34 174 128)" fill={foilUrl} fillOpacity="0.72" />
          <ellipse cx="154" cy="110" rx="11" ry="5.5" transform="rotate(-25 154 110)" fill={petalUrl} fillOpacity="0.78" />
          <path d="M120 34L122.5 42L130.5 44.5L122.5 47L120 55L117.5 47L109.5 44.5L117.5 42L120 34Z" fill={foilUrl} />
          <circle cx="95" cy="54" r="2.5" fill={foil} />
          <circle cx="145" cy="54" r="2.5" fill={foil} />
          <path d="M88 156H152" stroke={foilUrl} strokeWidth="1.2" strokeOpacity="0.7" strokeLinecap="round" />
        </svg>
      )

    case 'celestial-moon':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="92" r="76" fill={auraUrl} />
          <circle cx="120" cy="92" r="68" stroke={foil} strokeOpacity="0.38" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="120" cy="92" r="52" stroke={foil} strokeOpacity="0.22" strokeWidth="1" />
          <path
            d="M128 46C105.909 46 88 63.909 88 86C88 108.091 105.909 126 128 126C136.178 126 143.784 123.545 150.116 119.333C133.541 118.237 120.444 104.449 120.444 87.6C120.444 70.751 133.541 56.963 150.116 55.867C143.784 51.655 136.178 46 128 46Z"
            fill={foilUrl}
          />
          <path d="M156 54L159.5 64.5L170 68L159.5 71.5L156 82L152.5 71.5L142 68L152.5 64.5L156 54Z" fill={petalUrl} />
          <path d="M74 62L76 68.5L82.5 70.5L76 72.5L74 79L72 72.5L65.5 70.5L72 68.5L74 62Z" fill={foilUrl} />
          <path d="M168 116L169.8 121.5L175.5 123.2L169.8 125L168 130.5L166.2 125L160.5 123.2L166.2 121.5L168 116Z" fill={foilUrl} />
          <circle cx="88" cy="136" r="2.8" fill={accent} />
          <circle cx="144" cy="144" r="2.2" fill={foil} />
          <circle cx="62" cy="102" r="2" fill={foil} />
          <path d="M78 148C104 156 136 156 162 148" stroke={foil} strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )

    case 'champagne-toast':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="95" r="74" fill={auraUrl} />
          <g transform="rotate(-12 96 105)">
            <path d="M84 52H108L104 98C103.5 104 98.5 108 96 108C93.5 108 88.5 104 88 98L84 52Z" fill={petalUrl} fillOpacity="0.72" stroke={foilUrl} strokeWidth="1.8" />
            <line x1="96" y1="108" x2="96" y2="146" stroke={foilUrl} strokeWidth="1.8" />
            <line x1="84" y1="146" x2="108" y2="146" stroke={foilUrl} strokeWidth="2" strokeLinecap="round" />
            <path d="M86 70H106" stroke="#FFF9F3" strokeOpacity="0.7" strokeWidth="1.1" />
          </g>
          <g transform="rotate(12 144 105)">
            <path d="M132 52H156L152 98C151.5 104 146.5 108 144 108C141.5 108 136.5 104 136 98L132 52Z" fill={foilUrl} fillOpacity="0.45" stroke={foilUrl} strokeWidth="1.8" />
            <line x1="144" y1="108" x2="144" y2="146" stroke={foilUrl} strokeWidth="1.8" />
            <line x1="132" y1="146" x2="156" y2="146" stroke={foilUrl} strokeWidth="2" strokeLinecap="round" />
            <path d="M134 70H154" stroke="#FFF9F3" strokeOpacity="0.7" strokeWidth="1.1" />
          </g>
          <path d="M120 22L123 32L133 35L123 38L120 48L117 38L107 35L117 32L120 22Z" fill={foilUrl} />
          <path d="M68 58L70 64L76 66L70 68L68 74L66 68L60 66L66 64L68 58Z" fill={foil} />
          <path d="M172 56L174 62L180 64L174 66L172 72L170 66L164 64L170 62L172 56Z" fill={accent} />
          <circle cx="108" cy="40" r="2.8" fill={accent} />
          <circle cx="132" cy="42" r="2.8" fill={foil} />
          <circle cx="120" cy="60" r="2.2" fill="#FFF9F3" />
        </svg>
      )

    case 'peony-bouquet':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="92" r="76" fill={auraUrl} />
          <path d="M120 166V102" stroke={text} strokeOpacity="0.6" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M120 146C102 134 88 118 84 96" stroke={text} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M120 146C138 134 152 118 156 96" stroke={text} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="96" cy="134" rx="17" ry="7.5" transform="rotate(-32 96 134)" fill={foilUrl} fillOpacity="0.55" />
          <ellipse cx="144" cy="134" rx="17" ry="7.5" transform="rotate(32 144 134)" fill={foilUrl} fillOpacity="0.55" />
          <circle cx="82" cy="92" r="20" fill={petalUrl} fillOpacity="0.72" />
          <circle cx="82" cy="92" r="11" fill={accent} fillOpacity="0.82" />
          <circle cx="82" cy="92" r="4" fill={foilUrl} />
          <circle cx="158" cy="92" r="20" fill={petalUrl} fillOpacity="0.72" />
          <circle cx="158" cy="92" r="11" fill={accent} fillOpacity="0.82" />
          <circle cx="158" cy="92" r="4" fill={foilUrl} />
          <circle cx="120" cy="76" r="34" fill={accent} fillOpacity="0.25" />
          <circle cx="109" cy="72" r="19" fill={petalUrl} fillOpacity="0.84" />
          <circle cx="131" cy="72" r="19" fill={petalUrl} fillOpacity="0.84" />
          <circle cx="120" cy="84" r="19" fill={petalUrl} fillOpacity="0.92" />
          <circle cx="120" cy="76" r="9" fill={foilUrl} />
          <path d="M106 150C114 145 126 145 134 150" stroke={foilUrl} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="66" cy="58" r="2.4" fill={foil} />
          <circle cx="174" cy="58" r="2.4" fill={foil} />
        </svg>
      )

    case 'heritage-compass':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="94" r="72" fill={auraUrl} />
          <circle cx="120" cy="94" r="62" stroke={foilUrl} strokeWidth="1.9" />
          <circle cx="120" cy="94" r="52" stroke={text} strokeOpacity="0.38" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="120" cy="94" r="38" stroke={foil} strokeOpacity="0.65" strokeWidth="1.1" />
          <path d="M120 38L128 86L176 94L128 102L120 150L112 102L64 94L112 86L120 38Z" fill={foilUrl} fillOpacity="0.5" stroke={foilUrl} strokeWidth="1.5" />
          <path d="M90 64L120 88L150 64L126 94L150 124L120 100L90 124L114 94L90 64Z" fill={petalUrl} fillOpacity="0.68" />
          <circle cx="120" cy="94" r="8" fill={text} />
          <circle cx="120" cy="94" r="3.5" fill={foilUrl} />
        </svg>
      )

    case 'golden-laurel':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="94" r="70" fill={auraUrl} />
          <path d="M114 146C78 138 62 104 72 68C78 48 92 38 106 34" stroke={foilUrl} strokeWidth="1.9" strokeLinecap="round" />
          <path d="M126 146C162 138 178 104 168 68C162 48 148 38 134 34" stroke={foilUrl} strokeWidth="1.9" strokeLinecap="round" />
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
              rx="10.5"
              ry="4.8"
              transform={`rotate(${rot} ${cx} ${cy})`}
              fill={idx % 2 === 0 ? foilUrl : petalUrl}
              fillOpacity="0.85"
            />
          ))}
          <path d="M120 66L125.5 83.5L143 84L129 94.5L134 111L120 101L106 111L111 94.5L97 84L114.5 83.5L120 66Z" fill={foilUrl} />
        </svg>
      )

    case 'pressed-wildflowers':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="72" fill={auraUrl} />
          <path d="M120 164C120 130 116 92 106 46" stroke={text} strokeOpacity="0.62" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M120 164C126 132 138 96 154 58" stroke={text} strokeOpacity="0.58" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M120 164C104 134 86 106 78 72" stroke={text} strokeOpacity="0.52" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="106" cy="46" r="13" fill={petalUrl} fillOpacity="0.86" />
          <circle cx="106" cy="46" r="4.5" fill={foilUrl} />
          <circle cx="154" cy="58" r="11" fill={foilUrl} fillOpacity="0.82" />
          <circle cx="154" cy="58" r="3.8" fill={text} fillOpacity="0.65" />
          <circle cx="78" cy="72" r="10.5" fill={petalUrl} fillOpacity="0.72" />
          <circle cx="78" cy="72" r="3.2" fill={foil} />
          <ellipse cx="96" cy="112" rx="13" ry="5" transform="rotate(-35 96 112)" fill={foilUrl} fillOpacity="0.65" />
          <ellipse cx="136" cy="118" rx="13" ry="5" transform="rotate(35 136 118)" fill={petalUrl} fillOpacity="0.62" />
          <rect x="106" y="146" width="28" height="10" rx="2" transform="rotate(-6 120 151)" fill={foilUrl} fillOpacity="0.8" />
        </svg>
      )

    case 'daisy-polaroid':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="94" r="72" fill={auraUrl} />
          <rect x="64" y="26" width="112" height="136" rx="8" fill={foil} fillOpacity="0.18" stroke={foilUrl} strokeWidth="1.6" />
          <rect x="76" y="38" width="88" height="84" rx="4" fill={accent} fillOpacity="0.22" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="64"
              rx="6"
              ry="15"
              transform={`rotate(${deg} 120 80)`}
              fill="#FFF9F3"
              fillOpacity="0.95"
              stroke={text}
              strokeOpacity="0.2"
            />
          ))}
          <circle cx="120" cy="80" r="10.5" fill={foilUrl} />
          <path d="M92 140H148" stroke={text} strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case 'minimalist-monogram':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="95" r="70" fill={auraUrl} />
          <rect x="58" y="24" width="124" height="142" rx="4" stroke={foilUrl} strokeWidth="1.7" />
          <rect x="66" y="32" width="108" height="126" rx="2" stroke={text} strokeOpacity="0.32" strokeWidth="1" />
          <circle cx="120" cy="95" r="35" stroke={foilUrl} strokeWidth="1.6" />
          <path d="M106 108L120 74L134 108M111 98H129" stroke={text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="94" y1="142" x2="146" y2="142" stroke={foilUrl} strokeWidth="1.3" />
        </svg>
      )

    case 'festive-lanterns':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="92" r="72" fill={auraUrl} />
          <line x1="88" y1="10" x2="88" y2="54" stroke={foilUrl} strokeWidth="1.2" />
          <line x1="152" y1="10" x2="152" y2="42" stroke={foilUrl} strokeWidth="1.2" />
          <line x1="120" y1="10" x2="120" y2="68" stroke={foilUrl} strokeWidth="1.5" />
          <rect x="72" y="54" width="32" height="44" rx="14" fill={petalUrl} fillOpacity="0.72" stroke={foilUrl} strokeWidth="1.6" />
          <line x1="88" y1="98" x2="88" y2="114" stroke={foil} strokeWidth="1.5" />
          <rect x="100" y="68" width="40" height="54" rx="18" fill={foilUrl} fillOpacity="0.48" stroke={foilUrl} strokeWidth="1.9" />
          <circle cx="120" cy="95" r="9.5" fill="#FFF3D4" fillOpacity="0.92" />
          <line x1="120" y1="122" x2="120" y2="146" stroke={foilUrl} strokeWidth="1.8" />
          <rect x="136" y="42" width="32" height="44" rx="14" fill={petalUrl} fillOpacity="0.62" stroke={foilUrl} strokeWidth="1.6" />
          <line x1="152" y1="86" x2="152" y2="104" stroke={foil} strokeWidth="1.5" />
          <circle cx="62" cy="118" r="2.4" fill={foil} />
          <circle cx="178" cy="112" r="2.6" fill={foil} />
          <circle cx="120" cy="158" r="2.8" fill={accent} />
        </svg>
      )

    case 'sunset-horizon':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="74" fill={auraUrl} />
          <path d="M56 164V92C56 56.654 84.654 28 120 28C155.346 28 184 56.654 184 92V164H56Z" fill={accent} fillOpacity="0.22" stroke={foilUrl} strokeWidth="1.7" />
          <circle cx="120" cy="96" r="29" fill={foilUrl} fillOpacity="0.82" />
          <path d="M62 126C82 118 100 120 120 126C140 132 158 130 178 124V164H62V126Z" fill={petalUrl} fillOpacity="0.66" />
          <path d="M62 142C86 136 106 140 126 144C146 148 164 144 178 140V164H62V142Z" fill={text} fillOpacity="0.24" />
        </svg>
      )

    case 'morning-sunbeam':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="70" fill={auraUrl} />
          <circle cx="120" cy="96" r="35" fill={foilUrl} fillOpacity="0.78" />
          <circle cx="120" cy="96" r="22" fill={petalUrl} fillOpacity="0.65" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="120"
              y1="44"
              x2="120"
              y2="28"
              stroke={foilUrl}
              strokeWidth="1.9"
              strokeLinecap="round"
              transform={`rotate(${deg} 120 96)`}
            />
          ))}
          <path d="M48 144C78 132 102 138 122 144C142 150 166 146 192 136" stroke={accent} strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      )

    case 'velvet-heart-seal':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="95" r="74" fill={auraUrl} />
          <circle cx="120" cy="95" r="56" fill={accent} fillOpacity="0.24" stroke={foilUrl} strokeWidth="1.7" />
          <circle cx="120" cy="95" r="44" stroke={foil} strokeWidth="1.2" strokeDasharray="3 3" />
          <path
            d="M120 124C120 124 88 103 88 82C88 71 97 64 106 64C113 64 118 68 120 73C122 68 127 64 134 64C143 64 152 71 152 82C152 103 120 124 120 124Z"
            fill={petalUrl}
            stroke={foilUrl}
            strokeWidth="1.8"
          />
          <path d="M168 48L170.5 54.5L177 57L170.5 59.5L168 66L165.5 59.5L159 57L165.5 54.5L168 48Z" fill={foilUrl} />
          <path d="M70 124L72.5 130.5L79 133L72.5 135.5L70 142L67.5 135.5L61 133L67.5 130.5L70 124Z" fill={foilUrl} />
        </svg>
      )

    case 'couple-rings':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="70" fill={auraUrl} />
          <circle cx="102" cy="96" r="36" stroke={foilUrl} strokeWidth="3.2" />
          <circle cx="102" cy="96" r="30.5" stroke={foil} strokeOpacity="0.45" strokeWidth="1" />
          <circle cx="138" cy="96" r="36" stroke={accent} strokeWidth="3.2" />
          <circle cx="138" cy="96" r="30.5" stroke={foil} strokeOpacity="0.45" strokeWidth="1" />
          <path d="M120 34L123 44L133 47L123 50L120 60L117 50L107 47L117 44L120 34Z" fill={foilUrl} />
          <circle cx="120" cy="148" r="3.4" fill={accent} />
        </svg>
      )

    case 'olive-family-tree':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="70" fill={auraUrl} />
          <path d="M120 158V84" stroke={text} strokeOpacity="0.65" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M120 128C100 116 86 98 76 74" stroke={text} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M120 120C140 108 156 90 166 68" stroke={text} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="86" cy="92" rx="14" ry="6" transform="rotate(-30 86 92)" fill={petalUrl} fillOpacity="0.8" />
          <ellipse cx="76" cy="70" rx="12" ry="5.5" transform="rotate(-48 76 70)" fill={foilUrl} fillOpacity="0.75" />
          <ellipse cx="152" cy="88" rx="14" ry="6" transform="rotate(30 152 88)" fill={petalUrl} fillOpacity="0.8" />
          <ellipse cx="164" cy="66" rx="12" ry="5.5" transform="rotate(42 164 66)" fill={foilUrl} fillOpacity="0.75" />
          <ellipse cx="120" cy="60" rx="14" ry="7" fill={petalUrl} fillOpacity="0.88" />
          <path d="M90 158H150" stroke={foilUrl} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'confetti-celebration':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          {/* Warm bokeh celebration glow */}
          <circle cx="120" cy="94" r="82" fill={auraUrl} />
          <circle cx="38" cy="46" r="14" fill="#FFD98E" fillOpacity="0.28" />
          <circle cx="200" cy="40" r="16" fill="#FFD98E" fillOpacity="0.25" />
          <circle cx="188" cy="96" r="11" fill="#F7A7BA" fillOpacity="0.28" />
          <circle cx="52" cy="112" r="10" fill="#FFE7A8" fillOpacity="0.32" />

          {/* Balloon strings */}
          <path d="M58 78C56 96 66 112 72 132" stroke={text} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M92 66C92 86 96 104 98 124" stroke={text} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M126 78C124 94 122 108 122 122" stroke={text} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />

          {/* Left Rose Balloon */}
          <ellipse cx="56" cy="48" rx="22" ry="27" fill="#F29EB3" />
          <ellipse cx="48" cy="39" rx="7" ry="12" transform="rotate(-18 48 39)" fill="#FFFFFF" fillOpacity="0.42" />
          <path d="M54 75L58 75L56 79Z" fill="#E37B96" />

          {/* Center Plum-Violet Balloon */}
          <ellipse cx="92" cy="38" rx="23" ry="28" fill="#8D3F9E" />
          <ellipse cx="83" cy="29" rx="7" ry="12" transform="rotate(-18 83 29)" fill="#FFFFFF" fillOpacity="0.36" />
          <path d="M90 66L94 66L92 70Z" fill="#732B83" />

          {/* Right Sunny Gold Balloon */}
          <ellipse cx="126" cy="52" rx="20" ry="25" fill="#F2B830" />
          <ellipse cx="119" cy="44" rx="6" ry="10" transform="rotate(-18 119 44)" fill="#FFFFFF" fillOpacity="0.45" />
          <path d="M124 77L128 77L126 81Z" fill="#D49A18" />

          {/* Wooden cake pedestal */}
          <ellipse cx="132" cy="166" rx="68" ry="11" fill="#8C5835" />
          <ellipse cx="132" cy="162" rx="66" ry="9" fill="#B57A4E" />

          {/* Rich Chocolate Ganache Cake Body */}
          <rect x="78" y="108" width="108" height="50" rx="10" fill="#5D3222" />
          <ellipse cx="132" cy="108" rx="54" ry="12" fill="#78422E" />
          {/* Glossy ganache drips */}
          <path
            d="M78 108C78 116 86 124 90 124C94 124 94 114 99 114C104 114 104 130 109 130C114 130 115 116 121 116C127 116 128 128 134 128C140 128 142 115 148 115C154 115 156 126 162 126C168 126 172 116 178 116C182 116 186 113 186 108Z"
            fill="#3B1D13"
          />

          {/* Tiny kraft note tucked on cake */}
          <g transform="rotate(-5 132 142)">
            <rect x="112" y="128" width="40" height="24" rx="3" fill="#F6DFC0" stroke="#D9B77E" strokeWidth="1" />
            <path d="M132 145C132 145 126 141 126 137C126 135 127.8 133.5 129.6 133.5C130.8 133.5 131.6 134.2 132 135C132.4 134.2 133.2 133.5 134.4 133.5C136.2 133.5 138 135 138 137C138 141 132 145 132 145Z" fill="#78422E" />
          </g>

          {/* Strawberries & Blueberries on Cake Top */}
          <circle cx="96" cy="104" r="6" fill="#E13245" />
          <circle cx="114" cy="101" r="4.5" fill="#2A3B63" />
          <circle cx="132" cy="104" r="6.5" fill="#E13245" />
          <circle cx="150" cy="101" r="4.5" fill="#2A3B63" />
          <circle cx="166" cy="104" r="6" fill="#E13245" />
          <circle cx="104" cy="105" r="2" fill="#639A58" />
          <circle cx="142" cy="105" r="2" fill="#639A58" />

          {/* Four Striped Candles + Warm Glowing Flames */}
          {[
            { x: 96, color: '#4B8ED4' },
            { x: 118, color: '#E86D96' },
            { x: 142, color: '#F5C443' },
            { x: 164, color: '#E86D96' },
          ].map((c, idx) => (
            <g key={idx}>
              <circle cx={c.x} cy="66" r="12" fill="#FFE694" fillOpacity="0.45" />
              <rect x={c.x - 3.5} y="74" width="7" height="28" rx="2.5" fill={c.color} />
              <path d={`M${c.x - 3.5} 82L${c.x + 3.5} 79M${c.x - 3.5} 90L${c.x + 3.5} 87`} stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1.6" />
              <path d={`M${c.x} 60C${c.x - 4} 66 ${c.x - 3.5} 72 ${c.x} 72C${c.x + 3.5} 72 ${c.x + 4} 66 ${c.x} 60Z`} fill="#FFB42B" />
              <path d={`M${c.x} 63C${c.x - 2} 67 ${c.x - 1.8} 71 ${c.x} 71C${c.x + 1.8} 71 ${c.x + 2} 67 ${c.x} 63Z`} fill="#FFFBE0" />
            </g>
          ))}

          {/* Red-Ribboned Gift Box in Foreground Left */}
          <rect x="30" y="132" width="42" height="36" rx="5" fill="#EAD0B3" stroke="#C8A27A" strokeWidth="1.2" />
          <rect x="27" y="128" width="48" height="10" rx="3" fill="#F2DEC5" stroke="#C8A27A" strokeWidth="1" />
          <rect x="47" y="128" width="8" height="40" fill="#D92D47" />
          <rect x="27" y="131" width="48" height="5" fill="#D92D47" />
          <ellipse cx="44" cy="124" rx="8" ry="4.5" transform="rotate(-20 44 124)" fill="#E63956" />
          <ellipse cx="58" cy="124" rx="8" ry="4.5" transform="rotate(20 58 124)" fill="#E63956" />
          <circle cx="51" cy="125" r="3" fill="#B51E37" />

          {/* Golden Stars & Sparkles */}
          <path d="M188 52L190.5 59.5L198 62L190.5 64.5L188 72L185.5 64.5L178 62L185.5 59.5L188 52Z" fill={foilUrl} />
          <circle cx="92" cy="174" r="2.8" fill="#F5C443" />
          <circle cx="176" cy="173" r="2.5" fill="#F5C443" />
          <circle cx="204" cy="134" r="2.6" fill={accent} />
        </svg>
      )

    case 'butterfly-meadow':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="70" fill={auraUrl} />
          <path d="M120 132V76" stroke={text} strokeWidth="2" strokeLinecap="round" />
          <path d="M120 82C100 50 64 56 68 84C72 104 98 106 120 98Z" fill={petalUrl} fillOpacity="0.82" stroke={foilUrl} strokeWidth="1.4" />
          <path d="M120 82C140 50 176 56 172 84C168 104 142 106 120 98Z" fill={petalUrl} fillOpacity="0.82" stroke={foilUrl} strokeWidth="1.4" />
          <path d="M120 100C98 104 78 122 88 136C98 148 114 134 120 116Z" fill={foilUrl} fillOpacity="0.65" stroke={foilUrl} strokeWidth="1.3" />
          <path d="M120 100C142 104 162 122 152 136C142 148 126 134 120 116Z" fill={foilUrl} fillOpacity="0.65" stroke={foilUrl} strokeWidth="1.3" />
          <circle cx="88" cy="78" r="4.5" fill="#FFF9F3" fillOpacity="0.85" />
          <circle cx="152" cy="78" r="4.5" fill="#FFF9F3" fillOpacity="0.85" />
          <circle cx="120" cy="52" r="2.2" fill={foil} />
        </svg>
      )

    case 'starry-lullaby':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="95" r="70" fill={auraUrl} />
          <path
            d="M118 46C95 48 78 68 80 92C82 116 102 134 126 132C136 131 145 127 151 120C134 122 118 110 116 92C114 74 126 57 142 52C134 47 126 45 118 46Z"
            fill={foilUrl}
          />
          <circle cx="156" cy="72" r="4.5" fill={accent} />
          <circle cx="168" cy="100" r="2.8" fill={foil} />
          <circle cx="72" cy="64" r="2.8" fill={foil} />
          <path d="M148 136L151 144L159 147L151 150L148 158L145 150L137 147L145 144L148 136Z" fill={foilUrl} />
        </svg>
      )

    case 'ribbon-giftbox':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="78" fill={auraUrl} />
          <circle cx="52" cy="54" r="12" fill="#FFD98E" fillOpacity="0.3" />
          <circle cx="188" cy="58" r="14" fill="#FFD98E" fillOpacity="0.28" />
          {/* Floating party balloons behind gift */}
          <ellipse cx="64" cy="54" rx="16" ry="20" fill="#F29EB3" fillOpacity="0.9" />
          <ellipse cx="59" cy="47" rx="4.5" ry="8" transform="rotate(-18 59 47)" fill="#FFFFFF" fillOpacity="0.45" />
          <path d="M64 74C68 92 78 106 84 114" stroke={text} strokeOpacity="0.3" strokeWidth="1.1" />
          <ellipse cx="176" cy="56" rx="16" ry="20" fill={foilUrl} fillOpacity="0.9" />
          <ellipse cx="171" cy="49" rx="4.5" ry="8" transform="rotate(-18 171 49)" fill="#FFFFFF" fillOpacity="0.45" />
          <path d="M176 76C172 94 162 106 156 114" stroke={text} strokeOpacity="0.3" strokeWidth="1.1" />
          {/* Dimensional gift parcel */}
          <rect x="74" y="82" width="92" height="72" rx="10" fill="#F2DEC5" stroke={foilUrl} strokeWidth="2" />
          <rect x="68" y="68" width="104" height="22" rx="7" fill="#FAF0E1" stroke={foilUrl} strokeWidth="1.8" />
          <rect x="113" y="68" width="14" height="86" fill={petalUrl} />
          <rect x="68" y="75" width="104" height="7" fill={petalUrl} />
          <ellipse cx="102" cy="58" rx="17" ry="9.5" transform="rotate(-20 102 58)" stroke={foilUrl} strokeWidth="1.6" fill={petalUrl} />
          <ellipse cx="138" cy="58" rx="17" ry="9.5" transform="rotate(20 138 58)" stroke={foilUrl} strokeWidth="1.6" fill={petalUrl} />
          <circle cx="120" cy="61" r="6" fill={foilUrl} />
          <path d="M120 26L122.5 33L129.5 35.5L122.5 38L120 45L117.5 38L110.5 35.5L117.5 33L120 26Z" fill={foilUrl} />
        </svg>
      )

    case 'tulip-greeting':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="96" r="70" fill={auraUrl} />
          <path d="M120 158V94" stroke={text} strokeOpacity="0.6" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M98 156C96 132 104 114 118 110" stroke={text} strokeOpacity="0.48" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M142 156C144 132 136 114 122 110" stroke={text} strokeOpacity="0.48" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M92 64C92 48 104 42 120 56C136 42 148 48 148 64C148 88 134 100 120 100C106 100 92 88 92 64Z" fill={petalUrl} fillOpacity="0.88" stroke={foilUrl} strokeWidth="1.6" />
          <path d="M108 54C114 42 126 42 132 54" stroke={foilUrl} strokeWidth="1.6" />
          <ellipse cx="102" cy="132" rx="14" ry="5" transform="rotate(-35 102 132)" fill={foilUrl} fillOpacity="0.62" />
          <ellipse cx="138" cy="132" rx="14" ry="5" transform="rotate(35 138 132)" fill={foilUrl} fillOpacity="0.62" />
        </svg>
      )

    case 'aurora-bloom':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="95" r="72" fill={auraUrl} />
          <circle cx="120" cy="95" r="58" stroke={foilUrl} strokeOpacity="0.55" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="120"
              cy="66"
              rx="10.5"
              ry="23"
              transform={`rotate(${deg} 120 95)`}
              fill={deg % 120 === 0 ? petalUrl : foilUrl}
              fillOpacity="0.72"
            />
          ))}
          <circle cx="120" cy="95" r="10.5" fill={foilUrl} />
        </svg>
      )

    case 'fireworks-burst':
      return (
        <svg viewBox="0 0 240 190" fill="none" className={className} aria-hidden="true">
          <ArtworkDefs token={token} accent={accent} foil={foil} />
          <circle cx="120" cy="86" r="68" fill={auraUrl} />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="120"
              y1="86"
              x2="120"
              y2={deg % 60 === 0 ? '30' : '44'}
              stroke={deg % 60 === 0 ? foilUrl : accent}
              strokeWidth={deg % 60 === 0 ? '2.2' : '1.5'}
              strokeLinecap="round"
              transform={`rotate(${deg} 120 86)`}
            />
          ))}
          <circle cx="120" cy="86" r="8.5" fill={foilUrl} />
          <path d="M64 46L66.5 53L73.5 55.5L66.5 58L64 65L61.5 58L54.5 55.5L61.5 53L64 46Z" fill={foilUrl} />
          <path d="M178 44L180 50L186 52L180 54L178 60L176 54L170 52L176 50L178 44Z" fill={accent} />
          <circle cx="76" cy="140" r="3" fill={accent} />
          <circle cx="164" cy="138" r="3" fill={foil} />
          <path d="M64 156C94 148 146 148 176 156" stroke={foilUrl} strokeOpacity="0.65" strokeWidth="1.5" strokeLinecap="round" />
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
