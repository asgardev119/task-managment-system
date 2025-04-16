import React, { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mt-4 mb-2">Employee Details:</h4>
      {employees.length === 0 ? (
        <p className="text-gray-500">No employees added yet.</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white shadow rounded-md">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Password</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
