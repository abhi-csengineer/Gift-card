import { Link } from 'react-router-dom'
import { Eye, Heart, Sparkles } from 'lucide-react'
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
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-3xl border p-3.5 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Card artwork thumbnail */}
      <div className="relative">
        <Link to={`/create/${template.id}`} className="block overflow-hidden rounded-[1.25rem]">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <GreetingCardPreview templateId={template.id} compact />
          </div>
        </Link>

        {/* Top badges / actions */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
          {template.badge ? (
            <span
              className="pointer-events-auto rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide shadow-sm"
              style={{
                backgroundColor: '#472C42',
                color: '#FFF9F3',
                border: '1px solid rgba(217, 183, 126, 0.55)',
              }}
            >
              {template.badge}
            </span>
          ) : (
            <span />
          )}

          <div className="pointer-events-auto flex items-center gap-1.5">
            {onQuickPreview && (
              <button
                type="button"
                onClick={() => onQuickPreview(template.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 249, 243, 0.88)',
                  color: '#472C42',
                  border: '1px solid rgba(71, 44, 66, 0.14)',
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
                  backgroundColor: 'rgba(255, 249, 243, 0.88)',
                  color: isFavorite ? '#B5546D' : '#472C42',
                  border: '1px solid rgba(71, 44, 66, 0.14)',
                }}
                aria-label={isFavorite ? `Remove ${template.title} from favorites` : `Save ${template.title} to favorites`}
                aria-pressed={isFavorite}
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-[#B5546D]' : ''}`} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metadata & CTA */}
      <div className="flex flex-1 flex-col justify-between px-1.5 pt-4 pb-1">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--accent-rose)' }}>
              {template.occasion}
            </span>
          </div>
          <h3 className="mt-1 text-xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
            <Link to={`/create/${template.id}`} className="hover:underline">
              {template.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {template.shortDescription}
          </p>
        </div>

        <div className="mt-4 pt-2">
          <Link
            to={`/create/${template.id}`}
            className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all group-hover:border-transparent group-hover:bg-[#472C42] group-hover:text-[#FFF9F3]"
            style={{
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D9B77E]" aria-hidden="true" />
            <span>Personalize</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
