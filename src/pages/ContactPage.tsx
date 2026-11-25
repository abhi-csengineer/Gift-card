import { useState } from 'react'
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('Design Request')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <div className="paper-grain py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              We Would Love to Hear From You
            </h1>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Have a custom occasion request, feedback on a card collection, or a partnership inquiry? Send a note to our studio team.
            </p>

            <div className="space-y-3 pt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>atelier@vellumandbloom.example</span>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Digital Stationery Studio · Worldwide</span>
              </p>
            </div>
          </div>

          <div
            className="lg:col-span-7 rounded-3xl border p-6 sm:p-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', boxShadow: 'var(--shadow-soft)' }}
          >
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#256D4B]" aria-hidden="true" />
                <h2 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Thank You, {name}
                </h2>
                <p className="mx-auto max-w-md text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Your note regarding “{topic}” has been recorded locally in this preview session. Thank you for reaching out to Vellum &amp; Bloom.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setName('')
                    setEmail('')
                    setMessage('')
                  }}
                  className="inline-flex items-center rounded-full bg-[#472C42] px-5 py-2.5 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
                >
                  Send Another Message
                </button>
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
                    <option>Press &amp; Collaborations</option>
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
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
