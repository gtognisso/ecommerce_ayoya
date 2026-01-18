import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { orderAPI } from '../services/api'

export default function ThankYou() {
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
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="animate-spin w-16 h-16 border-4 border-ayoya-gold border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-6 md:p-12 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-ayoya-gold mb-3 md:mb-4">
              Merci pour votre commande!
            </h1>

            {order?.orderNumber && (
              <p className="text-sm md:text-base text-ayoya-brown/70 mb-2">
                Numéro de commande: <span className="font-semibold text-ayoya-brown">{order.orderNumber}</span>
              </p>
            )}

            <p className="text-base md:text-lg text-ayoya-brown/70 mb-8 md:mb-10 leading-relaxed">
              Nous vous remercions de votre confiance. Votre commande a été enregistrée avec succès et nous vous contacterons sous peu pour confirmer tous les détails et finaliser la livraison.
            </p>

            {order && (
              <div className="glass-dark rounded-xl p-6 md:p-8 text-left mb-8 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-ayoya-brown mb-6">Récapitulatif de votre commande</h2>

                <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Nom</span>
                    <span className="font-semibold text-ayoya-brown">{order.customerName}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Téléphone</span>
                    <span className="font-semibold text-ayoya-brown">{order.phone}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Lieu de livraison</span>
                    <span className="font-semibold text-ayoya-brown">{order.address}, {order.city}</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Quantité</span>
                    <span className="font-semibold text-ayoya-brown">{order.quantity} bouteille(s)</span>
                  </div>

                  <div className="flex justify-between border-b border-ayoya-gold/20 pb-2">
                    <span className="text-ayoya-brown/70">Mode de livraison</span>
                    <span className="font-semibold text-ayoya-brown">
                      {order.deliveryMethod === 'delivery' ? 'Livraison à domicile' : 'Retrait en point de vente'}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 md:pt-4">
                    <span className="text-lg md:text-xl font-bold text-ayoya-brown">Montant total</span>
                    <span className="text-xl md:text-2xl font-bold text-ayoya-gold">
                      {order.totalAmount?.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 md:p-6 mb-8 md:mb-10">
              <p className="text-sm md:text-base text-blue-900 dark:text-blue-200">
                Un agent AYOYA vous contactera sous peu au numéro fourni pour confirmer tous les détails de votre commande.
              </p>
            </div>

            <Link to="/" className="btn-primary inline-block px-6 md:px-8 py-2 md:py-3">
              Retour à l'accueil
            </Link>
          </div>

          <div className="glass rounded-xl p-6 md:p-8 mt-8 md:mt-10 text-center">
            <p className="text-sm md:text-base text-ayoya-brown/70 mb-3">
              Vous avez des questions?
            </p>
            <p className="text-sm md:text-base text-ayoya-brown">
              Notre équipe est à votre écoute pour tout complément d'information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
