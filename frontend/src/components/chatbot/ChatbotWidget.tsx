import {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MessageSquare, X, Send, Sparkles, RotateCcw, ArrowUpRight } from 'lucide-react'
import { sendChatMessage } from '../../services/api'
import type { ChatHistoryItem, ChatLink, ChatMessage } from '../../types'
import { cn } from '../../lib/cn'

interface ChatbotWidgetProps {
  hidden?: boolean
}

const SUGGESTIONS = [
  'Who is Dhanush?',
  'Show me his projects',
  'What skills does he have?',
  'How can I contact him?',
]

export const ChatbotWidget = memo(function ChatbotWidget({ hidden = false }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isWakingUp, setIsWakingUp] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Dhanush's AI portfolio assistant. Ask me about his full-stack projects, tech stack, work experience, or background.",
      links: [
        { label: 'View my projects', url: '/projects' },
        { label: 'Go to About', url: '#about' },
      ],
      timestamp: new Date(),
    },
  ])

  const panelRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const coldStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      // Delay focus slightly so the element is fully mounted and styled
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen, messages, scrollToBottom])

  // Esc key closes panel
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Clean up pending requests on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
      if (coldStartTimerRef.current) {
        clearTimeout(coldStartTimerRef.current)
      }
    }
  }, [])

  /**
   * Dispatches user message to backend RAG assistant
   */
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim()
    if (!query || loading) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) {
      setInput('')
    }
    setLoading(true)
    setIsWakingUp(false)

    // Build last-6 conversation history (excluding error messages and greetings)
    const historyPayload: ChatHistoryItem[] = messages
      .filter((m) => !m.isError && m.id !== 'welcome')
      .slice(-6)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

    // Setup 70s abort controller and 6s cold-start notice
    const controller = new AbortController()
    abortControllerRef.current = controller

    coldStartTimerRef.current = setTimeout(() => {
      setIsWakingUp(true)
    }, 6000)

    try {
      const response = await sendChatMessage(query, historyPayload, controller.signal)

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        links: response.links,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err: unknown) {
      const errorText =
        err instanceof Error
          ? err.message
          : 'Sorry, I had trouble retrieving that information. Please try again.'

      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: errorText,
        isError: true,
        canRetry: true,
        failedMessage: query,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      if (coldStartTimerRef.current) {
        clearTimeout(coldStartTimerRef.current)
        coldStartTimerRef.current = null
      }
      abortControllerRef.current = null
      setLoading(false)
      setIsWakingUp(false)
    }
  }

  /**
   * Handles clicking generated action links
   */
  const handleLinkClick = (link: ChatLink) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

    if (link.url.startsWith('#')) {
      const sectionId = link.url.replace(/^#/, '')

      if (location.pathname === '/') {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate home then scroll to section
        navigate(`/#${sectionId}`)
      }

      if (isMobile) {
        setIsOpen(false)
      }
    } else if (link.url.startsWith('/')) {
      navigate(link.url)
      if (isMobile) {
        setIsOpen(false)
      }
    }
  }

  /**
   * Form keyboard behavior: Enter sends, Shift+Enter makes new line
   */
  const handleKeyDownInput = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    void handleSend()
  }

  if (hidden) return null

  return (
    <>
      {/* Floating Launcher Button */}
      <div
        className={cn(
          'fixed right-[calc(1rem+env(safe-area-inset-right,0px))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-40 flex items-center gap-2.5 transition-opacity duration-300',
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      >
        {/* Desktop helper pill */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[var(--surface)] text-[var(--ink)] text-xs font-medium border border-[var(--line)] rounded-full shadow-lg hover:border-[#A8E600] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A8E600]" />
          <span>Ask AI about Dhanush</span>
        </button>

        {/* Lime Circular Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open portfolio AI assistant"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#A8E600] text-[#14110D] shadow-xl flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.06] active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Chat Panel / Responsive Floating Card */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Portfolio AI Assistant"
          aria-modal="true"
          className="fixed z-50 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[70vh] sm:h-[520px] max-h-[540px] bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-2xl sm:rounded-[6px] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-[var(--line)] flex items-center justify-between bg-[var(--bg-alt)] shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8E600] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A8E600]" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--ink)] tracking-tight">Dhanush M Assistant</h3>
                <p className="text-[11px] text-[var(--muted)] leading-none">RAG-powered AI · Portfolio Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--line)]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 overscroll-contain">
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
                      'px-3.5 py-2.5 max-w-[88%] rounded-[4px] leading-relaxed whitespace-pre-wrap break-words',
                      isUser
                        ? 'bg-[var(--ink)] text-[var(--bg)] font-medium'
                        : msg.isError
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
                          : 'bg-[var(--bg-alt)] text-[var(--ink)] border border-[var(--line)]'
                    )}
                  >
                    {msg.text}

                    {/* Retry button on error */}
                    {msg.isError && msg.canRetry && msg.failedMessage && (
                      <div className="mt-2.5 pt-2 border-t border-red-500/20 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleSend(msg.failedMessage)}
                          disabled={loading}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:border-[#A8E600] transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Deterministic Action Links */}
                  {!isUser && msg.links && msg.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[88%]">
                      {msg.links.map((link, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleLinkClick(link)}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-[3px] bg-[var(--surface)] hover:bg-[#A8E600] text-[var(--ink)] hover:text-[#14110D] border border-[var(--line)] hover:border-[#A8E600] transition-colors cursor-pointer font-medium shadow-sm"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Typing Indicator and Cold-Start Banner */}
            {loading && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 p-3 bg-[var(--bg-alt)] border border-[var(--line)] rounded-[4px] w-fit text-[var(--muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:0.4s]" />
                </div>
                {isWakingUp && (
                  <p className="text-[11px] text-[var(--muted)] italic animate-pulse">
                    Waking up the server, this can take up to a minute...
                  </p>
                )}
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
                className="shrink-0 text-[11px] px-2.5 py-1 bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] rounded-[3px] transition-colors whitespace-nowrap hover:border-[#A8E600] focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-1 cursor-pointer disabled:opacity-50"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 border-t border-[var(--line)] bg-[var(--surface)] flex items-end gap-2 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDownInput}
              disabled={loading}
              placeholder={loading ? 'Waiting for reply...' : 'Ask about Dhanush... (Enter to send)'}
              className="flex-1 max-h-24 resize-none bg-[var(--bg-alt)] border border-[var(--line)] rounded-[3px] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)] disabled:opacity-60 leading-normal"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-[3px] bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center disabled:opacity-40 hover:bg-[#A8E600] hover:text-[#14110D] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
})
