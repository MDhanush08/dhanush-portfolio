import React, { useState, useRef } from 'react';
import { Section } from '../layout/Section';
import { SplitHeading } from '../ui/SplitHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { portfolioData } from '../../data/portfolio';
import type { ContactFormData } from '../../types/api';
import { submitContact } from '../../services/api';
import {
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (formCardRef.current) {
          gsap.fromTo(
            formCardRef.current,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: formCardRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (formCardRef.current) formCardRef.current.style.opacity = '1';
      });
    },
    { scope: containerRef }
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await submitContact(formData);
      setSubmitSuccess(result.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please try again or reach out directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section ref={containerRef} id="contact">
      {/* Clean left-aligned heading with exact requested title */}
      <SplitHeading
        number="06"
        kicker="Contact"
        title="Let's work together"
        description="Whether you have an engineering role, architecture question, or SaaS project in mind."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Direct Details */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 sm:p-7 rounded-2xl space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-(--color-muted) mb-2">
                Direct Contact
              </p>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="font-sans font-semibold text-lg sm:text-xl text-(--color-text) hover:text-(--color-primary) transition-colors flex items-center gap-2 break-all group"
              >
                <span>{portfolioData.contact.email}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-(--color-primary) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="space-y-3.5">
              <a
                href={`tel:${portfolioData.contact.phone}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-(--color-secondary)/10 text-(--color-secondary) flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-(--color-muted)">Telephone</div>
                  <div className="font-sans font-medium text-sm text-(--color-text)">
                    {portfolioData.contact.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-(--color-surface-2) border border-(--color-border)">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-(--color-muted)">Location</div>
                  <div className="font-sans font-medium text-sm text-(--color-text)">
                    {portfolioData.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3.5 border-t border-(--color-border)">
              <div className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-3">
                Professional Profiles
              </div>
              <div className="flex items-center gap-3">
                <Button
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  icon={<FaLinkedin className="w-4 h-4" />}
                >
                  LinkedIn
                </Button>
                <Button
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  icon={<FaGithub className="w-4 h-4" />}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Contact Form (max-w-[640px] left-aligned for comfortable form ergonomics) */}
        <div ref={formCardRef} className="lg:col-span-7">
          <Card className="p-6 sm:p-7 rounded-2xl max-w-[640px]">
            <div className="pb-3.5 mb-5 border-b border-(--color-border)">
              <h3 className="font-sans font-semibold text-lg sm:text-xl text-(--color-text) mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-(--color-muted)">
                Leave a message below and I will get back to you shortly.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 space-y-3">
                <div className="flex items-center gap-2 text-base font-sans font-semibold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Message Sent Successfully!</span>
                </div>
                <p className="text-sm text-(--color-text)">{submitSuccess}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubmitSuccess(null)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-500 flex items-center gap-2 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-(--color-text) mb-1.5"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-xs text-rose-500 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-(--color-text) mb-1.5"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-xs text-rose-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-(--color-text) mb-1.5"
                  >
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Full Stack Engineering Role / Project Inquiry"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="text-xs text-rose-500 mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-(--color-text) mb-1.5"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or role..."
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 rounded-xl bg-(--color-surface-2) border border-(--color-border) text-sm text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all resize-y"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-xs text-rose-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    icon={
                      isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )
                    }
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Section>
  );
};
