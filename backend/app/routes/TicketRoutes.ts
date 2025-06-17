import express from 'express'
import { createEvent, getAllEvents, getEventByAddress, getEventsByUser, getTickets, mintTicket } from '../controller/ticketController';

const router = express.Router()

// POST /events
router.post("/ticket/mint", mintTicket);

// GET USER TICKETS
router.get("/tickets", getTickets)



export default router;