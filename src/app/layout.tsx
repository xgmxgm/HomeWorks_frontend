import { Header } from '@/widgets/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "../store/provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home Work',
  description: 'Post home work',
}

export default function RootLayout({  
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <header>
              <Header />
            </header>
            <main>
              {children}
            </main>
            <footer></footer>
          </Providers>
        </body>
      </html>
  )
}
