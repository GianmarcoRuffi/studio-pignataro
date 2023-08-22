import './globals.css'
import { Inter } from 'next/font/google'

//components

import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Studio Pignataro',
  description: 'Studio Pignataro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <Header />

        {children}</body>
    </html>
  )
}
