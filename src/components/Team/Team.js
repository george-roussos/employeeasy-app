import React from "react";
import "./Team.css";
import ExpandableTable from "../ExpandableTable/ExpandableTable";

const Team = ({ employees }) => {
  return (
    <div className="employees-info">
      <div className="titles">
        <h1>Team</h1>
        <h5>Displaying information for your team.</h5>
      </div>
      <ExpandableTable
        employees={employees.filter(
          (employee) => employee.manager === "Malin Holmgren"
        )}
      />
    </div>
  );
};

export default Team;
