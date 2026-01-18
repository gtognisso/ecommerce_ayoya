import { Link } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import SocialIcons from './SocialIcons'

export default function Footer() {
  const { config } = useConfig()
  const contact = config?.contact

  return (
    <footer className="glass-dark mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-ayoya-gold mb-4">AYOYA</h3>
            <p className="text-ayoya-brown/80 text-sm">
              Liqueur de racine premium, symbole de noblesse africaine
            </p>
            <div className="mt-4">
              <SocialIcons className="flex gap-4" iconSize="w-5 h-5" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-ayoya-brown mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ayoya-brown/70 hover:text-ayoya-gold text-sm transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-ayoya-brown/70 hover:text-ayoya-gold text-sm transition-colors">
                  Produit
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-ayoya-brown/70 hover:text-ayoya-gold text-sm transition-colors">
                  Commander
                </Link>
              </li>
              <li>
                <Link to="/cgu" className="text-ayoya-brown/70 hover:text-ayoya-gold text-sm transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-ayoya-brown/70 hover:text-ayoya-gold text-sm transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ayoya-brown mb-4">Contact</h4>
            {contact?.email && (
              <p className="text-ayoya-brown/70 text-sm mb-2">
                Email: <a href={`mailto:${contact.email}`} className="hover:text-ayoya-gold">{contact.email}</a>
              </p>
            )}
            {contact?.phone && (
              <p className="text-ayoya-brown/70 text-sm">
                Tél: <a href={`tel:${contact.phone}`} className="hover:text-ayoya-gold">{contact.phone}</a>
              </p>
            )}
            {!contact?.email && !contact?.phone && (
              <>
                <p className="text-ayoya-brown/70 text-sm mb-2">
                  Email: contact@ayoya.com
                </p>
                <p className="text-ayoya-brown/70 text-sm">
                  Tél: +225 XX XX XX XX
                </p>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-ayoya-gold/20 mt-8 pt-8 text-center">
          <p className="text-ayoya-brown/60 text-sm">
            © 2024 AYOYA. Tous droits réservés. | L'abus d'alcool est dangereux pour la santé
          </p>
          <Link to="/admin/login" className="text-ayoya-brown/40 hover:text-ayoya-gold text-xs mt-2 inline-block">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
