import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = ({ onClick }) => {
  const navigate = useNavigate();

  const userLoggedIn = localStorage.getItem("userLoggedIn");
  const parsedUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;

  const handleLogout = () => {
    alert("Logged out");
    localStorage.removeItem("userLoggedIn");
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="w-full  bg-sky-500/10 text-white p-2 m-auto flex justify-between items-center border rounded-2xl mb-1.5">
      <div className="text-2 sm:text-xl font-bold">
        <span className=" text-xs sm:text-xl">
          Hi {parsedUser ? parsedUser.name : "Guest"}
        </span>
      </div>

      <button
        onClick={onClick}
        className="cursor-pointer px-1 py-1 mr-4 border sm:px-2 sm:py-2 bg-slate-200 text-black font-semibold 
text-xs sm:text-sm rounded-sm shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
      >
        Add your Task
      </button>

      {parsedUser ? (
        <button
          onClick={handleLogout}
          className="cursor-pointer px-1 py-1 mr-4 border sm:px-2 sm:py-2 bg-slate-200 text-black font-semibold 
          text-xs sm:text-sm rounded-sm shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="cursor-pointer px-1 py-1 mr-4 border sm:px-2 sm:py-2 bg-slate-200 text-black font-semibold 
          text-xs sm:text-sm rounded-sm shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Login
        </button>
      )}
    </header>
  );
};
