import type { Metadata } from 'next'
import { Cormorant_Garamond, EB_Garamond, Cinzel } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/ui/NavBar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-label',
})

export const metadata: Metadata = {
  title: 'Sarohans — Royal Heritage',
  description: 'Crafting Legacies, One Drape at a Time',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}