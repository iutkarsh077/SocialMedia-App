import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.js';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {color, setEmail1, setFullName1, setUserName1, token}  = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(token){
          const profile = async () =>{
            
          }
          profile();
          navigate('/userProfile');
        }
        try {
          const loginData = {
            email: email,
            password: password,
          };
      
          const response = await axios.post('/api/v1/Login', loginData);
      
          
          const { email: responseDataEmail, fullName, username } = response.data.userdata;
      
          setEmail1(responseDataEmail);
          setFullName1(fullName);
          setUserName1(username);
      
          toast.success(response.data.msg, {
            duration: 2000,
            position: "top-center",
          });

          setTimeout(() => {
            navigate('/userProfile')
          }, 2000);
        } catch (error) {
          console.error(error);
      
          
          toast.error(error?.response?.data?.msg || 'An error occurred', {
            duration: 2000,
            position: "top-center",
          });
        }
      };
      

  const VisitToSignUp = () =>{
        navigate('/signup');
  }

  const handleShowPassword = () =>{
    setShowPassword(!showPassword);
  }

  return (
    <div style={{background: color.bg}} className="min-h-screen min-w-screen flex justify-center">
      <div className="p-8 h-1/2 mt-10 w-1/2 rounded shadow-md border-2">
        <Toaster/>
        <h2 style={{color: color.text}} className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label style={{color: color.text}} htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex">
            <label style={{color: color.text}} htmlFor="password" className="block pr-2 text-gray-600 text-sm font-medium mb-2">Password</label>
            <input type="checkbox"onChange={handleShowPassword}  checked={showPassword}/>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-between items-center">
              <p style={{color: color.text}} className='hover:text-blue-700 font-semibold hover:cursor-pointer' onClick={VisitToSignUp}>Dont Have an account?</p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
