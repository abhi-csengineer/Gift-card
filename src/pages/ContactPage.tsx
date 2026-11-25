import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ExternalLink, Mail, MapPin, Send, Shield } from 'lucide-react'
import { SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'
import { sanitizeTextInput } from '../utils/cardStorage'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { SeoHead } from '../components/SeoHead'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('Design Request')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const buildMailtoHref = () => {
    const cleanName = sanitizeTextInput(name.trim(), 80)
    const cleanEmail = sanitizeTextInput(email.trim(), 120)
    const cleanMessage = sanitizeTextInput(message.trim(), 1200)
    const subject = `[Cardelle] ${topic} from ${cleanName}`
    const body = `Name: ${cleanName}\nReply Email: ${cleanEmail}\nTopic: ${topic}\n\n${cleanMessage}`
    return `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setError('Please complete your name, email address, and message.')
      return
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    if (cleanMessage.length < 10) {
      setError('Please include at least 10 characters in your message.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  const mailtoHref = submitted ? buildMailtoHref() : ''

  const contactSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Cardelle Digital Stationery',
      description:
        'Get in touch with Cardelle in Rupaspur, Bihar, India for custom greeting card requests, feedback, privacy inquiries, or copyright notices.',
      url: buildCanonicalUrl('/contact'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Contact Us', item: buildCanonicalUrl('/contact') },
      ],
    },
  ]

  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title="Contact Cardelle — Support & Requests"
        description="Get in touch with Cardelle in Rupaspur, Bihar, India for custom greeting card requests, feedback, privacy inquiries, or copyright notices."
        canonicalPath="/contact"
        jsonLd={contactSchemas}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              We Would Love to Hear From You
            </h1>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Have a custom occasion request, feedback on a card collection, a privacy question, or a copyright inquiry? Reach out directly by email or compose a message below.
            </p>

            <div className="space-y-3 pt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#D9B77E] shrink-0" aria-hidden="true" />
                <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="underline">
                  {SITE_CONFIG.contactEmail}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#D9B77E] shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.locationLabel}</span>
              </p>
              <p className="flex items-start gap-2.5 text-xs leading-relaxed pt-1" style={{ color: 'var(--text-muted)' }}>
                <Shield className="h-4 w-4 text-[#D9B77E] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  For policy or data questions, please review our{' '}
                  <Link to="/privacy" className="underline">Privacy Policy</Link> and{' '}
                  <Link to="/copyright" className="underline">Copyright Policy</Link>.
                </span>
              </p>
            </div>
          </div>

          <div
            className="lg:col-span-7 rounded-3xl border p-6 sm:p-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', boxShadow: 'var(--shadow-soft)' }}
          >
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#256D4B]" aria-hidden="true" />
                <h2 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Thank You, {name.trim()}
                </h2>
                <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Your “{topic}” email draft for {SITE_CONFIG.contactEmail} is ready. Because Cardelle runs in your browser without storing messages on a mail server, click “Open in Email App” below to send it directly.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-5 py-2.5 text-xs font-semibold text-[#FFF9F3]"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
                    <span>Open in Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setName('')
                      setEmail('')
                      setMessage('')
                    }}
                    className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs font-semibold cursor-pointer"
                    style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  >
                    Compose Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {error && (
                  <p role="alert" className="rounded-2xl border border-red-400/50 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-700 dark:text-red-200">
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Clara"
                      className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      maxLength={120}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="clara@example.com"
                      className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-2xl border px-4 py-2.5 text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  >
                    <option>Design Request</option>
                    <option>Feedback &amp; Suggestions</option>
                    <option>Privacy or Cookie Inquiry</option>
                    <option>Copyright Notice</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    maxLength={1200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Share your thoughts with us..."
                    className="w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3] cursor-pointer"
                >
                  <Send className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                  <span>Prepare Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
