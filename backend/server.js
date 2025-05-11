import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app=express();
const port=process.env.PORT||4000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use('/uploads', express.static('uploads'));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server started on port:${port}`)
});
