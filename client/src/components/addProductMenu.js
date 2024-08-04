import React,{useState,useEffect} from 'react';
import { IoMdClose } from "react-icons/io";
import productCategory from '../common/category.js';
import { FaCloudUploadAlt } from "react-icons/fa";
import ImageToBase64 from '../helper/ImageToBase64';
import ImageFullScreen from './ImageFullScreen.js';
import { MdDelete } from "react-icons/md";
import uploadImage from '../helper/UploadImage.js';
import backendApi from '../common/api.js';
import { toast } from'react-toastify';

const AddProductMenu = ({onClose,fetchProduct}) => {
  const [data,setData]=useState({
    productname:'',
    brandname:'',
    category:'',
    description:'',
    quantity:'',
    unitPrice:'',
    sellingPrice:'',
    productImage:[]
  });

  const [imageFull,setImageFull]=useState(false);
  const [selectedImage, setSelectedImage]=useState("");

  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value});
  }

  const handleImageUpload=async(e) => {
    const file=e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    console.log(uploadImageCloudinary);
    setData((preve)=> {
        return {
            ...preve,
            productImage:[...preve.productImage,uploadImageCloudinary.url]
        }});
    e.target.value = '';
  }

  const handleDelete=(index)=>{
        const newImages=[...data.productImage];
        newImages.splice(index,1);
        setData({...data,productImage:newImages});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(data.productImage.length===0){
        alert('Please add at least one product image');
        return;
    }

        const res = await fetch(backendApi.admin_upload_product.url, 
            {
                method:backendApi.admin_upload_product.method,
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        const responseData = await res.json();
        if(responseData.success){
            toast.success(responseData.message);
            onClose();
            fetchProduct();
        }
        else{
            toast.error(responseData.message)
        }
    
  }


  return (
    <div className='fixed top-0  left-0 right-0 bottom-0  flex justify-center items-center '>
    <div className='w-full max-w-md h-full max-h-[70%]  bg-slate-200  overflow-y-hidden rounded-lg p-4 '>
        <div className='px-3 py-3 flex justify-between'>
            <h1 className='font-semibold'>Add Product</h1>
            <IoMdClose className='cursor-pointer text-2xl ' onClick={onClose}/>
        </div>
        <div className='flex flex-col h-full pr-5 pb-10 '>
            <form className='flex-grow grid px-3 gap-1 overflow-y-auto ' onSubmit={handleSubmit}>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Product Name:</label>
                    <input className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md' 
                    type='text' 
                    placeholder='Product Name' 
                    name='productname'
                    value={data.productname}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Brand Name:</label>
                    <input className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md' 
                    type='text' 
                    placeholder='Brand Name' 
                    name='brandname'
                    value={data.brandname}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Category:</label>
                    <select className='w-full text-center p-1 border border-gray-300 rounded-md' name='category' value={data.category} required onChange={handleChange}>
                        <option value="">--Select Category--</option>
                        {productCategory.map((category, index) => (
                            <option className='text-black' key={index} value={category.value}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Description:</label>
                    <input className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md' 
                    type='text' 
                    placeholder='Description' 
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Unit Price:</label>
                    <input className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md' 
                    type='number' 
                    placeholder='Unit Price' 
                    name='unitPrice'
                    value={data.unitPrice}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Selling Price:</label>
                    <input className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md' 
                    type='number' 
                    placeholder='Selling Price' 
                    name='sellingPrice'
                    value={data.sellingPrice}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Quantity:</label>
                    <input className='block w-full px-3 py-2 text-sm border border-gray-300 rounded-md' 
                    type='number' 
                    placeholder='Quantity' 
                    name='quantity'
                    value={data.quantity}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='mb-3 px-4 py-2'>
                    <label className='block text-sm font-medium text-gray-700 pb-1'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='block bg-white w-full px-3 py-2 text-sm border border-dashed border-gray-600 rounded-md cursor-pointer'>
                            <span className='flex flex-col justify-center items-center p-2'>
                            <FaCloudUploadAlt className='text-2xl' />
                            <p>Upload the images here</p>
                            </span>
                            <input className='hidden' 
                            id='uploadImageInput' 
                            type='file' 
                            name='productImage'
                            onChange={handleImageUpload}
                            />    
                        </div> 
                        <p className='text-red-800 text-xs'>Please upload image*</p>
                    </label> 
                </div>
                {
                    data.productImage[0] && (
                        <div className='mb-3 px-4 py-2 '>
                            <div className=' bg-white border rounded-md w-full h-fit flex flex-grow overflow-hidden overflow-x-auto'>
                                {
                                    data.productImage.map((image,index)=>{
                                        return (
                                            <div  key={index} className='relative'>
                                                <img  className='w-15 h-20 object-cover cursor-pointer' src={image} alt={index+1} onClick={(e)=>{
                                                    setImageFull(true);
                                                    setSelectedImage(image);
                                                }}/>
                                                
                                                <MdDelete key={index} className='absolute top-0 bottom-0 right-0 text-1xl cursor-pointer text-red-800' onClick={()=>{handleDelete(index)}}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>   
                        </div>
                    )
                }
                
                <div className='mb-3 px-3 py-2 '>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-slate-600'>ADD</button>
                </div>
            </form>
        </div>
        {
            imageFull && (
                <ImageFullScreen 
                    onClose={()=>setImageFull(false)} 
                    image={selectedImage} 
                />
            )
        }
    </div>
    </div>
  )
}

export default AddProductMenu;