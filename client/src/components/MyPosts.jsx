import React, { useContext } from "react";
import UserContext from "../context/UserContext.js";

const MyPosts = () => {
  const { color, Email1, UserPosts } = useContext(UserContext);
  // console.log(UserPosts);
  return (
    <div style={{background: color.bg}} className="flex flex-col gap-4 items-center">
  {UserPosts.map((user) => (
    <div style={{background: color.text, color: color.bg}} key={user._id} className="max-w-md w-full shadow-md p-4 rounded-md">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          className="w-12 h-12 rounded-full border-2 border-blue-500"
          alt=""
        />
        <p className="text-lg font-semibold">{user.fullName}</p>
      </div>
      <img src={user.post} className="mt-4 w-full rounded-md" alt="" />
    </div>
  ))}
</div>
  );
};

export default MyPosts;
