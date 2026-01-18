import { Link } from 'react-router-dom'

export default function ProductCard() {
  return (
    <div className="glass rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 group">
      <div className="aspect-[3/4] bg-gradient-to-br from-ayoya-gold/20 to-ayoya-dark-gold/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
        <div className="w-32 h-64 bg-ayoya-dark-gold/30 rounded-t-full group-hover:scale-110 transition-transform duration-500"></div>
      </div>

      <h3 className="text-2xl font-bold text-ayoya-brown mb-2">AYOYA</h3>
      <p className="text-ayoya-gold font-semibold mb-3">Liqueur de Racine</p>

      <div className="space-y-2 mb-6">
        <p className="text-sm text-ayoya-brown/70">Volume: 75cl</p>
        <p className="text-sm text-ayoya-brown/70">Alcool: 40% Vol</p>
        <p className="text-2xl font-bold text-ayoya-gold">5000 FCFA</p>
      </div>

      <Link to="/product" className="btn-primary w-full block text-center">
        Voir Détails
      </Link>
    </div>
  )
}
