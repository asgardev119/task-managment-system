import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { TaskForm } from "./TaskForm";
import { EmployeeForm } from "./EmployeeForm";
import { TaskColumn } from "./TaskColumn";

const LeadDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showEmployeePopup, setShowEmployeePopup] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "yetToStart",
    priority: "low",
    id: null,
  });

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-500/50";
      case "medium":
        return "bg-yellow-500/50";
      case "high":
        return "bg-red-500/50";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value,
    });
  };
  // const handleTaskSubmit = (e) => {
  //   e.preventDefault();
    
  //   // Get current lead's info
  //   const currentUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    
  //   const newTask = {
  //     ...taskForm,
  //     id: Date.now(),
  //     createdBy: currentUser.email, // Store who created the task
  //     createdAt: new Date().toISOString(),
  //     assignedTo: "all" // or specific employee emails
  //   };
  
  //   // Get existing team tasks
  //   const teamTasks = JSON.parse(localStorage.getItem("teamTasks")) || [];
    
  //   if (taskForm.id) {
  //     // Update existing task
  //     const updatedTasks = teamTasks.map(task => 
  //       task.id === taskForm.id ? newTask : task
  //     );
  //     localStorage.setItem("teamTasks", JSON.stringify(updatedTasks));
  //     setTasks(updatedTasks);
  //   } else {
  //     // Add new task
  //     const updatedTasks = [...teamTasks, newTask];
  //     localStorage.setItem("teamTasks", JSON.stringify(updatedTasks));
  //     setTasks(updatedTasks);
  //   }
  
  //   setShowTaskPopup(false);
  //   resetForm();
  // };
  
  // And update the useEffect to load from teamTasks
// In your LeadDashboard component, update the useEffect and task handling:

useEffect(() => {
  // Load tasks from teamTasks when component mounts
  const loadTasks = () => {
    const teamTasks = JSON.parse(localStorage.getItem("teamTasks")) || [];
    // Filter tasks created by current user
    const currentUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const userTasks = teamTasks.filter(task => task.createdBy === currentUser.email);
    setTasks(userTasks);
  };

  loadTasks();
  
  // Optional: Refresh every 5 seconds
  const interval = setInterval(loadTasks, 5000);
  return () => clearInterval(interval);
}, []);

// Update handleTaskSubmit to ensure createdBy is set
const handleTaskSubmit = (e) => {
  e.preventDefault();
  
  const currentUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  
  const newTask = {
    ...taskForm,
    id: Date.now(),
    createdBy: currentUser.email, // Make sure this is set
    createdAt: new Date().toISOString()
  };

  const teamTasks = JSON.parse(localStorage.getItem("teamTasks")) || [];
  
  if (taskForm.id) {
    // Update existing task
    const updatedTasks = teamTasks.map(task => 
      task.id === taskForm.id ? newTask : task
    );
    localStorage.setItem("teamTasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks.filter(task => task.createdBy === currentUser.email));
  } else {
    // Add new task
    const updatedTasks = [...teamTasks, newTask];
    localStorage.setItem("teamTasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks.filter(task => task.createdBy === currentUser.email));
  }

  setShowTaskPopup(false);
  resetForm();
};


  const handleCloseTaskPopup = () => {
    setShowTaskPopup(false);
    resetForm();
  };

  const resetForm = () => {
    setTaskForm({
      title: "",
      description: "",
      status: "yetToStart",
      priority: "low",
      id: null,
    });
  };

  const filterTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEdit = (task) => {
    setTaskForm(task);
    setShowTaskPopup(true);
  };

  const handleAddEmployee = (employee) => {
    // Save employee credentials
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    localStorage.setItem("employees", JSON.stringify([...employees, employee]));
    
    // Create default task for new employee
    const teamTasks = JSON.parse(localStorage.getItem("teamTasks")) || [];
    const welcomeTask = {
      id: Date.now(),
      title: "Welcome to the Team!",
      description: "Complete your onboarding process",
      status: "yetToStart",
      priority: "medium",
      createdBy: JSON.parse(localStorage.getItem("userLoggedIn")).email,
      assignedTo: employee.email,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem("teamTasks", JSON.stringify([...teamTasks, welcomeTask]));
    alert(`${employee.name} added successfully with a welcome task!`);
  };

  useEffect(() => {
    // Load tasks
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks([]);
    }
  }, []);

  return (
    <div
      className="min-h-screen p-8 relative"
      style={{
        backgroundImage: "url('/bgimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <div className="text-center mb-6">
        <button
          onClick={() => setShowTaskPopup(true)}
          className="cursor-pointer px-2 py-2 mr-4 border sm:px-2 sm:py-2 bg-slate-200 text-black font-semibold 
          text-xs sm:text-sm rounded-sm shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add Your Task
        </button>
        <button
          onClick={() => setShowEmployeePopup(true)}
          className="cursor-pointer px-2 py-2 mr-4 border sm:px-2 sm:py-2 bg-slate-200 text-black font-semibold 
          text-xs sm:text-sm rounded-sm shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add Your Employee
        </button>
      </div>

      {showTaskPopup && (
        <TaskForm
          taskForm={taskForm}
          handleInputChange={handleInputChange}
          handleSubmit={handleTaskSubmit}
          handleClosePopup={handleCloseTaskPopup}
        />
      )}

      {showEmployeePopup && (
        <EmployeeForm
          onClose={() => setShowEmployeePopup(false)}
          onAddEmployee={handleAddEmployee}
        />
      )}

      {/* Task Sections */}
      <div className="flex gap-6 justify-center flex-wrap">
        {["yetToStart", "inProgress", "completed"].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={filterTasksByStatus(status)}
            getPriorityBgColor={getPriorityBgColor}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadDashboard;