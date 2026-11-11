import { memo } from 'react'
import type { VisualType } from '../../types'
import { cn } from '../../lib/cn'

interface ProjectVisualProps {
  type: VisualType
  className?: string
  screenshot?: string
  alt?: string
  title?: string
  priority?: boolean
}

/* -------------------------------------------------------------------------
   a) Dental Interface 360 Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function DentalVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Background panel */}
      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* App window frame */}
      <rect
        x="24"
        y="16"
        width="592"
        height="328"
        rx="6"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      {/* Header bar */}
      <line x1="24" y1="52" x2="616" y2="52" stroke="var(--line)" strokeWidth="1" />
      <circle cx="44" cy="34" r="3.5" fill="var(--line)" />
      <circle cx="56" cy="34" r="3.5" fill="var(--line)" />
      <circle cx="68" cy="34" r="3.5" fill="var(--line)" />

      {/* App title feature label */}
      <text
        x="92"
        y="38"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--ink)"
      >
        DENTAL INTERFACE
      </text>

      {/* Notification Bell with lime dot */}
      <g transform="translate(506, 24)">
        <path
          d="M 10 3 C 7 3 5 5 5 8 L 5 12 L 3 14 L 3 15 L 17 15 L 17 14 L 15 12 L 15 8 C 15 5 13 3 10 3 Z M 8.5 16 C 8.5 16.8 9.2 17.5 10 17.5 C 10.8 17.5 11.5 16.8 11.5 16 Z"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="4" r="3.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1" />
      </g>

      {/* Pay button in header */}
      <rect x="540" y="22" width="56" height="24" rx="3" fill="var(--accent)" />
      <text
        x="568"
        y="38"
        fontSize="10"
        fontWeight="700"
        fill="var(--on-accent)"
        textAnchor="middle"
      >
        Pay
      </text>

      {/* Left Sidebar */}
      <line x1="176" y1="52" x2="176" y2="344" stroke="var(--line)" strokeWidth="1" />

      {/* Role switcher heading */}
      <text
        x="40"
        y="74"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        ROLE SWITCHER
      </text>

      {/* Role items */}
      <text x="46" y="98" fontSize="11" fontWeight="500" fill="var(--muted)">
        Admin
      </text>
      <text x="46" y="124" fontSize="11" fontWeight="500" fill="var(--muted)">
        Supplier
      </text>

      {/* Practice - Highlighted with lime tint */}
      <rect
        x="36"
        y="136"
        width="128"
        height="26"
        rx="3"
        fill="var(--accent)"
        fillOpacity="0.22"
        stroke="var(--accent)"
        strokeWidth="1"
      />
      <text x="46" y="153" fontSize="11" fontWeight="700" fill="var(--ink)">
        Practice
      </text>
      <circle cx="150" cy="149" r="3" fill="var(--accent)" />

      <text x="46" y="182" fontSize="11" fontWeight="500" fill="var(--muted)">
        Professional
      </text>

      {/* Sidebar lower skeleton lines */}
      <line x1="36" y1="206" x2="164" y2="206" stroke="var(--line)" strokeWidth="1" />
      <rect x="46" y="222" width="76" height="5" rx="2" fill="var(--line)" />
      <rect x="46" y="238" width="94" height="5" rx="2" fill="var(--line)" />
      <rect x="46" y="254" width="68" height="5" rx="2" fill="var(--line)" />

      {/* Main Area: Tooth icons */}
      <text
        x="196"
        y="74"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        DENTAL ODONTOGRAM
      </text>

      {/* Row of simple tooth icons */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const xPos = 196 + i * 66
        return (
          <g key={i} transform={`translate(${xPos}, 82)`}>
            <rect
              width="56"
              height="40"
              rx="3"
              fill="var(--bg-alt)"
              stroke="var(--line)"
              strokeWidth="1"
            />
            <path
              d="M 23 8 C 20 8 18 10 18 13 C 18 16 19 19 20 24 C 20.5 27 22 27 23.5 23 C 24.5 19 26 19 27 23 C 28.5 27 30 27 30.5 24 C 31.5 19 32.5 16 32.5 13 C 32.5 10 30.5 8 27.5 8 C 26.5 8 25.5 9 25.2 10 C 24.9 9 23.9 8 23 8 Z"
              fill={i === 2 ? 'var(--accent)' : 'none'}
              fillOpacity={i === 2 ? '0.35' : '1'}
              stroke={i === 2 ? 'var(--ink)' : 'var(--muted)'}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
        )
      })}

      {/* Orders section heading */}
      <text
        x="196"
        y="148"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        ORDERS
      </text>

      {/* Row 1: Paid */}
      <rect
        x="196"
        y="158"
        width="396"
        height="44"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="212" y="170" width="130" height="7" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="212" y="184" width="80" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
      <rect x="430" y="169" width="54" height="22" rx="3" fill="var(--accent)" />
      <text
        x="457"
        y="184"
        fontSize="10"
        fontWeight="700"
        fill="var(--on-accent)"
        textAnchor="middle"
      >
        Paid
      </text>
      <circle cx="560" cy="180" r="4" fill="var(--line)" />

      {/* Row 2: Pending skeleton */}
      <rect
        x="196"
        y="210"
        width="396"
        height="44"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="212" y="222" width="150" height="7" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="212" y="236" width="95" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
      <rect
        x="430"
        y="221"
        width="54"
        height="22"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="442" y="230" width="30" height="4" rx="2" fill="var(--muted)" />
      <circle cx="560" cy="232" r="4" fill="var(--line)" />

      {/* Row 3: Skeleton */}
      <rect
        x="196"
        y="262"
        width="396"
        height="44"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="212" y="274" width="120" height="7" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="212" y="288" width="70" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
      <rect
        x="430"
        y="273"
        width="54"
        height="22"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="442" y="282" width="30" height="4" rx="2" fill="var(--muted)" />
      <circle cx="560" cy="284" r="4" fill="var(--line)" />
    </svg>
  )
}

