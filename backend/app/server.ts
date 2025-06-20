import express from 'express'
import dotenv from 'dotenv'
import APIRoutes from './routes/EventRoutes'
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


// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})


