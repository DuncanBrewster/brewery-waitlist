import React from 'react'

const colors = {
  High: '#d64545',
  Medium: '#f39c12',
  Low: '#2ecc71',
}

export default function AvailabilityBadge({ level }) {
  const color = colors[level] || '#999'
  const style = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 9999,
    background: color,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
  }
  return (
    <span style={style} aria-label={`Availability: ${level}`}>
      {level}
    </span>
  )
}
