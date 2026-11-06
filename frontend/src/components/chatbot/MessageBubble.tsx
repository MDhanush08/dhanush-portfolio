import { Bot, User } from 'lucide-react';
import type { ChatMessage } from '../../types';

export interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.sender === 'assistant';

  // Simple formatter for bullet points and bold formatting
  const formatText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Split on **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lineIdx} className="block mb-1 last:mb-0">
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-semibold text-[var(--color-text)]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <div
      className={`flex items-start gap-2.5 my-2.5 ${
        isBot ? 'justify-start' : 'justify-end flex-row-reverse'
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
          isBot
            ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
            : 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]'
        }`}
      >
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Bubble text */}
      <div
        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
          isBot
            ? 'rounded-tl-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)]'
            : 'rounded-tr-sm bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white'
        }`}
      >
        <div className="font-body break-words">{formatText(message.text)}</div>
        <div
          className={`text-[9px] font-mono mt-1 text-right ${
            isBot ? 'text-[var(--color-muted)]' : 'text-white/80'
          }`}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
