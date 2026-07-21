import { useState, useEffect, useCallback } from 'react'

const API_URL = 'https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=15'

function stableHash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

function seedAvailability(id) {
  const idx = stableHash(id) % 3
  return ['Low', 'Medium', 'High'][idx]
}

export default function useBreweries() {
  const [breweries, setBreweries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBreweries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      // attach deterministic availability
      const enriched = data.map((b) => ({ ...b, availability: seedAvailability(b.id || b.name || JSON.stringify(b)) }))
      setBreweries(enriched)
    } catch (err) {
      setError(err.message || String(err))
      setBreweries([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBreweries()
  }, [fetchBreweries])

  return {
    breweries,
    loading,
    error,
    refetch: fetchBreweries,
  }
}
