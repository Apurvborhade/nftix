import { EVENTFACTORY_ABI, EVENTFACTORY_ADDRESS } from "../config/config";
import { wallet } from "../lib/wallet";
import { CustomError } from "../middleware/errorHandler";
import { EventModel } from "../model/EventModel"
import { NextFunction, Request, Response } from 'express'
import { getEvents } from "../services/eventServices";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { name,
        description,
        category,
        eventdate,
        location,
        ticketPrice,
        totalTickets,
        organizer,
        contractAddress } = req.body();

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