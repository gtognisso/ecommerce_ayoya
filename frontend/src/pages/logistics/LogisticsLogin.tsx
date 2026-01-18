import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logisticsAPI } from '../../services/api'

export default function LogisticsLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await logisticsAPI.login(username, password)
      localStorage.setItem('logisticsToken', response.data.token)
      localStorage.setItem('logisticsUser', response.data.username)
      navigate('/logistics/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="glass rounded-2xl p-8 border border-white/20 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-ayoya-gold to-ayoya-dark-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-ayoya-gold mb-2">Logistique</h1>
              <p className="text-ayoya-brown/70">Gestion des livraisons</p>
            </div>

            {error && (
              <div className="glass-dark border border-red-500 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown placeholder:text-ayoya-brown/50"
                  placeholder="utilisateur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown placeholder:text-ayoya-brown/50"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
