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
  ExternalLink,
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
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const hasPhone = Boolean(profile.phone && !profile.phone.includes('[') && profile.phone.trim() !== '')
  const hasLinkedIn = Boolean(profile.linkedin && !profile.linkedin.includes('[') && profile.linkedin.trim() !== '')
  const hasGitHub = Boolean(profile.github && !profile.github.includes('[') && profile.github.trim() !== '')

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
      setFormData({ name: '', email: '', subject: '', message: '' })
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

  // Pre-filled mailto fallback link for seamless communication
  const fallbackMailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`

  return (
    <Section id="contact" bg="paper-alt" borderTop>
      <Reveal>
        <SectionHeading
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
          <div className="relative w-16 h-16 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center shadow-xs">
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
              <span className="font-medium text-[var(--ink)]">Tiruchirappalli, Tamil Nadu, India</span>
            </div>

            {/* Email (Always displayed with mailto) */}
            {profile.email && !profile.email.includes('[') && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#A8E600] shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="font-medium text-[var(--ink)] hover:underline underline-offset-4 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            )}

            {/* Phone (Only displayed if actual phone number is configured) */}
            {hasPhone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#A8E600] shrink-0" />
                <a
                  href={`tel:${profile.phone}`}
                  className="font-medium text-[var(--ink)] hover:underline underline-offset-4 transition-colors"
                >
                  {profile.phone}
                </a>
              </div>
            )}
          </div>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {hasGitHub && (
              <a
                href={profile.github}
                aria-label="Dhanush on GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors shadow-xs"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}

            {hasLinkedIn && (
              <a
                href={profile.linkedin}
                aria-label="Dhanush on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors shadow-xs"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            )}

            {profile.email && !profile.email.includes('[') && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Send direct email"
                className="w-11 h-11 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] transition-colors shadow-xs"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </Reveal>

        {/* Right Column: Contact Form */}
        <Reveal delayMs={100}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full p-8 md:p-10 bg-[var(--surface)] border border-[var(--line)] rounded-[2px] flex flex-col gap-6 text-left shadow-sm"
          >
            {/* Field 01: YOUR NAME */}
            <div className="flex flex-col gap-2 group">
              <label
                htmlFor="contact-name"
                className={cn(
                  'text-xs uppercase tracking-[0.08em] font-semibold transition-colors duration-200',
                  errors.name
                    ? 'text-red-500'
                    : 'text-[var(--muted)] group-focus-within:text-[var(--ink)]'
                )}
              >
                YOUR NAME <span className="text-red-500">*</span>
              </label>
              <div className={cn('field-underline-wrapper', errors.name && 'has-error')}>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                  }}
                  placeholder="Enter your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="w-full bg-transparent border-0 py-2.5 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none"
                />
              </div>
              <div id="contact-name-error" aria-live="polite">
                {errors.name && (
                  <span className="text-xs text-red-500 font-medium">{errors.name}</span>
                )}
              </div>
            </div>

            {/* Field 02: YOUR EMAIL */}
            <div className="flex flex-col gap-2 group">
              <label
                htmlFor="contact-email"
                className={cn(
                  'text-xs uppercase tracking-[0.08em] font-semibold transition-colors duration-200',
                  errors.email
                    ? 'text-red-500'
                    : 'text-[var(--muted)] group-focus-within:text-[var(--ink)]'
                )}
              >
                YOUR EMAIL <span className="text-red-500">*</span>
              </label>
              <div className={cn('field-underline-wrapper', errors.email && 'has-error')}>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  placeholder="Enter your email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="w-full bg-transparent border-0 py-2.5 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none"
                />
              </div>
              <div id="contact-email-error" aria-live="polite">
                {errors.email && (
                  <span className="text-xs text-red-500 font-medium">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Field 03: SUBJECT */}
            <div className="flex flex-col gap-2 group">
              <label
                htmlFor="contact-subject"
                className="text-xs uppercase tracking-[0.08em] font-semibold text-[var(--muted)] group-focus-within:text-[var(--ink)] transition-colors duration-200"
              >
                SUBJECT <span className="text-xs text-[var(--muted)] font-normal">(Optional)</span>
              </label>
              <div className="field-underline-wrapper">
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, subject: e.target.value }))
                  }}
                  placeholder="What is this regarding?"
                  className="w-full bg-transparent border-0 py-2.5 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none"
                />
              </div>
            </div>

            {/* Field 04: TELL ME ABOUT YOUR PROJECT */}
            <div className="flex flex-col gap-2 group">
              <label
                htmlFor="contact-message"
                className={cn(
                  'text-xs uppercase tracking-[0.08em] font-semibold transition-colors duration-200',
                  errors.message
                    ? 'text-red-500'
                    : 'text-[var(--muted)] group-focus-within:text-[var(--ink)]'
                )}
              >
                TELL ME ABOUT YOUR PROJECT <span className="text-red-500">*</span>
              </label>
              <div className={cn('field-underline-wrapper', errors.message && 'has-error')}>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
                  }}
                  placeholder="Tell me a little about your project, idea, or opportunity."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="w-full bg-transparent border-0 py-2.5 text-base md:text-lg text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none resize-none min-h-[110px]"
                />
              </div>
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
              <div className="p-4 bg-red-500/10 border border-red-500/60 rounded-[2px] flex flex-col gap-3 text-sm text-red-700 dark:text-red-300">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                  <span className="leading-relaxed">{statusMessage}</span>
                </div>
                <div className="pt-1">
                  <a
                    href={fallbackMailto}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] hover:bg-[#A8E600] hover:text-[#14110D] transition-colors"
                  >
                    <span>Send via Email Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center justify-center gap-3 h-12 px-6 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] rounded-[2px] font-semibold text-sm sm:text-base hover:bg-[#A8E600] hover:text-[#14110D] hover:border-[#A8E600] disabled:opacity-60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] mt-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending message...</span>
                </>
              ) : (
                <>
                  <span>Send Message →</span>
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
