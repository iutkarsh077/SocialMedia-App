import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import userContext from "../context/UserContext.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cld from "../../utils/Cloudinary.js";
import CloudinaryUploadWidget from "../context/CloudinaryUploadWidget.jsx";
import "./scrollbar.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const { UserAvatar, fullName1, Email1, userName1, setUserAvatar, setFullName1, color } = useContext(userContext);
  const [MyUserAvatar, setMyUserAvatar] = useState(UserAvatar);
  const [MyfullName, setMyFullName] = useState("");
  const [password, setPassword] = useState("");
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

  const BrowserToken = Cookies.get("token");
  // console.log(BrowserToken);
  useEffect(() => {
    if (!BrowserToken) {
      navigate("/");
    }
  }, []);

  const updateDetails1 = {
    fullName: MyfullName == "" ? fullName1 : MyfullName,
    password: password,
    avatar: UserAvatar,
    email: Email1,
  };

  // console.log(updateDetails1);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if(updateDetails1.password == ""){
        toast.error("Fill Current Password", {
          duration: 2000,
          position: "top-center",
        });
        return;
    }
    try {
      await axios.post("/api/v1/updateUserDetails", updateDetails1).then((res) => {
        // console.log(res);
        setUserAvatar(res.data.userData.avatar);
        setFullName1(res.data.userData.fullName);
        toast.success(res.data.msg, {
          duration: 2000,
          position: "top-center",
        });
      });
    } catch (error) {
      console.log(error);
      toast.error(error.data, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div style={{background: color.bg}} className="flex flex-col items-center justify-center p-4 max-w-screen-md mx-auto">
      <Toaster />
      <h2 style={{color: color.text}}  className="text-2xl font-bold mb-4">Update Profile</h2>
      <form className="bg-white p-4 rounded-lg shadow-md w-full">
        <div className="mb-4">
          <img
            src={UserAvatar}
            className="cursor-pointer rounded-full w-20 h-20 mx-auto mb-2 border-4 border-white"
            alt="avatar"
          />
          <div className="flex justify-center">
            <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
          </div>
        </div>
        <div className="mb-4">
          <input
            value={MyfullName}
            type="text"
            onChange={(e) => setMyFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter your New Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleUpdateUser}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
