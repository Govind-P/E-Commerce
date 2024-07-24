import bcrypt from 'bcrypt';
import user from '../model/userModel.js';



export const registerUser=async(req, res) =>{
    try {
        const { name,
                email,
                phone, 
                password,
                profileImage} = req.body;
    
        if(!name || !email || !phone || !password) {
            throw new Error('All fields are required');
        }   

        const existingUser = await user.findOne({
            $or: [
              { email: email },
              { phone: phone }
            ]
        });
        if(existingUser) {
            throw new Error('User already exists with given Email or Phone number');
        }
        const salt=await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser=new user({
            name,
            email,
            phone,
            password:hashedPassword,
            profileImage,
            role:'GENERAL'
        });
        const savedUser =await newUser.save();
        res.status(201).json({message: "User registered successfully" ,
            user: savedUser,
            error:false,
            success:true
        });    
    } catch (error) {
        res.status(500).json({ 
            message: error.message ,
            error:true,
            success:false
        });
    }
}
