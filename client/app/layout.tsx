import type { Metadata } from 'next'
import './globals.css'
import { Web3Provider } from '@/provider/Web3Provider'
import { Toaster } from 'sonner'

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
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  )
}
