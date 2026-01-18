import { useEffect, useState } from 'react'
import api from '../services/api'

interface Video {
  id: string
  url: string
  title?: string
}

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [_error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/public/videos')
      .then(res => {
        setVideos(res.data || [])
      })
      .catch(err => {
        setError(err.message)
        console.error('Error fetching videos:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading || !videos.length) return null

  return (
    <section className="py-20 bg-gradient-to-br from-ayoya-gold/5 to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-ayoya-brown mb-12">
          Découvrez AYOYA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video.id} className="group rounded-xl overflow-hidden glass hover:shadow-xl transition-all">
              <div className="relative w-full h-64 bg-black/10 flex items-center justify-center">
                {video.url.includes('youtube') || video.url.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-full"
                    src={video.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    title={video.title || 'AYOYA Video'}
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={video.title}
                  >
                    <source src={video.url} type="video/mp4" />
                    Votre navigateur ne supporte pas les vidéos.
                  </video>
                )}
              </div>
              {video.title && (
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-ayoya-brown">{video.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
