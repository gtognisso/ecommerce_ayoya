import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminConfigAPI } from '../../services/api'

interface PriceSettings {
  bottle: number
  delivery: number
  carton: number
  cartonSize: number
}

interface ContactSettings {
  phone: string
  email: string
  address: string
}

interface SocialSettings {
  facebook: string
  instagram: string
  tiktok: string
}

interface NotificationEmail {
  id: string
  email: string
}

interface SMTPSettings {
  host: string
  port: number
  user: string
  password: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'prices' | 'contact' | 'social' | 'emails' | 'smtp'>('prices')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [prices, setPrices] = useState<PriceSettings>({
    bottle: 0,
    delivery: 0,
    carton: 0,
    cartonSize: 0,
  })

  const [contact, setContact] = useState<ContactSettings>({
    phone: '',
    email: '',
    address: '',
  })

  const [social, setSocial] = useState<SocialSettings>({
    facebook: '',
    instagram: '',
    tiktok: '',
  })

  const [emails, setEmails] = useState<NotificationEmail[]>([])
  const [newEmail, setNewEmail] = useState('')

  const [smtp, setSMTP] = useState<SMTPSettings>({
    host: '',
    port: 587,
    user: '',
    password: '',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const [pricesRes, contactRes, socialRes, emailsRes, smtpRes] = await Promise.all([
          adminConfigAPI.getPrices(),
          adminConfigAPI.getContact(),
          adminConfigAPI.getSocial(),
          adminConfigAPI.getEmails(),
          adminConfigAPI.getSMTP(),
        ])
        setPrices(pricesRes.data)
        setContact(contactRes.data)
        setSocial(socialRes.data)
        setEmails(emailsRes.data)
        setSMTP(smtpRes.data)
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (activeTab === 'prices') {
        await adminConfigAPI.updatePrices(prices)
      } else if (activeTab === 'contact') {
        await adminConfigAPI.updateContact(contact)
      } else if (activeTab === 'social') {
        await adminConfigAPI.updateSocial(social)
      } else if (activeTab === 'smtp') {
        await adminConfigAPI.updateSMTP(smtp)
      }
      alert('Modifications sauvegardées')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleAddEmail = async () => {
    if (!newEmail) return
    try {
      const response = await adminConfigAPI.addEmail(newEmail)
      setEmails([...emails, response.data])
      setNewEmail('')
    } catch (error) {
      console.error('Error adding email:', error)
      alert('Erreur lors de l\'ajout')
    }
  }

  const handleDeleteEmail = async (id: string) => {
    try {
      await adminConfigAPI.deleteEmail(id)
      setEmails(emails.filter(e => e.id !== id))
    } catch (error) {
      console.error('Error deleting email:', error)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#3D2914] mb-8">Paramètres</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#C9A227]/30">
          {['prices', 'contact', 'social', 'emails', 'smtp'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-[#C9A227] border-b-2 border-[#C9A227]'
                  : 'text-[#3D2914]/60 hover:text-[#3D2914]'
              }`}
            >
              {tab === 'prices' && 'Prix'}
              {tab === 'contact' && 'Contact'}
              {tab === 'social' && 'Réseaux sociaux'}
              {tab === 'emails' && 'Emails notification'}
              {tab === 'smtp' && 'SMTP'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-[#3D2914]">Chargement...</div>
        ) : (
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 border border-white/20 shadow-lg">
            {/* Prices Tab */}
            {activeTab === 'prices' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Prix bouteille (FCFA)</label>
                  <input
                    type="number"
                    value={prices.bottle}
                    onChange={(e) => setPrices({ ...prices, bottle: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Prix livraison (FCFA)</label>
                  <input
                    type="number"
                    value={prices.delivery}
                    onChange={(e) => setPrices({ ...prices, delivery: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Prix carton (FCFA)</label>
                  <input
                    type="number"
                    value={prices.carton}
                    onChange={(e) => setPrices({ ...prices, carton: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Taille carton</label>
                  <input
                    type="number"
                    value={prices.cartonSize}
                    onChange={(e) => setPrices({ ...prices, cartonSize: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                    step="1"
                  />
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Email</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Adresse</label>
                  <input
                    type="text"
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Social Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={social.facebook}
                    onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={social.instagram}
                    onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">TikTok URL</label>
                  <input
                    type="url"
                    value={social.tiktok}
                    onChange={(e) => setSocial({ ...social, tiktok: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Emails Tab */}
            {activeTab === 'emails' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Ajouter un email de notification</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="flex-1 px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                    />
                    <button
                      onClick={handleAddEmail}
                      className="px-6 py-2 bg-[#C9A227] text-[#3D2914] font-semibold rounded-lg hover:bg-[#B89118] transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#3D2914] mb-4">Emails de notification</h3>
                  <div className="space-y-2">
                    {emails.map((email) => (
                      <div key={email.id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                        <span className="text-[#3D2914]">{email.email}</span>
                        <button
                          onClick={() => handleDeleteEmail(email.id)}
                          className="px-3 py-1 text-sm bg-red-500/30 text-red-700 rounded hover:bg-red-500/50 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                    {emails.length === 0 && (
                      <p className="text-[#3D2914]/60">Aucun email configuré</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SMTP Tab */}
            {activeTab === 'smtp' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Serveur SMTP (host)</label>
                  <input
                    type="text"
                    value={smtp.host}
                    onChange={(e) => setSMTP({ ...smtp, host: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                    placeholder="smtp.example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Port</label>
                  <input
                    type="number"
                    value={smtp.port}
                    onChange={(e) => setSMTP({ ...smtp, port: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Utilisateur</label>
                  <input
                    type="text"
                    value={smtp.user}
                    onChange={(e) => setSMTP({ ...smtp, user: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Mot de passe</label>
                  <input
                    type="password"
                    value={smtp.password}
                    onChange={(e) => setSMTP({ ...smtp, password: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Save Button */}
            {activeTab !== 'emails' && (
              <div className="mt-8 pt-6 border-t border-[#C9A227]/30">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full px-6 py-3 bg-[#C9A227] text-[#3D2914] font-semibold rounded-lg hover:bg-[#B89118] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Sauvegarde en cours...' : 'Appliquer les modifications'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
