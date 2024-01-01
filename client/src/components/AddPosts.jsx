import React, { useEffect } from "react";
import AddPostsCloudinary from "../context/AddPostCloudinary.jsx";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import userContext from "../context/UserContext.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddPosts = () => {
    const {Posts, setPosts, Email1, fullName1, UserAvatar} = useContext(userContext);
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dakddv1pm");
  const [uploadPreset] = useState("jrwu77yw");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    multiple: false,
    maxImageFileSize: 5000000,
    theme: "purple",
  });
  // console.log(Posts);

  const MyPost = {
    Posts: Posts,
    Email1: Email1,
    fullName: fullName1,
    userAvatar: UserAvatar
  }

  useEffect(()=>{
    if(Posts == ""){
        return;
    }
       const savePostUrl = async ()=>{
                await axios.post('api/v1/savePostsUrl', MyPost).then((res)=>{
                    // console.log(res);
                    setPosts("");
                    toast.success(res.data.msg, {
                        duration: 2000,
                        position: "top-center",
                    })
                    
                }).catch((err)=>{
                    console.log(err);
                })
        }
        savePostUrl();
  }, [Posts])

  return (
    <div className="h-1/6 flex flex-row gap-x-5 justify-center items-center gap-y-5 bg-orange-500 ">
        <Toaster/>
      <p className="text-3xl font-bold">Share a Post</p>
      <div className="flex justify-center">
            <AddPostsCloudinary uwConfig={uwConfig} setPublicId={setPublicId} />
          </div>
    </div>
  );
};

export default AddPosts;
