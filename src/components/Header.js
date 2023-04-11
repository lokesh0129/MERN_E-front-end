import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import {logOutRedux} from '../redux/userSlice'
import {toast }from 'react-hot-toast'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector(state=>state.user)
  console.log(userData)
 const dispatch = useDispatch()

  const handleShow = () =>{
    setShowMenu(prev => !prev); //it sets true as false and false as true
  }
  
  const handleLogOut =() =>{
      dispatch(logOutRedux())
      toast("logged out")
  }
  const cartItemNumber = useSelector(state=>state.product.cartItem)

 //console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full  justify-between pr-4">
        <Link to="">
          <div className="h-16">
            <img src={logo} alt="" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-2 md:gap-7">
          <nav className="flex flex-wrap gap-1  text-s md:text-xl hidden md:flex md:gap-4">
            <Link className="h-full bg-gray-500 text-white font-md p-1 px-2  rounded-lg" to={""}>Home</Link>
            <Link className="h-full bg-blue-900 text-white font-md p-1 px-2  rounded-lg" to={"menu/642be796e89df05eb00cccaf"}>Menu</Link>
            <Link className="h-full bg-slate-800 text-white font-md p-1 px-2  rounded-lg" to={"about"}>About</Link>
            <Link className="h-full bg-green-900 text-white font-md p-1 px-2  rounded-lg" to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-700 relative">
            <Link to={"cart"}>
            <FaShoppingCart />
            <div className="absolute -top-2 -right-1 text-white bg-red-500 text-xs h-4 w-4 text-center rounded-full">
            {cartItemNumber.length}
            </div>
            </Link>
          </div>
          <div className="text-slate-600" onClick={handleShow}>
            <div className="text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden shadow drop-shadow-md" >
             {
             userData.image ? <img src={userData.image} className="w-full h-full"/> :<HiOutlineUserCircle className="w-full h-full"/>
             }
            </div>
          
          {showMenu && (
            <div className="flex flex-col absolute top-16 right-2 shadow drop-shadow-md bg-white ">
            
              <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer p-1  bg-slate-400 text-black">New Product</Link>
              {
                userData.firstName? <p className="cursor-pointer text-white bg-red-500 p-1 text-center" onClick={handleLogOut}>Log out { userData.firstName}</p>:<Link to={"login"}  className="whitespace-nowrap cursor-pointer p-1 bg-blue-800 text-white text-center">Log in</Link>
              }
              <nav className="flex flex-col md:hidden  text-s md:text-xl   md:flex md:gap-4">
              <Link className="bg-gray-500 text-white font-md text-center" to={""}>Home</Link>
              <Link className="bg-blue-900 text-white text-center" to={"menu/642be796e89df05eb00cccaf5"}>Menu</Link>
              <Link className="bg-slate-900 text-white text-center" to={"about"}>About</Link>
              <Link className="bg-green-900 text-white text-center" to={"contact"}>Contact</Link>
          </nav>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
