import React from 'react'
import AvailabilityBadge from './AvailabilityBadge'

export default function BreweryCard({ brewery, isInWaitlist, onToggle }) {
  const { name, brewery_type, city, state, availability } = brewery

  return (
    <article className="brewery-card" aria-live="polite">
      <div className="brewery-card-header">
        <div>
          <h2>{name}</h2>
          <div className="brewery-meta">{brewery_type} — {city}, {state}</div>
        </div>
        <AvailabilityBadge level={availability} />
      </div>

      <div className="brewery-card-footer">
        <button
          onClick={() => onToggle(brewery.id)}
          aria-pressed={!!isInWaitlist}
          className={`brewery-button ${isInWaitlist ? 'leave' : 'join'}`}
        >
          {isInWaitlist ? 'Leave Waitlist' : 'Join Waitlist'}
        </button>
      </div>
    </article>
  )
}
