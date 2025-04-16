import React, { useEffect, useState } from "react";

const LeadProfile = () => {
  const [employees, setEmployees] = useState([]);
  const [leadEmail, setLeadEmail] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];

    const leadEmployees = allEmployees.filter(
      (emp) => emp.createdBy === currentUser.email
    );

    setEmployees(leadEmployees);
    setLeadEmail(currentUser.email);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">👤 Lead Profile</h2>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <p><strong>Lead Email:</strong> {leadEmail}</p>
        <p><strong>Total Employees Added:</strong> {employees.length}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-700">🧑‍💼 Employee Details:</h3>
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

export default LeadProfile;
