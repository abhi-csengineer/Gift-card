import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ConsentBanner } from './components/ConsentBanner'
import { Footer } from './components/Footer'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { Navbar } from './components/Navbar'
import { RouteMetaSync } from './components/RouteMetaSync'
import { SeoHead } from './components/SeoHead'

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const ExplorePage = lazy(() =>
  import('./pages/ExplorePage').then((m) => ({ default: m.ExplorePage })),
)
const OccasionsPage = lazy(() =>
  import('./pages/OccasionsPage').then((m) => ({ default: m.OccasionsPage })),
)
const CategorySeoPage = lazy(() =>
  import('./pages/CategorySeoPage').then((m) => ({ default: m.CategorySeoPage })),
)
const LoveCalendarPage = lazy(() =>
  import('./pages/LoveCalendarPage').then((m) => ({ default: m.LoveCalendarPage })),
)
const StudioPage = lazy(() =>
  import('./pages/StudioPage').then((m) => ({ default: m.StudioPage })),
)
const CardViewPage = lazy(() =>
  import('./pages/CardViewPage').then((m) => ({ default: m.CardViewPage })),
)
const InspirationPage = lazy(() =>
  import('./pages/InspirationPage').then((m) => ({ default: m.InspirationPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const FaqPage = lazy(() =>
  import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })),
)
const SitemapPage = lazy(() =>
  import('./pages/SitemapPage').then((m) => ({ default: m.SitemapPage })),
)
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })),
)

function ScrollToTop() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, search, hash])
  return null
}

function RouteLoadingFallback() {
  return (
    <div className="paper-grain py-24 text-center px-4" aria-busy="true" aria-label="Loading page">
      <div className="mx-auto max-w-md space-y-3">
        <div
          className="mx-auto h-10 w-10 animate-pulse rounded-full border"
          style={{ backgroundColor: 'var(--bg-blush)', borderColor: 'var(--accent-gold)' }}
        />
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Opening stationery...
        </p>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="paper-grain py-24 text-center px-4">
      <SeoHead
        title="Page Not Found"
        description="The page you requested could not be found on Cardelle."
        noIndex
      />
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
        <RouteMetaSync />
        <GoogleAnalytics />
        <div className="flex min-h-dvh flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#472C42] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-[#FFF9F3]"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/occasions" element={<OccasionsPage />} />
                <Route path="/occasions/:categorySlug" element={<CategorySeoPage />} />
                <Route path="/love-calendar" element={<LoveCalendarPage />} />
                <Route path="/love-calendar/:monthSlug" element={<LoveCalendarPage />} />
                <Route path="/create" element={<StudioPage />} />
                <Route path="/create/:templateId" element={<StudioPage />} />
                <Route path="/card/view" element={<CardViewPage />} />
                <Route path="/card/:cardId" element={<CardViewPage />} />
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
                <Route path="/copyright" element={<LegalPage kind="copyright" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ConsentBanner />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
