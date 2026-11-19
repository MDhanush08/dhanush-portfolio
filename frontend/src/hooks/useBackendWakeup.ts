import { useEffect } from 'react'

const STORAGE_KEY = 'backend_last_health_check'
const COOLDOWN_MS = 15 * 60 * 1000 // 15 minutes
const TIMEOUT_MS = 5000 // 5 seconds

let isPingInProgress = false
let inMemoryLastAttempt = 0

function getLastAttempt(): number {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed > 0) {
          return parsed
        }
      }
    } catch {
      // sessionStorage unavailable (e.g. strict private mode)
    }
  }
  return inMemoryLastAttempt
}

function recordAttempt(timestamp: number): void {
  inMemoryLastAttempt = timestamp
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, timestamp.toString())
    } catch {
      // sessionStorage unavailable
    }
  }
}

/**
 * Sends a lightweight, silent background health-check GET request to wake up the Render backend.
 * Enforces a 15-minute cooldown between attempts and prevents duplicate simultaneous requests.
 */
export function wakeUpBackend(): void {
  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) return

  // Prevent duplicate simultaneous requests
  if (isPingInProgress) return

  const now = Date.now()
  const lastAttempt = getLastAttempt()

  // Enforce 15-minute cooldown between health-check attempts
  if (lastAttempt > 0 && now - lastAttempt < COOLDOWN_MS && lastAttempt <= now) {
    return
  }

  // Mark attempt timestamp immediately to enforce cooldown and prevent race conditions (including React StrictMode)
  recordAttempt(now)
  isPingInProgress = true

  const baseUrl = apiUrl.replace(/\/+$/, '')
  const healthUrl = `${baseUrl}/health`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, TIMEOUT_MS)

  fetch(healthUrl, {
    method: 'GET',
    signal: controller.signal,
  })
    .catch(() => {
      // Silently handle any network errors, timeouts, or aborts.
      // Do not show errors, toast, console errors, or retries.
    })
    .finally(() => {
      clearTimeout(timeoutId)
      isPingInProgress = false
    })
}

/**
 * Hook to manage the silent backend wake-up lifecycle:
 * - Triggers exactly once on initial visit in the background (safe from React StrictMode duplicate calls).
 * - Listens for browser `visibilitychange` to wake up the backend if 15+ minutes have passed
 *   when the user returns to the tab (including mobile tab-resume / screen unlock).
 * - Completely silent and independent of UI rendering, navigation, and user actions.
 */
export function useBackendWakeup(): void {
  useEffect(() => {
    // 1. Initial portfolio visit wake-up
    wakeUpBackend()

    // 2. When the user returns to the existing browser tab / unlocks mobile screen
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        wakeUpBackend()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}