/* -------------------------------------------------------------------------
   b) Lala Invoice Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function InvoiceVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* Left: Document-style invoice card */}
      <rect
        x="36"
        y="16"
        width="390"
        height="328"
        rx="4"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      <text
        x="60"
        y="50"
        fontSize="17"
        fontWeight="700"
        letterSpacing="0.06em"
        fill="var(--ink)"
      >
        INVOICE
      </text>

      <rect x="334" y="34" width="66" height="24" rx="3" fill="var(--accent)" />
      <text
        x="367"
        y="50"
        fontSize="11"
        fontWeight="700"
        fill="var(--on-accent)"
        textAnchor="middle"
      >
        Paid
      </text>

      <line x1="60" y1="64" x2="400" y2="64" stroke="var(--line)" strokeWidth="1" />

      {/* Bill-to block */}
      <text
        x="60"
        y="84"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        BILL TO
      </text>
      <rect x="60" y="92" width="130" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="60" y="104" width="90" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
      <rect x="60" y="114" width="105" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />

      {/* Line items table */}
      <rect x="60" y="136" width="340" height="20" rx="2" fill="var(--bg-alt)" />
      <text x="72" y="149" fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="var(--muted)">
        ITEM
      </text>
      <text x="250" y="149" fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="var(--muted)">
        QTY
      </text>
      <text x="340" y="149" fontSize="8" fontWeight="700" letterSpacing="0.08em" fill="var(--muted)">
        AMOUNT
      </text>

      {/* Item 1 */}
      <rect x="72" y="168" width="110" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="252" y="168" width="18" height="6" rx="2" fill="var(--line)" />
      <rect x="342" y="168" width="46" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <line x1="60" y1="184" x2="400" y2="184" stroke="var(--line)" strokeWidth="0.5" />

      {/* Item 2 */}
      <rect x="72" y="196" width="85" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="252" y="196" width="18" height="6" rx="2" fill="var(--line)" />
      <rect x="342" y="196" width="46" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <line x1="60" y1="212" x2="400" y2="212" stroke="var(--line)" strokeWidth="0.5" />

      {/* Item 3 */}
      <rect x="72" y="224" width="130" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="252" y="224" width="18" height="6" rx="2" fill="var(--line)" />
      <rect x="342" y="224" width="46" height="6" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <line x1="60" y1="240" x2="400" y2="240" stroke="var(--line)" strokeWidth="0.5" />

      {/* Total bar */}
      <rect
        x="60"
        y="260"
        width="340"
        height="36"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <text
        x="76"
        y="282"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--ink)"
      >
        TOTAL
      </text>
      <rect x="320" y="274" width="68" height="9" rx="2" fill="var(--ink)" />

      {/* Right: Small Panel */}
      <rect
        x="444"
        y="16"
        width="160"
        height="328"
        rx="4"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      <text
        x="460"
        y="42"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        ROLE
      </text>

      <rect
        x="460"
        y="52"
        width="128"
        height="28"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect
        x="462"
        y="54"
        width="62"
        height="24"
        rx="2"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <text
        x="493"
        y="70"
        fontSize="10"
        fontWeight="700"
        fill="var(--ink)"
        textAnchor="middle"
      >
        Admin
      </text>
      <text
        x="556"
        y="70"
        fontSize="10"
        fontWeight="500"
        fill="var(--muted)"
        textAnchor="middle"
      >
        User
      </text>

      <line x1="460" y1="96" x2="588" y2="96" stroke="var(--line)" strokeWidth="1" />

      <text
        x="460"
        y="118"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        ACTIONS
      </text>

      {/* 1. Create */}
      <rect x="460" y="128" width="128" height="30" rx="3" fill="var(--accent)" />
      <text
        x="524"
        y="147"
        fontSize="11"
        fontWeight="700"
        fill="var(--on-accent)"
        textAnchor="middle"
      >
        Create
      </text>

      {/* 2. Edit */}
      <rect
        x="460"
        y="168"
        width="128"
        height="30"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <text
        x="524"
        y="187"
        fontSize="11"
        fontWeight="600"
        fill="var(--ink)"
        textAnchor="middle"
      >
        Edit
      </text>

      {/* 3. Delete */}
      <rect
        x="460"
        y="208"
        width="128"
        height="30"
        rx="3"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <text
        x="524"
        y="227"
        fontSize="11"
        fontWeight="600"
        fill="var(--ink)"
        textAnchor="middle"
      >
        Delete
      </text>

      <line x1="460" y1="256" x2="588" y2="256" stroke="var(--line)" strokeWidth="1" />
      <rect x="460" y="272" width="86" height="5" rx="2" fill="var(--line)" />
      <rect x="460" y="286" width="108" height="5" rx="2" fill="var(--line)" />
    </svg>
  )
}

