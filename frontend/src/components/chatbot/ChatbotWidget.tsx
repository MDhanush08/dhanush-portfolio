import { useState, useRef, useEffect, memo } from 'react'
import { X, Send } from 'lucide-react'
import { sendChatMessage } from '../../services/api'
import type { ChatMessage } from '../../types'
import { cn } from '../../lib/cn'

interface ChatbotWidgetProps {
  hidden?: boolean
}

const SUGGESTIONS = [
  "What is Dhanush's experience?",
  'Which projects has he built?',
  'What tech stack does he use?',
]

export const ChatbotWidget = memo(function ChatbotWidget({ hidden = false }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Dhanush's portfolio assistant. Feel free to ask about his background, projects, or full-stack skill set.",
      timestamp: new Date(),
    },
  ])

  const panelRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, messages])

  // Esc key closes panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim()
    if (!messageText || loading) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      const reply = await sendChatMessage(messageText)
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch {
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Sorry, I had trouble retrieving that information. Please try again or reach out through the contact form.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  if (hidden) return null

  return (
    <>
      {/* Floating Launcher Button */}
      <div
        className={cn(
          'fixed right-[calc(1.5rem+env(safe-area-inset-right,0px))] bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-40 flex items-center gap-3 transition-opacity duration-300',
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      >
        {/* Pill Label (Hidden below 480px) */}
        {/* <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] text-[var(--ink)] text-xs font-medium border border-[var(--line)] rounded-full shadow-sm cursor-pointer hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A8E600]" />
          <span>Ask about my work</span>
        </button> */}

        {/* 56px Lime Circular Button */}
        {/* <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="w-14 h-14 rounded-full bg-[#A8E600] text-[#14110D] shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.06] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
        >
          <MessageSquare className="w-6 h-6" />
        </button> */}
      </div>

      {/* Chat Panel / Mobile Bottom Sheet */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Portfolio Chat Assistant"
          aria-modal="true"
          className="fixed z-50 bottom-[env(safe-area-inset-bottom,0px)] right-0 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] w-full sm:w-[380px] h-[85vh] sm:h-[520px] max-h-[85vh] bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-t-md sm:rounded-[4px] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-[var(--line)] flex items-center justify-between bg-[var(--bg-alt)] shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8E600] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A8E600]" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--ink)]">Dhanush M</h3>
                <p className="text-[11px] text-[var(--muted)] leading-tight">Software Developer Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--line)]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user'
              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col text-sm',
                    isUser ? 'items-end' : 'items-start'
                  )}
                >
                  <div
                    className={cn(
                      'px-3.5 py-2.5 max-w-[85%] rounded-[3px] leading-relaxed',
                      isUser
                        ? 'bg-[var(--ink)] text-[var(--bg)]'
                        : 'bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--line)]'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center gap-1.5 p-3 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[3px] w-fit text-[var(--muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--bg)] flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(sug)}
                disabled={loading}
                className="shrink-0 text-[11px] px-2.5 py-1 bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] rounded-[2px] transition-colors whitespace-nowrap hover:border-[#A8E600] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-1"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 border-t border-[var(--line)] bg-[var(--surface)] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[2px] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-[2px] bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center disabled:opacity-40 hover:bg-[#A8E600] hover:text-[#14110D] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
})
