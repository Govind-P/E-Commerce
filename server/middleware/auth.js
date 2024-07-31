import jwt from "jsonwebtoken";


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
        req.body.user={id,email};
        next();
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        });
    }
}