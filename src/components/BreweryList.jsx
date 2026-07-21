import React from 'react'
import BreweryCard from './BreweryCard'

export default function BreweryList({ breweries, loading, error, onRetry, waitlistMap, onToggle }) {
  if (loading) return <div className="loading-state" role="status">Loading breweries…</div>
  if (error) return (
    <div className="error-state" role="alert">
      <p>Error loading breweries: {error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  )

  if (!breweries || breweries.length === 0) return <div className="empty-state">No breweries found.</div>

  return (
    <div className="brewery-grid">
      {breweries.map((b) => (
        <BreweryCard
          key={b.id}
          brewery={b}
          isInWaitlist={!!waitlistMap[b.id]}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