/* -------------------------------------------------------------------------
   c) Viral Forge Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function ViralForgeVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <defs>
        <linearGradient id="vf-mock-gradient-169" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--bg-alt)" />
          <stop offset="50%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--bg-alt)" />
        </linearGradient>
      </defs>

      <rect width="640" height="360" fill="var(--bg-alt)" />

      <rect
        x="24"
        y="16"
        width="592"
        height="328"
        rx="6"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      <text
        x="44"
        y="42"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--ink)"
      >
        POST COMPOSER
      </text>

      <rect
        x="410"
        y="28"
        width="82"
        height="22"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <circle cx="422" cy="39" r="3.5" fill="var(--accent)" />
      <text x="456" y="43" fontSize="9" fontWeight="600" fill="var(--ink)" textAnchor="middle">
        Facebook
      </text>

      <rect
        x="500"
        y="28"
        width="86"
        height="22"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <circle cx="512" cy="39" r="3.5" fill="var(--accent)" />
      <text x="548" y="43" fontSize="9" fontWeight="600" fill="var(--ink)" textAnchor="middle">
        Instagram
      </text>

      <line x1="24" y1="58" x2="616" y2="58" stroke="var(--line)" strokeWidth="1" />

      {/* Left Column */}
      <rect
        x="44"
        y="72"
        width="236"
        height="40"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="56" y="82" width="140" height="6" rx="2" fill="var(--ink)" fillOpacity="0.7" />
      <rect x="56" y="94" width="85" height="5" rx="2" fill="var(--muted)" fillOpacity="0.4" />

      <rect x="44" y="120" width="236" height="26" rx="3" fill="var(--ink)" />
      <text
        x="162"
        y="137"
        fontSize="10"
        fontWeight="600"
        fill="var(--bg)"
        textAnchor="middle"
      >
        Generate
      </text>

      <rect
        x="44"
        y="156"
        width="236"
        height="168"
        rx="4"
        fill="url(#vf-mock-gradient-169)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      <g transform="translate(162, 240)">
        <path
          d="M 0 -20 Q 0 0 -20 0 Q 0 0 0 20 Q 0 0 20 0 Q 0 0 0 -20 Z"
          fill="var(--accent)"
        />
        <path
          d="M 22 -14 Q 22 -5 13 -5 Q 22 -5 22 4 Q 22 -5 31 -5 Q 22 -5 22 -14 Z"
          fill="var(--accent)"
          fillOpacity="0.75"
        />
      </g>

      <line x1="304" y1="58" x2="304" y2="344" stroke="var(--line)" strokeWidth="1" />

      {/* Right Column */}
      <text x="326" y="80" fontSize="10" fontWeight="700" fill="var(--ink)">
        Title
      </text>
      <rect
        x="326"
        y="88"
        width="264"
        height="26"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="338" y="98" width="130" height="6" rx="2" fill="var(--ink)" fillOpacity="0.7" />

      <text x="326" y="132" fontSize="10" fontWeight="700" fill="var(--ink)">
        Description
      </text>
      <rect
        x="326"
        y="140"
        width="264"
        height="38"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="338" y="150" width="190" height="5" rx="2" fill="var(--muted)" fillOpacity="0.6" />
      <rect x="338" y="162" width="120" height="5" rx="2" fill="var(--muted)" fillOpacity="0.4" />

      <text x="326" y="196" fontSize="10" fontWeight="700" fill="var(--ink)">
        Caption
      </text>
      <rect
        x="326"
        y="204"
        width="264"
        height="32"
        rx="3"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <rect x="338" y="214" width="170" height="5" rx="2" fill="var(--muted)" fillOpacity="0.6" />

      {/* Hashtags */}
      <g transform="translate(326, 252)">
        <rect x="0" y="0" width="46" height="20" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <text x="23" y="14" fontSize="10" fontWeight="600" fill="var(--ink)" textAnchor="middle">
          #ai
        </text>

        <rect x="52" y="0" width="56" height="20" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <text x="80" y="14" fontSize="10" fontWeight="600" fill="var(--ink)" textAnchor="middle">
          #viral
        </text>

        <rect x="114" y="0" width="52" height="20" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <text x="140" y="14" fontSize="10" fontWeight="600" fill="var(--ink)" textAnchor="middle">
          #post
        </text>
      </g>

      {/* Lime Publish Button */}
      <rect x="326" y="288" width="264" height="30" rx="3" fill="var(--accent)" />
      <text
        x="458"
        y="307"
        fontSize="11"
        fontWeight="700"
        fill="var(--on-accent)"
        textAnchor="middle"
      >
        Publish
      </text>
    </svg>
  )
}

