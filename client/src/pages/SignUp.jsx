import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sign from "../components/Sign.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserProfile from '../components/UserProfile.jsx'
import Login from "../components/Login.jsx";
import HomePage from "../components/HomePage.jsx";
import MyPosts from "../components/MyPosts.jsx";
const SignUp = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Sign />}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/myPosts" element={<MyPosts/>}/>
      </Routes>
    </Router>
  );
};

export default SignUp;
