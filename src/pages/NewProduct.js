import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import {ImageToBase64} from'../utility/ImageToBase64'
import  { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";

const NewProduct = () => {
  const userData = useSelector(state=>state.user)
  console.log(userData.email)
  const [data ,setData] = useState({
    name : "",
    category : "",
    image : '',
    price : "",
    description : ""
  })

  const handleOnChange =(e) =>{
    const {name , value} = e.target
    setData((prev)=>{
      return {
         ...prev,
         [name] : value
      }
    } 
  )

  }
  
  const uploadImage = async(e) =>{
    const data =  await  ImageToBase64(e.target.files[0])
    //console.log(data)
    setData((prev)=>{
      return {
        ...prev,
        image : data
      }
    })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log(data)
   
    const {name , image ,category , price} = data

    if(name && image && category && price){


      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method : 'POST',
        headers : {
          "content-type": "application/json"
        },
        body : JSON.stringify(data)
      })
      const fetchRes = await fetchData.json()
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return {
          name : "",
          category : "",
          image : '',
          price : "",
          description : ""
        }
      })
    }
    else{
      toast('Enter required fields')
    }
     

  }

  return (
    <>
    {
       userData.email === process.env.REACT_APP_ADMIN_EMAIL
      ? 
   (
    <div className="p-4">
      <form
        action=""
        className="m-auto w-full max-w-md p-3 shadow drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] flex flex-col bg-white rounded border border-solid border-zinc-600"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>

        <input
          type={"text"}
          name="name"
          onChange={handleOnChange}
          className="my-1 bg-gray-200 p-1 rounded focus-within:outline-green-600"
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select  id="category" name="category"  className="my-1 bg-gray-200 p-1 rounded focus-within:outline-green-600" onChange={handleOnChange} value={data.category}>
          <optgroup label="Essential">
            Essential
            <option value="other">select a category</option>
            <option value={"Fruits"}>Fruits</option>
            <option value={"Vegitables"}>Vegetables</option>
            <option value={"Icecream"}>Icecream</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value={"Snacks"}>Snacks</option>
            <option value="cake">Cake</option>
            <option value="toys">Toys</option>
          </optgroup>
          <optgroup label="Gadgets">
            <option value="Mobiles">mobiles</option>
            <option value="Laptop">Laptops</option>
            <option value="AudioDevices">AudioDevices</option>
          </optgroup>
        </select>

        <label htmlFor="image">Image
        <div
           
          className="h-40 w-full bg-slate-400 my-1 rounded flex items-center justify-center cursor-pointer"
        >
          {
            data.image?<img src={data.image} alt="" className="h-full " />:<span className="text-5xl"><BsCloudUpload /></span>
          }
          
          
          <input type="file" accept="image/*" name="" id="image" onChange={uploadImage} className="hidden " />
        </div>
        </label>
        

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input name="price" type="text" className="my-1 bg-gray-200 p-1 rounded focus-within:outline-green-600" onChange={handleOnChange} value={data.price} />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          name="description"
          onChange={handleOnChange}
          value={data.description}
          className="my-1 bg-gray-200 p-1 rounded resize-none focus-within:outline-green-600"
        />

        <button className="bg-green-600 text-white hover:bg-green-700 text-xl font-medium font-serif drop-shadow-md my-1">
          UP LOAD
        </button>
      </form>
    </div>
   ):(
   <div className=" flex items-center m-auto p-auto  justify-center font-serif bg-red-500 w-fit flex-col">
    <h1 className="flex  items-center text-white text-xl justify-center w-full h-full m-2">Only admin can add products </h1>
    <small className="text-xs text-white cursor-pointer" title="id: lokesh1@gmail.com , password:1234">to add admin details are here</small>
    </div>
   )
        }
    </>
     
  );
};

export default NewProduct;
