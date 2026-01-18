import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { logisticsAPI, Order, Delivery } from '../../services/api'
import LogisticsLayout from '../../components/logistics/LogisticsLayout'
import OrderStatusBadge from '../../components/logistics/OrderStatusBadge'

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [loading, setLoading] = useState(true)
  const [assigningDelivery, setAssigningDelivery] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [changingStatus, setChangingStatus] = useState(false)
  const [newStatus, setNewStatus] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return
        const [orderRes, deliveriesRes] = await Promise.all([
          logisticsAPI.getOrder(id),
          logisticsAPI.getDeliveries(),
        ])
        setOrder(orderRes.data)
        setDeliveries(deliveriesRes.data)
        setNewStatus(orderRes.data.status)
      } catch (error) {
        console.error('Erreur lors du chargement', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleAssignDelivery = async () => {
    if (!selectedDelivery || !order) return

    setAssigningDelivery(true)
    try {
      await logisticsAPI.assignDelivery(order.id, selectedDelivery)
      const updatedOrder = await logisticsAPI.getOrder(order.id)
      setOrder(updatedOrder.data)
      setSelectedDelivery('')
    } catch (error) {
      console.error('Erreur lors de l\'assignation', error)
    } finally {
      setAssigningDelivery(false)
    }
  }

  const handleStatusChange = async () => {
    if (!order || newStatus === order.status) return

    setChangingStatus(true)
    try {
      await logisticsAPI.updateOrderStatus(order.id, newStatus)
      const updatedOrder = await logisticsAPI.getOrder(order.id)
      setOrder(updatedOrder.data)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut', error)
    } finally {
      setChangingStatus(false)
    }
  }

  if (loading) {
    return (
      <LogisticsLayout>
        <div className="flex justify-center py-8">
          <span className="text-ayoya-brown/50">Chargement...</span>
        </div>
      </LogisticsLayout>
    )
  }

  if (!order) {
    return (
      <LogisticsLayout>
        <div className="text-center py-8">
          <p className="text-ayoya-brown/70">Commande non trouvée</p>
          <button
            onClick={() => navigate('/logistics/orders')}
            className="mt-4 px-4 py-2 rounded-lg bg-ayoya-gold text-white hover:bg-ayoya-dark-gold transition"
          >
            Retour aux commandes
          </button>
        </div>
      </LogisticsLayout>
    )
  }

  return (
    <LogisticsLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ayoya-gold mb-2">Commande {order.id}</h1>
            <p className="text-ayoya-brown/70">Détails complets de la commande</p>
          </div>
          <button
            onClick={() => navigate('/logistics/orders')}
            className="px-4 py-2 rounded-lg border border-ayoya-gold text-ayoya-gold hover:bg-ayoya-gold/10 transition"
          >
            Retour
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-ayoya-gold mb-4">Informations client</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-ayoya-brown/70 text-sm">Nom</p>
                  <p className="text-ayoya-brown font-semibold">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-ayoya-brown/70 text-sm">Téléphone</p>
                  <p className="text-ayoya-brown font-semibold">{order.phone}</p>
                </div>
                <div>
                  <p className="text-ayoya-brown/70 text-sm">Adresse</p>
                  <p className="text-ayoya-brown">{order.address}</p>
                </div>
                <div>
                  <p className="text-ayoya-brown/70 text-sm">Ville / Zone</p>
                  <p className="text-ayoya-brown font-semibold">{order.city}</p>
                </div>
              </div>
            </div>

            <div className="glass border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-ayoya-gold mb-4">Détails commande</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-ayoya-brown/70">Quantité</p>
                  <p className="text-ayoya-brown font-semibold">{order.quantity} articles</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-ayoya-brown/70">Total</p>
                  <p className="text-ayoya-gold font-bold text-lg">{order.total.toLocaleString()} FCFA</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-ayoya-brown/70">Méthode de paiement</p>
                  <p className="text-ayoya-brown capitalize">{order.paymentMethod}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-ayoya-brown/70">Méthode de livraison</p>
                  <p className="text-ayoya-brown capitalize">{order.deliveryMethod}</p>
                </div>
              </div>
            </div>

            <div className="glass border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-ayoya-gold mb-4">Dates</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-ayoya-brown/70">Créée le</p>
                  <p className="text-ayoya-brown">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-ayoya-brown/70">Mise à jour</p>
                  <p className="text-ayoya-brown">{new Date(order.updatedAt).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>

            <div className="glass border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-ayoya-gold mb-4">Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajouter des notes..."
                className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown placeholder:text-ayoya-brown/50 h-24 resize-none"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-ayoya-gold mb-4">Statut</h2>
              <div className="mb-4">
                <OrderStatusBadge status={order.status} />
              </div>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown text-sm mb-3"
              >
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmée</option>
                <option value="assigned">Assignée</option>
                <option value="in_delivery">En livraison</option>
                <option value="delivered">Livrée</option>
                <option value="cancelled">Annulée</option>
              </select>
              <button
                onClick={handleStatusChange}
                disabled={changingStatus || newStatus === order.status}
                className="w-full px-4 py-2 rounded-lg bg-ayoya-gold text-white font-semibold hover:bg-ayoya-dark-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {changingStatus ? 'Mise à jour...' : 'Mettre à jour le statut'}
              </button>
            </div>

            <div className="glass border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-ayoya-gold mb-4">Livreur</h2>
              {order.assignedDeliveryId ? (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-600 text-sm font-semibold">Livreur assigné</p>
                  <p className="text-ayoya-brown">{order.assignedDeliveryId}</p>
                </div>
              ) : (
                <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-yellow-600 text-sm font-semibold">Pas de livreur assigné</p>
                </div>
              )}

              {!order.assignedDeliveryId && (
                <>
                  <select
                    value={selectedDelivery}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown text-sm mb-3"
                  >
                    <option value="">Sélectionner un livreur</option>
                    {deliveries
                      .filter((d) => d.active)
                      .map((delivery) => (
                        <option key={delivery.id} value={delivery.id}>
                          {delivery.name}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={handleAssignDelivery}
                    disabled={assigningDelivery || !selectedDelivery}
                    className="w-full px-4 py-2 rounded-lg bg-ayoya-gold text-white font-semibold hover:bg-ayoya-dark-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {assigningDelivery ? 'Assignation...' : 'Assigner le livreur'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </LogisticsLayout>
  )
}
