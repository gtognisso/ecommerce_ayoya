import { ReactNode, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Tableau de bord', href: '/admin/dashboard', icon: '📊' },
    { label: 'Paramètres', href: '/admin/settings', icon: '⚙️' },
    { label: 'Médias', href: '/admin/media', icon: '🖼️' },
    { label: 'Documents légaux', href: '/admin/legal', icon: '📋' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-[#FDF8F0]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 backdrop-blur-md bg-white/30 border-r border-[#C9A227]/30 shadow-lg flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#C9A227]/30">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-2xl font-bold text-[#3D2914]">AYOYA</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.href
                  ? 'bg-[#C9A227] text-[#3D2914] shadow-lg'
                  : 'text-[#3D2914] hover:bg-white/20'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-semibold">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#C9A227]/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-[#3D2914] hover:bg-red-500/20 transition-all"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="font-semibold">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE6]">
        {children}
      </main>
    </div>
  )
}
