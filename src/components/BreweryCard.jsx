import React from 'react'
import AvailabilityBadge from './AvailabilityBadge'

export default function BreweryCard({ brewery, isInWaitlist, onToggle }) {
  const { name, brewery_type, city, state, availability } = brewery

  const buttonStyle = {
    padding: '10px 14px',
    minWidth: 140,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <article style={{ border: '1px solid #e6e6e6', padding: 12, borderRadius: 8 }} aria-live="polite">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
        <div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: 16 }}>{name}</h2>
          <div style={{ color: '#666', fontSize: 13 }}>{brewery_type} — {city}, {state}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <AvailabilityBadge level={availability} />
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={() => onToggle(brewery.id)}
          aria-pressed={!!isInWaitlist}
          style={{ ...buttonStyle, background: isInWaitlist ? '#fff' : '#0b5fff', color: isInWaitlist ? '#0b5fff' : '#fff', border: isInWaitlist ? '1px solid #0b5fff' : 'none' }}
        >
          {isInWaitlist ? 'Leave Waitlist' : 'Join Waitlist'}
        </button>
      </div>
    </article>
  )
}
