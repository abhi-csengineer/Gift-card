import { Link } from 'react-router-dom'
import { Feather, Heart, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG, buildCanonicalUrl } from '../config/siteConfig'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { GreetingCardPreview } from '../components/GreetingCardPreview'
import { SeoHead } from '../components/SeoHead'

export function AboutPage() {
  const aboutSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Vellum & Bloom Digital Stationery',
      description:
        'Discover the editorial craft and local-first privacy philosophy behind Vellum & Bloom, a digital greeting card and keepsake studio.',
      url: buildCanonicalUrl('/about'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: buildCanonicalUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: buildCanonicalUrl('/about') },
      ],
    },
  ]

  return (
    <div className="paper-grain py-10 sm:py-16">
      <SeoHead
        title="About Vellum & Bloom Stationery"
        description="Discover the editorial craft and local-first privacy philosophy behind Vellum & Bloom, a digital greeting card and keepsake studio."
        canonicalPath="/about"
        jsonLd={aboutSchemas}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-6">
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                About Vellum &amp; Bloom
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                Digital Stationery Designed With the Soul of Print.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Vellum &amp; Bloom began with a simple observation: hurried text messages rarely feel as treasured as a thoughtful note tucked inside heavy paper. We built an editorial digital card studio where tactile palettes, serif typography, and heartfelt words travel instantaneously across any distance.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Every template on Vellum &amp; Bloom is designed strictly for personal digital greetings and celebratory keepsakes (we do not issue monetary gift cards or store private messages on remote servers).
              </p>
              <p className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="h-3.5 w-3.5 text-[#D9B77E] shrink-0" aria-hidden="true" />
                <span>Operated from {SITE_CONFIG.locationLabel}</span>
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
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                >
                  <span>Contact Us</span>
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
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Feather,
              title: 'Art-Directed Craft',
              text: 'Every card motif, border arch, and paper palette is crafted in-house for emotional warmth—zero generic stock clutter.',
            },
            {
              icon: ShieldCheck,
              title: 'Local-First Privacy',
              text: 'Your drafts stay inside your own browser LocalStorage and shared cards travel inside self-contained links—with zero ads inside private cards.',
            },
            {
              icon: Heart,
              title: 'Built for Connection',
              text: 'From WhatsApp envelope reveals to 2-page PDF keepsakes and crisp Portrait, Landscape, and Square PNG/JPG downloads, sharing takes seconds.',
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
