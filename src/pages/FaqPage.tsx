import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Sparkles } from 'lucide-react'
import { FAQ_ITEMS } from '../data/catalog'

export function FaqPage() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id)

  return (
    <div className="paper-grain py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
            Frequently Asked Questions
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Everything You Need to Know
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Answers about personalizing cards, sharing links on WhatsApp, PNG downloads, and local draft storage.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className="rounded-3xl border transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <div>
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-rose)' }}>
                      {item.category}
                    </span>
                    <span className="mt-1 block text-lg sm:text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--text-muted)' }}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div id={`faq-panel-${item.id}`} className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div
          className="rounded-3xl border p-8 text-center space-y-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Ready to craft your first keepsake?
          </h2>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3]"
          >
            <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
            <span>Open Card Studio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
