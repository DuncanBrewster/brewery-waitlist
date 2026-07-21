import React, { useState, useEffect, useCallback, useMemo } from 'react'
import useBreweries from './hooks/useBreweries'
import BreweryList from './components/BreweryList'

const STORAGE_KEY = 'brewery-waitlist-status'

function loadWaitlist() {
  if (typeof window === 'undefined') return {}
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveWaitlist(waitlist) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(waitlist))
  } catch {
    // ignore write errors
  }
}

export default function App() {
  const { breweries, loading, error, refetch } = useBreweries()
  const [waitlistMap, setWaitlistMap] = useState(() => loadWaitlist())

  useEffect(() => {
    saveWaitlist(waitlistMap)
  }, [waitlistMap])

  const waitingCount = useMemo(
    () => Object.values(waitlistMap).filter(Boolean).length,
    [waitlistMap],
  )

  const handleToggleWaitlist = useCallback((breweryId) => {
    setWaitlistMap((current) => ({
      ...current,
      [breweryId]: !current[breweryId],
    }))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial', padding: 16, maxWidth: 1080, margin: '0 auto' }}>
      <header style={{ marginBottom: 24 }}>
        <p style={{ margin: 0, color: '#0b5fff', fontWeight: 700 }}>San Diego Brewery waitlist</p>
        <h1 style={{ margin: '8px 0 12px 0', fontSize: 32 }}>Find a brewery and join the line</h1>
        <p style={{ margin: 0, color: '#555', maxWidth: 640 }}>
          Browse a fresh list of San Diego breweries with seat availability, then join or leave the waitlist in the browser.
          Status is stored locally so your choices stay after refresh.
        </p>
      </header>

      <section style={{ marginBottom: 20, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ background: '#f4f7ff', padding: '12px 16px', borderRadius: 12, border: '1px solid #e0e7ff' }}>
          <strong>{waitingCount}</strong> {waitingCount === 1 ? 'brewery in line' : 'breweries in line'}
        </div>
        <div style={{ color: '#333' }}>
          Tip: availability is seeded locally and shown as Low / Medium / High.
        </div>
      </section>

      <main>
        <BreweryList
          breweries={breweries}
          loading={loading}
          error={error}
          onRetry={refetch}
          waitlistMap={waitlistMap}
          onToggle={handleToggleWaitlist}
        />
      </main>
    </div>
  )
}
