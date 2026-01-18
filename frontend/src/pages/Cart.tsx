import { Link } from 'react-router-dom'
import OrderForm from '../components/OrderForm'

export default function Cart() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-ayoya-gold mb-3 md:mb-4">Commander AYOYA</h1>
            <p className="text-base md:text-xl text-ayoya-brown/70">
              Complétez le formulaire pour passer votre commande
            </p>
          </div>

          <OrderForm />

          <div className="glass rounded-xl p-6 md:p-8 mt-8 text-center">
            <p className="text-xs md:text-sm text-ayoya-brown/70 leading-relaxed">
              En passant commande, vous acceptez nos
              {' '}
              <Link to="/cgv" className="text-ayoya-gold hover:underline font-semibold">
                conditions générales de vente
              </Link>
              .
              <br />
              L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
