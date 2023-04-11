import React from 'react'
import { BsFilter } from 'react-icons/bs'
// import {CiForkAndKnife} from  'react-icons/ci'

const FilterProduct = ({category , onClick}) => {
  return (
    <div onClick={onClick}>
    <div className='text-2xl p-5 bg-yellow-500 rounded-full cursor-pointer'>
      <BsFilter />
    </div>
    <p className='text-center font-medium'>{category}</p>
    </div>
  )
}

export default FilterProduct
