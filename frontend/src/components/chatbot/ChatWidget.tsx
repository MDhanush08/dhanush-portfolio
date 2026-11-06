import { useState } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import { ChatPanel } from './ChatPanel';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close AI Portfolio Chat' : 'Open AI Portfolio Chat'}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-xl shadow-[var(--color-primary)]/25 hover:shadow-2xl hover:shadow-[var(--color-primary)]/40 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
        >
          <div className="relative">
            {isOpen ? <MessageSquare className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </div>

          <span className="text-xs font-mono font-semibold tracking-wide hidden sm:inline-block">
            Ask AI
          </span>
        </button>
      </div>

      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
