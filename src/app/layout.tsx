import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Poke-App',
  description: 'Toda la información de tus pokemons favoritos en un solo lugar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>
          <h1>hola</h1>
        </footer>
      </body>
    </html>
  )
}
