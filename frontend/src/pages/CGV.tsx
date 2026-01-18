import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function CGV() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [_error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/public/cgv')
      .then(res => {
        setContent(res.data?.content || '')
      })
      .catch(err => {
        setError('Impossible de charger les conditions de vente')
        console.error('Error fetching CGV:', err)
        setContent(defaultCGV)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-ayoya-gold mb-8">
            Conditions Générales de Vente
          </h1>

          {loading ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-ayoya-gold border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <div className="glass rounded-xl p-8 prose prose-invert max-w-none">
              <div className="text-ayoya-brown/80 whitespace-pre-wrap text-base leading-relaxed">
                {content || defaultCGV}
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

const defaultCGV = `Conditions Générales de Vente - AYOYA

1. OFFRE ET ACCEPTATION
L'affichage des produits sur le site AYOYA constitue une offre de vente. La commande constitue l'acceptation de cette offre.

2. PRIX
- Les prix affichés incluent toutes les taxes applicables
- Les prix sont soumis à modifications sans préavis
- Aucune remise ne s'applique sauf mention contraire

3. PAIEMENT
- Le paiement peut s'effectuer à la livraison (cash) ou par Mobile Money
- Tout paiement doit être effectué avant l'expédition sauf accord contraire
- Les chèques et virements ne sont pas acceptés

4. LIVRAISON
- Zone de livraison: Cotonou, Abomey-Calavi, Porto-Novo et autres villes
- Frais de livraison: 1000 FCFA pour la livraison à domicile
- Retrait gratuit sur point de vente
- Délai de livraison estimé: 24-48h après confirmation

5. RETOURS ET ÉCHANGES
- Les produits doivent être retournés dans leur emballage d'origine
- Les réclamations doivent être signalées dans les 48h après livraison
- Seuls les produits défectueux seront échangés

6. ANNULATION DE COMMANDE
- Les commandes peuvent être annulées dans les 2 heures suivant la confirmation
- Après ce délai, une pénalité de 10% pourra s'appliquer

7. GARANTIE
AYOYA garantit que les produits livrés sont conformes à la commande et exempt de défaut.

8. RESPONSABILITÉ
AYOYA ne saurait être responsable de la consommation excessive d'alcool ou de ses conséquences.
L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

9. FORCE MAJEURE
AYOYA n'est pas responsable des retards ou défaillances dus à des événements hors de son contrôle.

10. RÉSOLUTION DES LITIGES
En cas de litige, les parties s'engagent à chercher une solution amiable avant toute action en justice.`
