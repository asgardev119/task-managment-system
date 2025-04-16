import React from "react";
import EmployeeList from "./EmployeeList";

const EmployeePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-[90%] sm:w-[70%] max-h-[80%] overflow-y-auto shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded-md text-sm"
        >
          Close
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Your Added Employees</h2>
        <EmployeeList />
      </div>
    </div>
  );
};

export default EmployeePopup;
