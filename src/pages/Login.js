import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import signupgif from "../assets/signup.gif";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const [showPassword, setshowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //console.log(data);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataRes = await fetchData.json();
      console.log(dataRes);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      toast(userData.user.firstName + dataRes.message);
      //console.log("userData",userData.user);
    } else {
      alert("All fields are mandatory");
    }
  };
  return (
    <div className="p-3 md:p-4  ">
      <div className="w-full max-w-sm bg-white m-auto flex  items-center flex-col p-4 rounded-xl">
        {/* <h1 className='text-center text-2xl font-bold'>SignUp</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-xl shadow-xl">
          <img src={signupgif} alt="" />
        </div>
        <form method="POST" className="w-full py-3" onSubmit={handleSubmit}>
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

          <button className="max-w-[120px] bg-green-600 text-white h-8 w-20 rounded-md cursor-pointer">
            Log in
          </button>
        </form>
        <p className="text-red-500 text-xs underline">
          create an account ? <Link to={"/signup"}>signUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
