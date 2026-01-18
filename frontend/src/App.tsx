import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import ThankYou from './pages/ThankYou'
import Confirmation from './pages/Confirmation'
import CGU from './pages/CGU'
import CGV from './pages/CGV'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import SettingsPage from './pages/admin/SettingsPage'
import MediaPage from './pages/admin/MediaPage'
import LegalPage from './pages/admin/LegalPage'
import LogisticsLogin from './pages/logistics/LogisticsLogin'
import LogisticsDashboard from './pages/logistics/LogisticsDashboard'
import OrdersPage from './pages/logistics/OrdersPage'
import OrderDetail from './pages/logistics/OrderDetail'
import DeliveriesPage from './pages/logistics/DeliveriesPage'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin/') && location.pathname !== '/admin/login'
  const isLogisticsRoute = location.pathname.startsWith('/logistics/') && location.pathname !== '/logistics'
  const hideNavbarFooter = isAdminRoute || isLogisticsRoute

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && <Navbar />}
      <main className={hideNavbarFooter ? '' : 'flex-grow'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/merci" element={<ThankYou />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/media" element={<MediaPage />} />
          <Route path="/admin/legal" element={<LegalPage />} />
          <Route path="/logistics" element={<LogisticsLogin />} />
          <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
          <Route path="/logistics/orders" element={<OrdersPage />} />
          <Route path="/logistics/orders/:id" element={<OrderDetail />} />
          <Route path="/logistics/deliveries" element={<DeliveriesPage />} />
        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
