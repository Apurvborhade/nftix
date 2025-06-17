import express from 'express'
import dotenv from 'dotenv'
import APIRoutes from './routes/TicketRoutes'
import { connectDB } from './lib/db';
import { errorHandler } from './middleware/errorHandler';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()

app.use("/api/ticket", APIRoutes);


// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})


