import "./Expenses.css";

import ExpandableTable from "../ExpandableTables/Expenses/ExpandableTable";
import React from "react";

const Expenses = ({ dataset }) => {
  return (
    <div className="header">
      <div className="titles">
        <h1>Expenses</h1>
        <h5>
          Displaying information for all expenses you have logged. For more
          information, please contact HR.
        </h5>
      </div>
      <ExpandableTable dataset={dataset} />
    </div>
  );
};

export default Expenses;
