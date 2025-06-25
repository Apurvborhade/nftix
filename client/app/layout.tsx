import type { Metadata } from 'next'
import './globals.css'
import { Web3Provider } from '@/provider/Web3Provider'

export const metadata: Metadata = {
  title: 'NFTix | Decentralized Event Booking Platform',
  description: '',
  icons:{
    icon:'/nftix-logo.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}