/* -------------------------------------------------------------------------
   d) Vignesh Metals Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function MetalsVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* Phone 2 (Behind on right) */}
      <g transform="translate(352, 24)">
        <rect
          x="0"
          y="0"
          width="212"
          height="312"
          rx="18"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <rect x="80" y="8" width="52" height="4" rx="2" fill="var(--line)" />
        <text x="20" y="40" fontSize="11" fontWeight="700" fill="var(--ink)">
          List product
        </text>

        <rect
          x="20"
          y="50"
          width="172"
          height="80"
          rx="4"
          fill="var(--bg-alt)"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <path
          d="M 88 100 L 100 84 L 112 100 Z M 108 100 L 118 90 L 128 100 Z"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="120" cy="78" r="3.5" fill="var(--line)" />

        <rect
          x="20"
          y="150"
          width="172"
          height="22"
          rx="3"
          fill="var(--bg-alt)"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <rect
          x="20"
          y="186"
          width="172"
          height="22"
          rx="3"
          fill="var(--bg-alt)"
          stroke="var(--line)"
          strokeWidth="1"
        />

        <rect x="20" y="240" width="172" height="26" rx="3" fill="var(--ink)" />
        <text
          x="106"
          y="257"
          fontSize="10"
          fontWeight="600"
          fill="var(--bg)"
          textAnchor="middle"
        >
          Submit listing
        </text>
      </g>

      {/* Phone 1 (Foreground on left) */}
      <g transform="translate(86, 14)">
        <rect
          x="4"
          y="4"
          width="240"
          height="332"
          rx="22"
          fill="var(--ink)"
          fillOpacity="0.05"
        />
        <rect
          x="0"
          y="0"
          width="240"
          height="332"
          rx="22"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
        <rect x="94" y="8" width="52" height="4" rx="2" fill="var(--line)" />

        <g transform="translate(196, 20)">
          <path
            d="M 2 2 L 6 2 L 9 13 L 20 13 L 22 5 L 7 5"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="16" r="1.8" fill="var(--ink)" />
          <circle cx="18" cy="16" r="1.8" fill="var(--ink)" />
          <circle cx="21" cy="4" r="3" fill="var(--accent)" stroke="var(--surface)" strokeWidth="0.8" />
        </g>

        {/* Buyer / Seller toggle */}
        <rect
          x="20"
          y="38"
          width="200"
          height="26"
          rx="4"
          fill="var(--bg-alt)"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <rect
          x="22"
          y="40"
          width="98"
          height="22"
          rx="3"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1"
        />
        <text
          x="71"
          y="55"
          fontSize="10"
          fontWeight="700"
          fill="var(--ink)"
          textAnchor="middle"
        >
          Buyer
        </text>
        <text
          x="169"
          y="55"
          fontSize="10"
          fontWeight="500"
          fill="var(--muted)"
          textAnchor="middle"
        >
          Seller
        </text>

        {/* 2x2 product grid */}
        <rect x="20" y="74" width="96" height="88" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <rect x="26" y="80" width="84" height="42" rx="2" fill="var(--surface)" />
        <rect x="28" y="130" width="68" height="5" rx="1.5" fill="var(--ink)" fillOpacity="0.8" />
        <rect x="28" y="140" width="46" height="4" rx="1.5" fill="var(--muted)" fillOpacity="0.5" />

        <rect x="124" y="74" width="96" height="88" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <rect x="130" y="80" width="84" height="42" rx="2" fill="var(--surface)" />
        <rect x="132" y="130" width="64" height="5" rx="1.5" fill="var(--ink)" fillOpacity="0.8" />
        <rect x="132" y="140" width="42" height="4" rx="1.5" fill="var(--muted)" fillOpacity="0.5" />

        <rect x="20" y="170" width="96" height="88" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <rect x="26" y="176" width="84" height="42" rx="2" fill="var(--surface)" />
        <rect x="28" y="226" width="60" height="5" rx="1.5" fill="var(--ink)" fillOpacity="0.8" />
        <rect x="28" y="236" width="40" height="4" rx="1.5" fill="var(--muted)" fillOpacity="0.5" />

        <rect x="124" y="170" width="96" height="88" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <rect x="130" y="176" width="84" height="42" rx="2" fill="var(--surface)" />
        <rect x="132" y="226" width="66" height="5" rx="1.5" fill="var(--ink)" fillOpacity="0.8" />
        <rect x="132" y="236" width="44" height="4" rx="1.5" fill="var(--muted)" fillOpacity="0.5" />

        <rect x="20" y="272" width="200" height="32" rx="4" fill="var(--accent)" />
        <text
          x="120"
          y="292"
          fontSize="11"
          fontWeight="700"
          fill="var(--on-accent)"
          textAnchor="middle"
        >
          Add to cart
        </text>
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------------
   e) CMS Website Builder Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function CmsVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />

      <rect
        x="24"
        y="16"
        width="592"
        height="328"
        rx="6"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      <circle cx="44" cy="34" r="3.5" fill="var(--line)" />
      <circle cx="56" cy="34" r="3.5" fill="var(--line)" />
      <circle cx="68" cy="34" r="3.5" fill="var(--line)" />
      <text
        x="92"
        y="38"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--ink)"
      >
        WEBSITE BUILDER
      </text>
      <line x1="24" y1="52" x2="616" y2="52" stroke="var(--line)" strokeWidth="1" />

      {/* Palette */}
      <text
        x="42"
        y="74"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        PALETTE
      </text>

      <rect x="38" y="84" width="98" height="26" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
      <text x="50" y="101" fontSize="10" fontWeight="600" fill="var(--ink)">Text</text>

      <rect x="38" y="116" width="98" height="26" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
      <text x="50" y="133" fontSize="10" fontWeight="600" fill="var(--ink)">Image</text>

      <rect x="38" y="148" width="98" height="26" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
      <text x="50" y="165" fontSize="10" fontWeight="600" fill="var(--ink)">Button</text>

      <rect x="38" y="180" width="98" height="26" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
      <text x="50" y="197" fontSize="10" fontWeight="600" fill="var(--ink)">Section</text>

      <line x1="150" y1="52" x2="150" y2="344" stroke="var(--line)" strokeWidth="1" />

      {/* Canvas */}
      <rect
        x="166"
        y="64"
        width="310"
        height="266"
        rx="4"
        fill="var(--bg-alt)"
        stroke="var(--line)"
        strokeDasharray="4 4"
        strokeWidth="1"
      />

      {/* Block 1 */}
      <rect x="182" y="76" width="278" height="46" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
      <rect x="196" y="90" width="130" height="7" rx="2" fill="var(--ink)" fillOpacity="0.8" />
      <rect x="196" y="102" width="90" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />

      {/* Block 2 (Lifted) */}
      <g transform="translate(182, 134) rotate(-3)">
        <rect x="3" y="4" width="278" height="56" rx="3" fill="var(--ink)" fillOpacity="0.12" />
        <rect x="0" y="0" width="278" height="56" rx="3" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
        <rect x="16" y="16" width="110" height="6" rx="2" fill="var(--ink)" />
        <rect x="16" y="28" width="160" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
        <g transform="translate(242, 26)">
          <path
            d="M 0 -7 L 0 7 M -7 0 L 7 0 M 0 -7 L -2.5 -4.5 M 0 -7 L 2.5 -4.5 M 0 7 L -2.5 4.5 M 0 7 L 2.5 4.5 M -7 0 L -4.5 -2.5 M -7 0 L -4.5 2.5 M 7 0 L 4.5 -2.5 M 7 0 L 4.5 2.5"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Block 3 */}
      <rect x="182" y="206" width="278" height="50" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
      <rect x="196" y="218" width="120" height="24" rx="2" fill="var(--bg-alt)" />
      <rect x="326" y="218" width="120" height="24" rx="2" fill="var(--bg-alt)" />

      {/* Block 4 */}
      <rect x="182" y="266" width="278" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
      <rect x="196" y="284" width="80" height="6" rx="2" fill="var(--line)" />

      <line x1="490" y1="52" x2="490" y2="344" stroke="var(--line)" strokeWidth="1" />

      {/* Properties */}
      <text
        x="506"
        y="74"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        PROPERTIES
      </text>

      <rect x="506" y="86" width="56" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
      <rect x="506" y="96" width="94" height="18" rx="2" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />

      <rect x="506" y="124" width="68" height="5" rx="2" fill="var(--muted)" fillOpacity="0.5" />
      <rect x="506" y="134" width="94" height="18" rx="2" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />

      <text
        x="506"
        y="174"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.08em"
        fill="var(--muted)"
      >
        SWATCHES
      </text>
      <rect x="506" y="184" width="22" height="22" rx="3" fill="var(--accent)" stroke="var(--line)" strokeWidth="1" />
      <rect x="536" y="184" width="22" height="22" rx="3" fill="var(--ink)" stroke="var(--line)" strokeWidth="1" />

      <line x1="506" y1="224" x2="600" y2="224" stroke="var(--line)" strokeWidth="1" />
      <rect x="506" y="238" width="94" height="5" rx="2" fill="var(--line)" />
      <rect x="506" y="252" width="70" height="5" rx="2" fill="var(--line)" />
      <rect x="506" y="266" width="85" height="5" rx="2" fill="var(--line)" />
    </svg>
  )
}

