import React from 'react';
import type { ChatMessage } from '../../types/api';
import { cn } from '../../lib/utils';
import { Bot, User } from 'lucide-react';

export interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex items-end gap-2.5 max-w-[85%]',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      <div
        className={cn(
          'w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-mono',
          isUser
            ? 'bg-(--color-primary) text-white'
            : 'bg-(--color-surface-2) text-(--color-primary) border border-(--color-border)'
        )}
        aria-hidden="true"
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      <div
        className={cn(
          'px-4 py-2.5 rounded-[14px] text-xs sm:text-sm leading-relaxed transition-all',
          isUser
            ? 'bg-gradient-to-r from-(--color-primary) to-(--color-secondary) text-white rounded-br-sm'
            : 'bg-(--color-surface-2) text-(--color-text) border border-(--color-border) rounded-bl-sm whitespace-pre-wrap'
        )}
      >
        <p>{message.text}</p>
        <div
          className={cn(
            'text-[10px] mt-1 text-right',
            isUser ? 'text-white/80' : 'text-(--color-muted)'
          )}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};
