import { Order } from '../../services/api'

interface OrderActionsProps {
  order: Order
  onStatusChange: (status: string) => void
  onAssign: () => void
}

export default function OrderActions({ order, onStatusChange, onAssign }: OrderActionsProps) {
  const getAvailableActions = () => {
    const actions = []

    switch (order.status) {
      case 'pending':
        actions.push({ label: 'Confirmer', status: 'confirmed' })
        break
      case 'confirmed':
        actions.push({ label: 'Assigner', action: 'assign' })
        break
      case 'assigned':
        actions.push({ label: 'En livraison', status: 'in_delivery' })
        break
      case 'in_delivery':
        actions.push({ label: 'Livrée', status: 'delivered' })
        break
    }

    actions.push({ label: 'Annuler', status: 'cancelled' })

    return actions
  }

  const actions = getAvailableActions()

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => {
            if (action.action === 'assign') {
              onAssign()
            } else if (action.status) {
              onStatusChange(action.status)
            }
          }}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
            action.status === 'cancelled'
              ? 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
              : 'bg-ayoya-gold/20 text-ayoya-gold hover:bg-ayoya-gold/30'
          }`}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
