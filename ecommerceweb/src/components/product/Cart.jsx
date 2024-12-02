import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import { adminApiList, webApiList } from '../../api/apiList';
import fetchApi from '../../api/fetchApi';
import { route } from '../../routes';

function Cart() {
  const location = useLocation()
  const [userCookies, setUserCokkie] = useCookies(['user']);
  const navigate = useNavigate()
  const isAdmin = location.pathname.startsWith('/admin')
  const [cartList, setCartList] = useState([])

  const getCartList = async () => {
    const result = await fetchApi({
      apiName: isAdmin ? adminApiList.getCart : webApiList.getCart,
      method: 'POST',
      body: {
        "userId": userCookies.user?._id,
      }
    })
    console.log(result)
    if(result?.data){
      setCartList(result?.data)
    }
  }
  useEffect(() => {
    getCartList()
  }, [])

  const removeTocart = async (productId) => {
    const result = await fetchApi({
      apiName: isAdmin ? adminApiList.updateCart : webApiList.updateCart,
      method: 'PUT',
      body: {
        "type": 'remove',
        "productId": productId,
        "userId": userCookies.user?._id,
      }
    })
    if(result?.data){
      alert('Product added to cart')
      getCartList()
    }
  }

  return (
    <div className='p-1 max-h-full'>
      <h1 className='text-2xl font=bold'>Cart List</h1>
      {
        cartList?.map((item, index) => {
          const {productId,quantity} = item?.products[0]  
          if(quantity === 0){
            return <div>
              <span>no any item in cart</span>
              <button className='bg-blue-400 p-2 text-white' onClick={()=> navigate(route.product)}>Go to product</button>
            </div>
          }
          return (
            <div key={index} className='border rounded p-1'>
        <div className='w-full h-[100px] aspect-square bg-gray-100'>
{/* image */}
<img src={item?.image} alt="" className='w-full h-full object-cover' />
        </div>
        <div className='flex justify-between'>
          <span>
            product Name : {productId?.title}
          </span>
          <div className='flex flex-col gap-2'>
          <span>
            Price : $ {productId?.price}
          </span>
          <span>
            Qty : {quantity}
          </span>
          </div>
        </div>
        <button className='w-full rounded p-2 bg-blue-500 text-white hover:bg-blue-700' onClick={()=>navigate(`${route.product}/${productId?._id}`)}>Show Full Details</button>
        <button className='w-full mt-2 rounded p-2 bg-blue-500 text-white hover:bg-blue-700' onClick={()=>removeTocart(productId?._id)} >remove to cart</button>
      </div>
          )
        })
      }
    </div>
  )
}

export default Cart