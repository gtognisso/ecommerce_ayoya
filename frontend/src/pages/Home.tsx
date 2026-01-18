import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import VideoSection from '../components/VideoSection'
import api from '../services/api'

interface Visual {
  id: string
  url: string
  alt?: string
}

export default function Home() {
  const [visuals, setVisuals] = useState<Visual[]>([])
  const [_loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/public/visuals')
      .then(res => {
        setVisuals(res.data || [])
      })
      .catch(err => {
        console.error('Error fetching visuals:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-24">
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-ayoya-gold/10 via-transparent to-ayoya-dark-gold/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <div className="glass rounded-2xl p-6 md:p-8">
                <h1 className="text-4xl md:text-6xl font-bold text-ayoya-gold mb-4">
                  AYOYA
                </h1>
                <p className="text-2xl md:text-3xl text-ayoya-brown mb-6">
                  Noblesse Africaine
                </p>
                <p className="text-lg md:text-xl text-ayoya-brown/80 leading-relaxed mb-8">
                  Découvrez l'excellence d'un spiritueux raffiné, élaboré à partir de la racine d'AYOYA et d'ingrédients naturels sélectionnés avec soin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/product" className="btn-primary text-center">
                    Découvrir
                  </Link>
                  <Link to="/cart" className="btn-secondary text-center">
                    Commander
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-ayoya-gold/30 to-ayoya-dark-gold/30 rounded-3xl blur-3xl"></div>
                <div className="relative glass rounded-3xl p-8 md:p-12">
                  <div className="w-40 md:w-48 h-72 md:h-96 bg-gradient-to-b from-ayoya-dark-gold to-ayoya-gold rounded-t-full mx-auto shadow-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {visuals.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-ayoya-gold/5 to-transparent">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-ayoya-brown mb-10 md:mb-12">
              Galerie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visuals.map(visual => (
                <div key={visual.id} className="rounded-xl overflow-hidden glass hover:shadow-xl transition-all">
                  <img
                    src={visual.url}
                    alt={visual.alt || 'AYOYA'}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ayoya-brown mb-10 md:mb-12">
            L'Art de la Tradition
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass rounded-xl p-6 md:p-8 text-center hover:bg-white/30 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-ayoya-gold to-ayoya-dark-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">100% Naturel</h3>
              <p className="text-ayoya-brown/70 text-sm md:text-base">
                Ingrédients naturels soigneusement sélectionnés
              </p>
            </div>

            <div className="glass rounded-xl p-6 md:p-8 text-center hover:bg-white/30 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-ayoya-gold to-ayoya-dark-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">Savoir-Faire</h3>
              <p className="text-ayoya-brown/70 text-sm md:text-base">
                Fabrication artisanale selon des méthodes ancestrales
              </p>
            </div>

            <div className="glass rounded-xl p-6 md:p-8 text-center hover:bg-white/30 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-ayoya-gold to-ayoya-dark-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-ayoya-brown mb-4">Qualité Premium</h3>
              <p className="text-ayoya-brown/70 text-sm md:text-base">
                Excellence et raffinement à chaque gorgée
              </p>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />

      <section className="py-16 md:py-20 bg-gradient-to-br from-ayoya-gold/5 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ayoya-brown mb-10 md:mb-12">
            Notre Produit
          </h2>

          <div className="max-w-md mx-auto">
            <ProductCard />
          </div>
        </div>
      </section>
    </div>
  )
}
