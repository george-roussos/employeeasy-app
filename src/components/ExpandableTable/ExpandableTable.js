import React, { useState, useEffect, useRef } from "react";
import "./ExpandableTable.css";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import EmployeeModal from "../Modals/EmployeeModal/EmployeeModal";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { IoAddOutline } from "react-icons/io5";
import { Toast } from "primereact/toast";
const { flag } = require("country-emoji");

const ExpandableTable = ({ employees }) => {
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [renderedEmployees, setRenderedEmployees] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editEmployeeModal, setEmployeeModal] = useState(false);
  const [message, setMessage] = useState("");

  const matches = !renderedEmployees
    ? employees
    : employees.filter((employee) =>
        employee.name
          .toLowerCase()
          .split(" ")[0]
          .includes(globalFilterValue.toLowerCase())
      );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setRenderedEmployees(
      employees.filter((employee) =>
        employee.name
          .toLowerCase()
          .split(" ")[0]
          .includes(globalFilterValue.toLowerCase())
      )
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="image-text">{`${flag(rowData.country)} ${
            rowData.country
          }`}</span>
        </div>
      </React.Fragment>
    );
  };

  const NameBodyTemplate = (rowData) => {
    const employee = rowData.name;
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt={employee}
            src={`${rowData.avatar}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            width={32}
            style={{
              marginRight: "6px",
            }}
          />
          <span className="image-text">{employee}</span>
        </div>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = () => {
    return (
      <div style={{ display: "flex" }}>
        <Button
          icon="pi pi-user-edit"
          className="mr-2"
          onClick={() => {
            setMessage("Edit Employee Information");
            setEmployeeModal(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => setDeleteModal(true)}
        />
      </div>
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const summary =
        expandedRows !== null ? "All Rows Expanded" : "All Rows Collapsed";
      toast.current.show({
        severity: "success",
        summary: `${summary}`,
        life: 3000,
      });
    }
  }, [expandedRows]);

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Showing information for:",
      detail: event.data.name,
      life: 1000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Hid information",
      detail: event.data.name,
      life: 1000,
    });
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <h5>Employee Information</h5>
        <DataTable value={[data]} responsiveLayout="scroll">
          <Column
            field="country"
            sortable
            header="Country"
            body={countryBodyTemplate}
          />
          <Column field="department" header="Department" sortable />
          <Column field="employmentType" header="Contract" sortable />
          <Column field="manager.name" header="Manager" sortable />
        </DataTable>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <Button
          className="m-0"
          onClick={() => {
            setEmployeeModal(true);
            setMessage("New Employee");
          }}
        >
          <IoAddOutline /> New Employee
        </Button>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by name"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="employees-info">
      <div className="table-container">
        <Toast ref={toast} />
        <div className="p-datatable">
          <DataTable
            value={matches}
            expandedRows={expandedRows}
            onRowToggle={(e) => {
              setExpandedRows(e.data);
            }}
            onRowExpand={onRowExpand}
            onRowCollapse={onRowCollapse}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="name"
            header={header}
            emptyMessage="No data found"
            rows={10}
            paginator
            paginatorTemplate="FirstPageLink PreviousPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate={`Showing {first} to {last} of ${matches.length} users`}
          >
            <Column expander style={{ width: "3em" }} />
            <Column
              field="name"
              sortable
              header="Name"
              style={{
                minWidth: "12rem",
              }}
              body={NameBodyTemplate}
            />
            <Column field="phone" header="Phone" sortable></Column>
            <Column field="email" header="email" sortable></Column>
            <Column
              headerStyle={{ width: "4rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={actionBodyTemplate}
            />
          </DataTable>
          <DeleteModal
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
          />
          <EmployeeModal
            open={editEmployeeModal}
            message={message}
            onClose={() => setEmployeeModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpandableTable;