/* -------------------------------------------------------------------------
   f) Personal Portfolio Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function PortfolioVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <defs>
        <clipPath id="light-split-clip-169">
          <polygon points="28,16 360,16 240,344 28,344" />
        </clipPath>
        <clipPath id="dark-split-clip-169">
          <polygon points="360,16 612,16 612,344 240,344" />
        </clipPath>
      </defs>

      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* LIGHT HALF */}
      <g clipPath="url(#light-split-clip-169)">
        <rect x="28" y="16" width="584" height="328" rx="6" fill="#FAF7F0" />
        <line x1="28" y1="50" x2="612" y2="50" stroke="#D8D2C2" strokeWidth="1" />
        <circle cx="48" cy="33" r="3.5" fill="#D8D2C2" />
        <circle cx="60" cy="33" r="3.5" fill="#D8D2C2" />
        <circle cx="72" cy="33" r="3.5" fill="#D8D2C2" />
        <rect x="100" y="24" width="160" height="18" rx="3" fill="#EFEBE0" />

        <rect x="58" y="80" width="220" height="24" rx="4" fill="#14110D" />
        <rect x="58" y="112" width="160" height="24" rx="4" fill="#14110D" />

        <rect x="58" y="152" width="220" height="7" rx="3" fill="#5C574D" fillOpacity="0.7" />
        <rect x="58" y="166" width="170" height="7" rx="3" fill="#5C574D" fillOpacity="0.4" />

        <rect x="58" y="196" width="80" height="26" rx="3" fill="#14110D" />
        <text x="98" y="213" fontSize="10" fontWeight="600" fill="#FAF7F0" textAnchor="middle">
          Projects
        </text>

        <rect x="146" y="196" width="80" height="26" rx="3" fill="transparent" stroke="#14110D" strokeWidth="1" />
        <text x="186" y="213" fontSize="10" fontWeight="600" fill="#14110D" textAnchor="middle">
          Contact
        </text>

        <rect x="58" y="242" width="130" height="60" rx="3" fill="#FFFDF8" stroke="#D8D2C2" strokeWidth="1" />
        <rect x="68" y="254" width="70" height="6" rx="2" fill="#14110D" />
        <rect x="68" y="266" width="50" height="4" rx="2" fill="#5C574D" />

        <text x="58" y="328" fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#5C574D">
          LIGHT THEME
        </text>
      </g>

      {/* DARK HALF */}
      <g clipPath="url(#dark-split-clip-169)">
        <rect x="28" y="16" width="584" height="328" rx="6" fill="#12100C" />
        <line x1="28" y1="50" x2="612" y2="50" stroke="#332F26" strokeWidth="1" />
        <rect x="240" y="24" width="180" height="18" rx="3" fill="#1C1913" />

        <rect x="58" y="80" width="220" height="24" rx="4" fill="#F4F0E6" />
        <rect x="58" y="112" width="160" height="24" rx="4" fill="#F4F0E6" />

        <rect x="58" y="152" width="220" height="7" rx="3" fill="#A8A294" fillOpacity="0.7" />
        <rect x="58" y="166" width="170" height="7" rx="3" fill="#A8A294" fillOpacity="0.4" />

        <rect x="58" y="196" width="80" height="26" rx="3" fill="#F4F0E6" />
        <text x="98" y="213" fontSize="10" fontWeight="600" fill="#12100C" textAnchor="middle">
          Projects
        </text>

        <rect x="146" y="196" width="80" height="26" rx="3" fill="transparent" stroke="#F4F0E6" strokeWidth="1" />
        <text x="186" y="213" fontSize="10" fontWeight="600" fill="#F4F0E6" textAnchor="middle">
          Contact
        </text>

        <rect x="206" y="242" width="140" height="60" rx="3" fill="#24211A" stroke="#332F26" strokeWidth="1" />
        <rect x="218" y="254" width="80" height="6" rx="2" fill="#F4F0E6" />
        <rect x="218" y="266" width="56" height="4" rx="2" fill="#A8A294" />

        <text x="510" y="328" fontSize="9" fontWeight="700" letterSpacing="0.1em" fill="#A8A294">
          DARK THEME
        </text>
      </g>

      <line x1="360" y1="16" x2="240" y2="344" stroke="var(--accent)" strokeWidth="2" />

      {/* Lime circle sticker */}
      <g transform="translate(300, 104)">
        <circle cx="0" cy="0" r="26" fill="var(--accent)" />
        <text
          x="0"
          y="4"
          fontSize="10"
          fontWeight="800"
          letterSpacing="0.06em"
          fill="var(--on-accent)"
          textAnchor="middle"
        >
          THEME
        </text>
      </g>

      <rect
        x="28"
        y="16"
        width="584"
        height="328"
        rx="6"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------
   g) Face Emotion Detection Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function EmotionVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* Camera Viewport Frame */}
      <rect
        x="36"
        y="16"
        width="374"
        height="328"
        rx="6"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      {/* Camera corner brackets */}
      <path d="M 56 60 L 56 40 L 76 40" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M 370 40 L 390 40 L 390 60" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M 56 300 L 56 320 L 76 320" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M 370 320 L 390 320 L 390 300" fill="none" stroke="var(--ink)" strokeWidth="2.5" />

      {/* Detection Box around face */}
      <rect
        x="138"
        y="66"
        width="170"
        height="174"
        rx="2"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />

      <rect x="138" y="46" width="62" height="20" rx="2" fill="var(--accent)" />
      <text
        x="169"
        y="61"
        fontSize="11"
        fontWeight="700"
        fill="var(--on-accent)"
        textAnchor="middle"
      >
        Happy
      </text>

      {/* Face */}
      <g transform="translate(223, 154)">
        <circle cx="0" cy="0" r="44" fill="none" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="-15" cy="-8" r="3.5" fill="var(--ink)" />
        <circle cx="15" cy="-8" r="3.5" fill="var(--ink)" />
        <line x1="-21" y1="-18" x2="-9" y2="-18" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="-18" x2="21" y2="-18" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M -15 14 Q 0 30 15 14"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Chips */}
      <g transform="translate(86, 266)">
        <rect x="0" y="0" width="80" height="26" rx="3" fill="var(--accent)" />
        <text x="40" y="17" fontSize="11" fontWeight="700" fill="var(--on-accent)" textAnchor="middle">
          Happy
        </text>

        <rect x="94" y="0" width="80" height="26" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <text x="134" y="17" fontSize="11" fontWeight="500" fill="var(--muted)" textAnchor="middle">
          Neutral
        </text>

        <rect x="188" y="0" width="80" height="26" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="1" />
        <text x="228" y="17" fontSize="11" fontWeight="500" fill="var(--muted)" textAnchor="middle">
          Sad
        </text>
      </g>

      {/* Connection line */}
      <path
        d="M 308 154 L 370 154 L 400 174 L 440 174"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Arduino Board */}
      <g transform="translate(440, 76)">
        <rect
          x="0"
          y="0"
          width="164"
          height="208"
          rx="6"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />

        <text
          x="16"
          y="28"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.08em"
          fill="var(--ink)"
        >
          ARDUINO
        </text>

        <circle cx="136" cy="24" r="5" fill="var(--accent)" />
        <circle cx="136" cy="24" r="8" fill="none" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
        <text x="136" y="42" fontSize="7" fontWeight="700" letterSpacing="0.06em" fill="var(--muted)" textAnchor="middle">
          LED
        </text>

        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={16 + i * 14}
            y="48"
            width="8"
            height="8"
            rx="1"
            fill="var(--bg-alt)"
            stroke="var(--line)"
            strokeWidth="0.8"
          />
        ))}

        <rect x="32" y="74" width="100" height="54" rx="3" fill="var(--ink)" />
        <text
          x="82"
          y="105"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.08em"
          fill="var(--bg)"
          textAnchor="middle"
        >
          MCU
        </text>

        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={16 + i * 14}
            y="146"
            width="8"
            height="8"
            rx="1"
            fill="var(--bg-alt)"
            stroke="var(--line)"
            strokeWidth="0.8"
          />
        ))}

        <rect x="16" y="172" width="132" height="4" rx="2" fill="var(--accent)" />
        <text x="16" y="190" fontSize="8" fontWeight="600" letterSpacing="0.06em" fill="var(--muted)">
          SERIAL INTERFACE
        </text>
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------------
   h) College Bus Tracking System Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function BustrackerVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* Phone Frame */}
      <rect
        x="64"
        y="24"
        width="232"
        height="312"
        rx="22"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />

      {/* Phone Screen Area */}
      <rect
        x="76"
        y="36"
        width="208"
        height="288"
        rx="14"
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      {/* Dynamic island / phone notch */}
      <rect x="156" y="44" width="48" height="8" rx="4" fill="var(--line)" />

      {/* Map Grid Background Blocks */}
      <g opacity="0.6">
        <rect x="90" y="66" width="42" height="36" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
        <rect x="142" y="66" width="60" height="36" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
        <rect x="212" y="66" width="58" height="52" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />

        <rect x="90" y="112" width="68" height="48" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
        <rect x="168" y="112" width="34" height="48" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />

        <rect x="90" y="170" width="52" height="44" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
        <rect x="152" y="170" width="64" height="44" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
        <rect x="226" y="128" width="44" height="86" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />

        <rect x="90" y="224" width="100" height="38" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
        <rect x="200" y="224" width="70" height="38" rx="3" fill="var(--bg-alt)" stroke="var(--line)" strokeWidth="0.8" />
      </g>

      {/* Road Network Lines */}
      <line x1="86" y1="107" x2="274" y2="107" stroke="var(--line)" strokeWidth="2.5" />
      <line x1="86" y1="165" x2="274" y2="165" stroke="var(--line)" strokeWidth="2.5" />
      <line x1="86" y1="219" x2="274" y2="219" stroke="var(--line)" strokeWidth="2.5" />
      <line x1="163" y1="60" x2="163" y2="266" stroke="var(--line)" strokeWidth="2.5" />
      <line x1="221" y1="60" x2="221" y2="266" stroke="var(--line)" strokeWidth="2.5" />

      {/* Route Line with dots */}
      <path
        d="M 110 90 L 163 107 L 163 165 L 221 165 L 221 240"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="90" r="4.5" fill="var(--ink)" />
      <circle cx="163" cy="130" r="3" fill="var(--ink)" />
      <circle cx="192" cy="165" r="3" fill="var(--ink)" />
      <circle cx="221" cy="240" r="4.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" />

      {/* Lime bus marker (rounded rectangle) on the route */}
      <g transform="translate(147, 134)">
        <rect
          x="0"
          y="0"
          width="32"
          height="20"
          rx="4"
          fill="var(--accent)"
          stroke="var(--ink)"
          strokeWidth="1.2"
        />
        {/* Bus windows */}
        <rect x="4" y="4" width="7" height="6" rx="1" fill="var(--on-accent)" fillOpacity="0.85" />
        <rect x="13" y="4" width="7" height="6" rx="1" fill="var(--on-accent)" fillOpacity="0.85" />
        <rect x="22" y="4" width="6" height="6" rx="1" fill="var(--on-accent)" fillOpacity="0.85" />
        {/* Wheels */}
        <circle cx="8" cy="19" r="2.5" fill="var(--ink)" />
        <circle cx="24" cy="19" r="2.5" fill="var(--ink)" />
      </g>

      {/* Small chip reading "Track bus" */}
      <g transform="translate(132, 276)">
        <rect
          x="0"
          y="0"
          width="96"
          height="28"
          rx="14"
          fill="var(--accent)"
        />
        <text
          x="48"
          y="18"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.02em"
          fill="var(--on-accent)"
          textAnchor="middle"
        >
          Track bus
        </text>
      </g>

      {/* Dotted Connection line to Arduino */}
      <path
        d="M 296 180 L 370 180"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Arduino Board */}
      <g transform="translate(370, 68)">
        <rect
          x="0"
          y="0"
          width="200"
          height="224"
          rx="6"
          fill="var(--surface)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />

        <text
          x="18"
          y="30"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.08em"
          fill="var(--ink)"
        >
          ARDUINO
        </text>

        {/* Lime LED */}
        <circle cx="168" cy="26" r="5" fill="var(--accent)" />
        <circle cx="168" cy="26" r="9" fill="none" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
        <text
          x="168"
          y="46"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.06em"
          fill="var(--muted)"
          textAnchor="middle"
        >
          LED
        </text>

        {/* Top pin header */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={18 + i * 14}
            y="52"
            width="8"
            height="8"
            rx="1"
            fill="var(--bg-alt)"
            stroke="var(--line)"
            strokeWidth="0.8"
          />
        ))}

        {/* Microcontroller MCU */}
        <rect x="42" y="80" width="116" height="58" rx="3" fill="var(--ink)" />
        <text
          x="100"
          y="114"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.08em"
          fill="var(--bg)"
          textAnchor="middle"
        >
          MCU
        </text>

        {/* Bottom pin header */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={18 + i * 14}
            y="156"
            width="8"
            height="8"
            rx="1"
            fill="var(--bg-alt)"
            stroke="var(--line)"
            strokeWidth="0.8"
          />
        ))}

        <rect x="18" y="184" width="164" height="4" rx="2" fill="var(--accent)" />
        <text
          x="18"
          y="204"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.06em"
          fill="var(--muted)"
        >
          GPS TRACKING MODULE
        </text>
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------------
   i) Movie Search App Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function MoviesVisual() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />

      {/* App window frame */}
      <rect
        x="24"
        y="18"
        width="592"
        height="324"
        rx="6"
        fill="var(--surface)"
        stroke="var(--line)"
        strokeWidth="1"
      />

      {/* Search bar */}
      <g transform="translate(48, 38)">
        <rect
          x="0"
          y="0"
          width="544"
          height="42"
          rx="6"
          fill="var(--bg-alt)"
          stroke="var(--line)"
          strokeWidth="1"
        />

        {/* Magnifier icon */}
        <circle cx="24" cy="21" r="7" fill="none" stroke="var(--muted)" strokeWidth="1.8" />
        <line x1="29" y1="26" x2="36" y2="33" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" />

        {/* Placeholder text */}
        <text
          x="48"
          y="26"
          fontSize="13"
          fontWeight="500"
          fill="var(--muted)"
        >
          Search movies
        </text>

        {/* Search button chip */}
        <rect x="466" y="8" width="68" height="26" rx="4" fill="var(--accent)" />
        <text
          x="500"
          y="24"
          fontSize="11"
          fontWeight="700"
          fill="var(--on-accent)"
          textAnchor="middle"
        >
          Search
        </text>
      </g>

      {/* Row of four poster cards */}
      {[0, 1, 2, 3].map((i) => {
        const xPos = 48 + i * 140
        const isHighlighted = i === 1 // One card with lime outline

        return (
          <g key={i} transform={`translate(${xPos}, 104)`}>
            {/* Card boundary */}
            <rect
              x="0"
              y="0"
              width="124"
              height="214"
              rx="6"
              fill="var(--bg-alt)"
              stroke={isHighlighted ? 'var(--accent)' : 'var(--line)'}
              strokeWidth={isHighlighted ? 2 : 1}
            />

            {/* Poster skeleton block */}
            <rect
              x="10"
              y="10"
              width="104"
              height="136"
              rx="4"
              fill="var(--surface)"
              stroke="var(--line)"
              strokeWidth="0.8"
            />
            {/* Skeleton visual shape inside poster */}
            <rect
              x="22"
              y="22"
              width="80"
              height="90"
              rx="3"
              fill="var(--line)"
              fillOpacity="0.35"
            />
            {isHighlighted && (
              <circle cx="62" cy="67" r="14" fill="var(--accent)" fillOpacity="0.25" />
            )}

            {/* Star icon with rating line */}
            <g transform="translate(12, 156)">
              {/* Star icon */}
              <polygon
                points="6,0 7.8,4.2 12,4.6 8.8,7.5 9.8,12 6,9.6 2.2,12 3.2,7.5 0,4.6 4.2,4.2"
                fill="var(--accent)"
              />
              {/* Rating skeleton */}
              <rect
                x="18"
                y="3"
                width="34"
                height="6"
                rx="2"
                fill="var(--muted)"
                fillOpacity="0.6"
              />
            </g>

            {/* Title Line 1 */}
            <rect
              x="12"
              y="176"
              width={isHighlighted ? '88' : '78'}
              height="7"
              rx="2"
              fill="var(--ink)"
              fillOpacity="0.85"
            />

            {/* Title Line 2 */}
            <rect
              x="12"
              y="190"
              width={isHighlighted ? '54' : '46'}
              height="6"
              rx="2"
              fill="var(--muted)"
              fillOpacity="0.5"
            />
          </g>
        )
      })}
    </svg>
  )
}

