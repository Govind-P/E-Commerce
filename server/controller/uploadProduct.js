import productModel from '../model/productModel.js';
export const uploadProduct = async (req, res) => {
    try{
        req.body.createdBy=req.userId;
        const product = new productModel(req.body);
        const savedProduct=await product.save();
        res.status(201).json({
            message: 'Product uploaded successfully',
            error: false,
            success: true,
            data: savedProduct
        });
    }catch(error){
        res.status(400).json({
            message: error.message||error,
            error: true,
            success: false
        })
    }
}
