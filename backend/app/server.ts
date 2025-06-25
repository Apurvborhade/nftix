import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import APIRoutes from './routes/EventRoutes'
import TicketRoutes from './routes/TicketRoutes'
import { connectDB } from './lib/db';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors'
const app = express();

app.use(express.json())
dotenv.config();
app.use(cors())
const PORT = process.env.PORT || 8000;

connectDB()

app.use("/api", APIRoutes);
app.use("/api", TicketRoutes);
app.use('/ping', (req: Request, res: Response) => {
    res.send("Server Working perfectly 🟢")
})
console.log("Memory usage at start:", process.memoryUsage());
// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})


