interface OrderStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'assigned' | 'in_delivery' | 'delivered' | 'cancelled'
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-600', label: 'En attente' },
    confirmed: { bg: 'bg-blue-500/20', text: 'text-blue-600', label: 'Confirmée' },
    assigned: { bg: 'bg-purple-500/20', text: 'text-purple-600', label: 'Assignée' },
    in_delivery: { bg: 'bg-orange-500/20', text: 'text-orange-600', label: 'En livraison' },
    delivered: { bg: 'bg-green-500/20', text: 'text-green-600', label: 'Livrée' },
    cancelled: { bg: 'bg-red-500/20', text: 'text-red-600', label: 'Annulée' },
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}
