import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { route } from '../../../routes'
import { useLocation, useNavigate } from 'react-router'
import { adminApiList, webApiList } from '../../../api/apiList'
import fetchApi from '../../../api/fetchApi'

function Signup() {
  const {control, handleSubmit} = useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = location.pathname.startsWith('/admin')

  const onSubmit = async (data) => {
    if(isAdmin){
      // admin signup
      const result = await fetchApi({
        apiName: adminApiList.signup,
        method: 'POST',
        body: data,
        auth: false
      })

      if(result){
        navigate(route.adminLogin)
      }
    }else{
      // user signup

      const result = await fetchApi({
        apiName: webApiList.signup,
        method: 'POST',
        body: data,
        auth: false
      })

      console.log("🚀 ~ onSubmit ~ result:", result)
      if(result){
        navigate(route.login)
      }
    }
  }

  
  return (
    <div className='w-screen h-screen flex justify-center items-center p-1'>
        <form onSubmit={handleSubmit(onSubmit)} className='border rounded-md max-w-[300px] p-1 '>
          <h1 className='text-2xl font-bold text-center my-2'>Signup form</h1>
<div className='flex flex-col gap-1'>
<Controller
  control={control}
  name= 'name'
  rules={{
    required: 'Name is required'
  }}
  render={({field, fieldState: {error}}) => {
    return (
      <div>
        <label>Name</label>
        <input {...field} type='text' placeholder='Enter name...' className='border w-full rounded p-1' />
        {error && <span className='text-red-500'>{error.message}</span>}
      </div>
    )
  }}
    
  
/>
<Controller
  control={control}
  name= 'email'
  rules={{
    required: 'Email is required'
  }}
  render={({field, fieldState: {error}}) => {
    return (
      <div>
        <label>Email</label>
        <input {...field} type='text' placeholder='Enter Email...' className='border w-full rounded p-1' />
        {error && <span className='text-red-500'>{error.message}</span>}
      </div>
    )
  }}
    
  
/>
<Controller
  control={control}
  name= 'password'
  rules={{
    required: 'Password is required'
  }}
  render={({field, fieldState: {error}}) => {
    return (
      <div>
        <label>Password</label>
        <input {...field} type='password' placeholder='Enter password...' className='border w-full rounded p-1' />
        {error && <span className='text-red-500'>{error.message}</span>}
      </div>
    )
  }}
    
  
/>
</div>
    <button type='submit' className='bg-blue-500 text-white p-1 rounded my-2 w-full'>Submit</button>
    <div>
    <span>we have already account </span><button type='button' className='text-blue-500' onClick={()=>navigate(isAdmin ? route.adminLogin : route.login)}>login</button>
  </div>
        </form>
    </div>
  )
}

export default Signup