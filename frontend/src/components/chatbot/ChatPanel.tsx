import { useEffect, useRef, useState } from 'react';
import { Bot, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { sendChatMessage } from '../../services/api';
import type { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: "Hello! I'm Dhanush's AI Assistant. Ask me anything about his full-stack experience (Angular, React, NestJS), enterprise projects like Dental Interface 360, or his skills!",
    timestamp: 'Just now',
  },
];

const suggestedChips = [
  "What is Dhanush's experience?",
  'Which projects has he built?',
  'What tech stack does he use?',
  'How can I get in touch?',
];

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, messages, isTyping]);

  // Handle ESC key to close & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0] as HTMLElement;
        const last = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await sendChatMessage(trimmed);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'assistant',
        text: "I couldn't process that query at the moment. Please try asking again or reach out to Dhanush directly at dhanushm.stack@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Portfolio Assistant Chat"
      ref={panelRef}
      className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[80vh] rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl flex flex-col z-50 overflow-hidden backdrop-blur-2xl transition-all duration-300"
    >
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--color-surface)]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold font-heading text-[var(--color-text)]">
                Dhanush's AI Assistant
              </h4>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                Local Mock
              </span>
            </div>
            <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online & Ready
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            aria-label="Reset conversation"
            title="Reset conversation"
            className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat panel"
            className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 border-t border-[var(--color-border)]/60 bg-[var(--color-surface-2)]/30 overflow-x-auto shrink-0 flex items-center gap-1.5 no-scrollbar">
        <Sparkles className="w-3 h-3 text-[var(--color-secondary)] shrink-0" />
        {suggestedChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip)}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/40 whitespace-nowrap transition-colors shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-2 shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Dhanush..."
          disabled={isTyping}
          className="flex-1 px-3 py-2 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs text-[var(--color-text)] placeholder-[var(--color-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none transition-colors font-body"
        />

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send prompt"
          className="p-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
