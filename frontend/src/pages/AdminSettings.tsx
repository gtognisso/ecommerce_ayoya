import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI, SMTPConfig } from '../services/api'

export default function AdminSettings() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [config, setConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    user: '',
    password: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    loadConfig()
  }, [navigate])

  const loadConfig = async () => {
    try {
      const response = await adminAPI.getSMTPConfig()
      setConfig(response.data)
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await adminAPI.updateSMTPConfig(config)
      setSuccess('Configuration SMTP mise à jour avec succès')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-ayoya-gold">Paramètres Admin</h1>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Déconnexion
            </button>
          </div>

          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-ayoya-brown mb-6">
              Configuration Email SMTP
            </h2>

            {success && (
              <div className="glass-dark border-green-500 text-green-700 p-4 rounded-lg mb-6">
                {success}
              </div>
            )}

            {error && (
              <div className="glass-dark border-red-500 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">
                  Serveur SMTP
                </label>
                <input
                  type="text"
                  required
                  value={config.host}
                  onChange={(e) => setConfig({ ...config, host: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold"
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">
                  Port
                </label>
                <input
                  type="number"
                  required
                  value={config.port}
                  onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold"
                  placeholder="587"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">
                  Utilisateur
                </label>
                <input
                  type="email"
                  required
                  value={config.user}
                  onChange={(e) => setConfig({ ...config, user: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold"
                  placeholder="contact@ayoya.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={config.password}
                  onChange={(e) => setConfig({ ...config, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold"
                  placeholder="••••••••"
                />
                <p className="text-xs text-ayoya-brown/60 mt-2">
                  Pour Gmail, utilisez un mot de passe d'application
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer la configuration'}
              </button>
            </form>
          </div>

          <div className="glass rounded-xl p-6 mt-8">
            <h3 className="text-lg font-bold text-ayoya-brown mb-4">Aide</h3>
            <ul className="space-y-2 text-sm text-ayoya-brown/70">
              <li>• Configuration SMTP pour l'envoi automatique d'emails de confirmation</li>
              <li>• Pour Gmail: utilisez un mot de passe d'application (2FA requis)</li>
              <li>• Port recommandé: 587 (STARTTLS) ou 465 (SSL)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
