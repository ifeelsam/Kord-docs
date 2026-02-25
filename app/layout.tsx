import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import {
  GeistPixelLine,
  GeistPixelTriangle,
  GeistPixelCircle,
  GeistPixelGrid,
  GeistPixelSquare,
} from 'geist/font/pixel'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Kord — Fund the Music You Love',
  description: 'Fund the music you love and own the albums you support. Invest in artists, get AUDIO royalties, and early access to new releases.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistPixelLine.variable} ${GeistPixelTriangle.variable} ${GeistPixelCircle.variable} ${GeistPixelGrid.variable} ${GeistPixelSquare.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
