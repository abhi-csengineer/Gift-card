import { Link } from 'react-router-dom'
import { Heart, Mail, Share2, Sparkles } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t pt-16 pb-10 transition-colors"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #472C42 0%, #6B4063 100%)',
                  border: '1px solid rgba(217, 183, 126, 0.55)',
                }}
              >
                <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
              </span>
              <span className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Vellum &amp; Bloom
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              An editorial digital stationery house built for slow, thoughtful words. Craft bespoke greeting cards, seal them with warmth, and send them across any distance in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Vellum & Bloom on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Vellum & Bloom on Pinterest"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                aria-label="Contact Vellum & Bloom"
                className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors hover:opacity-85"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Write to Studio</span>
              </Link>
            </div>
          </div>

          {/* Studio Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Studio
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><Link to="/explore" className="hover:underline">Explore Cards</Link></li>
              <li><Link to="/occasions" className="hover:underline">Occasions</Link></li>
              <li><Link to="/create" className="hover:underline">Create a Card</Link></li>
              <li><Link to="/inspiration" className="hover:underline">Inspiration Journal</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Company
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/sitemap" className="hover:underline">Sitemap</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              Policies &amp; Care
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms and Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
              <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <p>© {currentYear} Vellum &amp; Bloom Digital Stationery. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-[#E9A6B5] fill-[#E9A6B5]" aria-hidden="true" />
            <span>for thoughtful words everywhere.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
