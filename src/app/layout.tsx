import Navbar from '@/components/navbar/Navbar'
import type { Metadata } from 'next'
import './globals.css'
import Providers from "./Providers";




export const metadata: Metadata = {
  title: 'SGP- App',
  description: 'Sistema de Gestion de personal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <Providers>
          <Navbar />
          {children}
          </Providers>
      </body>
    </html>
  )
}
