import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineFall } from "react-icons/ai";

const ProductCard = ({product}) => {
    const handleDeleteProduct = () => {
        const confirmation = window.confirm('Are you sure you want to delete this product?');
        if(confirmation) {
            console.log('Product deleted');
        }
        
    }
    
  return (
    <div className='bg-slate-400 opacity-85 w-full h-full rounded-md p-3 shadow-2xl '>
        <div className='flex flex-col'> 
            <img className='w-full h-30 object-cover' src={product.productImage[0]}/>
            <div>
                <h3 className='text-lg font-medium text-center pb-2'>{product.productname}</h3>
                {
                    product.quantity>0 ? (
                        <h3 className='text-md font-medium text-center text-green-900 pb-2'>In Stock</h3>
                    ):
                    (<h3 className='text-md font-medium text-center text-red-800 pb-2'>Out of Stock</h3>)
                }
                <h4 className='text-2xl font-normal text-center'>{product.sellingPrice}</h4>
                <div className='flex justify-between items-center'>
                    <h4 className='text-1xl font-medium line-through'>{product.unitPrice}</h4>                   
                    <div className='flex flex-row'>
                        <AiOutlineFall className=' text-green-800' />
                        <h4 className='text-1xl font-medium text-green-800'>{(((product.unitPrice-product.sellingPrice)/product.unitPrice)*100).toFixed(0)}%</h4>
                    </div>
                    
                </div>
                <div className='flex justify-between p-4 items-center'>
                    <button 
                    className='w-fit p-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 hover:scale-105 transition-all' 
                    title='Edit'><MdEdit /></button>
                    <button 
                    className='w-fit p-2 text-white text-2xl bg-gray-700 rounded-full hover:bg-gray-800 hover:scale-105 transition-all' 
                    title='Info'><IoIosInformationCircleOutline/></button>
                    <button 
                    className='w-fit p-2 text-white bg-red-500 rounded-full hover:bg-red-700 hover:scale-105 transition-all' 
                    title='Delete'
                    onClick={handleDeleteProduct}><MdDeleteOutline /></button>    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard