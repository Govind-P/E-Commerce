import React,{useEffect, useState} from 'react'
import Role from '../common/role.js';
import { IoMdClose } from "react-icons/io";
import Objects from 'lodash';
import backendApi from '../common/api.js';
import { toast } from'react-toastify';

export const UpdateUserRole = ({userId,role,name,email,phone,onClose,callFunc}) => {
  const [newRole,setNewRole] = useState(role);


  const handleUpdateRole = async() => {
    const res=await fetch(backendApi.update_user_role.url,{
      method:backendApi.update_user_role.method,
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        userId,
        newRole
      })
    });
    const data=await res.json();
    if(data.success){
      callFunc();
      onClose();
      toast.success(data.message);
    }
    if(data.error){
      toast.error(data.message);
      onClose();
    }
  }


  const handleChangeRole = (e) => {
    setNewRole(e.target.value);
  }



  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <div className='flex justify-between items-center p-4'>
              <h1 className='font-semibold text-lg py-2 pb-4'>Change User Role</h1>
              <div className='text-2xl cursor-pointer' onClick={onClose}>
                <IoMdClose />
              </div>
            </div>
            <div className='pb-4 pl-8 '>
              <p className='py-1'>Name      : {name}</p>
              <p className='py-1'>Email     : {email}</p>
              <p className='py-1'>Phone No. : {phone}</p>
              <div className='flex justify-start gap-3 py-3 items-center'>
                <p className='block text-blue-950  mb-2'>Role : </p>
                <select className='block w-32 px-3 py-2 text-sm border border-gray-500 rounded-md' value={newRole} onChange={handleChangeRole}>
                  {
                    Objects.values(Role).map((roles)=>(
                      <option key={roles} >{roles}</option>
                    ))
                  }
                    
                </select>
              </div>
            </div>
            <div className='flex justify-end'>
              <button className='bg-blue-400 w-fit px-2 py-1 rounded-md hover:bg-blue-700' onClick={handleUpdateRole}>Change</button> 
            </div>
        </div>
    </div>
  )
}

export default UpdateUserRole;