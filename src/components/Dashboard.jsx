import React, { useEffect, useState } from "react";
import { Header } from "./Header";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskForm.id) {
      setTasks(
        tasks.map((task) =>
          task.id === taskForm.id ? { ...task, ...taskForm } : task
        )
      );
    } else {
      setTasks([...tasks, { ...taskForm, id: Date.now() }]);
    }

    setShowPopup(false);
    resetForm();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
    setShowPopup(true);
  };

  localStorage.setItem("tasks", JSON.stringify(tasks));

  useEffect(() => {
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
      <Header onClick={() => setShowPopup(true)} />

      {/* <div className="text-center mb-6">
        <button
          onClick={() => setShowPopup(true)}
          className="cursor-pointer mr-4 border px-8 py-3 bg-slate-200 text-black font-semibold 
          text-lg rounded-full shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add Your Task
        </button>
      </div> */}

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {taskForm.id ? "Edit Task" : "Add Task"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={taskForm.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Status</label>
                <select
                  name="status"
                  value={taskForm.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="yetToStart">Yet to Start</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Priority</label>
                <select
                  name="priority"
                  value={taskForm.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className=" cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer px-4 py-2 bg-black text-white rounded-md"
                >
                  {taskForm.id ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Sections */}
      <div className="flex gap-6 justify-center flex-wrap">
        {["yetToStart", "inProgress", "completed"].map((status) => (
          <div
            key={status}
            className="bg-sky-500/10 w-full sm:w-1/4 p-4 rounded-md shadow-md border border-amber-50 "
          >
            <h2 className=" text-sm sm:text-xl text-center font-semibold capitalize mb-4 text-amber-50">
              {status.replace(/([A-Z])/g, " $1")}
            </h2>
            <ul className="text-white">
              {filterTasksByStatus(status).map((task) => (
                <li
                  key={task.id}
                  className={`mb-2 p-2 border-b border-gray-300 rounded-md ${getPriorityBgColor(
                    task.priority
                  )}`}
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Priority: {task.priority}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
