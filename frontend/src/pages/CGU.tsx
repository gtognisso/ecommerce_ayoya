import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function CGU() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [_error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/public/cgu')
      .then(res => {
        setContent(res.data?.content || '')
      })
      .catch(err => {
        setError('Impossible de charger les conditions générales')
        console.error('Error fetching CGU:', err)
        setContent(defaultCGU)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-ayoya-gold mb-8">
            Conditions Générales d'Utilisation
          </h1>

          {loading ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-ayoya-gold border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <div className="glass rounded-xl p-8 prose prose-invert max-w-none">
              <div className="text-ayoya-brown/80 whitespace-pre-wrap text-base leading-relaxed">
                {content || defaultCGU}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/" className="btn-primary inline-block">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const defaultCGU = `Conditions Générales d'Utilisation - AYOYA

1. OBJET
Les présentes conditions générales régissent l'utilisation du site web AYOYA et les conditions de vente de nos produits.

2. PRODUITS
AYOYA commercialise une liqueur de racine premium. Tous nos produits sont destinés à la consommation des adultes.

3. COMMANDES
- Les clients doivent fournir des informations exactes lors de la commande
- Les commandes sont acceptées dans la limite des stocks disponibles
- Les prix sont affichés TTC

4. LIVRAISON
- Les délais de livraison sont donnés à titre informatif
- AYOYA s'efforce de respecter les délais convenus
- Les frais de livraison sont à la charge du client sauf indication contraire

5. RESPONSABILITÉ
AYOYA ne saurait être responsable des dommages résultant de l'utilisation de ses produits. L'abus d'alcool est dangereux pour la santé.

6. DONNÉES PERSONNELLES
Les données collectées lors de vos commandes sont utilisées uniquement pour traiter votre commande et vous contacter si nécessaire.

7. MODIFICATIONS
AYOYA se réserve le droit de modifier ces conditions à tout moment. Les modifications s'appliquent dès leur publication.

8. JURIDICTION
Les présentes conditions sont régies par la loi béninoise.`
