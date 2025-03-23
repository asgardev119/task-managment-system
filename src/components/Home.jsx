import React from "react";
import { useNavigate } from "react-router-dom";
const quotes = [
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    text: `This app is designed to help you efficiently organize and manage 
    your tasks. With an intuitive user interface and seamless features, you can
     easily add, edit, and track the status of your tasks, whether they’re yet
      to start, in progress, or completed. Stay productive and keep your goals on track with priority-based task
     management that makes getting things done simpler than ever..`,
    author: "Mahatma Gandhi",
  },
];
function Home() {
  const navigate = useNavigate();

  const handleJoin = () => {
    // Navigate to login page
    navigate("/login");
  };
  const handleDashboard = () => {
    // Navigate to login page
    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen flex items-center justify-center text-white text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/public/bgimg.jpg')",
        }}
      ></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to our Task Management App!
        </h1>
        {quotes.map((obj , i) => {
          return (
            <p key={i} className="text-xl mb-8 px-10">
              {obj.text} – {obj.author}
            </p>
          );
        })}

        <button
          onClick={handleJoin}
          className="cursor-pointer mr-4 border px-8 py-3 bg-slate-200 text-black font-semibold 
          text-lg rounded-full shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Join Now
        </button>
        <button
          onClick={handleDashboard}
          className="cursor-pointer border px-8 py-3 bg-black text-white font-semibold 
          text-lg rounded-full shadow-lg hover:bg-slate-300 hover:text-black transition-colors duration-300"
        >
          Try Now
        </button>
      </div>
    </div>
  );
}

export default Home;
