import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from'mongoose';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';


dotenv.config();
const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());


//Routes
app.use('/api',allRoutes);



const PORT=process.env.PORT || 6001;

//MongoDB connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>console.log('Server port:'+PORT));
}).catch((err)=>{console.log(err)});
