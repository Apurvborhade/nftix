"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, Calendar, MapPin, Users, DollarSign, Sparkles } from "lucide-react"
import Link from "next/link"
import { Event, useCreateEvent } from "@/hooks/event/useEvent"
import { useAccount } from "wagmi"

export default function CreateEventPage() {
  const [formData, setFormData] = useState<Event>({
    title: "",
    description: "",
    category: "",
    eventdate: "",
    location: "",
    totalTickets: "",
    ticketPrice: "",
    organizer: "",
    eventtime: ""
  })

  const { mutate: createEvent, isPending, isSuccess, error } = useCreateEvent()


  const { address } = useAccount()
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    createEvent({ ...formData, organizer: address })
  }

  useEffect(() => {
    if (isSuccess && !isPending) {
      setFormData({
        title: "",
        description: "",
        category: "",
        eventdate: "",
        location: "",
        totalTickets: "",
        ticketPrice: "",
        organizer: "",
        eventtime:""
      })
    }
  }, [isSuccess, isPending])
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
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create New Event
                </h1>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800">Event Details</CardTitle>
              <p className="text-slate-600">Create your NFT-powered event and start selling tickets</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title" className="text-slate-700 font-semibold">
                      Event Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter event title"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description" className="text-slate-700 font-semibold">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your event..."
                      className="mt-2 min-h-[120px]"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-slate-700 font-semibold">
                      Category *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* <div>
                    <Label htmlFor="image" className="text-slate-700 font-semibold">
                      Event Image *
                    </Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-slate-400" />
                          <p className="text-sm text-slate-500">
                            {formData.image ? formData.image.name : "Click to upload image"}
                          </p>
                        </div>
                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          required
                        />
                      </label>
                    </div>
                  </div> */}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date" className="text-slate-700 font-semibold flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Event Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.eventdate}
                      onChange={(e) => handleInputChange("eventdate", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-slate-700 font-semibold">
                      Event Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.eventtime}
                      onChange={(e) => handleInputChange("eventtime", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="venue" className="text-slate-700 font-semibold flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Venue Name *
                    </Label>
                    <Input
                      id="venue"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter venue name"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-slate-700 font-semibold">
                      City, State *
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="e.g., San Francisco, CA"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                {/* Ticketing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="totalTickets" className="text-slate-700 font-semibold flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Total Tickets *
                    </Label>
                    <Input
                      id="totalTickets"
                      type="number"
                      value={formData.totalTickets}
                      onChange={(e) => handleInputChange("totalTickets", e.target.value)}
                      placeholder="e.g., 100"
                      className="mt-2"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-slate-700 font-semibold flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Ticket Price (ETH) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.001"
                      value={formData.ticketPrice}
                      onChange={(e) => handleInputChange("ticketPrice", e.target.value)}
                      placeholder="e.g., 0.1"
                      className="mt-2"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      {isPending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Sparkles className="w-5 h-5 mr-2" />
                      )}
                      {isPending ? "Creating Event..." : "Create Event & Deploy NFT Contract"}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
