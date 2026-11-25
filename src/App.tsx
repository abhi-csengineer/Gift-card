import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { OccasionsPage } from './pages/OccasionsPage'
import { StudioPage } from './pages/StudioPage'
import { CardViewPage } from './pages/CardViewPage'
import { InspirationPage } from './pages/InspirationPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { SitemapPage } from './pages/SitemapPage'
import { LegalPage } from './pages/LegalPage'

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, search])
  return null
}

function NotFoundPage() {
  return (
    <div className="paper-grain py-24 text-center px-4">
      <div className="mx-auto max-w-md space-y-5">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--accent-rose)' }}>
          404
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Page Not Found
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          The card or page you were looking for could not be located. Let us guide you back to the studio.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/" className="rounded-full bg-[#472C42] px-6 py-2.5 text-sm font-semibold text-[#FFF9F3]">
            Return Home
          </Link>
          <Link
            to="/explore"
            className="rounded-full border px-6 py-2.5 text-sm font-semibold"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
          >
            Explore Cards
          </Link>
        </div>
      </div>
    </div>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-dvh flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#472C42] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-[#FFF9F3]"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/occasions" element={<OccasionsPage />} />
              <Route path="/create" element={<StudioPage />} />
              <Route path="/create/:templateId" element={<StudioPage />} />
              <Route path="/card/view" element={<CardViewPage />} />
              <Route path="/inspiration" element={<InspirationPage />} />
              <Route path="/inspiration/:slug" element={<InspirationPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/privacy" element={<LegalPage kind="privacy" />} />
              <Route path="/terms" element={<LegalPage kind="terms" />} />
              <Route path="/disclaimer" element={<LegalPage kind="disclaimer" />} />
              <Route path="/cookies" element={<LegalPage kind="cookies" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
