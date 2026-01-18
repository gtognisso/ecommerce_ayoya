import { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialIcons from './SocialIcons'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glass shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ayoya-gold to-ayoya-dark-gold flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ayoya-gold">AYOYA</h1>
              <p className="text-xs text-ayoya-brown/70">Noblesse Africaine</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-ayoya-brown hover:text-ayoya-gold transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/product" className="text-ayoya-brown hover:text-ayoya-gold transition-colors font-medium">
              Produit
            </Link>
            <Link to="/cart" className="btn-primary">
              Commander
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ayoya-brown"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-ayoya-gold/20 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-3">
              <Link
                to="/"
                className="block text-ayoya-brown hover:text-ayoya-gold transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/product"
                className="block text-ayoya-brown hover:text-ayoya-gold transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                Produit
              </Link>
              <Link
                to="/cart"
                className="btn-primary block text-center py-2"
                onClick={() => setMenuOpen(false)}
              >
                Commander
              </Link>
              <Link
                to="/cgu"
                className="block text-ayoya-brown/70 hover:text-ayoya-gold transition-colors text-sm py-2"
                onClick={() => setMenuOpen(false)}
              >
                Conditions Générales
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-ayoya-gold/20">
              <SocialIcons className="flex gap-4" iconSize="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
