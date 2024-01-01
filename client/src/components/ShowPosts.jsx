import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ShowPosts = () => {
        const [UserPosts, setUserPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async () =>{
            await axios.get("/api/v1/postsFetch").then((res)=>{
                //  console.log(res);
                 setUserPosts(res.data.result);
            }).catch((error)=>{
                console.log(error);
            })
        }
        fetchPosts();
    }, [])
    // console.log(UserPosts);
  return (
    <div>
    {UserPosts.map((user) => (
      <div key={user._id}>
        {user.posts.map((post) => (
          <div key={post._id} className='p-5 gap-y-6'>
            <div className="flex bg-red-500 items-center gap-x-4 p-4 rounded-t-md">
            <img
          src={post.avatar}
          className="cursor-pointer rounded-full w-10 h-10 border-4 border-blue-500"
          alt="avatar"
        />
            <p className='text-xl'>{post.fullName}</p>
            </div>
            <img src={post.post} alt="Post" /> 
            
          </div>
        ))}
      </div>
    ))}
  </div>
  )
}

export default ShowPosts
