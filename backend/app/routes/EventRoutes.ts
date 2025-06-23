import express, { Response } from 'express'
import { createEvent, getAllEvents, getEventByAddress, getEventsByUser } from '../controller/ticketController';

const router = express.Router()

router.get("/",(res:Response) => {
    res.send("API ROUTE")
})
// POST /events
router.post("/events/create", createEvent);

// GET /events
router.get("/events", getAllEvents);

// GET /events/:userAddress
router.get("/events/:userAddress", getEventsByUser);

// GET /events?contractAddress=0x29y18e19821
router.get("/event", getEventByAddress);


export default router;