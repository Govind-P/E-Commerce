import React,{useState} from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";  
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backendApi from '../common/api.js';
import { toast } from'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice.js';

const Header = () => {
  const user=useSelector(state=>state.user.user);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [menudisplay, setMenuDisplay]=useState(false);

  const handleLogout=async()=>{
    const res=await fetch(backendApi.user_Logout.url,{
      method:backendApi.user_Logout.method,
      credentials:'include'
    });
    const data=await res.json();
    console.log(data);
    if(data.success){
      toast.success(data.message);
      navigate('/login');
      dispatch(setUserDetails(null));
    }
    if(data.error){
      toast.error(data.message);
    }
  }
  return (
    <header className='h-16 shadow-md'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to="/">
            <Logo w={80} h={50}/>
          </Link>  
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input type='text' placeholder='search product here...' className='w-full outline-none' />
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                <GrSearch />
            </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            <div className='text-3xl cursor-pointer' onClick={()=>{setMenuDisplay((prev)=>!prev)}}>
              {
                user?.profileImage? (<img className='w-10 h-10 rounded-full' src={user?.profileImage} alt={user?.name}/>)
                : (<FaRegUserCircle />)
              }
              
            </div>
            {
              menudisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit py-2 px-1 shadow-lg rounded-sm'>
                <nav className='py-2'>
                  <Link to='/admin-panel' className='whitespace-nowrap hover:bg-slate-50 p-2' onClick={()=>{setMenuDisplay((prev)=>!prev)}}>Admin Panel</Link>
                </nav>
              </div>
              )
            }
            
          </div>
          <div className='text-2xl cursor-pointer relative'>
            <span><FaShoppingCart/></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          <div className='text-3xl'>
            {
              user?._id? 
              (<div className='text-2xl cursor-pointer' onClick={handleLogout}>
                <IoMdLogOut />
              </div>)
              :
              (<Link to='/login' className='px-2 py-1 rounded-md bg-blue-500 text-sm text-white flex justify-center hover:bg-blue-700'>LOGIN</Link>)
            }
            
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header;