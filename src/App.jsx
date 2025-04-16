// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LeadDashboard from "./components/LeadDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import Home from "./components/Home";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lead-dashboard" element={<LeadDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </>
  );
}

export default App;
