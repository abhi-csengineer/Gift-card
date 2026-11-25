import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs font-medium ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:underline"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <Fragment key={`${item.label}-${idx}`}>
              <li aria-hidden="true" className="inline-flex items-center opacity-60">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="inline-flex items-center">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="truncate max-w-[18rem] sm:max-w-none"
                    style={{ color: isLast ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
