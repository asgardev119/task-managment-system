// In EmployeeDashboard.jsx
import React, { useEffect, useState } from "react";
import { Header } from "./Header";

export const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "low": return "bg-green-500/50";
      case "medium": return "bg-yellow-500/50";
      case "high": return "bg-red-500/50";
      default: return "";
    }
  };

  const handleStatusUpdate = (taskId, newStatus) => {
    const teamTasks = JSON.parse(localStorage.getItem("teamTasks")) || [];
    const updatedTasks = teamTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("teamTasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setShowPopup(false);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const allTasks = JSON.parse(localStorage.getItem("teamTasks")) || [];
    const assignedTasks = allTasks.filter(
      (task) =>
        task.assignedTo === currentUser.email ||
        task.assignedTo === "all"
    );
    setTasks(assignedTasks);
  }, []);

  return (
    <div className="min-h-screen p-8 relative"
      style={{
        backgroundImage: "url('/bgimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Your Tasks
      </h1>
      
      {showPopup && currentTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Update Task Status</h2>
            <div className="mb-4">
              <h3 className="font-bold">{currentTask.title}</h3>
              <p className="text-sm text-gray-600">{currentTask.description}</p>
              <p className="text-sm mt-2">Priority: {currentTask.priority}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Change Status
              </label>
              <select
                defaultValue={currentTask.status}
                onChange={(e) => handleStatusUpdate(currentTask.id, e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="yetToStart">Yet to Start</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2 bg-black text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Task Columns */}
      
      <div className="flex gap-6 justify-center flex-wrap">
        {["yetToStart", "inProgress", "completed"].map((status) => (
          <div key={status} className="bg-sky-500/10 w-full sm:w-1/4 p-4 rounded-md shadow-md border border-amber-50">
            <h2 className="text-sm sm:text-xl text-center font-semibold capitalize mb-4 text-amber-50">
              {status.replace(/([A-Z])/g, " $1")}
            </h2>
            <ul className="text-white">
              {tasks
                .filter(task => task.status === status)
                .map((task) => (
                  <li
                    key={task.id}
                    className={`mb-2 p-2 border-b border-gray-300 rounded-md ${getPriorityBgColor(task.priority)}`}
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                    <p className="text-xs mt-1">Priority: {task.priority}</p>
                    {task.createdBy && (
                      <p className="text-xs text-gray-300">From: {task.createdBy}</p>
                    )}
                    <button
                      onClick={() => {
                        setCurrentTask(task);
                        setShowPopup(true);
                      }}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                    >
                      Update Status
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};