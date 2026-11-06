import React from 'react';
import { Lock } from 'lucide-react';

interface ProjectPlaceholderProps {
  type: 'dental' | 'invoice' | 'portfolio' | 'emotion';
  title: string;
  isPrivate?: boolean;
}

export const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({
  type,
  title,
  isPrivate,
}) => {
  return (
    <div
      role="img"
      aria-label={`${title} preview graphic`}
      className="relative w-full aspect-video rounded-[12px] overflow-hidden bg-(--color-surface-2) border border-(--color-border) flex items-center justify-center p-4 select-none"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      {type === 'dental' && (
        <svg
          viewBox="0 0 360 200"
          className="w-full h-full max-h-[180px] drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SaaS Dashboard Frame */}
          <rect x="20" y="20" width="320" height="160" rx="8" fill="#111827" stroke="#263045" strokeWidth="1.5" />
          {/* Top Header Bar */}
          <rect x="20" y="20" width="320" height="28" rx="8" fill="#1A2236" />
          <circle cx="36" cy="34" r="3" fill="#EF4444" />
          <circle cx="46" cy="34" r="3" fill="#F59E0B" />
          <circle cx="56" cy="34" r="3" fill="#10B981" />
          <rect x="75" y="28" width="100" height="12" rx="4" fill="#263045" />

          {/* Sidebar */}
          <rect x="20" y="48" width="55" height="132" fill="#0F172A" />
          <rect x="28" y="58" width="39" height="6" rx="2" fill="#6366F1" opacity="0.8" />
          <rect x="28" y="70" width="30" height="4" rx="2" fill="#475569" />
          <rect x="28" y="80" width="34" height="4" rx="2" fill="#475569" />
          <rect x="28" y="90" width="28" height="4" rx="2" fill="#475569" />

          {/* Main Dashboard Cards */}
          <rect x="85" y="58" width="70" height="42" rx="6" fill="#1A2236" stroke="#263045" />
          <text x="92" y="72" fill="#9CA3AF" fontSize="7" fontFamily="sans-serif">PRACTICES</text>
          <text x="92" y="88" fill="#22D3EE" fontSize="12" fontWeight="bold" fontFamily="sans-serif">148+</text>

          <rect x="163" y="58" width="70" height="42" rx="6" fill="#1A2236" stroke="#263045" />
          <text x="170" y="72" fill="#9CA3AF" fontSize="7" fontFamily="sans-serif">SUPPLIERS</text>
          <text x="170" y="88" fill="#6366F1" fontSize="12" fontWeight="bold" fontFamily="sans-serif">86</text>

          <rect x="241" y="58" width="85" height="42" rx="6" fill="#1A2236" stroke="#263045" />
          <text x="248" y="72" fill="#9CA3AF" fontSize="7" fontFamily="sans-serif">REVENUE (STRIPE)</text>
          <text x="248" y="88" fill="#10B981" fontSize="12" fontWeight="bold" fontFamily="sans-serif">ACTIVE</text>

          {/* Table / Graph Area */}
          <rect x="85" y="108" width="241" height="60" rx="6" fill="#1A2236" stroke="#263045" />
          <path d="M95 145 Q 140 120, 180 135 T 260 118 T 315 130" stroke="#6366F1" strokeWidth="2" fill="none" />
          <path d="M95 145 Q 140 120, 180 135 T 260 118 T 315 130 L 315 160 L 95 160 Z" fill="#6366F1" fillOpacity="0.1" />
        </svg>
      )}

      {type === 'invoice' && (
        <svg
          viewBox="0 0 360 200"
          className="w-full h-full max-h-[180px] drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="50" y="15" width="260" height="170" rx="8" fill="#111827" stroke="#263045" strokeWidth="1.5" />
          <rect x="65" y="30" width="80" height="10" rx="3" fill="#6366F1" />
          <rect x="240" y="30" width="55" height="14" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="0.8" />
          <text x="252" y="40" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PAID</text>

          {/* Divider */}
          <line x1="65" y1="52" x2="295" y2="52" stroke="#263045" strokeWidth="1" />

          {/* Invoice Table Rows */}
          <rect x="65" y="65" width="140" height="6" rx="2" fill="#E5E7EB" fillOpacity="0.8" />
          <rect x="250" y="65" width="45" height="6" rx="2" fill="#E5E7EB" fillOpacity="0.8" />

          <rect x="65" y="82" width="110" height="6" rx="2" fill="#9CA3AF" fillOpacity="0.6" />
          <rect x="255" y="82" width="40" height="6" rx="2" fill="#9CA3AF" fillOpacity="0.6" />

          <rect x="65" y="99" width="130" height="6" rx="2" fill="#9CA3AF" fillOpacity="0.6" />
          <rect x="260" y="99" width="35" height="6" rx="2" fill="#9CA3AF" fillOpacity="0.6" />

          {/* Total Box */}
          <rect x="200" y="125" width="95" height="40" rx="6" fill="#1A2236" stroke="#263045" />
          <text x="210" y="140" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">TOTAL DUE</text>
          <text x="210" y="156" fill="#22D3EE" fontSize="13" fontWeight="bold" fontFamily="sans-serif">$4,250.00</text>
        </svg>
      )}

      {type === 'portfolio' && (
        <svg
          viewBox="0 0 360 200"
          className="w-full h-full max-h-[180px] drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Browser Window */}
          <rect x="35" y="20" width="290" height="160" rx="8" fill="#111827" stroke="#263045" strokeWidth="1.5" />
          <rect x="35" y="20" width="290" height="24" rx="8" fill="#1A2236" />
          <circle cx="50" cy="32" r="3" fill="#EF4444" />
          <circle cx="60" cy="32" r="3" fill="#F59E0B" />
          <circle cx="70" cy="32" r="3" fill="#10B981" />
          <rect x="85" y="26" width="120" height="12" rx="3" fill="#0F172A" />

          {/* Hero Simulation */}
          <rect x="55" y="60" width="130" height="14" rx="3" fill="#6366F1" />
          <rect x="55" y="80" width="100" height="8" rx="2" fill="#22D3EE" />
          <rect x="55" y="95" width="140" height="5" rx="2" fill="#475569" />
          <rect x="55" y="105" width="120" height="5" rx="2" fill="#475569" />

          <rect x="55" y="125" width="55" height="18" rx="5" fill="#6366F1" />
          <rect x="116" y="125" width="55" height="18" rx="5" fill="#1A2236" stroke="#263045" />

          {/* Right Floating Card */}
          <rect x="215" y="55" width="90" height="95" rx="8" fill="#1A2236" stroke="#263045" />
          <circle cx="260" cy="85" r="16" fill="#6366F1" fillOpacity="0.2" stroke="#6366F1" strokeWidth="1" />
          <text x="245" y="89" fill="#22D3EE" fontSize="12" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
          <rect x="228" y="112" width="64" height="5" rx="2" fill="#475569" />
          <rect x="235" y="122" width="50" height="5" rx="2" fill="#475569" />
        </svg>
      )}

      {type === 'emotion' && (
        <svg
          viewBox="0 0 360 200"
          className="w-full h-full max-h-[180px] drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Camera Frame */}
          <rect x="40" y="20" width="280" height="160" rx="8" fill="#111827" stroke="#263045" strokeWidth="1.5" />
          
          {/* Target Reticle corners */}
          <path d="M70 50 L90 50 M70 50 L70 70" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
          <path d="M210 50 L190 50 M210 50 L210 70" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 150 L90 150 M70 150 L70 130" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
          <path d="M210 150 L190 150 M210 150 L210 130" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />

          {/* Face Mesh Landmark Points */}
          <circle cx="140" cy="100" r="38" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="125" cy="90" r="3" fill="#22D3EE" />
          <circle cx="155" cy="90" r="3" fill="#22D3EE" />
          <path d="M130 115 Q 140 125 150 115" stroke="#10B981" strokeWidth="2" fill="none" />

          {/* Emotion Classification Sidebar */}
          <rect x="225" y="35" width="80" height="130" rx="6" fill="#1A2236" stroke="#263045" />
          <text x="233" y="52" fill="#9CA3AF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">CLASSIFICATION</text>
          
          <text x="233" y="70" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="sans-serif">HAPPY 94%</text>
          <rect x="233" y="74" width="64" height="4" rx="2" fill="#263045" />
          <rect x="233" y="74" width="60" height="4" rx="2" fill="#10B981" />

          <text x="233" y="96" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">NEUTRAL 5%</text>
          <rect x="233" y="100" width="64" height="4" rx="2" fill="#263045" />
          <rect x="233" y="100" width="6" height="4" rx="2" fill="#9CA3AF" />

          <text x="233" y="122" fill="#9CA3AF" fontSize="8" fontFamily="sans-serif">SURPRISE 1%</text>
          <rect x="233" y="126" width="64" height="4" rx="2" fill="#263045" />
          <rect x="233" y="126" width="3" height="4" rx="2" fill="#9CA3AF" />

          <rect x="233" y="142" width="64" height="15" rx="3" fill="#0F172A" stroke="#334155" />
          <text x="240" y="152" fill="#6366F1" fontSize="7" fontWeight="bold" fontFamily="monospace">ARDUINO: ON</text>
        </svg>
      )}

      {/* Private Project Badge Overlay */}
      {isPrivate && (
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 border border-amber-500/30 text-[11px] font-mono shadow-sm">
          <Lock className="w-3 h-3" />
          <span>Private / Client</span>
        </div>
      )}
    </div>
  );
};
