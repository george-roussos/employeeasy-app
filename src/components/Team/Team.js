import "./Team.css";

import ExpandableTable from "../ExpandableTables/Employees/ExpandableTable";
import React from "react";
import { useSelector } from "react-redux";

const Team = ({ dataset }) => {
  const user = useSelector((state) => state.user.user);

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
