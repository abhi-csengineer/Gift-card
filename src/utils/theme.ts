import { useEffect, useState } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'color-scheme'

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredOverride(): 'light' | 'dark' | null {
  try {
    const val = localStorage.getItem(STORAGE_KEY)
    return val === 'light' || val === 'dark' ? val : null
  } catch {
    return null
  }
}

function applyMetaContent(override: 'light' | 'dark' | null) {
  if (typeof document === 'undefined') return
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) {
    meta.setAttribute('content', override ?? 'light dark')
  }
}

export function useTheme() {
  const [override, setOverride] = useState<'light' | 'dark' | null>(() => getStoredOverride())
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme())

  const resolvedTheme: ResolvedTheme = override ?? systemTheme

  useEffect(() => {
    applyMetaContent(override)
  }, [override])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const next = e.newValue === 'light' || e.newValue === 'dark' ? e.newValue : null
        setOverride(next)
        applyMetaContent(next)
      }
    }

    mq.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorage)
    return () => {
      mq.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  // Follows dark-mode-toggle two-state toggle guidance:
  // Target = opposite of currently rendered scheme.
  // Store only if target differs from system preference; otherwise remove stored override.
  const toggleTheme = () => {
    const target: ResolvedTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    const currentSystem = getSystemTheme()
    if (target === currentSystem) {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Ignore storage restrictions
      }
      setOverride(null)
    } else {
      try {
        localStorage.setItem(STORAGE_KEY, target)
      } catch {
        // Ignore storage restrictions
      }
      setOverride(target)
    }
  }

  return {
    resolvedTheme,
    isOverridden: override !== null,
    toggleTheme,
  }
}
