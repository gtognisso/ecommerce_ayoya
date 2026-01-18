import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logisticsAPI, Order } from '../../services/api'
import LogisticsLayout from '../../components/logistics/LogisticsLayout'
import OrderStatusBadge from '../../components/logistics/OrderStatusBadge'

export default function OrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const statuses = ['pending', 'confirmed', 'assigned', 'in_delivery', 'delivered', 'cancelled']

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await logisticsAPI.getOrders({ status: statusFilter || undefined })
        setOrders(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des commandes', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [statusFilter])

  useEffect(() => {
    let filtered = orders
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.phone.includes(searchTerm) ||
          order.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [searchTerm, orders])

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  return (
    <LogisticsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-ayoya-gold mb-2">Commandes</h1>
          <p className="text-ayoya-brown/70">Gestion des commandes</p>
        </div>

        <div className="glass border border-white/10 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher par ID, client, téléphone ou ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown placeholder:text-ayoya-brown/50"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown"
            >
              <option value="">Tous les statuts</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="text-ayoya-brown/50">Chargement...</span>
            </div>
          ) : paginatedOrders.length === 0 ? (
            <div className="flex justify-center py-8">
              <span className="text-ayoya-brown/50">Aucune commande trouvée</span>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-semibold text-ayoya-brown/70">ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-ayoya-brown/70">Client</th>
                      <th className="text-left py-3 px-4 font-semibold text-ayoya-brown/70">Téléphone</th>
                      <th className="text-left py-3 px-4 font-semibold text-ayoya-brown/70">Ville</th>
                      <th className="text-center py-3 px-4 font-semibold text-ayoya-brown/70">Quantité</th>
                      <th className="text-right py-3 px-4 font-semibold text-ayoya-brown/70">Total</th>
                      <th className="text-center py-3 px-4 font-semibold text-ayoya-brown/70">Statut</th>
                      <th className="text-center py-3 px-4 font-semibold text-ayoya-brown/70">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-3 px-4 text-ayoya-brown font-mono text-sm">{order.id}</td>
                        <td className="py-3 px-4 text-ayoya-brown">{order.customerName}</td>
                        <td className="py-3 px-4 text-ayoya-brown">{order.phone}</td>
                        <td className="py-3 px-4 text-ayoya-brown">{order.city}</td>
                        <td className="py-3 px-4 text-center text-ayoya-brown">{order.quantity}</td>
                        <td className="py-3 px-4 text-right text-ayoya-gold font-semibold">
                          {order.total.toLocaleString()} FCFA
                        </td>
                        <td className="py-3 px-4 text-center">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => navigate(`/logistics/orders/${order.id}`)}
                            className="px-3 py-1 rounded-md text-ayoya-gold border border-ayoya-gold hover:bg-ayoya-gold/10 transition text-sm"
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <p className="text-ayoya-brown/70 text-sm">
                    Page {currentPage} sur {totalPages} ({filteredOrders.length} commandes)
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md border border-ayoya-gold text-ayoya-gold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ayoya-gold/10 transition"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md border border-ayoya-gold text-ayoya-gold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ayoya-gold/10 transition"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </LogisticsLayout>
  )
}
