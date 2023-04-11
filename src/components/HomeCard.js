import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({name ,image,category,price,id}) => {
  return (
    <div className='bg-slate-200 p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)] rounded-md'>
      {
        name ? (
            <>
            <Link to={`/menu/${id}`} onClick={()=>{window.scrollTo({top:"0",behaviour:'smooth'})}}>
            <div className='w-40'>
            <img src={image} alt="" className='w-full h-36' />
            </div>
            <h3 className='font-semibold text-slate-700 text-center text-lg'>{name}</h3>
            <p className='text-center text-slate-500 font-medium'>{category?.toLowerCase()}</p>
            <p className='text-center font-bold'>
             <span> ₹</span><span>{1.5*price/2}</span><br />
             <span className='text-red text-xs font-base'>50%OFF{" "}</span>
             <span className='line-through px-1 text-red-400'>{1.5*price}</span>
             </p>
             </Link>
             </>
        ):<div className='w-40 h-40 bg-gray-200 flex items-center justify-center relative'>
            <div className='bg-blue-500 animate-ping absolute  w-1/4 h-1/4 rounded-full'></div>
        </div>
      }
    </div>
  )
}

export default HomeCard
