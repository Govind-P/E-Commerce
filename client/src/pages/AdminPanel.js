import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from'react-router-dom';

const AdminPanel = () => {
  const user=useSelector(state=>state.user.user);
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-slate-50 min-h-full w-full max-w-60 customShadow'>
          <div className=' p-2 h-36 flex justify-center items-center flex-col'>
            <div className='text-5xl relative  justify-center' >
              {
                user?.profileImage? (<img className='w-20 h-20 rounded-full' src={user?.profileImage} alt={user?.name}/>)
                : (<FaRegUserCircle />)
              }
            </div>
            <p className='capitalize text-sm font-semibold'>{user?.name}</p>
            <p className='text-sm font-light'>{user?.role}</p>
          </div>
          <div >
            <nav className='grid'>
              <Link to='' className='hover:bg-slate-100 p-3 px-4'>All Admins</Link>
              <Link to='all-users' className='hover:bg-slate-100 p-3 px-4'>All Users</Link>
              <Link to='all-products' className='hover:bg-slate-100 p-3 px-4'>All Products</Link>
            </nav>
          </div>
        </aside>

        <main className='h-full w-full p-2 '>
            <Outlet/>
        </main> 
    </div>
  )
}

export default AdminPanel;