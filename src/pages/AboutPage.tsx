import { Link } from 'react-router-dom'
import { Feather, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { GreetingCardPreview } from '../components/GreetingCardPreview'

export function AboutPage() {
  return (
    <div className="paper-grain py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
              About Vellum &amp; Bloom
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Digital Stationery Designed With the Soul of Print.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Vellum &amp; Bloom began with a simple observation: digital greetings rarely feel as treasured as a handwritten note tucked inside heavy paper. We built an editorial studio where tactile palettes, serif typography, and thoughtful words travel instantaneously without losing their warmth.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 rounded-full bg-[#472C42] px-6 py-3 text-sm font-semibold text-[#FFF9F3]"
              >
                <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Create a Card</span>
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
                style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              >
                <span>Browse Designs</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <GreetingCardPreview
              templateId="pressed-wildflower-thanks"
              recipientName="Every Thoughtful Sender"
              senderName="The Vellum & Bloom Atelier"
              side="front"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Feather,
              title: 'Art-Directed Craft',
              text: 'Every card motif, border arch, and paper palette is tuned for emotional warmth—zero generic templates or visual clutter.',
            },
            {
              icon: ShieldCheck,
              title: 'Local-First Privacy',
              text: 'Your personal drafts and messages stay in your browser and encoded inside the links you choose to share—no invasive tracking.',
            },
            {
              icon: Heart,
              title: 'Built for Connection',
              text: 'From WhatsApp envelope links to high-resolution PNG downloads, sharing a heartfelt note takes seconds across any distance.',
            },
          ].map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="rounded-3xl border p-7 space-y-3"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: 'var(--bg-blush)' }}>
                  <Icon className="h-5 w-5 text-[#472C42]" aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {pillar.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {pillar.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
