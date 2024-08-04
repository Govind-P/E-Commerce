import React from 'react';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const ImageFullScreen = ({onClose,image,onDelete}) => {
  return (
    <div className='fixed top-0  left-0 right-0 bottom-0  flex justify-center items-center '>
        <div className='relative w-fit max-w-sm h-fit max-h-[90%]  bg-gray-600 rounded-lg p-4 flex-col items-center justify-center'>
            <div>
                <img className='object-cover w-full h-full' src={image} alt=''/>
            </div>
            <div className=' flex  justify-center text-white text-2xl cursor-pointer p-2' onClick={onClose}>
                <IoMdClose/>
            </div>
            
        </div>
    </div>
  )
}

export default ImageFullScreen;