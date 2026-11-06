import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import type { ChatMessage } from '../../types/api';
import { sendChatMessage } from '../../services/api';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '../../lib/utils';

export interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    sender: 'assistant',
    text: "Hi! I'm Dhanush's AI assistant. Ask me anything about his 2+ years of full-stack engineering experience, his projects like Dental Interface 360, or his skills in NestJS, Angular, and React.",
    timestamp: 'Just now',
  },
];

const DEFAULT_SUGGESTIONS = [
  "What is Dhanush's experience?",
  'Which projects has he built?',
  'What tech stack does he use?',
];

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus within chat panel when open
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      if (response.suggestedQuestions && response.suggestedQuestions.length > 0) {
        setSuggestions(response.suggestedQuestions);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I encountered a temporary issue fetching that answer. Please feel free to email Dhanush directly!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Dhanush Portfolio AI Assistant"
      className={cn(
        'fixed z-50 flex flex-col bg-(--color-surface) border border-(--color-border) shadow-2xl transition-all duration-200',
        // Mobile: full-width bottom sheet
        'inset-x-0 bottom-0 h-[82vh] max-h-[640px] rounded-t-3xl',
        // Desktop: floating card in bottom-right
        'sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[410px] sm:h-[560px] sm:rounded-3xl'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border) bg-(--color-surface-2) rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-(--color-primary) to-(--color-secondary) text-white shadow-sm">
            <Bot className="w-5 h-5" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-(--color-surface-2)" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-(--color-text) flex items-center gap-1.5">
              Dhanush AI Assistant
              <Sparkles className="w-3.5 h-3.5 text-(--color-secondary)" />
            </h3>
            <p className="text-[11px] font-mono text-(--color-muted)">
              Online | Neural Mock Agent
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant chat"
          className="flex items-center justify-center w-8 h-8 rounded-xl text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-surface) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-(--color-primary)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {suggestions.length > 0 && !isTyping && (
        <div className="px-4 py-2.5 border-t border-(--color-border)/60 bg-(--color-surface) flex flex-wrap gap-1.5">
          {suggestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(q)}
              className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-(--color-surface-2) text-(--color-muted) hover:text-(--color-text) hover:border-(--color-primary)/50 border border-(--color-border) transition-colors cursor-pointer text-left"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3.5 border-t border-(--color-border) bg-(--color-surface-2) flex items-center gap-2 rounded-b-3xl"
      >
        <label htmlFor="chatbot-input" className="sr-only">
          Ask a question
        </label>
        <input
          id="chatbot-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Dhanush's experience or stack..."
          disabled={isTyping}
          className="flex-1 bg-(--color-surface) border border-(--color-border) text-(--color-text) placeholder:text-(--color-muted) text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-(--color-primary) transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-(--color-primary) to-(--color-secondary) text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all hover:opacity-95 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
