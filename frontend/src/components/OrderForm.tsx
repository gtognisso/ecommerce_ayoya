import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderAPI, OrderData } from '../services/api'
import { useZones } from '../hooks/useZones'

const CITIES = [
  'Cotonou',
  'Abomey-Calavi',
  'Porto-Novo',
  'Parakou',
  'Djougou',
  'Abomey',
  'Ouémé',
]

interface ExtendedOrderData extends OrderData {
  deliveryPhoneNumber?: string
  sameDeliveryContact?: boolean
  zone?: string
  orderType?: 'unit' | 'carton'
  bottlesPerCarton?: number
  notes?: string
}

export default function OrderForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<ExtendedOrderData>({
    customerName: '',
    phone: '',
    deliveryPhoneNumber: '',
    sameDeliveryContact: true,
    address: '',
    city: '',
    zone: '',
    quantity: 1,
    orderType: 'unit',
    bottlesPerCarton: 12,
    paymentMethod: 'cash',
    deliveryMethod: 'delivery',
    notes: '',
  })

  const { zones } = useZones(formData.city === 'Cotonou' ? formData.city : undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const submitData: ExtendedOrderData = {
        ...formData,
        deliveryPhoneNumber: formData.sameDeliveryContact ? formData.phone : formData.deliveryPhoneNumber,
      }

      const response = await orderAPI.create(submitData as any)
      localStorage.setItem('orderId', response.data.id)
      navigate('/merci')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la commande')
    } finally {
      setLoading(false)
    }
  }

  const unitPrice = 5000
  const total = formData.quantity * unitPrice
  const deliveryFee = formData.deliveryMethod === 'delivery' ? 1000 : 0
  const grandTotal = total + deliveryFee

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="glass-dark border-red-500 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="glass rounded-xl p-6 space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">Informations Acheteur</h3>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Nom Complet *
          </label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Téléphone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Téléphone Contact Livraison *
          </label>
          <div className="space-y-2">
            <input
              type="tel"
              value={formData.sameDeliveryContact ? formData.phone : formData.deliveryPhoneNumber}
              onChange={(e) => !formData.sameDeliveryContact && setFormData({ ...formData, deliveryPhoneNumber: e.target.value })}
              disabled={formData.sameDeliveryContact}
              className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm disabled:opacity-50"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sameDeliveryContact}
                onChange={(e) => setFormData({ ...formData, sameDeliveryContact: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-ayoya-brown/70">Identique à l'acheteur</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Ville *
          </label>
          <select
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value, zone: '' })}
            className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
          >
            <option value="">-- Sélectionner une ville --</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {formData.city === 'Cotonou' && (
          <div>
            <label className="block text-sm font-medium text-ayoya-brown mb-2">
              Zone *
            </label>
            <select
              value={formData.zone || ''}
              onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
            >
              <option value="">-- Sélectionner une zone --</option>
              {zones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Adresse Précise *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Ex: Rue 123, Maison jaune près du marché"
            className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
          />
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">Type de Commande</h3>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-3">
            Format *
          </label>
          <div className="space-y-2">
            <label className="flex items-center glass-dark p-4 rounded-lg cursor-pointer hover:bg-white/30">
              <input
                type="radio"
                name="orderType"
                value="unit"
                checked={formData.orderType === 'unit'}
                onChange={(_e) => setFormData({ ...formData, orderType: 'unit' })}
                className="mr-3"
              />
              <span className="text-sm">À l'unité</span>
            </label>
            <label className="flex items-center glass-dark p-4 rounded-lg cursor-pointer hover:bg-white/30">
              <input
                type="radio"
                name="orderType"
                value="carton"
                checked={formData.orderType === 'carton'}
                onChange={(_e) => setFormData({ ...formData, orderType: 'carton' })}
                className="mr-3"
              />
              <span className="text-sm">Par carton ({formData.bottlesPerCarton} bouteilles)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Quantité {formData.orderType === 'carton' ? 'de cartons' : 'de bouteilles'} *
          </label>
          <input
            type="number"
            min="1"
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ayoya-brown mb-2">
            Notes (optionnel)
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Informations supplémentaires..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg glass-dark focus:outline-none focus:ring-2 focus:ring-ayoya-gold text-sm"
          />
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">Mode de Livraison</h3>

        <div className="space-y-2">
          <label className="flex items-center glass-dark p-4 rounded-lg cursor-pointer hover:bg-white/30">
            <input
              type="radio"
              name="delivery"
              value="delivery"
              checked={formData.deliveryMethod === 'delivery'}
              onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as 'delivery' | 'pickup' })}
              className="mr-3"
            />
            <span className="text-sm">Livraison à domicile (+1000 FCFA)</span>
          </label>
          <label className="flex items-center glass-dark p-4 rounded-lg cursor-pointer hover:bg-white/30">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              checked={formData.deliveryMethod === 'pickup'}
              onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as 'delivery' | 'pickup' })}
              className="mr-3"
            />
            <span className="text-sm">Retrait en point de vente</span>
          </label>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">Récapitulatif</h3>
        <div className="space-y-2 text-sm md:text-base">
          <div className="flex justify-between">
            <span>Sous-total ({formData.quantity} × {unitPrice} FCFA)</span>
            <span className="font-semibold">{total.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span className="font-semibold">{deliveryFee.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="border-t border-ayoya-gold/20 pt-2 mt-2">
            <div className="flex justify-between text-lg md:text-xl font-bold text-ayoya-gold">
              <span>Total</span>
              <span>{grandTotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-base md:text-lg py-3 md:py-4 disabled:opacity-50"
      >
        {loading ? 'Traitement...' : 'Confirmer la Commande'}
      </button>
    </form>
  )
}
