import React,{useState,useEffect} from 'react';
import backendApi from '../common/api.js';
import moment from 'moment';
import { FaUserEdit } from "react-icons/fa";
import {UpdateUserRole} from '../components/updateUserRole.js';

const AllUsers = () => {
  const [userEdit,setUserEdit]=useState(false);
  const [updateUser,setUpdateUser]=useState({
    name:'',
    email:'',
    phone:'',
    role:'',
  });
  const [allUsers,setAllUsers]=useState([]);


  const fetchAllUsers=async()=>{
    const res=await fetch(backendApi.all_users.url,{
      method:backendApi.all_users.method,
      credentials:'include',
    });
    const data=await res.json();
    if(data.success){
      setAllUsers(data.data);
    }
    if(data.error){
      console.log(data);
    }
  }

  useEffect(()=>{
    fetchAllUsers();
  },[]);

  return (
    <div className='bg-white p-5 '>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-blue-900 text-white'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='items-center justify-between p'>
          {allUsers.map((user,index)=>(
            <tr key={user?._id}>
              <td>{index+1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format('ll')}</td>
              <td className='py-2'>
                <button className='px-2 py-1 rounded-md bg-blue-300 text-sm hover:bg-blue-600' onClick={()=>{
                  setUserEdit(true);
                  setUpdateUser(user);
                  }}><FaUserEdit/></button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userEdit && (<UpdateUserRole 
        onClose={()=>{setUserEdit(false)}}
        name={updateUser.name}
        email={updateUser.email}
        userId={updateUser._id}
        phone={updateUser.phone}
        role={updateUser.role}
        callFunc={fetchAllUsers}/>)}    
      
    </div>
  )
}

export default AllUsers