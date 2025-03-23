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
    <header className="w-full bg-sky-500/10 text-white p-2 m-auto flex justify-between items-center border rounded-2xl mb-1.5">
      <div className="text-xl font-bold">
        <span>Hi {parsedUser ? parsedUser.name : "Guest"}</span>
      </div>

      <button
        onClick={onClick}
        className="cursor-pointer mr-4 border px-4 py-2 bg-slate-200 text-black font-semibold 
          text-lg rounded-2xl shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
      >
        Add your Task
      </button>

      {parsedUser ? (
        <button
          onClick={handleLogout}
          className="cursor-pointer px-4 py-2 bg-white hover:bg-red-700 text-black rounded-md font-semibold border"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="cursor-pointer px-4 py-2 bg-white hover:bg-red-700 text-black rounded-md font-semibold border"
        >
          Login
        </button>
      )}
    </header>
  );
};
