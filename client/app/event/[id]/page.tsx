"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Clock, Users, Sparkles, Share2, Heart } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface EventDetails {
  id: string
  title: string
  organizer: string
  organizerImage: string
  date: string
  time: string
  venue: string
  location: string
  category: string
  price: string
  totalTickets: number
  soldTickets: number
  image: string
  description: string
  features: string[]
  agenda: { time: string; activity: string }[]
}

const mockEventDetails: { [key: string]: EventDetails } = {
  "1": {
    id: "1",
    title: "ETHFest 2025",
    organizer: "Crypto Events Co.",
    organizerImage: "/placeholder.svg?height=60&width=60",
    date: "March 15, 2025",
    time: "6:00 PM - 11:00 PM",
    venue: "Crypto Convention Center",
    location: "San Francisco, CA",
    category: "Technology",
    price: "0.1 ETH",
    totalTickets: 100,
    soldTickets: 23,
    image: "/placeholder.svg?height=500&width=800",
    description:
      "Join us for the most innovative blockchain and cryptocurrency festival of 2025. Experience cutting-edge technology, network with industry leaders, and be part of the future of finance.",
    features: [
      "Keynote speakers from top crypto companies",
      "Interactive blockchain workshops",
      "NFT art gallery",
      "Networking sessions",
      "Live music performances",
      "Food and beverages included",
    ],
    agenda: [
      { time: "6:00 PM", activity: "Registration & Welcome Drinks" },
      { time: "7:00 PM", activity: "Opening Keynote: The Future of DeFi" },
      { time: "8:00 PM", activity: "Panel Discussion: NFTs and Digital Art" },
      { time: "9:00 PM", activity: "Networking Break" },
      { time: "9:30 PM", activity: "Live Music Performance" },
      { time: "10:30 PM", activity: "Closing Remarks & After Party" },
    ],
  },
}

export default function EventPage() {
  const params = useParams()
  const eventId = params.id as string
  const event = mockEventDetails[eventId]

  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Event Not Found</h1>
          <Link href="/">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  const connectWallet = async () => {
    setIsWalletConnected(true)
  }

  const mintTicket = async () => {
    setIsMinting(true)
    setTimeout(() => {
      setIsMinting(false)
      // Handle successful minting
    }, 3000)
  }

  const soldPercentage = (event.soldTickets / event.totalTickets) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {!isWalletConnected && (
                <Button onClick={connectWallet} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Event Image */}
              <div className="relative mb-8 rounded-2xl overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-700">{event.category}</Badge>
              </div>

              {/* Event Info */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">{event.title}</h1>

                <div className="flex items-center mb-6">
                  <img
                    src={event.organizerImage || "/placeholder.svg"}
                    alt={event.organizer}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-slate-800">Organized by</p>
                    <p className="text-slate-600">{event.organizer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-semibold text-slate-800">Date</p>
                      <p className="text-slate-600">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-purple-500 mr-3" />
                    <div>
                      <p className="font-semibold text-slate-800">Time</p>
                      <p className="text-slate-600">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-semibold text-slate-800">Venue</p>
                      <p className="text-slate-600">{event.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-orange-500 mr-3" />
                    <div>
                      <p className="font-semibold text-slate-800">Capacity</p>
                      <p className="text-slate-600">{event.totalTickets} attendees</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8">{event.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-slate-800">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {event.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Sparkles className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agenda */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">Event Agenda</h3>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                          {item.time}
                        </div>
                        <p className="text-slate-600 pt-1">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Ticket Purchase */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-slate-800 mb-2">{event.price}</div>
                    <p className="text-slate-600">per NFT ticket</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Tickets sold</span>
                      <span className="font-semibold">
                        {event.soldTickets}/{event.totalTickets}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-slate-500 mt-2">{Math.round(soldPercentage)}% sold</p>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={mintTicket}
                      disabled={!isWalletConnected || isMinting}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl mb-4"
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
                      {isMinting ? "Minting..." : "Mint NFT Ticket"}
                    </Button>
                  </motion.div>

                  {!isWalletConnected && (
                    <p className="text-sm text-slate-500 text-center">Connect your wallet to purchase tickets</p>
                  )}

                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Ticket Price</span>
                        <span>{event.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span>0.005 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gas Fee</span>
                        <span>~0.01 ETH</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold text-slate-800">
                          <span>Total</span>
                          <span>~0.115 ETH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
