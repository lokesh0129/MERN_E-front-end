import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
 
const Cart = () => {
    const productCartItem = useSelector(state=>state.product.cartItem)
    console.log(productCartItem)

   
      const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
      );
      const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty)*parseInt(curr.price),
        0
      );

  return (
    <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Cart items</h2>
        
        <div className='my-4 md:flex shrink-1'>
            {/* display cart items */}
                <div className=' flex flex-col  shrink-1 grow-1 max-w-3xl  '>
                     {
                        productCartItem.map((e)=>{
                            return (
                                <CartProduct 
                                key={e._id}
                                _id={e._id}
                                name={e.name}
                                image={e.image}
                                category={e.category}
                                price = {e.price}
                                qty= {e.qty}
                                total = {e.total}
                                />
                            )
                        })
                     }
                </div>
             
           
           {/* number of cart items */}
           <div className="md:w-1/2 md:flex flex-col md:min-w-[300px] shrink-[2] max-w-md  mx-auto ">
            <h2 className="bg-slate-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white hover:bg-red-600">
              Payment
            </button>
          </div>
        </div>
    </div>
  )
}

export default Cart
