import React, { useState } from 'react';
import { MessageSquareText, Sparkles } from 'lucide-react';
import { ChatPanel } from './ChatPanel';
import { cn } from '../../lib/utils';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant Chat"
          title="Ask AI Assistant about Dhanush"
          className={cn(
            'fixed right-5 bottom-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-(--color-primary) to-(--color-secondary) text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)'
          )}
          style={{
            paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
            paddingRight: 'calc(1rem + env(safe-area-inset-right, 0px))',
          }}
        >
          <div className="relative flex items-center justify-center">
            <MessageSquareText className="w-5 h-5" />
            <Sparkles className="w-2.5 h-2.5 absolute -top-1 -right-1 text-amber-300" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            Ask AI
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Chat Panel */}
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
