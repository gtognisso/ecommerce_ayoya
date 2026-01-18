import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminMediaAPI } from '../../services/api'

type MediaType = 'hero_background' | 'hero_bottle' | 'product_main' | 'product_gallery_1' | 'product_gallery_2' | 'product_gallery_3' | 'product_gallery_4' | 'about_image' | 'footer_logo'

interface MediaItem {
  id: string
  type: MediaType
  url: string
  description: string
  createdAt: string
}

interface VideoItem {
  id: string
  title: string
  url: string
  createdAt: string
}

const MEDIA_TYPES: { id: MediaType; name: string; dimensions: string }[] = [
  { id: 'hero_background', name: 'Image fond héro', dimensions: '1920x1080' },
  { id: 'hero_bottle', name: 'Bouteille héro', dimensions: '800x1200' },
  { id: 'product_main', name: 'Produit principal', dimensions: '1000x1000' },
  { id: 'product_gallery_1', name: 'Galerie 1', dimensions: 'flexible' },
  { id: 'product_gallery_2', name: 'Galerie 2', dimensions: 'flexible' },
  { id: 'product_gallery_3', name: 'Galerie 3', dimensions: 'flexible' },
  { id: 'product_gallery_4', name: 'Galerie 4', dimensions: 'flexible' },
  { id: 'about_image', name: 'Section À propos', dimensions: 'flexible' },
  { id: 'footer_logo', name: 'Logo footer', dimensions: '200x80' },
]

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'visuals' | 'videos' | 'favicon'>('visuals')
  const [medias, setMedias] = useState<MediaItem[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedType, setSelectedType] = useState<MediaType>('hero_background')
  const [description, setDescription] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [videoTitle, setVideoTitle] = useState('')
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchMedias()
    fetchVideos()
  }, [])

  const fetchMedias = async () => {
    try {
      const response = await adminMediaAPI.getVisuals()
      setMedias(response.data)
    } catch (error) {
      console.error('Error fetching medias:', error)
    }
  }

  const fetchVideos = async () => {
    try {
      const response = await adminMediaAPI.getVideos()
      setVideos(response.data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadVisual = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!preview) {
      alert('Veuillez sélectionner une image')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('type', selectedType)
      formData.append('description', description)
      formData.append('file', dataURLtoFile(preview, `${selectedType}.png`))

      await adminMediaAPI.uploadVisual(formData)
      await fetchMedias()
      setPreview(null)
      setDescription('')
      alert('Image uploadée avec succès')
    } catch (error) {
      console.error('Error uploading visual:', error)
      alert('Erreur lors de l\'upload')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement
    const file = videoInput?.files?.[0]

    if (!file || !videoTitle) {
      alert('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', videoTitle)
      formData.append('file', file)

      await adminMediaAPI.uploadVideo(formData)
      await fetchVideos()
      setVideoTitle('')
      videoInput.value = ''
      alert('Vidéo uploadée avec succès')
    } catch (error) {
      console.error('Error uploading video:', error)
      alert('Erreur lors de l\'upload')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadFavicon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!faviconPreview) {
      alert('Veuillez sélectionner une image')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', dataURLtoFile(faviconPreview, 'favicon.png'))

      await adminMediaAPI.uploadFavicon(formData)
      setFaviconPreview(null)
      alert('Favicon uploadé avec succès')
    } catch (error) {
      console.error('Error uploading favicon:', error)
      alert('Erreur lors de l\'upload')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVisual = async (id: string) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await adminMediaAPI.deleteVisual(id)
        await fetchMedias()
      } catch (error) {
        console.error('Error deleting visual:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleDeleteVideo = async (id: string) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await adminMediaAPI.deleteVideo(id)
        await fetchVideos()
      } catch (error) {
        console.error('Error deleting video:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#3D2914] mb-8">Gestion des médias</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#C9A227]/30">
          {['visuals', 'videos', 'favicon'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-[#C9A227] border-b-2 border-[#C9A227]'
                  : 'text-[#3D2914]/60 hover:text-[#3D2914]'
              }`}
            >
              {tab === 'visuals' && 'Visuels'}
              {tab === 'videos' && 'Vidéos'}
              {tab === 'favicon' && 'Favicon'}
            </button>
          ))}
        </div>

        {/* Visuals Tab */}
        {activeTab === 'visuals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold text-[#3D2914] mb-6">Ajouter un visuel</h2>
              <form onSubmit={handleUploadVisual} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Type de visuel</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as MediaType)}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] focus:outline-none focus:border-[#C9A227]"
                  >
                    {MEDIA_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name} ({type.dimensions})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description du visuel"
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914]"
                  />
                </div>

                {preview && (
                  <div className="border border-[#C9A227]/30 rounded-lg p-4">
                    <p className="text-sm text-[#3D2914]/70 mb-3">Aperçu</p>
                    <img src={preview} alt="Preview" className="w-full rounded-lg max-h-64 object-cover" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#C9A227] text-[#3D2914] font-semibold rounded-lg hover:bg-[#B89118] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Téléchargement...' : 'Télécharger'}
                </button>
              </form>
            </div>

            {/* Medias List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3D2914] mb-6">Visuels existants</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {medias.map((media) => (
                  <div key={media.id} className="backdrop-blur-md bg-white/30 rounded-lg p-4 border border-white/20">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#3D2914]">
                          {MEDIA_TYPES.find((t) => t.id === media.type)?.name}
                        </p>
                        <p className="text-sm text-[#3D2914]/60">{media.description}</p>
                        <img src={media.url} alt={media.description} className="mt-2 rounded w-full h-20 object-cover" />
                      </div>
                      <button
                        onClick={() => handleDeleteVisual(media.id)}
                        className="px-3 py-1 text-sm bg-red-500/30 text-red-700 rounded hover:bg-red-500/50 transition-colors whitespace-nowrap"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold text-[#3D2914] mb-6">Ajouter une vidéo</h2>
              <form onSubmit={handleUploadVideo} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Titre</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Titre de la vidéo"
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914] placeholder-[#3D2914]/50 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3D2914] mb-2">Fichier vidéo</label>
                  <input
                    type="file"
                    accept="video/*"
                    className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#C9A227] text-[#3D2914] font-semibold rounded-lg hover:bg-[#B89118] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Téléchargement...' : 'Télécharger'}
                </button>
              </form>
            </div>

            {/* Videos List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3D2914] mb-6">Vidéos existantes</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {videos.map((video) => (
                  <div key={video.id} className="backdrop-blur-md bg-white/30 rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#3D2914]">{video.title}</p>
                        <p className="text-sm text-[#3D2914]/60 truncate">{video.url}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="px-3 py-1 text-sm bg-red-500/30 text-red-700 rounded hover:bg-red-500/50 transition-colors whitespace-nowrap"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Favicon Tab */}
        {activeTab === 'favicon' && (
          <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 border border-white/20 shadow-lg max-w-2xl">
            <h2 className="text-2xl font-bold text-[#3D2914] mb-6">Favicon</h2>
            <form onSubmit={handleUploadFavicon} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#3D2914] mb-2">Image (sera redimensionné auto à 32x32)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setFaviconPreview(event.target?.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-[#C9A227]/30 bg-white/50 text-[#3D2914]"
                />
              </div>

              {faviconPreview && (
                <div className="border border-[#C9A227]/30 rounded-lg p-4">
                  <p className="text-sm text-[#3D2914]/70 mb-3">Aperçu</p>
                  <img src={faviconPreview} alt="Favicon Preview" className="w-16 h-16 rounded-lg object-cover" />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-[#C9A227] text-[#3D2914] font-semibold rounded-lg hover:bg-[#B89118] transition-colors disabled:opacity-50"
              >
                {loading ? 'Téléchargement...' : 'Télécharger'}
              </button>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
