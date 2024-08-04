import user from '../model/userModel.js';

export const userDetails=async(req,res)=>{
    try{
        const User=await user.findById(req.data.id);
        if(!User){return res.status(404).json({
            message: 'User not found',
            error: true,
            success: false
        })}
        res.status(200).json({
            message: 'User details fetched successfully',
            data: User,
            error: false,
            success: true
        });
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error:true,
            success: false
        });
    }
}