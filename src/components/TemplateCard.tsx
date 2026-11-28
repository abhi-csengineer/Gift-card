import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Heart, Sparkles } from 'lucide-react'
import { getPaletteById } from '../data/catalog'
import type { CardTemplate } from '../types/card'
import { GreetingCardPreview } from './GreetingCardPreview'

interface TemplateCardProps {
  template: CardTemplate
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  onQuickPreview?: (id: string) => void
}

export function TemplateCard({
  template,
  isFavorite = false,
  onToggleFavorite,
  onQuickPreview,
}: TemplateCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  const palette = getPaletteById(template.defaultPaletteId)

  useEffect(() => {
    const el = cardRef.current
    if (!el || visible || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <article
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border p-3.5 transition-all duration-300 hover:-translate-y-1.5"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Palette-Synced Atelier Mat Stage */}
      <div
        className="relative overflow-hidden rounded-[1.35rem] p-4 sm:p-5"
        style={{
          background: `linear-gradient(150deg, ${palette.bgSecondary} 0%, ${palette.accent}38 55%, ${palette.foil}34 100%)`,
          border: `1px solid ${palette.accent}28`,
        }}
      >
        {/* Soft specular sheen sweep on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          aria-hidden="true"
        />

        {/* Quick preview & favorite actions tucked cleanly in mat corner */}
        {(onQuickPreview || onToggleFavorite) && (
          <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5">
            {onQuickPreview && (
              <button
                type="button"
                onClick={() => onQuickPreview(template.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 249, 253, 0.92)',
                  color: '#472C42',
                  border: '1px solid rgba(131, 56, 236, 0.16)',
                }}
                aria-label={`Quick preview ${template.title}`}
                title="Quick preview"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => onToggleFavorite(template.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 249, 253, 0.92)',
                  color: isFavorite ? '#D93B6B' : '#472C42',
                  border: '1px solid rgba(217, 59, 107, 0.2)',
                }}
                aria-label={isFavorite ? `Remove ${template.title} from favorites` : `Save ${template.title} to favorites`}
                aria-pressed={isFavorite}
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-[#D93B6B]' : ''}`} aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <Link
          to={`/create/${template.id}`}
          className="relative z-10 mx-auto block max-w-[235px] transition-transform duration-500 ease-out group-hover:scale-[1.035] group-hover:-rotate-[0.75deg]"
          style={{
            filter: 'drop-shadow(0 16px 26px rgba(42, 23, 38, 0.24))',
          }}
        >
          {visible ? (
            <GreetingCardPreview templateId={template.id} compact />
          ) : (
            <div
              className="aspect-[3/4] w-full animate-pulse rounded-[1.5rem]"
              style={{ backgroundColor: 'var(--bg-surface)' }}
            />
          )}
        </Link>
      </div>

      {/* Metadata & CTA */}
      <div className="flex flex-1 flex-col justify-between px-1.5 pt-4 pb-1">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[0.66rem] font-semibold tracking-[0.12em] uppercase"
              style={{
                backgroundColor: `${palette.accent}20`,
                color: 'var(--text-primary)',
              }}
            >
              {template.occasion}
            </span>
            {template.badge && (
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] uppercase"
                style={{
                  backgroundColor: 'var(--bg-sunny)',
                  color: '#6B3D08',
                }}
              >
                {template.badge}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-display text-[1.45rem] font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
            <Link to={`/create/${template.id}`} className="hover:underline">
              {template.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {template.shortDescription}
          </p>
        </div>

        <div className="mt-4 pt-2">
          <Link
            to={`/create/${template.id}`}
            className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#D93B6B] group-hover:to-[#8338EC] group-hover:text-white group-hover:shadow-md"
            style={{
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#F0B43A]" aria-hidden="true" />
            <span>Personalize Card</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
