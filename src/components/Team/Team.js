import React from "react";
import { useSelector } from "react-redux";
import "./Team.css";
import ExpandableTable from "../ExpandableTable/ExpandableTable";

const Team = ({ employees }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="employees-info">
      <div className="titles">
        <h1>Team</h1>
        <h5>Displaying information for your team.</h5>
      </div>
      <ExpandableTable
        employees={employees.filter(
          (employee) => employee.manager.name === user.user.name
        )}
      />
    </div>
  );
};

export default Team;
