import React from "react";

export const TaskColumn = ({
  status,
  tasks,
  getPriorityBgColor,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-sky-500/10 w-full sm:w-1/4 p-4 rounded-md shadow-md border border-amber-50">
      <h2 className="text-sm sm:text-xl text-center font-semibold capitalize mb-4 text-amber-50">
        {status.replace(/([A-Z])/g, " $1")}
      </h2>
      <ul className="text-white">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`mb-2 p-2 border-b border-gray-300 rounded-md ${getPriorityBgColor(
              task.priority
            )}`}
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
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
  );
};