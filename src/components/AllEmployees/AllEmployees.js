import "./AllEmployees.css";

import ExpandableTable from "../ExpandableTables/Employees/ExpandableTable";
import React from "react";

const AllEmployees = ({ dataset }) => {
  return (
    <div className="header">
      <div className="titles">
        <h1>Employees</h1>
        <h5>
          Displaying information for all employees. Note: You can only perform
          actions on your team members.
        </h5>
      </div>
      <ExpandableTable dataset={dataset} />
    </div>
  );
};

export default AllEmployees;
