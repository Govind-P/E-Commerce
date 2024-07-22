import user from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res)=>{
    try{
        const {email,password}=req.body;
        console.log(email, password)
        const users=await user.findOne({email:email});
        if(!users){return res.status(400).json({msg : 'User doesnot exist. Please create an account!' })}

        const isMatch=await bcrypt.compare(password,users.password);
        if(!isMatch){return res.status(400).json({msg : 'Invalid credential' })}

        const token = jwt.sign({id:users._id},process.env.JWT_SECRET);
        delete users.password;
        res.status(200).json({token,users});

    }catch(err){res.status(500).json({error:err.message});}
}