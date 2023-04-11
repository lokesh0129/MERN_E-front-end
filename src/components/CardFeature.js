import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import { useDispatch } from 'react-redux'

const CardFeature = ({image,name,price,category,id}) => {
    const discount = Math.floor(Math.random()*20)
   
    const  dispatch = useDispatch()
    const handleCardProduct = (e)=>{
             
            dispatch(addCartItem( {
              _id: id,
              name: name,
              price: price,
              category: category,
              image: image
            }))
    }
  return (
    <div className='w-fit min-w-[200px] max-w-[200px]  bg-white shadow-xl py-5 px-4 hover:shadow-gray-200 drop-shadow-s cursor-pointer rounded-md'>
       {name&&( <> <Link to={`/menu/${id}`} onClick={()=>{window.scrollTo({top:"0",behaviour:'smooth'})}}>
        <div className='h-28 flex justify-center items-center'>
               <img src={image} alt=""  className='h-full rounded h-28'/>
       </div>
      <h3 className='font-semibold text-slate-700  text-lg mt-4 whitespace-nowrap overflow-hidden'>{name}</h3>
            <p className='text-slate-500 font-medium'>{category?.toLowerCase()}</p>
            <p className=' font-bold'>
             <span>₹</span><span>{price - Math.floor((discount/100)*price)}</span><br />
             <span className='text-red text-xs font-base'>{discount}%OFF{" "}</span>
             <span className='line-through px-1 text-red-400'>{price}</span>
             </p>
             </Link>  
             <button className='bg-yellow-400 text-black font-medium py-1 my-1 w-full rounded hover:bg-yellow-600'
             onClick={()=>{handleCardProduct()}}>
              Add Cart</button></>)
           }
             
    </div>
  )
}

export default CardFeature
