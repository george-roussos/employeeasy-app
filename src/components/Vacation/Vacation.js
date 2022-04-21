import React from "react";
import "./Vacation.css";
import ExpandableTable from "../ExpandableTables/Vacation/ExpandableTable";

const Vacation = ({ dataset }) => {
  return (
    <div className="dataset-info">
      <div className="titles">
        <h1>Vacation</h1>
        <h5>
          Displaying information for all vacation you have logged. For more
          information, please contact HR or employee.
        </h5>
      </div>
      <ExpandableTable dataset={dataset} />
    </div>
  );
};

export default Vacation;
