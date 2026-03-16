import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://expogh.com'),
  title: {
    default: 'ExpoGH — Discover Ghana\'s Culture, Nature & History',
    template: '%s | ExpoGH',
  },
  description:
    "ExpoGH is Ghana's premier tourism guide. Explore stunning national parks, historic castles, vibrant cultures, and breathtaking landscapes across all 16 regions.",
  keywords: [
    'Ghana tourism',
    'Ghana travel',
    'Visit Ghana',
    'Ghana attractions',
    'Kakum National Park',
    'Cape Coast Castle',
    'Ghana destinations',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    siteName: 'ExpoGH',
    title: "ExpoGH — Discover Ghana's Culture, Nature & History",
    description:
      "Ghana's premier tourism guide covering all regions, destinations, and travel experiences.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "ExpoGH — Discover Ghana",
    description: "Explore Ghana's top tourist destinations with ExpoGH.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'ExpoGH',
              description: "Ghana's premier tourism discovery platform",
              url: 'https://expogh.com',
              areaServed: 'Ghana',
              knowsAbout: ['Ghana tourism', 'African travel', 'Cultural heritage'],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
      </body>
    </html>
  )
}
