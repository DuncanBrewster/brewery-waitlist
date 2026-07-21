import React from 'react'
import BreweryCard from './BreweryCard'

export default function BreweryList({ breweries, loading, error, onRetry, waitlistMap, onToggle }) {
  if (loading) return <div role="status">Loading breweries…</div>
  if (error) return (
    <div role="alert">
      <p style={{ color: '#b00020' }}>Error loading breweries: {error}</p>
      <button onClick={onRetry} style={{ padding: '8px 12px', borderRadius: 6 }}>Retry</button>
    </div>
  )

  if (!breweries || breweries.length === 0) return <div>No breweries found.</div>

  return (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
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
