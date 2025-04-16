import React, { useState } from "react";

const EmployeeForm = ({ onAddEmployee, onClose }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.name || !employee.email || !employee.password) {
      alert("Please fill in all fields.");
      return;
    }

    onAddEmployee(employee); // Call parent function
    setEmployee({ name: "", email: "", password: "" }); // Reset form
    onClose(); // Close popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-3/4 sm:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Add New Employee</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={employee.password}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-600 px-4 py-2 rounded-md"
            >
              Add Employee
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-white bg-red-600 px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
