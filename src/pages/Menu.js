import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CardFeature from '../components/CardFeature'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
  const  { filterby } = useParams()
   
  console.log(filterby)
  const productData =   useSelector((state)=>state.product.productList)
  console.log(productData)
  
  
  // const  productFilterData = (async()=>{const productFilterData  = await  productData.filter((e)=>{return  filterby === e._id})
  //   return productFilterData })()
    const productFilterData  =   productData.filter((e)=>{return  filterby === e._id})
  const productFilter = productFilterData[0]
  const filterCategory = productFilter.category
  console.log(productFilter)
  const [dataFilter , setDataFilter] = useState([])

  useEffect(() => {
      setDataFilter(productData.filter((e)=>{return e.category === filterCategory}))
  },[productData])

  const  dispatch = useDispatch()
  const handleCardProduct = (e)=>{
          // e.stopPropagation()
          dispatch(addCartItem(productFilter))
  }
  return (
    <div className='p-2 md:p-4  overflow-y-scroll scrollbar-hide'>
      <div className='w-full max-w-2xl bg-white m-auto rounded-l-md md:flex '>
         <div className='max-w-sm md:min-w-[300px] shadow drop-shadow-md overflow-hidden rounded-l-md md:flex items-center justify-center'>
          <img src={productFilter.image} alt={productFilter.name} className='h-full w-full hover:scale-105 transition-all ' />
         </div>
         <div className='flex flex-col gap-1 mx-5'>
         <h3 className='font-semibold text-slate-700  text-lg  text-2xl'>{productFilter.name}</h3>
            <p className=' text-slate-500 font-medium'>{productFilter.category?.toLowerCase()}</p>
            <p className=' font-bold'>
             <span> ₹</span><span>{1.5*productFilter.price/2}</span><br />
             <span className='text-red text-xs font-base'>50%OFF{" "}</span>
             <span className='line-through px-1 text-red-400'>{1.5*productFilter.price}</span>
             </p>
             <div className='md:flex gap-2'>
             <button className='bg-yellow-400 text-black font-medium py-1 my-1 w-full min-w-[100px] rounded hover:bg-yellow-600'>Buy</button>
             <button className='bg-yellow-400 text-black font-medium py-1 my-1 w-full min-w-[100px] rounded hover:bg-yellow-600' onClick={handleCardProduct}>Add Cart</button>
             </div>
             <div>
              <p className='text-slate-500 font-medium'>Description</p>
              <p>{productFilter.description}</p>
             </div>
         </div>
      </div>
        <div className=' '>
        <h2 className='font-bold text-2xl text-slate-800 mb-3 '> Similar Products </h2>  
         <div className='flex flex-wrap gap-2 justify-center mt-4 w-full'>
              {
                dataFilter.map((e)=>{
                  return (
                    <CardFeature  
                     key={e._id}
                     id={e._id}
                     image ={e.image}
                     name = {e.name}
                     price = {e.price}
                     category={e.category}
                    />
                  )
                })
              }
         </div>
        </div>
    </div>
  )
}

export default Menu
