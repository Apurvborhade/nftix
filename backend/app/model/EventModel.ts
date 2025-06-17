import mongoose from "mongoose"

export enum EventCategory {
    Technology = 'Technology',
    Art = "Art",
    Gaming = "Gaming",
    Music = "Music"
}

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: EventCategory,
        required: true
    },
    eventdate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    totalTickets: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    contractAddress: {
        type: String,
        required: true
    }
})

export const EventModel = mongoose.model("Event", EventSchema)