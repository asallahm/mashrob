import { useId } from 'react'

// Decorative juice-glass illustration, tinted per product.
// Used when a product has no photo or its photo fails to load.
function JuiceGlass({ top, bottom, size = 120 }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const gradId = `juice-${uid}`
  const clipId = `glass-${uid}`
  const glass = 'M26 34 L94 34 L86 146 Q85 152 78 152 L42 152 Q35 152 34 146 Z'

  return (
    <svg
      className="juice-glass"
      width={size}
      height={size * (160 / 120)}
      viewBox="0 0 120 160"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={glass} />
        </clipPath>
      </defs>

      <path d="M70 52 L84 8 L92 8" fill="none" stroke="#284A31" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="50" width="120" height="110" fill={`url(#${gradId})`} />
        <circle cx="50" cy="90" r="3" fill="#fff" opacity="0.45" />
        <circle cx="62" cy="112" r="2.2" fill="#fff" opacity="0.4" />
        <circle cx="46" cy="126" r="1.8" fill="#fff" opacity="0.35" />
      </g>

      <path d={glass} fill="#fff" fillOpacity="0.18" stroke="#284A31" strokeOpacity="0.35" strokeWidth="2.5" />
      <path d="M38 48 L44 136" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 34 C 20 20, 32 10, 44 16 C 40 26, 36 32, 28 34 Z" fill="#A8B99B" stroke="#284A31" strokeOpacity="0.4" strokeWidth="1.5" />
    </svg>
  )
}

export default JuiceGlass
