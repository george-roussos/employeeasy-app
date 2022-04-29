import "./Team.css";

import ExpandableTable from "../ExpandableTables/Employees/ExpandableTable";
import React from "react";

const Team = ({ dataset, user }) => {
  return (
    <div className="header">
      <div className="titles">
        <h1>Team</h1>
        <h5>Displaying information for your team.</h5>
      </div>
      <ExpandableTable
        dataset={dataset.filter(
          (employee) => employee.manager.name === user.user.name
        )}
      />
    </div>
  );
};

export default Team;
