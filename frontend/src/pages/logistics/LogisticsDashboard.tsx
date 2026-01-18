import { useEffect, useState } from 'react'
import { logisticsAPI } from '../../services/api'
import LogisticsLayout from '../../components/logistics/LogisticsLayout'

interface DashboardStats {
  today: number
  week: number
  month: number
  pending: number
  inDelivery: number
}

export default function LogisticsDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    today: 0,
    week: 0,
    month: 0,
    pending: 0,
    inDelivery: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await logisticsAPI.getDashboardStats()
        setStats(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des stats', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <LogisticsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-ayoya-gold mb-2">Tableau de bord</h1>
          <p className="text-ayoya-brown/70">Vue d'ensemble de vos livraisons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass border border-white/10 rounded-xl p-6">
            <p className="text-ayoya-brown/70 text-sm font-medium mb-2">Aujourd'hui</p>
            <p className="text-3xl font-bold text-ayoya-gold">{stats.today}</p>
            <p className="text-xs text-ayoya-brown/50 mt-1">commandes</p>
          </div>

          <div className="glass border border-white/10 rounded-xl p-6">
            <p className="text-ayoya-brown/70 text-sm font-medium mb-2">Cette semaine</p>
            <p className="text-3xl font-bold text-ayoya-gold">{stats.week}</p>
            <p className="text-xs text-ayoya-brown/50 mt-1">commandes</p>
          </div>

          <div className="glass border border-white/10 rounded-xl p-6">
            <p className="text-ayoya-brown/70 text-sm font-medium mb-2">Ce mois</p>
            <p className="text-3xl font-bold text-ayoya-gold">{stats.month}</p>
            <p className="text-xs text-ayoya-brown/50 mt-1">commandes</p>
          </div>

          <div className="glass border border-white/10 rounded-xl p-6">
            <p className="text-ayoya-brown/70 text-sm font-medium mb-2">En attente</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
            <p className="text-xs text-ayoya-brown/50 mt-1">à assigner</p>
          </div>

          <div className="glass border border-white/10 rounded-xl p-6">
            <p className="text-ayoya-brown/70 text-sm font-medium mb-2">En cours</p>
            <p className="text-3xl font-bold text-orange-500">{stats.inDelivery}</p>
            <p className="text-xs text-ayoya-brown/50 mt-1">en livraison</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ayoya-gold mb-4">Commandes en attente</h2>
            {!loading ? (
              <div className="h-64 flex items-center justify-center text-ayoya-brown/50">
                {stats.pending > 0 ? `${stats.pending} commandes à assigner` : 'Aucune commande en attente'}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <span className="text-ayoya-brown/50">Chargement...</span>
              </div>
            )}
          </div>

          <div className="glass border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ayoya-gold mb-4">Commandes en cours</h2>
            {!loading ? (
              <div className="h-64 flex items-center justify-center text-ayoya-brown/50">
                {stats.inDelivery > 0 ? `${stats.inDelivery} commandes en livraison` : 'Aucune commande en cours'}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <span className="text-ayoya-brown/50">Chargement...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </LogisticsLayout>
  )
}
