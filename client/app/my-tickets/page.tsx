"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Ticket, QrCode, Share2, Download } from "lucide-react"
import Link from "next/link"
import { useAccount } from "wagmi"
import { useGetTickets, UserTicket } from "@/hooks/event/useEvent"
import { format } from "date-fns"




export default function MyTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null)
  const { address: user } = useAccount()


  const { data: tickets } = useGetTickets(user as `0x${string}`)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "used":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "expired":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

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
              <Link href="/explore">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-slate-800">My Tickets</h1>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {tickets?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <Ticket className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Tickets Yet</h2>
            <p className="text-slate-600 mb-6">You haven't purchased any event tickets yet.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Browse Events</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tickets List */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Your NFT Tickets</h2>
              <div className="space-y-4">
                {tickets?.map((ticket, index) => (
                  <motion.div
                    key={ticket._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedTicket(ticket)}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm ${selectedTicket?.id === ticket.id ? "ring-2 ring-blue-300" : ""
                        }`}
                    >
                      <div className="flex">
                        <img
                          src={ticket.image || "/placeholder.svg"}
                          alt={ticket.event.title}
                          className="w-24 h-24 object-cover"
                        />
                        <CardContent className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-slate-800">{ticket.event.name}</h3>
                            <Badge className={getStatusColor("active")}>
                              Active
                              {/* {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)} */}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-2" />
                              {format(new Date(ticket.event.eventdate), 'MMMM dd,yyyy')}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-2" />
                              {ticket.event.location}
                            </div>
                            <div className="flex items-center">
                              <Ticket className="w-3 h-3 mr-2" />
                              {ticket.ticketId}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ticket Details */}
            <div>
              {selectedTicket ? (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="sticky top-24"
                >
                  <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <img
                          src={selectedTicket.image || "/placeholder.svg"}
                          alt={selectedTicket.event.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedTicket.event.name}</h3>
                        <Badge className={getStatusColor("active")}>
                          Active
                          {/* {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)} */}
                        </Badge>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                          <Calendar className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Date & Time</div>
                            <div className="text-slate-600">{format(new Date(selectedTicket.event.eventdate), 'MMMM dd,yyyy')}</div>
                            <div className="text-slate-600">{format(new Date(selectedTicket.event.eventdate), 'h:m b')}</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Venue</div>
                            <div className="text-slate-600">{selectedTicket.event.location}</div>

                          </div>
                        </div>

                        <div className="flex items-start">
                          <Ticket className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-700">Seat</div>
                            {/* <div className="text-slate-600">{selectedTicket.seat}</div> */}
                          </div>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="text-center mb-6">
                        <div className="bg-white p-4 rounded-lg inline-block shadow-inner">
                          <img
                            src={selectedTicket.qrCode || "/placeholder.svg"}
                            alt="QR Code"
                            className="w-32 h-32 mx-auto"
                          />
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Show this QR code at the event entrance</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button className="w-full" variant="outline">
                          <QrCode className="w-4 h-4 mr-2" />
                          Show QR Code
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download Ticket
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Ticket
                        </Button>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-500 text-center">Ticket ID: {selectedTicket.ticketId}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">Select a ticket to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
