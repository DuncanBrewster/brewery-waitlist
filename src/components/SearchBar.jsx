import React from 'react'

export default function SearchBar({ query, setQuery }) {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()} role="search">
      <label className="visually-hidden" htmlFor="search-input">Search breweries</label>
      <input
        id="search-input"
        className="search-input"
        placeholder="Search by name, type, or availability"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search breweries by name, type, or availability"
      />
    </form>
  )
}
