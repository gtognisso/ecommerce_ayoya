import { useEffect, useState } from 'react'
import api from '../services/api'

export interface PublicConfig {
  socialLinks?: {
    facebook?: string
    instagram?: string
    tiktok?: string
  }
  contact?: {
    email?: string
    phone?: string
  }
}

export function useConfig() {
  const [config, setConfig] = useState<PublicConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = localStorage.getItem('ayoya_config')
    if (cached) {
      try {
        setConfig(JSON.parse(cached))
        setLoading(false)
        return
      } catch (e) {
        // Continue to fetch
      }
    }

    api.get('/public/config')
      .then(res => {
        setConfig(res.data)
        localStorage.setItem('ayoya_config', JSON.stringify(res.data))
      })
      .catch(err => {
        setError(err.message)
        console.error('Error fetching config:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { config, loading, error }
}
