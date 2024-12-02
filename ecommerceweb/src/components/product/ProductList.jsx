import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { route } from '../../routes'
import { adminApiList, webApiList } from '../../api/apiList'
import fetchApi from '../../api/fetchApi'
import { useCookies } from 'react-cookie'

function ProductList() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [userCookies, setUserCokkie] = useCookies(['user']);
  const [productList, setProductList] = useState([])
  const [search, setSearch] = useState('')

  const getProductList = async (search) => {
 

    const result = await fetchApi({
      apiName: isAdmin ? adminApiList.listProduct : webApiList.listProduct,
      method: 'POST',
      body: {
        "search": search ?? "",
        "page": 1,
        "limit": 10
    }
    })
    console.log(result)

    if(result?.data){
      setProductList(result.data)
    }
}

const addtoCart = async (productId) => {
  const result = await fetchApi({
    apiName: isAdmin ? adminApiList.updateCart : webApiList.updateCart,
    method: 'PUT',
    body: {
      "type": 'add',
      "productId": productId,
      "userId": userCookies.user?._id,
    }
  })
  if(result?.data){
    alert('Product added to cart')
  }
}


useEffect(()=>{
  getProductList()
},[])

  return (
    <div className='p-1 max-h-full'>
      <div className='grid grid-cols-1 h-full gap-2'>
        

        {/* cart list */}
        <div className='w-full h-full rounded border p-1'>
        <h1  className='text-2xl font-bold'>Cart</h1>
        <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600' onClick={()=>navigate(route.cart)}>Go to Cart</button>
        </div>

        {/* product */}
        <div className='w-full h-full rounded border p-1 overflow-hidden'>
          <h1 className='text-2xl font-bold'>Product List</h1>
          <div className='h-full w-full mt-2 overflow-hidden'>
            <div className='flex gap-2 items-center'>
              <input type="text" placeholder='Search product...' value={search} onChange={(e)=>setSearch(e.target.value)} className='border w-full rounded p-1' />
              <button className='bg-blue-500 shrink-0 text-white p-2 rounded hover:bg-blue-600' onClick={()=>getProductList(search)}>Search</button>
            </div>
            {/* product list */}
            <div className='w-full grid sm:grid-cols-2 mt-2 gap-2 overflow-hidden'>
              {
                productList?.map((item,index)=>{
                  return (
                    <div key={index} className='border rounded p-1'>
                <div className='w-full h-[100px] aspect-square bg-gray-100'>
{/* image */}
<img src={item?.image} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='flex justify-between'>
                  <span>
                    {item?.title}
                  </span>
                  <span>
                    $ {item?.price}
                  </span>
                </div>
                <button className='w-full rounded p-2 bg-blue-500 text-white hover:bg-blue-700' onClick={()=>navigate(`${route.product}/${item?._id}`)}>Show Full Details</button>
                <button className='w-full mt-2 rounded p-2 bg-blue-500 text-white hover:bg-blue-700' onClick={()=>addtoCart(item?._id)}>Add to cart</button>
              </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList