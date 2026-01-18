import { useConfig } from '../hooks/useConfig'

interface SocialIconsProps {
  className?: string
  iconSize?: string
}

export default function SocialIcons({ className = 'flex gap-4', iconSize = 'w-6 h-6' }: SocialIconsProps) {
  const { config } = useConfig()
  const links = config?.socialLinks

  if (!links) return null

  return (
    <div className={className}>
      {links.facebook && (
        <a
          href={links.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ayoya-brown hover:text-ayoya-gold transition-colors"
          aria-label="Facebook"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      )}

      {links.instagram && (
        <a
          href={links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ayoya-brown hover:text-ayoya-gold transition-colors"
          aria-label="Instagram"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.292 0-9.6-4.308-9.6-9.6s4.308-9.6 9.6-9.6 9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6zm4.8-14.4a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM12 5.4a4.2 4.2 0 100 8.4 4.2 4.2 0 000-8.4zm0 6.6a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8z" />
          </svg>
        </a>
      )}

      {links.tiktok && (
        <a
          href={links.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ayoya-brown hover:text-ayoya-gold transition-colors"
          aria-label="TikTok"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.29 8.95c-.46-.25-1.02-.41-1.62-.41-.84 0-1.59.33-2.13.87v4.15c0 2.27-1.84 4.1-4.1 4.1-2.27 0-4.1-1.84-4.1-4.1 0-2.26 1.84-4.1 4.1-4.1.6 0 1.17.13 1.68.37V7.8c-.54-.07-1.08-.12-1.63-.12-4.18 0-7.58 3.39-7.58 7.58 0 4.18 3.39 7.58 7.58 7.58 4.18 0 7.58-3.39 7.58-7.58v-4.02c1.29.99 2.93 1.57 4.7 1.57v-2.55c-.46 0-.91-.04-1.35-.13z" />
          </svg>
        </a>
      )}
    </div>
  )
}
