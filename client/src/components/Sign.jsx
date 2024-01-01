import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Cookies from 'js-cookie';

const Sign = () => {
  const { color, setEmail1, setFullName1 } = useContext(UserContext);
  const [Email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail1(Email);
    setFullName1(fullName);
    const userData = {
      Email: Email,
      password: password,
      fullName: fullName,
    };
    console.log(userData);
    await axios
      .post("/api/v1/register", userData)
      .then((response) => {
        console.log(response);
        Cookies.set('token', response.data.token, {expires: 1 });
        toast.success(response.data.msg, {
          duration: 2000,
          position: "top-center",
        });
        
        setTimeout(() => {
          navigate('/userProfile')
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.msg, {
          duration: 2000,
          position: "top-center",
        });
      });
  };
  const handleVisibilityPassword = () => {
    setShowPassword(!showPassword);
  };

  const VisitToLogin = () =>{
    navigate('/');
  }

  return (
    <div
      style={{ background: color.bg }}
      className={"text-${color.black} h-screen flex justify-center"}
    >
      <div className={"w-2/5 border-2 rounded-md h-3/5"}>
        <form className="flex flex-col h-full gap-y-5 pl-10  pr-10 justify-center">
          <label style={{ color: color.text }}>Full Name</label>
          <input
            type="text"
            className="rounded-md text-black pl-1 border-2 border-black"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
          <label style={{ color: color.text }}>Email</label>
          <input
            type="email"
            className="rounded-md border-black pl-1 text-black  border-2"
            value={Email}
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{ color: color.text }}>
            Password
            <input
              type="checkbox"
              onChange={handleVisibilityPassword}
              checked={showPassword}
              className="ml-2"
            />
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border-black pl-1 text-black border-2"
            autoComplete="current-password"
          />
          <div className="flex justify-between items-center">
             <p style={{color: color.text}} className='hover:text-blue-700 font-semibold hover:cursor-pointer' onClick={VisitToLogin}>Already Have an account?</p>
            <button
              type="submit"
              style={{ color: color.text }}
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default Sign;
