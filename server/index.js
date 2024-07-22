import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from'mongoose';
import authRoutes from './routes/index.js';


dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());


//Routes
app.use('/api',authRoutes);




const PORT=process.env.PORT || 6001;

//MongoDB connectionc
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>console.log('Server port:'+PORT));
}).catch((err)=>{console.log(err)});
