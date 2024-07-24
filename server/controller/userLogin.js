import user from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res)=>{
    try{
        const {email,password}=req.body;
        const users=await user.findOne({email:email});
        if(!users){return res.status(400).json({message : 'User doesnot exist. Please create an account!' })}

        const isMatch=await bcrypt.compare(password,users.password);
        if(!isMatch){return res.status(400).json({message : 'Invalid credential' })}
        const tokenData={
            id:users._id,
            email:users.email,
        };
        const token =await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn: 60*60*8});
        delete users.password;
        const tokenOption={
            httpOnly: true,
            secure:true
        }; 
        res.cookie("token",token,tokenOption).status(200).json({
            data:token,
            user:users,
            message : 'User logged in successfully!',
            success:true,
            error:false
        });

    }catch(err){res.status(500).json({
        error:err.message,
        success:false,
        error:true
    });}
}