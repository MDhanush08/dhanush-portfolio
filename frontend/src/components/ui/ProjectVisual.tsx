import { memo, useState } from 'react'
import type { VisualType } from '../../types'
import { cn } from '../../lib/cn'

interface ProjectVisualProps {
  type: VisualType
  className?: string
  screenshot?: string
  alt?: string
}

export const ProjectVisual = memo(function ProjectVisual({
  type,
  className,
  screenshot,
  alt = 'Project visual',
}: ProjectVisualProps) {
  const [imgError, setImgError] = useState(false)

  if (screenshot && !imgError) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden bg-[var(--bg-alt)]', className)}>
        <img
          src={screenshot}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top select-none"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden select-none transition-transform duration-500 ease-out flex items-center justify-center',
        className
      )}
    >
      {type === 'dental' && (
        <div className="w-full h-full bg-[#17140F] text-[#FAF7F0] relative flex items-center justify-start p-6 md:p-8">
          {/* Huge typography */}
          <span className="text-[clamp(3.5rem,8vw,7rem)] font-bold tracking-[-0.05em] text-[#FAF7F0]/90 leading-none">
            D/360
          </span>

          {/* Mock browser card at bottom-right */}
          <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 w-44 md:w-56 p-3 bg-[#24261E] border border-[#3E4233] rounded-[3px] shadow-sm flex flex-col gap-2">
            {/* Window dots */}
            <div className="flex items-center gap-1.5 pb-1 border-b border-[#3E4233]">
              <span className="w-2 h-2 rounded-full bg-[#525743]" />
              <span className="w-2 h-2 rounded-full bg-[#525743]" />
              <span className="w-2 h-2 rounded-full bg-[#525743]" />
            </div>
            {/* Hairlines */}
            <div className="w-3/4 h-[1px] bg-[#3E4233]" />
            <div className="w-1/2 h-[1px] bg-[#3E4233]" />
            {/* Three olive-green blocks */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="h-5 bg-[#3B4527] rounded-[2px]" />
              <div className="h-5 bg-[#4F5D34] rounded-[2px]" />
              <div className="h-5 bg-[#647542] rounded-[2px]" />
            </div>
          </div>
        </div>
      )}

      {type === 'invoice' && (
        <div className="w-full h-full bg-[#E4E0D2] relative flex items-center justify-start p-6 md:p-8">
          {/* Huge typography */}
          <span className="text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.05em] text-[#14110D] leading-none">
            LL / INV
          </span>

          {/* Invoice card at bottom-right */}
          <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 w-40 md:w-52 p-3 bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-[3px] shadow-sm rotate-[-3deg] transition-transform flex flex-col gap-2">
            {/* Lime bar */}
            <div className="w-full h-1.5 bg-[#A8E600] rounded-[1px]" />
            <div className="flex items-center justify-between text-[11px] font-mono tracking-tight text-[var(--muted)] pt-0.5">
              <span>INV—024</span>
              <span className="text-[9px] uppercase px-1 py-0.5 bg-[#A8E600]/20 text-[var(--ink)] font-semibold rounded-[2px]">
                PAID
              </span>
            </div>
            {/* Hairlines */}
            <div className="w-full h-[1px] bg-[var(--line)]" />
            <div className="w-3/4 h-[1px] bg-[var(--line)]" />
            <span className="text-[10px] tracking-wider uppercase text-[var(--muted)] font-medium">
              INVOICE / BILLING
            </span>
          </div>
        </div>
      )}

      {type === 'portfolio' && (
        <div className="w-full h-full bg-[var(--bg-alt)] border border-[var(--line)] relative flex items-center justify-start p-6 md:p-8">
          {/* Huge typography */}
          <span className="text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.05em] text-[var(--ink)] leading-none">
            &#123; me &#125;
          </span>

          {/* Small rotated code card in JetBrains Mono */}
          <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 p-3 md:p-4 bg-[var(--surface)] border border-[var(--line)] rounded-[3px] shadow-sm rotate-[3deg] font-mono text-[11px] md:text-xs text-[var(--ink)] leading-relaxed">
            <div className="text-[var(--muted)]">// developer profile</div>
            <div>
              <span className="text-[var(--muted)]">const</span> portfolio ={' '}
              <span className="text-[var(--ink)] font-semibold">create()</span>
            </div>
            <div>
              <span className="text-[var(--muted)]">return</span>{' '}
              <span className="text-[#A8E600] bg-[#14110D] px-1 py-0.5 rounded-[2px] font-semibold">
                &lt;work /&gt;
              </span>
            </div>
          </div>
        </div>
      )}

      {type === 'emotion' && (
        <div className="w-full h-full bg-[#A8E600] relative flex items-center justify-start p-6 md:p-8">
          {/* Huge typography */}
          <span className="text-[clamp(2.75rem,6.5vw,6rem)] font-bold tracking-[-0.05em] text-[#14110D] leading-none">
            :) / :| / :(
          </span>

          {/* Small outlined card at bottom-right */}
          <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 p-3 md:p-4 bg-[#14110D] text-[#FAF7F0] border border-[#14110D] rounded-[3px] shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            </div>
            <div className="text-[10px] tracking-[0.1em] font-mono font-semibold text-[#A8E600]">
              DETECT / RESPOND
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
