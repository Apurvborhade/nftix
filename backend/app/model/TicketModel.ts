import mongoose from "mongoose";
import { EventModel } from "./EventModel";

const TicketSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // name of the model
        required: true,
    }
})

export const Ticket = mongoose.model("Ticket", TicketSchema)