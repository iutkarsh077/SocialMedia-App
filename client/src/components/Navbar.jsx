import React, { useContext, useState} from 'react'
import { MdNightlight } from "react-icons/md";
import UserContext from '../context/UserContext.js';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const {color, setColor} = useContext(UserContext);
  const toggleMode = () => {
    // console.log("Before", color);
    const newColor = {
      bg: color.bg === 'black' ? 'white' : 'black',
      text: color.text === 'white' ? 'black' : 'white',
    };

    setColor(newColor);
    // console.log("After", color)
  };

  return (
    <div style={{ background: color.bg }} className='bg-${color.bg} max-w-full pl-5 pr-5 h-20'>
    <div className="flex justify-between h-full items-center">
      <div style={{color: color.text}} className='text-lg font-semibold'>Sticky</div>
      <MdNightlight onClick={toggleMode} style={{color: color.text}} className='text-2xl cursor-pointer hover:opacity-70' />
     <div className='flex gap-x-4'>
     <div style={{color: color.text}} className="font-bold"><Link to={"/home"}>Home</Link></div>
      <div style={{color: color.text}} className="font-bold"><Link to={"/userProfile"}>Profile</Link></div>
      <div style={{color: color.text}} className="font-bold"><Link to={"/myPosts"}>My Posts</Link></div>
     </div>
    </div>
  </div>
  )
}

export default Navbar;
