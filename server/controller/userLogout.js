import user from '../model/userModel.js';

export const userLogout=async(req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({
            message: 'User logged out successfully', 
            success: true, 
            error: false,
            data:[]
        });
    }catch(error){
        res.status(500).json({
            message: 'Server Error', 
            success: false, 
            error: true
        });
    }
 
}