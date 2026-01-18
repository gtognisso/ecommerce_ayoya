import { useState, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface LogisticsLayoutProps {
  children: ReactNode
}

export default function LogisticsLayout({ children }: LogisticsLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const username = localStorage.getItem('logisticsUser')

  const handleLogout = () => {
    localStorage.removeItem('logisticsToken')
    localStorage.removeItem('logisticsUser')
    navigate('/logistics')
  }

  const isActive = (path: string) => location.pathname.startsWith(path)

  const navItems = [
    { label: 'Tableau de bord', path: '/logistics/dashboard', icon: 'dashboard' },
    { label: 'Commandes', path: '/logistics/orders', icon: 'orders' },
    { label: 'Livreurs', path: '/logistics/deliveries', icon: 'delivery' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-ayoya-cream via-white to-ayoya-cream/50">
      <div className="flex">
        <aside
          className={`fixed lg:relative top-0 left-0 h-screen bg-gradient-to-b from-ayoya-brown/95 to-ayoya-dark-brown/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-40 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
            {sidebarOpen && <div className="text-2xl font-bold text-ayoya-gold">AYOYA</div>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10 p-1 rounded transition lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <nav className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-ayoya-gold/20 text-ayoya-gold border border-ayoya-gold'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon === 'dashboard' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                  {item.icon === 'orders' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                  {item.icon === 'delivery' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                </svg>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="h-20 bg-white/50 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block text-ayoya-brown hover:bg-ayoya-gold/10 p-2 rounded transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-sm text-ayoya-brown/70">Connecté en tant que</h2>
                <p className="font-semibold text-ayoya-brown">{username}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ayoya-gold text-ayoya-gold hover:bg-ayoya-gold/10 transition text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </header>

          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
