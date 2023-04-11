import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import signupgif from "../assets/signup.gif";
import { Link , useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../utility/ImageToBase64";
import  { toast } from 'react-hot-toast';
 

const SignUp = () => {
  const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    image:""
   });
    console.log(data);
  const handleconfirmShowPassword = () => {
    setshowConfirmPassword((prev) => !prev);
  };

  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };
  const handleOnChange = (e)=>{

    const {name, value} = e.target
    setData((prev)=>{
      return {
         ...prev,
         [name] : value
      }
    }
    )
  }
  const handleProfileUpload = async (e)=>{
     const data =  await  ImageToBase64(e.target.files[0])
     console.log(data)
     setData((prev)=>{
      return {
        ...prev,
        image : data
      }
    })

  }
  console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async(e)=>{
      e.preventDefault()
      const {firstName , email, password,confirmPassword} = data
      console.log(data)
      if(firstName && email && password && confirmPassword){
        if(password === confirmPassword){
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
            method : 'POST',
            headers : {
              "content-type": "application/json"
            },
            body : JSON.stringify(data)
          })
          const dataRes = await fetchData.json()
          console.log(dataRes)
          // alert(dataRes.message)
           toast(dataRes.message)
          if(dataRes.alert){
          navigate('/login')
          }
            
        }
        else{
            alert("passwords do not match")
        }
      }
      else{
        alert("All fields are mandatory")
      }
  }
  return (
    <div className="p-3 md:p-4  ">
      <div className="w-full max-w-sm bg-white m-auto flex  items-center flex-col p-4 rounded-xl">
        {/* <h1 className='text-center text-2xl font-bold'>SignUp</h1> */}
        {/* <h4 className={!emailSuccess?"hidden":"text-red-600 italic bg-gray-400 shadow drop-shadow-md p-2 rounded-md"}>{emailSuccess}</h4> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-xl shadow-xl relative">
          <img src={data.image?data.image:signupgif} alt="" className="w-full h-full" />
          <label htmlFor="profileImage">
          <div className="absolute   bottom-0 h-1/4 bg-slate-400 bg-opacity-50 w-full text-center cursor-pointer">
            <p className="text-sm  text-white">upload</p>
          </div>
            <input type={"file"} id="profileImage" className="hidden" accept="image/*" onChange={handleProfileUpload}/>
          </label>
         
        </div>
        <form method="POST" className="w-full py-3" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="on"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-600"
            onChange={handleOnChange}
            value={data.firstName}
          />

          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            name="lastName"
            autoComplete="on"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-600"
            onChange={handleOnChange}
            value={data.lastName}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-green-600"
            onChange={handleOnChange}
            value={data.email}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 mt-1 mb-2 rounded  focus-within:outline focus-within:outline-green-600">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className=" w-full bg-slate-200  rounded border-none outline-none"
              autoComplete="on"
              onChange={handleOnChange}
              value={data.password}
            />
            <span className="flex text-xl" onClick={handleShowPassword}>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
          <label htmlFor="confirmpassword">confirm password</label>
          <div className="flex px-2 py-1 bg-slate-200 mt-1 mb-2 rounded  focus-within:outline focus-within:outline-green-600">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className=" w-full bg-slate-200  rounded border-none outline-none"
              autoComplete="on"
              onChange={handleOnChange}
              value={data.confirmPassword}
            />
            <span className="flex text-xl" onClick={handleconfirmShowPassword}>
              {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          <button className="max-w-[120px] bg-green-600 text-white h-8 w-20 rounded-md cursor-pointer">
            Sign Up
          </button>
        </form>
        <p className="text-red-500 text-xs underline">
          Already have an account ? <Link to={"/login"} >Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
