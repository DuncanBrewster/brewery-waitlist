import React from 'react'

const levelClass = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
}

export default function AvailabilityBadge({ level }) {
  const typeClass = levelClass[level] || ''

  return (
    <span className={`availability-badge ${typeClass}`} aria-label={`Availability: ${level}`}>
      {level}
    </span>
  )
}
