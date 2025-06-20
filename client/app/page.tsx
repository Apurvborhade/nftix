"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin, Users, Sparkles, Plus, Filter, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"

interface Event {
  id: string
  title: string
  organizer: string
  date: string
  time: string
  venue: string
  location: string
  category: string
  price: string
  totalTickets: number
  soldTickets: number
  image: string
  featured: boolean
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "ETHFest 2025",
    organizer: "Crypto Events Co.",
    date: "March 15, 2025",
    time: "6:00 PM",
    venue: "Crypto Convention Center",
    location: "San Francisco, CA",
    category: "Technology",
    price: "0.1 ETH",
    totalTickets: 100,
    soldTickets: 23,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "2",
    title: "NFT Art Gallery Opening",
    organizer: "Digital Arts Foundation",
    date: "March 20, 2025",
    time: "7:00 PM",
    venue: "Modern Art Museum",
    location: "New York, NY",
    category: "Art",
    price: "0.05 ETH",
    totalTickets: 200,
    soldTickets: 156,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "3",
    title: "Web3 Developer Conference",
    organizer: "DevDAO",
    date: "April 2, 2025",
    time: "9:00 AM",
    venue: "Tech Hub Center",
    location: "Austin, TX",
    category: "Technology",
    price: "0.08 ETH",
    totalTickets: 500,
    soldTickets: 342,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "4",
    title: "Metaverse Music Festival",
    organizer: "Virtual Events Ltd",
    date: "April 10, 2025",
    time: "8:00 PM",
    venue: "Virtual Reality Space",
    location: "Metaverse",
    category: "Music",
    price: "0.12 ETH",
    totalTickets: 1000,
    soldTickets: 789,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "5",
    title: "Blockchain Gaming Summit",
    organizer: "GameFi Alliance",
    date: "April 18, 2025",
    time: "10:00 AM",
    venue: "Gaming Arena",
    location: "Los Angeles, CA",
    category: "Gaming",
    price: "0.06 ETH",
    totalTickets: 300,
    soldTickets: 145,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "6",
    title: "DeFi Investment Workshop",
    organizer: "Finance DAO",
    date: "May 5, 2025",
    time: "2:00 PM",
    venue: "Financial District Hall",
    location: "Chicago, IL",
    category: "Finance",
    price: "0.15 ETH",
    totalTickets: 150,
    soldTickets: 89,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
]

const categories = ["All", "Technology", "Art", "Music", "Gaming", "Finance", "Sports"]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")


  const { isConnected, address } = useAccount()

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredEvents = filteredEvents.filter((event) => event.featured)
  const regularEvents = filteredEvents.filter((event) => !event.featured)

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
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.02 }}>
              <Sparkles className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TicketChain
              </h1>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Events
              </Link>
              <Link href="/create-event" className="text-slate-600 hover:text-slate-900 transition-colors">
                Create Event
              </Link>
              <Link href="/my-tickets" className="text-slate-600 hover:text-slate-900 transition-colors">
                My Tickets
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isConnected && address && (
                <Link href="/create-event">
                  <Button variant="outline" className="hidden md:flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
              )}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {/* <Button
                  onClick={connectWallet}
                  disabled={isWalletConnected}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
                >
                  {isWalletConnected ? `${walletAddress}` : "Connect Wallet"}
                </Button> */}
                <ConnectKitButton.Custom>
                  {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                    return (
                      <Button onClick={show} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6">
                        {isConnected ? `${address?.slice(0, address.length - 16)}...${address?.slice(-4)}` : "Connect Wallet"}
                      </Button>
                    );
                  }}
                </ConnectKitButton.Custom>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Discover Amazing Events
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The world's first NFT-powered event ticketing platform. Secure, transparent, and tradeable tickets.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search events, organizers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg border-slate-200 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
              <Button variant="outline" className="px-6 py-3">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "hover:bg-slate-100"
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold text-slate-800">Featured Events</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} featured />
            ))}
          </div>
        </motion.section>
      )}

      {/* All Events */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-4 py-8"
      >
        <h3 className="text-2xl font-bold text-slate-800 mb-8">
          {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </motion.section>
    </div>
  )
}

function EventCard({ event, index, featured = false }: { event: Event; index: number; featured?: boolean }) {
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Link href={`/event/${event.id}`}>
        <Card
          className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm ${featured ? "ring-2 ring-blue-200" : ""
            }`}
        >
          <div className="relative">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {featured && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                Featured
              </Badge>
            )}
            <Badge className="absolute top-3 right-3 bg-white/90 text-slate-700">{event.category}</Badge>
          </div>

          <CardContent className="p-6">
            <h4 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h4>
            <p className="text-slate-600 mb-3">by {event.organizer}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-slate-600">
                <Calendar className="w-4 h-4 mr-2" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <MapPin className="w-4 h-4 mr-2" />
                {event.venue}, {event.location}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-sm text-slate-600">
                <Users className="w-4 h-4 mr-1" />
                {event.soldTickets}/{event.totalTickets} sold
              </div>
              <div className="text-lg font-bold text-slate-800">{event.price}</div>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              View Event
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
