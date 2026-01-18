import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminLegalAPI } from '../../services/api'

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<'cgu' | 'cgv'>('cgu')
  const [cgu, setCGU] = useState('')
  const [cgv, setCGV] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchLegalContent = async () => {
      setLoading(true)
      try {
        const [cguRes, cgvRes] = await Promise.all([
          adminLegalAPI.getCGU(),
          adminLegalAPI.getCGV(),
        ])
        setCGU(cguRes.data.content)
        setCGV(cgvRes.data.content)
      } catch (error) {
        console.error('Error fetching legal content:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLegalContent()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (activeTab === 'cgu') {
        await adminLegalAPI.updateCGU(cgu)
      } else {
        await adminLegalAPI.updateCGV(cgv)
      }
      alert('Modifications sauvegardées')
    } catch (error) {
      console.error('Error saving legal content:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#3D2914] mb-8">Documents légaux</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#C9A227]/30">
          {['cgu', 'cgv'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-[#C9A227] border-b-2 border-[#C9A227]'
                  : 'text-[#3D2914]/60 hover:text-[#3D2914]'
              }`}
            >
              {tab === 'cgu' && 'CGU'}
              {tab === 'cgv' && 'CGV'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-[#3D2914]">Chargement...</div>
        ) : (
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 border border-white/20 shadow-lg">
            {activeTab === 'cgu' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Conditions Générales d'Utilisation</label>
                  <textarea
                    value={cgu}
                    onChange={(e) => setCGU(e.target.value)}
                    className="w-full h-96 px-4 py-3 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white resize-none"
                    placeholder="Entrez le texte des CGU..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'cgv' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Conditions Générales de Vente</label>
                  <textarea
                    value={cgv}
                    onChange={(e) => setCGV(e.target.value)}
                    className="w-full h-96 px-4 py-3 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227] focus:bg-white resize-none"
                    placeholder="Entrez le texte des CGV..."
                  />
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#C9A227]/30">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full px-6 py-3 bg-[#C9A227] text-[#3D2914] font-semibold rounded-lg hover:bg-[#B89118] transition-colors disabled:opacity-50"
              >
                {saving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
