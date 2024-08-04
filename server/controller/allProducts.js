import productModel from "../model/productModel.js";


export const allProducts=async(req,res)=>{
    try{
        const products=await productModel.find({});
        res.status(200).json({
            message:'All products fetched successfully',
            success:true,
            data:products,
            error:false
        });
    }
    catch(error){
        res.status(400).json({
            message:error.message||error,
            success:true,
            error:false
        })
    }
}