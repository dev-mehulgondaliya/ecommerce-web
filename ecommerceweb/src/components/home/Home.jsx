import React from 'react'
import { route } from '../../routes';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='w-screen h-screen flex justify-center items-center p-1'>
      <div className='border p-2 rounded-lg'>
      <h1 className='text-3xl font-bold mb-2'>Welcome to Home Page</h1>
          <span>Web</span>
        <div className='flex justify-center items-center gap-2'>
          <button className='bg-blue-500 text-white p-2 rounded-lg w-full' onClick={()=>navigate(route.login)}>Login</button>
          <button className='bg-blue-500 text-white p-2 rounded-lg w-full' onClick={()=>navigate(route.signup)}>signup</button>
          </div>  
          <span>Admin</span>
          <div className='flex justify-center items-center gap-2'>
          <button className='bg-blue-500 text-white p-2 rounded-lg w-full' onClick={()=>navigate(route.adminLogin)}>Login</button>
          <button className='bg-blue-500 text-white p-2 rounded-lg w-full' onClick={()=>navigate(route.signup)}>signup</button>
          </div>  
      </div>
    </div>
  )
}

export default Home