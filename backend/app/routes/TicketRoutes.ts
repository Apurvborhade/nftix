import express from 'express'
import { createEvent, getAllEvents, getEventsByUser } from '../controller/ticketController';

const router = express.Router()

// POST /events
router.post("/events/create", createEvent);

// GET /events
router.get("/events", getAllEvents);

// GET /tickets/:userAddress
router.get("/events/:userAddress", getEventsByUser);


export default router;