/* -------------------------------------------------------------------------
   j) Generic Fallback Visual (16:9 - 640 x 360)
------------------------------------------------------------------------- */
function GenericVisual({ title }: { title?: string }) {
  const letters = title
    ? title
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .join('')
        .slice(0, 3)
        .toUpperCase()
    : 'PRJ'

  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      className="w-full h-full block select-none"
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <rect width="640" height="360" fill="var(--bg-alt)" />
      <rect
        x="24"
        y="16"
        width="592"
        height="328"
        rx="4"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <text
        x="320"
        y="205"
        fontSize="76"
        fontWeight="700"
        letterSpacing="-0.04em"
        fill="var(--ink)"
        fillOpacity="0.85"
        textAnchor="middle"
      >
        {letters}
      </text>
    </svg>
  )
}

/* -------------------------------------------------------------------------
   ProjectVisual Component Export
------------------------------------------------------------------------- */
export const ProjectVisual = memo(function ProjectVisual({
  type,
  className,
  screenshot,
  alt,
  title = '',
  priority = false,
}: ProjectVisualProps) {
  // If screenshot is provided, show screenshot with loading="lazy" (or "eager") & explicit width 1600, height 900
  if (screenshot) {
    return (
      <div
        role="img"
        aria-label={alt || title || 'Project visual'}
        className={cn('relative w-full h-full aspect-[16/9] overflow-hidden bg-[var(--bg-alt)] select-none p-0 flex items-center justify-center', className)}
      >
        <img
          src={screenshot}
          alt={alt || title || 'Project visual'}
          width={1600}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-contain select-none"
        />
      </div>
    )
  }

  const ariaDescription = alt || (title ? `Mock-UI illustration for ${title}` : `UI illustration for ${type}`)

  return (
    <div
      role="img"
      aria-label={ariaDescription}
      className={cn('relative w-full h-full aspect-[16/9] overflow-hidden bg-[var(--bg-alt)] select-none p-0 flex items-center justify-center', className)}
    >
      {type === 'dental' && <DentalVisual />}
      {type === 'invoice' && <InvoiceVisual />}
      {type === 'viralforge' && <ViralForgeVisual />}
      {type === 'metals' && <MetalsVisual />}
      {type === 'cms' && <CmsVisual />}
      {type === 'portfolio' && <PortfolioVisual />}
      {type === 'emotion' && <EmotionVisual />}
      {type === 'bustracker' && <BustrackerVisual />}
      {type === 'movies' && <MoviesVisual />}
      {type === 'generic' && <GenericVisual title={title} />}
    </div>
  )
})
