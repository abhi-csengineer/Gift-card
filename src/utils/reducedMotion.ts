import { useEffect, useState } from 'react'

const REDUCED_MOTION_KEY = 'vellum_bloom_reduced_motion_v1'

function getOsReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getStoredPref(): boolean | null {
  try {
    const val = localStorage.getItem(REDUCED_MOTION_KEY)
    if (val === 'true') return true
    if (val === 'false') return false
    return null
  } catch {
    return null
  }
}

export function useReducedMotionPref() {
  const [osReduced, setOsReduced] = useState<boolean>(() => getOsReducedMotion())
  const [userPref, setUserPref] = useState<boolean | null>(() => getStoredPref())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setOsReduced(e.matches)
    const onStorage = (e: StorageEvent) => {
      if (e.key === REDUCED_MOTION_KEY) {
        setUserPref(e.newValue === 'true' ? true : e.newValue === 'false' ? false : null)
      }
    }
    mq.addEventListener('change', onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      mq.removeEventListener('change', onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const reducedMotion = userPref ?? osReduced

  const toggleReducedMotion = () => {
    const next = !reducedMotion
    try {
      localStorage.setItem(REDUCED_MOTION_KEY, String(next))
    } catch {
      // Ignore storage errors
    }
    setUserPref(next)
  }

  return {
    reducedMotion,
    toggleReducedMotion,
  }
}
