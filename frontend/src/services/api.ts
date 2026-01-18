import axios from 'axios'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken')
  const logisticsToken = localStorage.getItem('logisticsToken')
  const token = adminToken || logisticsToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface OrderData {
  customerName: string
  phone: string
  address: string
  city: string
  quantity: number
  paymentMethod: 'cash' | 'mobile'
  deliveryMethod: 'delivery' | 'pickup'
}

export interface SMTPConfig {
  host: string
  port: number
  user: string
  password: string
}

export interface EmailConfig {
  host: string
  port: number
  user: string
  password: string
  from_email: string
}

export const orderAPI = {
  create: (data: OrderData) => api.post('/orders', data),
  list: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
}

export const adminAPI = {
  login: (username: string, password: string) =>
    api.post('/admin/login', { username, password }),

  getConfig: () => api.get('/admin/config'),
  getSMTPConfig: () => api.get('/admin/config'),

  updateConfig: (config: EmailConfig) =>
    api.put('/admin/config', config),
  updateSMTPConfig: (config: SMTPConfig) =>
    api.put('/admin/config', config),
}

export const adminConfigAPI = {
  getStats: () => api.get('/admin/stats'),

  getPrices: () => api.get('/admin/prices'),
  updatePrices: (prices: any) => api.put('/admin/prices', prices),

  getContact: () => api.get('/admin/contact'),
  updateContact: (contact: any) => api.put('/admin/contact', contact),

  getSocial: () => api.get('/admin/social'),
  updateSocial: (social: any) => api.put('/admin/social', social),

  getEmails: () => api.get('/admin/emails'),
  addEmail: (email: string) => api.post('/admin/emails', { email }),
  deleteEmail: (id: string) => api.delete(`/admin/emails/${id}`),

  getSMTP: () => api.get('/admin/smtp'),
  updateSMTP: (smtp: any) => api.put('/admin/smtp', smtp),
}

export const adminMediaAPI = {
  uploadVisual: (formData: FormData) =>
    api.post('/admin/media/visuals', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getVisuals: () => api.get('/admin/media/visuals'),
  deleteVisual: (id: string) => api.delete(`/admin/media/visuals/${id}`),

  uploadVideo: (formData: FormData) =>
    api.post('/admin/media/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getVideos: () => api.get('/admin/media/videos'),
  deleteVideo: (id: string) => api.delete(`/admin/media/videos/${id}`),

  uploadFavicon: (formData: FormData) =>
    api.post('/admin/media/favicon', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export const adminLegalAPI = {
  getCGU: () => api.get('/admin/legal/cgu'),
  updateCGU: (content: string) => api.put('/admin/legal/cgu', { content }),

  getCGV: () => api.get('/admin/legal/cgv'),
  updateCGV: (content: string) => api.put('/admin/legal/cgv', { content }),
}

export interface Order {
  id: string
  customerName: string
  phone: string
  address: string
  city: string
  quantity: number
  total: number
  status: 'pending' | 'confirmed' | 'assigned' | 'in_delivery' | 'delivered' | 'cancelled'
  deliveryMethod: 'delivery' | 'pickup'
  paymentMethod: 'cash' | 'mobile'
  createdAt: string
  updatedAt: string
  assignedDeliveryId?: string
}

export interface Delivery {
  id: string
  name: string
  phone: string
  active: boolean
  ordersCount?: number
  createdAt: string
  updatedAt: string
}

export const logisticsAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),

  getOrders: (filters?: { status?: string; startDate?: string; endDate?: string; city?: string }) =>
    api.get('/logistics/orders', { params: filters }),

  getOrder: (id: string) => api.get(`/logistics/orders/${id}`),

  updateOrderStatus: (id: string, status: string) =>
    api.patch(`/logistics/orders/${id}/status`, { status }),

  assignDelivery: (orderId: string, deliveryId: string) =>
    api.post(`/logistics/orders/${orderId}/assign`, { deliveryId }),

  getDeliveries: () => api.get('/logistics/deliveries'),

  createDelivery: (data: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt' | 'ordersCount'>) =>
    api.post('/logistics/deliveries', data),

  updateDelivery: (id: string, data: Partial<Delivery>) =>
    api.put(`/logistics/deliveries/${id}`, data),

  deleteDelivery: (id: string) => api.delete(`/logistics/deliveries/${id}`),

  getDashboardStats: () => api.get('/logistics/stats'),
}

export default api
