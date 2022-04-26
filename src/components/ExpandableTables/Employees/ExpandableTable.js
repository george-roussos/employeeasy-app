import "../ExpandableTable.css";

import React, { useEffect, useRef, useState } from "react";
import { showError, showSuccess } from "../../../helpers/tableHelper";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "primereact/button";
import { CSSTransition } from "react-transition-group";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import EditEntryModal from "../../Modals/EditEntryModal/EditEntryModal";
import { InputText } from "primereact/inputtext";
import { IoAddOutline } from "react-icons/io5";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { removeEmployee } from "../../../reducers/employeesReducer";
import { setEditMode } from "../../../reducers/modalReducer";

const { flag } = require("country-emoji");

const ExpandableTable = ({ dataset }) => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [renderedDataset, setRenderedDataset] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editEditEntryModal, setEditEntryModal] = useState(false);
  const [message, setMessage] = useState("");
  const [employee, setEmployee] = useState({});

  const editMode = useSelector((state) => state.modal);

  const matches = !renderedDataset
    ? dataset
    : dataset
        .filter((employee) =>
          employee.name
            .toLowerCase()
            .split(" ")[1]
            .includes(globalFilterValue.toLowerCase())
        )
        .reverse(); // Reverse in order to display latest entries

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      dispatch(removeEmployee(employee._id));
      showSuccess();
    } catch (exception) {
      console.log(exception);
      showError();
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setRenderedDataset(
      dataset.filter((employee) =>
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
        <h4>Employee Information</h4>
        <DataTable value={[data]} responsiveLayout="scroll">
          <Column field="country" header="Country" body={countryBodyTemplate} />
          <Column field="department" header="Department" />
          <Column field="employmentType" header="Contract" />
          <Column field="manager.name" header="Manager" />
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
            // Reset employee so the form will re-render.
            // This way the form comes up empty after an edit
            // is abandoned.
            setEmployee({});
            setEditEntryModal(true);
            setMessage("New Employee");
          }}
        >
          <div className="new-entry">
            <div className="plus-icon" style={{ display: "flex" }}>
              <IoAddOutline />
            </div>
            <span className="new-entry-text">New Employee</span>
          </div>
        </Button>
        <span className="p-input-icon-left search-bar">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by last name"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="dataset-info">
      <div className="table-container">
        <Toast ref={toast} />
        <div className="p-datatable">
          <DataTable
            value={matches}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={onRowExpand}
            onRowCollapse={onRowCollapse}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="_id"
            header={header}
            emptyMessage={
              <ProgressSpinner
                style={{ width: "50px", height: "50px", display: "flex" }}
                strokeWidth="8"
              />
            }
            rows={4}
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
            <Column field="email" header="Email" sortable></Column>
            <Column
              header="Actions"
              body={(data, props) => (
                <div className="action-buttons" style={{ display: "flex" }}>
                  <Button
                    icon="pi pi-user-edit"
                    className="mr-2"
                    onClick={() => {
                      setEmployee(props.props.value[props.rowIndex]);
                      dispatch(setEditMode(true));
                      setMessage("Edit Employee Information");
                      setEditEntryModal(true);
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => {
                      setEmployee(props.props.value[props.rowIndex]);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              )}
            ></Column>
          </DataTable>
          <CSSTransition
            in={deleteModal}
            classNames="modals"
            unmountOnExit
            timeout={200}
          >
            <DeleteModal
              open={deleteModal}
              onClose={() => setDeleteModal(false)}
              handleDelete={handleDelete}
            />
          </CSSTransition>
          <CSSTransition
            in={editEditEntryModal}
            classNames="modals"
            unmountOnExit
            timeout={200}
          >
            <EditEntryModal
              open={editEditEntryModal}
              message={message}
              editMode={editMode}
              entry={employee}
              onClose={() => setEditEntryModal(false)}
              type={"employee"}
            />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default ExpandableTable;
