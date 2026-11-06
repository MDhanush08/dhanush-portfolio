import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-[14px] rounded-tl-sm bg-(--color-surface-2) border border-(--color-border) w-fit text-(--color-muted)">
      <span className="w-2 h-2 rounded-full bg-(--color-primary) animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full bg-(--color-primary) animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full bg-(--color-primary) animate-bounce" />
    </div>
  );
};
