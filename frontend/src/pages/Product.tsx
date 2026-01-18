import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="glass rounded-2xl p-12 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-ayoya-gold/30 to-ayoya-dark-gold/30 rounded-3xl blur-2xl"></div>
                <div className="relative w-64 h-96 bg-gradient-to-b from-ayoya-dark-gold to-ayoya-gold rounded-t-full shadow-2xl"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                <div className="w-16 h-24 bg-gradient-to-b from-ayoya-dark-gold/50 to-ayoya-gold/50 rounded-t-full"></div>
              </div>
              <div className="glass rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                <div className="w-16 h-24 bg-gradient-to-b from-ayoya-dark-gold/50 to-ayoya-gold/50 rounded-t-full"></div>
              </div>
              <div className="glass rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                <div className="w-16 h-24 bg-gradient-to-b from-ayoya-dark-gold/50 to-ayoya-gold/50 rounded-t-full"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <h1 className="text-5xl font-bold text-ayoya-gold mb-4">AYOYA</h1>
              <p className="text-2xl text-ayoya-brown mb-2">Liqueur de Racine</p>
              <p className="text-lg text-ayoya-brown/70 italic mb-6">Noblesse Africaine</p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-ayoya-gold">5000 FCFA</span>
                <span className="text-ayoya-brown/70">75cl • 40% Vol</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-ayoya-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-ayoya-brown/80">
                    Spiritueux premium élaboré à partir de la racine d'AYOYA
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-ayoya-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-ayoya-brown/80">
                    Ingrédients 100% naturels: Alcool de palme et racine d'AYOYA
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-ayoya-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-ayoya-brown/80">
                    Parfait en apéritif ou digestif
                  </p>
                </div>
              </div>

              <Link to="/cart" className="btn-primary w-full block text-center text-lg">
                Commander Maintenant
              </Link>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-ayoya-brown mb-6">Description</h3>
              <p className="text-ayoya-brown/80 leading-relaxed mb-4">
                AYOYA est un spiritueux d'exception qui célèbre la richesse du patrimoine africain.
                Élaborée selon des méthodes artisanales traditionnelles, cette liqueur de racine
                incarne l'excellence et le raffinement.
              </p>
              <p className="text-ayoya-brown/80 leading-relaxed">
                Chaque bouteille est le fruit d'un savoir-faire ancestral transmis de génération
                en génération, offrant une expérience gustative unique qui évoque la noblesse
                et l'authenticité de l'Afrique.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-ayoya-brown mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-ayoya-brown/70 mb-1">Volume</p>
                  <p className="font-semibold text-ayoya-brown">75cl</p>
                </div>
                <div>
                  <p className="text-sm text-ayoya-brown/70 mb-1">Alcool</p>
                  <p className="font-semibold text-ayoya-brown">40% Vol</p>
                </div>
                <div>
                  <p className="text-sm text-ayoya-brown/70 mb-1">Type</p>
                  <p className="font-semibold text-ayoya-brown">Liqueur</p>
                </div>
                <div>
                  <p className="text-sm text-ayoya-brown/70 mb-1">Origine</p>
                  <p className="font-semibold text-ayoya-brown">Afrique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
