"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wallet, Calendar, MapPin, Clock, Ticket, Sparkles } from "lucide-react"

interface TicketData {
  id: string
  eventName: string
  seat: string
  date: string
  time: string
  venue: string
  image: string
}

export default function Component() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [ticketsMinted, setTicketsMinted] = useState(23)
  const [totalTickets] = useState(100)
  const [userTicket, setUserTicket] = useState<TicketData | null>(null)
  const [isMinting, setIsMinting] = useState(false)

  const mintingSectionRef = useRef(null)
  const ticketSectionRef = useRef(null)
  const isMintingInView = useInView(mintingSectionRef, { once: true, margin: "-100px" })
  const isTicketInView = useInView(ticketSectionRef, { once: true, margin: "-100px" })

  const connectWallet = async () => {
    // Mock wallet connection
    setIsWalletConnected(true)
    setWalletAddress("0x1234...5678")
  }

  const mintTicket = async () => {
    setIsMinting(true)
    // Mock minting process
    setTimeout(() => {
      setTicketsMinted((prev) => prev + 1)
      setUserTicket({
        id: "#ETH2025-024",
        eventName: "ETHFest 2025",
        seat: "VIP Section A - Row 3, Seat 12",
        date: "March 15, 2025",
        time: "6:00 PM - 11:00 PM",
        venue: "Crypto Convention Center, San Francisco",
        image: "/placeholder.svg?height=300&width=400",
      })
      setIsMinting(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ETHFest 2025
            </h1>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={connectWallet}
              disabled={isWalletConnected}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isWalletConnected ? `${walletAddress}` : "Connect Wallet"}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        {/* Hero/Minting Section */}
        <motion.section
          ref={mintingSectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isMintingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 py-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMintingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                The Future of Music
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Join the most innovative music festival in Web3. Mint your NFT ticket and be part of history.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isMintingInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=800"
                    alt="ETHFest 2025 Event Banner"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">ETHFest 2025</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        March 15, 2025
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        San Francisco
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Badge
                      variant="secondary"
                      className="text-lg px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      {ticketsMinted}/{totalTickets} minted
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800">0.1 ETH</div>
                      <div className="text-sm text-slate-500">per ticket</div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={mintTicket}
                      disabled={!isWalletConnected || isMinting || userTicket !== null}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      {isMinting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Sparkles className="w-5 h-5 mr-2" />
                      )}
                      {isMinting ? "Minting..." : userTicket ? "Ticket Minted!" : "Mint Ticket"}
                    </Button>
                  </motion.div>

                  {!isWalletConnected && (
                    <p className="text-sm text-slate-500 mt-4 text-center">Connect your wallet to mint a ticket</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* My Ticket Section */}
        {userTicket && (
          <motion.section
            ref={ticketSectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isTicketInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto px-4 py-12"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isTicketInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
              >
                My Ticket
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isTicketInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={userTicket.image || "/placeholder.svg"}
                        alt="NFT Ticket"
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                          Minted Successfully
                        </Badge>
                        <span className="text-sm font-mono text-slate-500">{userTicket.id}</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-6 text-slate-800">{userTicket.eventName}</h3>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Seat</div>
                            <div className="text-slate-600">{userTicket.seat}</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Calendar className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Date</div>
                            <div className="text-slate-600">{userTicket.date}</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Time</div>
                            <div className="text-slate-600">{userTicket.time}</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Venue</div>
                            <div className="text-slate-600">{userTicket.venue}</div>
                          </div>
                        </div>
                      </div>

                      <motion.div className="mt-8 pt-6 border-t border-slate-200" whileHover={{ scale: 1.02 }}>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                        >
                          View on OpenSea
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  )
}
