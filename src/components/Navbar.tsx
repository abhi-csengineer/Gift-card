import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight, Menu, Moon, Search, Sparkles, Sun, X } from 'lucide-react'
import { CARD_TEMPLATES, CATEGORIES } from '../data/catalog'
import { useTheme } from '../utils/theme'
import { GreetingCardPreview } from './GreetingCardPreview'

export function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchDialogRef = useRef<HTMLDialogElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/explore', label: 'Explore' },
    { to: '/occasions', label: 'Occasions' },
    { to: '/love-calendar', label: 'Love Calendar' },
    { to: '/create', label: 'Create' },
    { to: '/about', label: 'About' },
  ]

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return CARD_TEMPLATES.slice(0, 4)
    return CARD_TEMPLATES.filter(
      (card) =>
        card.title.toLowerCase().includes(q) ||
        card.occasion.toLowerCase().includes(q) ||
        card.shortDescription.toLowerCase().includes(q) ||
        card.categories.some((c) => c.includes(q)),
    ).slice(0, 6)
  }, [searchQuery])

  const matchingCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return CATEGORIES.slice(0, 6)
    return CATEGORIES.filter(
      (cat) => cat.name.toLowerCase().includes(q) || cat.tagline.toLowerCase().includes(q),
    ).slice(0, 6)
  }, [searchQuery])

  const openSearch = () => {
    setMobileOpen(false)
    const dialog = searchDialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
      requestAnimationFrame(() => searchInputRef.current?.focus())
    }
  }

  const closeSearch = () => {
    searchDialogRef.current?.close()
  }

  // Fallback light dismiss when dialog closedby is not supported
  useEffect(() => {
    const dialog = searchDialogRef.current
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return
    let pressedOutside = false
    const outside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect()
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
    }
    const onDown = (e: PointerEvent) => {
      pressedOutside = outside(e)
    }
    const onUp = (e: PointerEvent) => {
      if (pressedOutside && outside(e)) dialog.close()
    }
    dialog.addEventListener('pointerdown', onDown)
    dialog.addEventListener('pointerup', onUp)
    return () => {
      dialog.removeEventListener('pointerdown', onDown)
      dialog.removeEventListener('pointerup', onUp)
    }
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    closeSearch()
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-full py-1 pr-2 text-left transition-opacity hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #472C42 0%, #6B4063 100%)',
                border: '1px solid rgba(217, 183, 126, 0.55)',
              }}
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
                <rect x="4" y="6.5" width="24" height="19" rx="3.2" stroke="#FFF9F3" strokeWidth="1.6" />
                <path d="M5 9L16 17.2L27 9" stroke="#D9B77E" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="16" cy="18" r="4" fill="#C86A80" stroke="#D9B77E" strokeWidth="1" />
                <path d="M17.4 16.6C17 16.2 16.5 16 15.9 16C14.8 16 14 16.9 14 18C14 19.1 14.8 20 15.9 20C16.5 20 17 19.8 17.4 19.4" stroke="#FFF9F3" strokeWidth="1.15" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span
                className="text-xl font-semibold tracking-tight sm:text-2xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Cardelle
              </span>
              <span className="hidden sm:block text-[0.62rem] font-medium tracking-[0.14em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                Every Feeling Deserves a Card
              </span>
              <span className="sm:hidden text-[0.6rem] font-medium tracking-[0.16em] uppercase" style={{ color: 'var(--accent-gold)' }}>
                Greeting Atelier
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative whitespace-nowrap shrink-0 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                    isActive ? 'font-semibold' : 'hover:opacity-80'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-blush)' : 'transparent',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors hover:opacity-90 cursor-pointer"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Search cards and occasions"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:opacity-90 cursor-pointer"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <Link
              to="/create"
              className="hidden sm:inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #472C42 0%, #633B5C 100%)',
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
              <span>Start Creating</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden cursor-pointer"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <nav
            id="mobile-nav-panel"
            aria-label="Mobile Navigation"
            className="border-t px-4 py-4 lg:hidden"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors"
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'var(--bg-blush)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    })}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-50" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Native Accessible Search Modal */}
      <dialog
        ref={searchDialogRef}
        aria-labelledby="search-dialog-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="w-[min(92vw,42rem)] rounded-3xl p-0 backdrop:bg-black/50"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <h2 id="search-dialog-title" className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Search Cards &amp; Occasions
            </h2>
            <button
              type="button"
              onClick={closeSearch}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try “anniversary”, “mom”, “birthday”, or “lavender”..."
                className="w-full rounded-2xl border py-3 pr-24 pl-11 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-[#FFF9F3] cursor-pointer"
                style={{ backgroundColor: '#472C42' }}
              >
                View All
              </button>
            </div>
          </form>

          {/* Matching Occasions */}
          {matchingCategories.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-wider uppercase mb-2.5" style={{ color: 'var(--text-muted)' }}>
                Occasions
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closeSearch()
                    navigate('/love-calendar')
                  }}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:opacity-85 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-blush)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  The Love Calendar
                </button>
                {matchingCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      closeSearch()
                      navigate(`/explore?category=${cat.slug}`)
                    }}
                    className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors hover:opacity-85 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-muted)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Cards */}
          <div className="mt-5">
            <p className="text-xs font-semibold tracking-wider uppercase mb-2.5" style={{ color: 'var(--text-muted)' }}>
              Card Designs ({searchResults.length})
            </p>
            {searchResults.length === 0 ? (
              <p className="rounded-2xl border p-6 text-center text-sm" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                No cards matched “{searchQuery}”. Try searching by occasion like Birthday, Anniversary, or Thank You.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-h-[45dvh] overflow-y-auto pr-1">
                {searchResults.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      closeSearch()
                      navigate(`/create/${card.id}`)
                    }}
                    className="flex items-center gap-3 rounded-2xl border p-2.5 text-left transition-all hover:shadow-sm cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                      <GreetingCardPreview templateId={card.id} compact className="h-full w-full pointer-events-none" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {card.title}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--accent-rose)' }}>
                        {card.occasion}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {card.shortDescription}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
