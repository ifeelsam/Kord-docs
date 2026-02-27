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
import '@solana/wallet-adapter-react-ui/styles.css'
import { SolanaWalletProvider } from '@/components/solana/solana-wallet-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Kord — Fund the Music You Love',
  description: 'Fund the music you love and own the albums you support. Invest in artists, get AUDIO royalties, and early access to new releases.',
  icons: {
    icon: [
      {
        url: '/kord-icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/kord-icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/kord-icon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/kord-icon.png',
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
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
