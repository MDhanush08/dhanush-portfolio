import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 my-2">
      <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
        <Bot className="w-4 h-4" />
      </div>

      <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center gap-1.5 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" />
      </div>
    </div>
  );
}
