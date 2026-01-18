import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminConfigAPI } from '../../services/api'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  ordersThisMonth: number
  pendingOrders: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    ordersThisMonth: 0,
    pendingOrders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminConfigAPI.getStats()
        setStats(response.data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#3D2914] mb-8">Tableau de bord</h1>

        {loading ? (
          <div className="text-center text-[#3D2914]">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Orders */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#3D2914]/70 mb-2">Commandes totales</p>
                  <p className="text-3xl font-bold text-[#3D2914]">{stats.totalOrders}</p>
                </div>
                <div className="text-4xl text-[#C9A227]">📦</div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#3D2914]/70 mb-2">Revenu total</p>
                  <p className="text-3xl font-bold text-[#C9A227]">{stats.totalRevenue.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div className="text-4xl text-[#C9A227]">💰</div>
              </div>
            </div>

            {/* Orders This Month */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#3D2914]/70 mb-2">Ce mois-ci</p>
                  <p className="text-3xl font-bold text-[#3D2914]">{stats.ordersThisMonth}</p>
                </div>
                <div className="text-4xl text-[#C9A227]">📈</div>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#3D2914]/70 mb-2">En attente</p>
                  <p className="text-3xl font-bold text-[#3D2914]">{stats.pendingOrders}</p>
                </div>
                <div className="text-4xl text-[#C9A227]">⏳</div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#3D2914] mb-6">Activité récente</h2>
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20 shadow-lg">
            <p className="text-[#3D2914]/70">Aucune activité pour le moment</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
