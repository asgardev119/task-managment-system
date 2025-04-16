import React from "react";

export const TaskForm = ({
  taskForm,
  handleInputChange,
  handleSubmit,
  handleClosePopup,
}) => {
  return (
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
            <label className="block text-sm font-semibold">Description</label>
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
              className="cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 bg-black text-white rounded-md"
            >
              {taskForm.id ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};