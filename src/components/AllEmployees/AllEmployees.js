import React from "react";
import "./AllEmployees.css";
import ExpandableTable from "../ExpandableTable/ExpandableTable";

const AllEmployees = ({ employees }) => {
  return (
    <div className="employees-info">
      <div className="titles">
        <h1>Employees</h1>
        <h5>
          Displaying information for all employees. Note: You can only perform
          actions on your team members.
        </h5>
      </div>
      <ExpandableTable employees={employees} />
    </div>
  );
};

export default AllEmployees;
