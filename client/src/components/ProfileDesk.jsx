import React from "react";
import UserProfile from "./UserProfile.jsx";
import { useContext } from "react";
import Cookies from "js-cookie";
import userContext from "../context/UserContext.js";
import { useNavigate } from "react-router-dom";
const ProfileDesk = () => {
  const {
    UserAvatar,
    fullName1,
  } = useContext(userContext);
  const navigate = useNavigate();
  const handleAddAccount = () => {
    navigate("/");
  };

  const handleLogout = () => {
    Cookies.set("token", "");
    navigate("/");
  };

  const handleUpdateAccount = () => {
    navigate("/userProfile");
  };
  return (
    <div className="max-w-full flex gap-5 flex-col">
      <div className="text-xl font-semibold pl-28">Profile</div>
      <div className="mt-5 flex flex-col items-center">
        <img
          src={UserAvatar}
          className="cursor-pointer rounded-full w-24 h-24 mx-auto mb-2 border-4 border-blue-500"
          alt="avatar"
        />
        <div className="text-2xl pt-5">{fullName1}</div>
      </div>
      <div className="flex flex-col items-center text-lg mt-5 gap-5">
        <div
          className="bg-blue-500 w-full flex justify-center p-5 rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:ease-out"
          onClick={handleAddAccount}
        >
          Add another account
        </div>
        <div
          className="bg-blue-500 w-full flex justify-center p-5 hover:cursor-pointer rounded-lg hover:bg-blue-700 hover:ease-out"
          onClick={handleUpdateAccount}
        >
          Update Account
        </div>
        <div
          className="bg-red-500 w-full flex justify-center p-5 hover:cursor-pointer rounded-lg hover:bg-red-700 hover:ease-out"
          onClick={handleLogout}
        >
          LogOut
        </div>
      </div>
    </div>
  );
};

export default ProfileDesk;
