import './style.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const title = 'Cristian Coaching | Allenamento individuale'
const description = 'Il tuo spazio per schede personali, esercizi e consulenze con Cristian.'
const share = '/brand/share.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://cristian-coaching.vercel.app'),
  title, description, manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/brand/c-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/brand/c-180.png', sizes: '180x180' }],
  },
  openGraph: { title, description, siteName: 'Cristian Coaching', locale: 'it_IT',
    images: [{ url: share, width: 1200, height: 630, alt: 'Cristian Coaching' }] },
  twitter: { card: 'summary_large_image', title, description, images: [share] },
}
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#161616' }
export default function Layout({children}:{children:ReactNode}) {
  return <html lang="it"><body>{children}</body></html>
}
