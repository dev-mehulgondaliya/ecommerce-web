import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { route } from '../../../routes'
import fetchApi from '../../../api/fetchApi'
import { adminApiList, webApiList } from '../../../api/apiList'
import { useCookies } from 'react-cookie'

function Login() {
  const {control, handleSubmit} = useForm()
  const location = useLocation()
  const [tokenCookies, setTokenCookie] = useCookies(['token']);
  const [userCookies, setUserCokkie] = useCookies(['user']);
  const navigate = useNavigate()
  const isAdmin = location.pathname.startsWith('/admin')


  const onSubmit = async (data) => {
    if(isAdmin){
      // admin signup
      const result =  fetchApi({
        apiName: adminApiList.adminLogin,
        method: 'POST',
        body: data,
        auth: false
      })
  
      if(result){
        setTokenCookie('token', result?.data.token)
        setUserCokkie('user', result?.data.user)
        navigate(route.product)
      }
    }else{
      // user signup
  
      const result = await fetchApi({
        apiName: webApiList.login,
        method: 'POST',
        body: data,
        auth: false
      })
      console.log(result?.data)
  
      if(result){
        setTokenCookie('token', result?.data.token)
        setUserCokkie('user', result?.data.user)
        navigate(route.product)
      }
    }
  }
  


  
  return (
    <div className='w-screen h-screen flex justify-center items-center p-1'>
        <form onSubmit={handleSubmit(onSubmit)} className='border rounded-md max-w-[300px] p-1 '>
          <h1 className='text-2xl font-bold text-center my-2'>Login form</h1>
<div className='flex flex-col gap-1'>

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
    <span>create new account </span><button type='button' className='text-blue-500' onClick={()=>navigate(isAdmin ? route.adminSignup : route.signup)}>signup</button>
  </div>
        </form>

    </div>
  )
}

export default Login