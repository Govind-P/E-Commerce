import user from '../model/userModel.js';


export const updateUserRole=async(req,res)=>{
    try{
        const sessionUser=await user.findById(req.data.id);
        if(sessionUser.role=="ADMIN"){
            const {userId,newRole}=req.body;
            const payload = {
                ...( newRole && { role : newRole}),
            }
            const updatedUser=await user.findByIdAndUpdate(userId,payload);
            if(!updatedUser) throw new Error('User not found');
            res.status(200).json({
                message: 'User role updated successfully', 
                success: true, 
                data: updatedUser,
                error: false
            });
        }
        else{
            res.status(403).json({message: 'Unauthorized access', success: false, error: true});
        }
    }catch(error){
        res.status(400).json({
            messgae:error.message || error,
            success: false,
            error: true
        })
    }
    
}