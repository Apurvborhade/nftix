import { EVENTFACTORY_ABI, EVENTFACTORY_ADDRESS } from "../config/config";
import { wallet } from "../lib/wallet";
import { CustomError } from "../middleware/errorHandler";
import { EventModel } from "../model/EventModel"
import { NextFunction, Request, Response } from 'express'
import { getEvents } from "../services/eventServices";
import { Ticket } from "../model/TicketModel";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { name,
        description,
        category,
        eventdate,
        location,
        ticketPrice,
        totalTickets,
        organizer,
        contractAddress } = req.body;

    try {
        if (!name ||
            !description ||
            !category ||
            !eventdate ||
            !location ||
            !ticketPrice ||
            !totalTickets ||
            !organizer || !contractAddress
        ) {
            console.log(name,
                description,
                category,
                eventdate,
                location,
                ticketPrice,
                totalTickets,
                organizer,
                contractAddress )
            throw new Error("Enter All Fields") as CustomError
        }
        const event = new EventModel({
            name,
            description,
            category,
            eventdate,
            location,
            ticketPrice,
            totalTickets,
            organizer,
            contractAddress
        })

        await event.save()
        
        if (!event) {
            throw new Error("Cannoot Create Event") as CustomError
        }
        res.status(200).json({
            message: "Event Created",
            event
        })
    } catch (error) {
        next(error)
    }

}

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await getEvents(req, res);

        const filtered = events.filter(event => event !== null);

        res.status(201).json({ events: filtered });
    } catch (error) {
        next(error)
    }
}

// User Events
export const getEventsByUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userAddress } = req.params;
    try {
        const events = await getEvents(req, res);

        const filtered = events.filter(event =>
            event !== null && event.organizer === userAddress
        );

        res.status(201).json({ events: filtered });
    } catch (error) {
        next(error)
    }
}

export const getEventByAddress = async (req: Request, res: Response, next: NextFunction) => {
    const { contractAddress } = req.query

    try {
        const eventDetails = await EventModel.findOne({ contractAddress: contractAddress })

        if (!eventDetails) {
            throw new Error("Cannot Find Event") as CustomError
        }

        res.status(201).json({
            event: eventDetails
        })
    } catch (error) {
        next(error)
    }
}


export const mintTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { event, owner, ticketId, hash } = req.body;
    console.log("Minting Ticket", event, owner, ticketId);
    try {
        if (!event || !owner || !ticketId || !hash) {
            throw new Error("Provide all required info.") as CustomError
        }

        const eventObject = await EventModel.findOne({ contractAddress: event });
                

        const ticket = new Ticket({
            owner,
            event: event,
            tx: hash,
            ticketId
        })

        await ticket.save()

        res.status(201).json(ticket)
    } catch (error) {
        next(error)
    }
}

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.query

    try {
        const tickets = await Ticket.find({
            owner: user
        })

        if (!tickets) {
            throw new Error("Cannot Find Tickets") as CustomError
        }

        res.status(201).json(tickets)
    } catch (error) {
        next(error)
    }
}