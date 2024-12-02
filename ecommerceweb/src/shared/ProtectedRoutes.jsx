import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { route } from '../routes';

function ProtectedRoutes({Component}) {

    const [tokenCookies, setTokenCookie] = useCookies(['token']);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!tokenCookies.token){
            navigate(route.login)
        }
    }, [])
  return (
    tokenCookies?.token ?  <Component /> : null
  )
}

export default ProtectedRoutes