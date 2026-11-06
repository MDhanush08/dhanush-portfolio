import { useState, memo } from 'react'
import {
  MessageSquare,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Section } from '../layout/Section'
import { SectionHeading } from '../layout/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { profile } from '../../data/portfolio'
import { submitContact } from '../../services/api'
import { cn } from '../../lib/cn'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export const Contact = memo(function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.'
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) {
      errs.message = 'Please tell me a little about your project or note.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setStatus('idle')

    try {
      const res = await submitContact(formData)
      setStatus('success')
      setStatusMessage(res.message)
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (err: unknown) {
      setStatus('error')
      setStatusMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="contact" bg="paper-alt" borderTop>
      <Reveal>
        <SectionHeading
          index="05"
          label="GET IN TOUCH"
          line1="Have something"
          line2="good in mind?"
          intro="I'm open to conversations about software, collaboration and interesting problems."
        />
      </Reveal>

      {/* Two columns from 900px */}
      <div className="grid grid-cols-1 min-[900px]:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
        {/* Left Column: Direct Info & Socials */}
        <Reveal className="flex flex-col gap-8 text-left">
          {/* Circular outlined icon with lime dot on circle edge */}
          <div className="relative w-16 h-16 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-[var(--ink)]" />
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-[#A8E600] border-2 border-[var(--surface)]" />
          </div>

          <p className="text-xl md:text-2xl font-medium text-[var(--ink)] leading-snug tracking-tight">
            Tell me a little about what you're working on. I'll be glad to hear from you.
          </p>

          <div className="flex flex-col gap-4 text-base text-[var(--muted)] border-t border-[var(--line)] pt-6">
            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#A8E600] shrink-0" />
              <span>{profile.locationCity}, {profile.locationRegion}, {profile.locationCountry}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#A8E600] shrink-0" />
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-[var(--ink)] hover:underline underline-offset-4 transition-colors"
              >
                {profile.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#A8E600] shrink-0" />
              <a
                href={`tel:${profile.phone}`}
                className="hover:text-[var(--ink)] hover:underline underline-offset-4 transition-colors"
              >
                {profile.phone}
              </a>
            </div>
          </div>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={profile.github}
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send direct email"
              className="w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </Reveal>

        {/* Right Column: Underline-Only Form */}
        <Reveal delayMs={100}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full p-8 md:p-10 bg-[var(--surface)] border border-[var(--line)] rounded-[2px] flex flex-col gap-8 text-left shadow-sm"
          >
            {/* Field 1: Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--ink)]"
              >
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                }}
                placeholder="How should I address you?"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={cn(
                  'w-full bg-transparent border-0 border-b-2 py-2 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none transition-colors duration-200',
                  errors.name
                    ? 'border-red-500'
                    : 'border-[var(--line)] focus:border-[var(--ink)]'
                )}
              />
              <div id="contact-name-error" aria-live="polite">
                {errors.name && (
                  <span className="text-xs text-red-500 font-medium">{errors.name}</span>
                )}
              </div>
            </div>

            {/* Field 2: Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--ink)]"
              >
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className={cn(
                  'w-full bg-transparent border-0 border-b-2 py-2 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none transition-colors duration-200',
                  errors.email
                    ? 'border-red-500'
                    : 'border-[var(--line)] focus:border-[var(--ink)]'
                )}
              />
              <div id="contact-email-error" aria-live="polite">
                {errors.email && (
                  <span className="text-xs text-red-500 font-medium">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Field 3: Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--ink)]"
              >
                A little about it
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
                }}
                placeholder="What would you like to build?"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={cn(
                  'w-full bg-transparent border-0 border-b-2 py-2 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none transition-colors duration-200 resize-none',
                  errors.message
                    ? 'border-red-500'
                    : 'border-[var(--line)] focus:border-[var(--ink)]'
                )}
              />
              <div id="contact-message-error" aria-live="polite">
                {errors.message && (
                  <span className="text-xs text-red-500 font-medium">{errors.message}</span>
                )}
              </div>
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-4 bg-[#A8E600]/20 border border-[#A8E600] rounded-[2px] flex items-center gap-3 text-sm text-[var(--ink)]">
                <CheckCircle2 className="w-5 h-5 text-[#14110D] shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-[2px] flex items-center gap-3 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center justify-center gap-3 h-12 px-6 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] rounded-[2px] font-semibold text-sm sm:text-base hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] disabled:opacity-60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending message...</span>
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  )
})
