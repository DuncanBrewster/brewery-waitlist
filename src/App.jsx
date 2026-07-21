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
    <div className="app-shell">
      <header className="app-header">
        <p className="app-eyebrow">San Diego Brewery waitlist</p>
        <h1>Find a brewery and join the line</h1>
        <p className="app-description">
          Browse a fresh list of San Diego breweries with seat availability, then join or leave the waitlist in the browser.
          Status is stored locally so your choices stay after refresh.
        </p>
      </header>

      <section className="status-bar">
        <div className="status-chip">
          <strong>{waitingCount}</strong> {waitingCount === 1 ? 'brewery in line' : 'breweries in line'}
        </div>
        <div className="status-note">
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
