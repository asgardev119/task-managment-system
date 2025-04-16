import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Check both user types
      const authResult = await authenticateUser(email, password);
      
      if (authResult.success) {
        localStorage.setItem("userLoggedIn", JSON.stringify(authResult.user));
        navigate(authResult.redirectPath);
      } else {
        setError(authResult.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const authenticateUser = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // 1. Check regular users
          const userData = JSON.parse(localStorage.getItem("user"));
          if (userData && email === userData.email && password === userData.password) {
            return resolve({
              success: true,
              user: {
                ...userData,
                isEmployee: false
              },
              redirectPath: userData.userType === "lead" ? "/lead-dashboard" : "/employee-dashboard"
            });
          }

          // 2. Check employees
          const employees = JSON.parse(localStorage.getItem("employees")) || [];
          const employee = employees.find(emp => 
            emp.email === email && emp.password === password
          );

          if (employee) {
            return resolve({
              success: true,
              user: {
                ...employee,
                isEmployee: true
              },
              redirectPath: "/employee-dashboard" // All employees go to same dashboard
            });
          }

          resolve({ success: false, message: "Invalid credentials" });
        } catch (err) {
          resolve({ success: false, message: "Authentication failed" });
        }
      }, 800); // Simulate network delay
    });
  };

  return (
    <div
      className="min-h-screen p-8 relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/bgimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-6 font-semibold rounded-lg transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center space-y-3 pt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Register here
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Employees: Use credentials provided by your manager
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;