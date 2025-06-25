"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin, Users, Sparkles, Plus, Filter, TrendingUp, Ticket } from "lucide-react"
import Link from "next/link"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"
import { Event, useGetEvents } from "@/hooks/event/useEvent"
import { format } from "date-fns"
import { publicClient } from "@/lib/config"
import EventTicketAbi from '@/lib/contract_abi/EventTicket.json'


const categories = ["All", "Technology", "Art", "Music", "Gaming", "Finance", "Sports"]

export default function Explore() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")



    const { isConnected, address } = useAccount()
    const { data } = useGetEvents();



    const filteredEvents = data?.events?.filter((event: Event) => {
        const matchesSearch =
            event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event?.organizer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory.toLowerCase() === "all" || event.category === selectedCategory.toLowerCase()
        return matchesSearch && matchesCategory
    })




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
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Ticket className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">NFTix</span>
                            </div>
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
            {filteredEvents?.length > 0 && (
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
                        {filteredEvents?.map((event: Event, index: number) => (
                            <EventCard key={event._id} event={event} index={index} featured />
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
                    {filteredEvents?.map((event: Event, index: number) => (
                        <EventCard key={event._id} event={event} index={index} />
                    )
                    )}
                </div>

                {filteredEvents?.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">No events found matching your criteria.</p>
                    </div>
                )}
            </motion.section>
        </div>
    )
}

async function getMintedTokensFromContract(address: `0x${string}`): Promise<number> {
    try {
        const data = await publicClient.readContract({
            address,
            abi: EventTicketAbi.abi,
            functionName: 'mintedTokens',
        });
        return Number(data);
    } catch (err) {
        console.error('Error reading contract:', err);
        return 0;
    }
}
function EventCard({ event, index, featured = false }: { event: Event; index: number; featured?: boolean }) {
    const [mintedTokens, setMintedTokens] = useState<number>(0);
    const soldPercentage = (mintedTokens / event?.totalTickets) * 100
    useEffect(() => {
        getMintedTokensFromContract(event.contractAddress as `0x${string}`).then(setMintedTokens);
    }, [event.contractAddress]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
        >
            <Link href={`/event/${event.contractAddress}`}>
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
                        <p className="text-slate-600 mb-3">by {event?.organizer?.slice(0, 20) + '... ' + event?.organizer?.slice(-4)}</p>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-slate-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                {format(new Date(event.eventdate), 'MMMM dd,yyyy')} at {format(new Date(event.eventdate), 'h:m b')}
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-sm text-slate-600">
                                <Users className="w-4 h-4 mr-1" />
                                {mintedTokens}/{event.totalTickets} sold
                            </div>
                            <div className="text-lg font-bold text-slate-800">{event.ticketPrice} ETH</div>
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
