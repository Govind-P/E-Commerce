import jwt from "jsonwebtoken";
import user from '../model/userModel.js';


export const authToken=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(403).json({
                message:'No user, authorization denied',
                error:true,
                success:false
            }); 
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const {id,email}=decoded;
        req.data={id,email};
        next();
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        });
    }
}

export const authAdmin=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(403).json({
                message:'No user, authorization denied',
                error:true,
                success:false
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const {id}=decoded;
        const User=await user.findById(id);
        const {role}=User;
        if(role!=='ADMIN'){
            throw new Error('Unauthorized access');
        }
        req.userId=id
        next();
    }catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}