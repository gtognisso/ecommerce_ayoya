import { useEffect, useState } from 'react'
import api from '../services/api'

export interface Zone {
  id: string
  name: string
  city: string
}

export function useZones(city?: string) {
  const [zones, setZones] = useState<Zone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!city) {
      setZones([])
      setLoading(false)
      return
    }

    api.get(`/public/zones?city=${encodeURIComponent(city)}`)
      .then(res => {
        setZones(res.data || [])
      })
      .catch(err => {
        setError(err.message)
        console.error('Error fetching zones:', err)
        setZones([])
      })
      .finally(() => setLoading(false))
  }, [city])

  return { zones, loading, error }
}
