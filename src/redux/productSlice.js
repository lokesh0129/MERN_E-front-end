import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    productList : [],
    cartItem :[]
}
export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setDataProduct : (
            (state,action)=>{
                console.log(action)
                state.productList = [...action.payload]
            }
        ),
        addCartItem : (state,action)=>{
            const check =  state.cartItem.some((e)=>e._id === action.payload._id)
            if(check){
                const index = state.cartItem.findIndex((e)=> e._id === action.payload._id)
                const quantity = state.cartItem[index].qty
                state.cartItem[index].qty  += 1 
            }
            else{
                const total = action.payload.price
           state.cartItem = [...state.cartItem,{...action.payload , qty:1 , total:total}]
           console.log(state.cartItem)
            }
        },
        deleteCartItem : (state,action)=>{
          console.log(action.payload)
          toast("Item deleted")
          const index = state.cartItem.findIndex((e)=> e._id === action.payload)
          console.log(index)
          state.cartItem.splice(index, 1)
        },
        increaseQty : (state,action)=>{
            const index = state.cartItem.findIndex((e)=> e._id === action.payload)
            const quantity = state.cartItem[index].qty
            state.cartItem[index].qty  += 1 
        },
        decreaseQty :(state,action)=>{
            const index = state.cartItem.findIndex((e)=> e._id === action.payload)
            const quantity = state.cartItem[index].qty
            if(quantity >1){
               state.cartItem[index].qty  -= 1  
            }
            
        },
    }
})

export const {setDataProduct,addCartItem,deleteCartItem,decreaseQty,increaseQty}  =  productSlice.actions
export default productSlice.reducer