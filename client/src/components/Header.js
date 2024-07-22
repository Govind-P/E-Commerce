import React from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";  
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = () => {
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
          <div className='text-3xl cursor-pointer'>
            <FaRegUserCircle />
          </div>
          <div className='text-2xl cursor-pointer relative'>
            <span><FaShoppingCart/></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>
          <div className='text-3xl'>
            <Link to='/login' className='px-2 py-1 rounded-md bg-blue-500 text-sm text-white flex justify-center hover:bg-blue-700'>LOGIN</Link>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header;