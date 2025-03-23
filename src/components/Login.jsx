import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
  

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
  
    
  

    const userData = JSON.parse(localStorage.getItem("user"));
  

    if (!userData) {
      setError("No user data found. Please sign up or try again.");
      return;
    }
  
  
    const { name, email: storedEmail, password: storedPassword } = userData;
  

    if (email !== storedEmail || password !== storedPassword) {
      setError("Invalid email or password.");
      return;
    }
  
  
    const userLoggedIn = { name, email, password };
    localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
  

  
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login Successful!");
    }, 2000);
    navigate("/dashboard");


  };

  return (
    <div
      className="min-h-screen p-8 relative flex items-center justify-center "
      style={{
        backgroundImage: "url('/public/bgimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 cursor-pointer border-2 font-semibold rounded-lg bg-black
              ${
                loading
                  ? "bg-black-500 text-white"
                  : "bg-black-900 text-white hover:bg-white hover:text-black"
              }
              transition-colors duration-300`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          create a{" "}
          <Link className="text-blue-900" to="/register">
            new account
          </Link>{" "}
          for free
        </p>
      </div>
    </div>
  );
}

export default Login;
