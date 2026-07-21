import React, { useState, useEffect, useCallback, useMemo } from 'react'
import useBreweries from './hooks/useBreweries'
import BreweryList from './components/BreweryList'
import SearchBar from './components/SearchBar'

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
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterAvailability, setFilterAvailability] = useState('All')
  const [waitlistMap, setWaitlistMap] = useState(() => loadWaitlist())

  useEffect(() => {
    saveWaitlist(waitlistMap)
  }, [waitlistMap])

  const waitingCount = useMemo(
    () => Object.values(waitlistMap).filter(Boolean).length,
    [waitlistMap],
  )

  const filteredBreweries = useMemo(() => {
    const q = query.trim().toLowerCase()
    return breweries.filter((b) => {
      if (filterType !== 'All' && b.brewery_type !== filterType) return false
      if (filterAvailability !== 'All' && b.availability !== filterAvailability) return false
      if (!q) return true
      const name = (b.name || '').toLowerCase()
      const type = (b.brewery_type || '').toLowerCase()
      return name.includes(q) || type.includes(q) || b.availability?.toLowerCase().includes(q)
    })
  }, [breweries, query, filterType, filterAvailability])

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
          Discover San Diego breweries and join their waitlist.
        </p>
      </header>

      <section className="status-bar">
        <div className="status-chip">
          You're in line for <strong>{waitingCount}</strong> {waitingCount === 1 ? 'brewery' : 'breweries'}
        </div>
      </section>

      <SearchBar
        query={query}
        setQuery={setQuery}
      />

      <main>
        <BreweryList
          breweries={filteredBreweries}
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
