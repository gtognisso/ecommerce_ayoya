import { useEffect, useState } from 'react'
import { logisticsAPI, Delivery } from '../../services/api'
import LogisticsLayout from '../../components/logistics/LogisticsLayout'

interface FormData {
  name: string
  phone: string
  active: boolean
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    active: true,
  })

  useEffect(() => {
    fetchDeliveries()
  }, [])

  const fetchDeliveries = async () => {
    try {
      const response = await logisticsAPI.getDeliveries()
      setDeliveries(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des livreurs', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (delivery?: Delivery) => {
    if (delivery) {
      setEditingId(delivery.id)
      setFormData({
        name: delivery.name,
        phone: delivery.phone,
        active: delivery.active,
      })
    } else {
      setEditingId(null)
      setFormData({ name: '', phone: '', active: true })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: '', phone: '', active: true })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await logisticsAPI.updateDelivery(editingId, formData)
      } else {
        await logisticsAPI.createDelivery(formData)
      }
      await fetchDeliveries()
      handleCloseModal()
    } catch (error) {
      console.error('Erreur lors de la sauvegarde', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      try {
        await logisticsAPI.deleteDelivery(id)
        await fetchDeliveries()
      } catch (error) {
        console.error('Erreur lors de la suppression', error)
      }
    }
  }

  return (
    <LogisticsLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ayoya-gold mb-2">Livreurs</h1>
            <p className="text-ayoya-brown/70">Gestion des livreurs</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-2 rounded-lg bg-ayoya-gold text-white font-semibold hover:bg-ayoya-dark-gold transition"
          >
            Ajouter un livreur
          </button>
        </div>

        <div className="glass border border-white/10 rounded-xl p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <span className="text-ayoya-brown/50">Chargement...</span>
            </div>
          ) : deliveries.length === 0 ? (
            <div className="flex justify-center py-8">
              <span className="text-ayoya-brown/50">Aucun livreur</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="glass-dark border border-white/10 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-ayoya-gold">{delivery.name}</h3>
                      <p className="text-sm text-ayoya-brown">{delivery.phone}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        delivery.active
                          ? 'bg-green-500/20 text-green-600'
                          : 'bg-red-500/20 text-red-600'
                      }`}
                    >
                      {delivery.active ? 'Actif' : 'Inactif'}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-ayoya-brown/70">Commandes traitées</p>
                    <p className="text-lg font-bold text-ayoya-gold">{delivery.ordersCount || 0}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(delivery)}
                      className="flex-1 px-3 py-2 rounded-lg border border-ayoya-gold text-ayoya-gold text-sm hover:bg-ayoya-gold/10 transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(delivery.id)}
                      className="flex-1 px-3 py-2 rounded-lg border border-red-500 text-red-500 text-sm hover:bg-red-500/10 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass border border-white/10 rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-ayoya-gold mb-6">
              {editingId ? 'Modifier le livreur' : 'Ajouter un livreur'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">Nom</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown placeholder:text-ayoya-brown/50"
                  placeholder="Nom du livreur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ayoya-brown mb-2">Téléphone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg glass-dark border border-white/10 focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-ayoya-brown placeholder:text-ayoya-brown/50"
                  placeholder="+225 XX XX XX XX"
                />
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-ayoya-brown">Livreur actif</span>
                </label>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 rounded-lg border border-ayoya-gold text-ayoya-gold font-semibold hover:bg-ayoya-gold/10 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-ayoya-gold text-white font-semibold hover:bg-ayoya-dark-gold transition"
                >
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LogisticsLayout>
  )
}
