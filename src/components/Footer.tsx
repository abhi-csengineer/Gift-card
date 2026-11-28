import { Link } from 'react-router-dom'
import { Heart, Mail, MapPin, SlidersHorizontal } from 'lucide-react'
import { SITE_CONFIG } from '../config/siteConfig'
import { openPrivacySettings } from '../utils/consent'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const currentYear = CURRENT_YEAR

  return (
    <footer
      className="relative border-t pt-16 pb-10 transition-colors overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-muted) 100%)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div
        className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: 'var(--gradient-rainbow)' }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm"
                style={{
                  background: 'var(--gradient-brand)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                }}
              >
                <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
                  <rect x="4" y="6.5" width="24" height="19" rx="3.2" stroke="#FFF9F3" strokeWidth="1.6" />
                  <path d="M5 9L16 17.2L27 9" stroke="#FFE599" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="16" cy="18" r="4" fill="#FF5E8A" stroke="#FFE599" strokeWidth="1" />
                  <path d="M17.4 16.6C17 16.2 16.5 16 15.9 16C14.8 16 14 16.9 14 18C14 19.1 14.8 20 15.9 20C16.5 20 17 19.8 17.4 19.4" stroke="#FFF9F3" strokeWidth="1.15" strokeLinecap="round" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Cardelle
                </span>
                <span className="text-[0.65rem] font-medium tracking-[0.14em] uppercase" style={{ color: 'var(--accent-rose)' }}>
                  {SITE_CONFIG.tagline}
                </span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              An international digital greeting-card studio built for thoughtful words. Craft bespoke keepsake cards, seal them with warmth, and share them seamlessly across borders.
            </p>
            <p className="max-w-md text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Digital greeting cards only—no monetary gift vouchers or stored cash value. Drafts stay locally in your browser.
            </p>
            <div className="space-y-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#D9B77E] shrink-0" aria-hidden="true" />
                <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="hover:underline">
                  {SITE_CONFIG.contactEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#D9B77E] shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.locationLabel}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                to="/contact"
                aria-label="Contact Cardelle"
                className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors hover:opacity-85"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Write to Studio</span>
              </Link>
              <button
                type="button"
                onClick={openPrivacySettings}
                className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors hover:opacity-85 cursor-pointer"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Privacy Settings</span>
              </button>
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
              <li><Link to="/love-calendar" className="hover:underline">The Love Calendar</Link></li>
              <li><Link to="/create" className="hover:underline">Create a Card</Link></li>
              <li><Link to="/inspiration" className="hover:underline">Stationery Journal</Link></li>
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
              <li><Link to="/copyright" className="hover:underline">Copyright Policy</Link></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <p>© {currentYear} {SITE_CONFIG.legalBrandLabel}. All rights reserved.</p>
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
