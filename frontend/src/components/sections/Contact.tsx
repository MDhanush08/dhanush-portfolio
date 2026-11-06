import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';
import { portfolioData } from '../../data/portfolio';
import { submitContact } from '../../services/api';
import type { ContactFormData } from '../../types';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear notifications on type
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please include a subject.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please write a message of at least 10 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await submitContact(formData);
      setSuccessMessage(response.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        badge="GET IN TOUCH"
        title="Let's Build Something"
        highlight="Remarkable Together"
        description="Whether you have an enterprise project, an engineering opening, or want to discuss scalable backend architectures, I'm always open to connecting."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
        {/* Left Column: Direct Contact Info (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <Reveal>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-heading text-[var(--color-text)]">
                Contact Information
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Feel free to reach out directly via email, phone, or LinkedIn. I typically reply within 24 hours.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 mt-6">
              {/* Email */}
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[var(--color-muted)] uppercase">Email</p>
                  <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {personal.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[var(--color-muted)] uppercase">Phone / WhatsApp</p>
                  <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-secondary)] transition-colors">
                    +91 {personal.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-[var(--color-muted)] uppercase">Location</p>
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    {personal.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social profiles */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <p className="text-xs font-mono text-[var(--color-muted)] mb-3">
                Social Networks:
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <TbBrandGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  <TbBrandLinkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Interactive Contact Form (Span 7) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <Card className="p-6 sm:p-8 bg-[var(--color-surface)] border-[var(--color-border)] shadow-xl">
              <h3 className="text-xl font-bold font-heading text-[var(--color-text)] mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-[var(--color-muted)] mb-6">
                Fill out the form below. Form is wired to mock service and ready for NestJS backend integration.
              </p>

              {/* Status notifications */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-[var(--color-text)] mb-1.5"
                    >
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors font-body"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-[var(--color-text)] mb-1.5"
                    >
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors font-body"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-[var(--color-text)] mb-1.5"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer Opportunity / Project Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors font-body"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-[var(--color-text)] mb-1.5"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or open role..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-muted)]/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors font-body resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto px-8"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
