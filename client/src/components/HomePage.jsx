import React from "react";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import userContext from "../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import ProfileDesk from "./ProfileDesk.jsx";
import Posts from "./Posts.jsx";

const HomePage = () => {
  const { color } = useContext(userContext);
  const navigate = useNavigate();

  const BrowserToken = Cookies.get("token");
  // console.log(BrowserToken);
  useEffect(() => {
    if (!BrowserToken) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{ background: color.bg, color: color.text }}
      className="h-screen bg-orange-500 flex justify-center gap-x-4"
    >
      <div
        style={{ background: color.bg, color: color.text }}
        className="w-1/5 flex flex-col justify-center"
      >
        <ProfileDesk />
      </div>
      <div
        style={{ background: color.bg, color: color.text }}
        className="bg-yellow-500 w-2/5 border-2"
      >
        <Posts />
      </div>
    </div>
  );
};

export default HomePage;
