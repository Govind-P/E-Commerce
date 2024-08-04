import user from '../model/userModel.js';


export const allUsers=async(req,res)=>{
    try{
        const users=await user.find({role: 'GENERAL' });
        res.status(200).json({
            message: 'All users fetched successfully',
            error: false,
            success: true,
            data: users
        });
    }catch(error){
        res.status(500).json({
            message: 'Server error',
            error: true,
            success: false
        });
    }
 
}

export const allAdmin=async(req,res)=>{
    try{
        const users=await user.find({role: 'ADMIN' });
        res.status(200).json({
            message: 'All admins fetched successfully',
            error: false,
            success: true,
            data: users
        });
    }catch(error){
        res.status(500).json({
            message: 'Server error',
            error: true,
            success: false
        });
    }
 
}



