import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ticket, Shield, Eye, Coins, ArrowRight, Star, Twitter, Github, MessageCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function NFTixLanding() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative overflow-hidden scroll-smooth">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-purple-100/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-8 bg-white/40 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Ticket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">NFTix</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
            How It Works
          </Link>
          <Link href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">
            Benefits
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Early Access
          </Link>
          
        </nav>

        <Link href={'/explore'}>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6">Get Started</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <Badge
          variant="outline"
          className="mb-8 bg-yellow-50 border-yellow-200 text-yellow-700 backdrop-blur-sm animate-pulse shadow-sm"
        >
          <Star className="w-4 h-4 mr-2" />
          Launching Soon
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
          Decentralized Event Ticketing
          <br />
          For Everyone
        </h1>

        <p className="text-xl md:text-xl text-gray-600 mb-12 max-w-4xl leading-relaxed">
        The Web3 way to book and trade your event tickets — simple, secure, and seamless.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={'/explore'}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/80 border-gray-300 text-gray-900 hover:bg-gray-50 backdrop-blur-sm px-8 py-4 text-lg shadow-sm"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to revolutionize event ticketing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">1. Mint Your NFT Ticket</h3>
              <p className="text-gray-600">
                Create unique, verifiable tickets as NFTs with built-in smart contract functionality.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">2. Trade or Transfer Securely</h3>
              <p className="text-gray-600">
                Safely transfer tickets to others with full blockchain transparency and security.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">3. Validate Ticket on Entry</h3>
              <p className="text-gray-600">
                Instant verification at events with QR codes linked to blockchain records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative z-10 py-24 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose NFTix</h2>
            <p className="text-xl text-gray-600">Built for the future of event management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg transition-all shadow-sm">
              <Shield className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Immutable Proof of Ownership</h3>
              <p className="text-gray-600">
                Every ticket is permanently recorded on the blockchain, providing undeniable proof of authenticity.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:border-purple-300 hover:shadow-lg transition-all shadow-sm">
              <Eye className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Fraud Prevention</h3>
              <p className="text-gray-600">
                Smart contracts eliminate counterfeit tickets and ensure only valid holders can enter events.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-lg transition-all shadow-sm">
              <Ticket className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Real-time Ticket Tracking</h3>
              <p className="text-gray-600">
                Monitor ticket transfers, sales, and usage in real-time with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="pricing" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm border border-gray-200 rounded-3xl p-12 shadow-xl">
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 mb-6">Early Access</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Zero Platform Fees for Early Access Users
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our beta program and enjoy commission-free ticket minting and trading for the first 6 months.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 py-12 px-6 bg-white/80">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NFTix</span>
            </div>

            <nav className="flex items-center space-x-8 mb-6 md:mb-0">
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Docs
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FileText className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 NFTix. All rights reserved. Built on blockchain technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
