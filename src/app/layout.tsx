import type { Metadata } from 'next'
import './globals.css'



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
      <body>{children}</body>
    </html>
  )
}
