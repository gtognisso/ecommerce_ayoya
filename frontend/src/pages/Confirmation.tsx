import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { orderAPI } from '../services/api'

export default function Confirmation() {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      orderAPI.getById(orderId)
        .then(res => {
          setOrder(res.data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-12">
          <div className="animate-spin w-16 h-16 border-4 border-ayoya-gold border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-ayoya-gold mb-4">
              Commande Confirmée!
            </h1>
            <p className="text-xl text-ayoya-brown/70 mb-8">
              Merci pour votre commande. Vous recevrez une confirmation par email.
            </p>

            {order && (
              <div className="glass-dark rounded-xl p-8 text-left mb-8">
                <h2 className="text-2xl font-bold text-ayoya-brown mb-6">Récapitulatif</h2>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Numéro de commande</span>
                    <span className="font-semibold text-ayoya-brown">{order.orderNumber}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Nom</span>
                    <span className="font-semibold text-ayoya-brown">{order.customerName}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Téléphone</span>
                    <span className="font-semibold text-ayoya-brown">{order.phone}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Adresse</span>
                    <span className="font-semibold text-ayoya-brown">{order.address}, {order.city}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Quantité</span>
                    <span className="font-semibold text-ayoya-brown">{order.quantity} bouteille(s)</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Livraison</span>
                    <span className="font-semibold text-ayoya-brown">
                      {order.deliveryMethod === 'delivery' ? 'Livraison à domicile' : 'Retrait en point de vente'}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Paiement</span>
                    <span className="font-semibold text-ayoya-brown">
                      {order.paymentMethod === 'cash' ? 'À la livraison' : 'Mobile Money'}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4">
                    <span className="text-xl font-bold text-ayoya-brown">Total</span>
                    <span className="text-2xl font-bold text-ayoya-gold">{order.totalAmount} FCFA</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Retour à l'accueil
              </Link>
              <Link to="/product" className="btn-secondary">
                Voir le produit
              </Link>
            </div>
          </div>

          <div className="glass rounded-xl p-6 mt-8 text-center">
            <p className="text-ayoya-brown/70">
              Vous avez des questions? Contactez-nous au +225 XX XX XX XX
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
