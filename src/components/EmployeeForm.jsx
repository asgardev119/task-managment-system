import React, { useState } from "react";

export const EmployeeForm = ({ onClose, onAddEmployee }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
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
    onAddEmployee(employee);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={employee.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Role</label>
            <select
              name="role"
              value={employee.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="employee">Employee</option>
              <option value="lead">Lead</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer mr-2 px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 bg-black text-white rounded-md"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};