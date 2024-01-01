import React, { useEffect } from "react";
import UserContext from "./UserContext.js";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContextProvider = ({ children }) => {
  // const borderColor = 'white';
  const [color, setColor] = useState({ bg: "black", text: "white" });
  // console.log(Bg)
  const [Email1, setEmail1] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [userName1, setUserName1] = useState("");
  const [UserAvatar, setUserAvatar] = useState("");
  const [UserPosts, setUserPosts] = useState([]);
  const [Posts, setPosts] = useState("");
  useEffect(() => {
    const fetchData = async () =>{
      const token = {
        token: Cookies.get("token"),
      }
      try {
        const response = await axios.post("/api/v1/profile", token);
        // console.log(response);
        
        setEmail1(response.data.mydata.email);
        setFullName1(response.data.mydata.fullName);
        setUserName1(response.data.mydata.userName);
        setUserAvatar(response.data.mydata.avatar);
        setUserPosts(response.data.mydata.posts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  // console.log(UserPosts);
  return (
    <UserContext.Provider
      value={{
        color,
        setColor,
        Email1,
        fullName1,
        userName1,
        setEmail1,
        setFullName1,
        setUserName1,
        UserAvatar,
        setUserAvatar,
        Posts, 
        setPosts,
        UserPosts
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
