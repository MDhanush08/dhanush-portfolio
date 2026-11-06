import { memo } from 'react'

export const HeroVisualSvg = memo(function HeroVisualSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="800" height="1000" fill="var(--bg-alt)" />
      
      {/* Soft gradient studio backdrop */}
      <radialGradient id="studioLight" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="var(--surface)" stopOpacity="0.8" />
        <stop offset="100%" stopColor="var(--bg-alt)" stopOpacity="0.1" />
      </radialGradient>
      <rect width="800" height="1000" fill="url(#studioLight)" />

      <g transform="translate(400, 560)">
        {/* Base Grid lines */}
        <path d="M-300 -50 L0 120 L300 -50" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M-300 0 L0 170 L300 0" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Lower Left Dark Stone Cube */}
        <g transform="translate(-180, 20)">
          {/* Top face */}
          <polygon points="0,-40 70,-80 0,-120 -70,-80" fill="#2E2B25" />
          {/* Left face */}
          <polygon points="-70,-80 0,-40 0,60 -70,20" fill="#1A1813" />
          {/* Right face */}
          <polygon points="0,-40 70,-80 70,20 0,60" fill="#24211A" />
        </g>

        {/* Lower Right Dark Stone Platform */}
        <g transform="translate(140, 40)">
          {/* Top face */}
          <polygon points="0,-30 100,-85 0,-140 -100,-85" fill="#2E2B25" />
          {/* Left face */}
          <polygon points="-100,-85 0,-30 0,40 -100,-15" fill="#1A1813" />
          {/* Right face */}
          <polygon points="0,-30 100,-85 100,-15 0,40" fill="#24211A" />
        </g>

        {/* Center Main Dark Cube / Pedestal */}
        <g transform="translate(0, -60)">
          {/* Top face */}
          <polygon points="0,-60 120,-130 0,-200 -120,-130" fill="#36322B" />
          {/* Inner cutout top */}
          <polygon points="0,-90 60,-125 0,-160 -60,-125" fill="#14110D" />
          {/* Left face */}
          <polygon points="-120,-130 0,-60 0,80 -120,10" fill="#1E1B15" />
          {/* Right face */}
          <polygon points="0,-60 120,-130 120,10 0,80" fill="#29251E" />
        </g>

        {/* Stairs on Main Platform */}
        <g transform="translate(-60, -10)">
          <polygon points="0,0 25,-14 0,-28 -25,-14" fill="#3D3830" />
          <polygon points="-25,-14 0,0 0,10 -25,-4" fill="#24211A" />
          <polygon points="0,0 25,-14 25,-4 0,10" fill="#2D2821" />

          <polygon points="20,-12 45,-26 20,-40 -5,-26" fill="#3D3830" />
          <polygon points="-5,-26 20,-12 20,-2 -5,-16" fill="#24211A" />
          <polygon points="20,-12 45,-26 45,-16 20,-2" fill="#2D2821" />
        </g>

        {/* Translucent Glass Slabs / Connectors */}
        <g transform="translate(-80, -140)">
          {/* Glass Top */}
          <polygon points="0,-20 80,-65 0,-110 -80,-65" fill="#E6EDE0" fillOpacity="0.45" stroke="#A8E600" strokeWidth="1" strokeOpacity="0.5" />
          {/* Glass Left */}
          <polygon points="-80,-65 0,-20 0,0 -80,-45" fill="#A8E600" fillOpacity="0.25" stroke="#A8E600" strokeWidth="0.5" />
          {/* Glass Right */}
          <polygon points="0,-20 80,-65 80,-45 0,0" fill="#E6EDE0" fillOpacity="0.3" stroke="#A8E600" strokeWidth="0.5" />
        </g>

        {/* Floating Top Cube */}
        <g transform="translate(-110, -220)">
          <polygon points="0,-25 50,-55 0,-85 -50,-55" fill="#332F28" />
          <polygon points="-50,-55 0,-25 0,35 -50,5" fill="#1C1A14" />
          <polygon points="0,-25 50,-55 50,5 0,35" fill="#28241D" />
          {/* Lime corner node */}
          <circle cx="0" cy="-25" r="4" fill="#A8E600" />
        </g>

        {/* Clear Glass Vertical Pillar */}
        <g transform="translate(120, -110)">
          <polygon points="0,-15 35,-35 0,-55 -35,-35" fill="#FAFDF5" fillOpacity="0.6" stroke="#A8E600" strokeWidth="1" strokeOpacity="0.6" />
          <polygon points="-35,-35 0,-15 0,90 -35,70" fill="#A8E600" fillOpacity="0.2" />
          <polygon points="0,-15 35,-35 35,70 0,90" fill="#FFFFFF" fillOpacity="0.35" />
        </g>

        {/* Floating Right Cube */}
        <g transform="translate(160, -180)">
          <polygon points="0,-25 45,-50 0,-75 -45,-50" fill="#332F28" />
          <polygon points="-45,-50 0,-25 0,30 -45,5" fill="#1C1A14" />
          <polygon points="0,-25 45,-50 45,5 0,30" fill="#28241D" />
          {/* Horizontal layered slats */}
          <line x1="10" y1="-10" x2="45" y2="-30" stroke="var(--line)" strokeWidth="2" />
          <line x1="10" y1="0" x2="45" y2="-20" stroke="var(--line)" strokeWidth="2" />
          <line x1="10" y1="10" x2="45" y2="-10" stroke="var(--line)" strokeWidth="2" />
        </g>

        {/* Thin Circuit / Connector Lines */}
        <path d="M-110 -220 L-80 -140 L0 -160 L120 -110 L160 -180" stroke="#A8E600" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
        <path d="M-180 20 L-60 -10 L0 -60" stroke="#A8E600" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M0 -60 L140 40" stroke="#A8E600" strokeWidth="1" strokeDasharray="3 3" fill="none" />

        {/* Glowing Lime Nodes */}
        <g>
          <circle cx="-110" cy="-220" r="5" fill="#A8E600" />
          <circle cx="-80" cy="-140" r="4" fill="#A8E600" />
          <circle cx="0" cy="-160" r="6" fill="#A8E600" />
          <circle cx="120" cy="-110" r="4" fill="#A8E600" />
          <circle cx="160" cy="-180" r="5" fill="#A8E600" />
          <circle cx="-60" cy="-10" r="4" fill="#A8E600" />
          <circle cx="140" cy="40" r="4" fill="#A8E600" />
        </g>
      </g>
    </svg>
  )
})
