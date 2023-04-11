import React from 'react'
import { BsTrash } from 'react-icons/bs'
import {RiAddFill, RiSubtractFill} from 'react-icons/ri'
import { deleteCartItem,increaseQty , decreaseQty } from '../redux/productSlice'
import { useDispatch } from 'react-redux'


const CartProduct = ({_id,name,image,category,qty,total,price}) => {

    const dispatch = useDispatch()

    const handledeleteCartItem = (_id) =>{
        dispatch(deleteCartItem(_id))
    }
const handleIncrement = (_id) =>{
    dispatch(increaseQty(_id))
}
const handledecrement = (_id)=>{
    dispatch(decreaseQty(_id))
}

  return (
    <div className='bg-slate-200 p-2 flex min-h-[240px] rounded border-2 border-slate-300 w-full '>
       <div className='p-1 bg-white flex items-center overflow-hidden w-1/2 md:w-3/5 '>
              <img src={image} alt="" className='w-full object-fit ' />
       </div>
       <div className='  flex flex-col gap-1 mx-5 md:w-full w-1/2 relative'>
         <h3 className='font-semibold text-slate-700  text-lg  md:text-xl'>{name}</h3>
            <p className=' text-slate-500 '>{category?.toLowerCase()}</p>
            <p className=' font-bold'>
             <span> ₹</span><span>{1.5*price/2}</span><br />
             <span className='text-red text-xs font-base'>50%OFF{" "}</span>
             <span className='line-through px-1 text-red-400'>{1.5*price}</span>
             </p>
             <div className='flex justify-between w-full '>
             <div className='md:flex  gap-2 justify-center items-center'>
             <p className='whitespace-nowrap'>qty:{" "+qty}</p>
             <button className='bg-white md:h-1/2 hover:bg-slate-400'onClick={()=>{handleIncrement(_id)}}><RiAddFill/></button>
             <button className='bg-white md:h-1/2 hover:bg-slate-400' onClick={()=>{handledecrement(_id)}}><RiSubtractFill/></button>
             <button className='bg-yellow-400 text-black font-medium py-1 my-1 w-full min-w-[100px] rounded hover:bg-yellow-600'>Buy</button>
              
             </div>
             
             <div className='md:flex flex-row items-center font-medium text-slate-700'>
                <p>total: ₹ {qty*total}</p>
             </div>
             </div>
             {/* <div>
              <p className='text-slate-500 font-medium'>Description</p>
              <p>{description}</p>
             </div> */}
        
         <div className='text-red-500 text-bold hover:text-lg cursor-pointer absolute right-0'>
            <BsTrash onClick={()=>{handledeleteCartItem(_id)}} />
         </div>
         </div>
    </div>
  )
}

export default CartProduct
