import "./ExpandableTable.css";

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
import { removeVacation } from "../../../reducers/vacationReducer";
import { setEditMode } from "../../../reducers/modalReducer";

const ExpandableTable = ({ dataset }) => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [renderedDataset, setRenderedDataset] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editVacationModal, setVacationModal] = useState(false);
  const [message, setMessage] = useState("");
  const [vacation, setVacation] = useState({});

  const editMode = useSelector((state) => state.modal);

  const matches = !renderedDataset
    ? dataset
    : dataset.filter((vacation) =>
        vacation.employee.name
          .toLowerCase()
          .split(" ")[1]
          .includes(globalFilterValue.toLowerCase())
      );

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      dispatch(removeVacation(vacation._id));
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
      dataset.filter((vacation) =>
        vacation.merchant
          .toLowerCase()
          .split(" ")[0]
          .includes(globalFilterValue.toLowerCase())
      )
    );
  };

  const NameBodyTemplate = (rowData) => {
    const vacation = rowData.employee.name;
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt={vacation}
            src={`${rowData.employee.avatar}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            width={32}
            style={{
              marginRight: "6px",
            }}
          />
          <span className="image-text">{vacation}</span>
        </div>
      </React.Fragment>
    );
  };

  const StatusBodyTemplate = (rowData) => {
    const status = rowData.status;

    return (
      <React.Fragment>
        <span
          style={
            status === "approved"
              ? { backgroundColor: "rgb(64, 163, 67)" }
              : status === "pending"
              ? { backgroundColor: "rgb(215, 213, 54)" }
              : status === "rejected"
              ? { backgroundColor: "rgb(200, 44, 44)" }
              : null
          }
          className="status-text"
        >
          {status}
        </span>
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
      summary: "Showing vacation information:",
      detail: event.data.employee.name,
      life: 1000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Hid vacation information",
      detail: event.data.employee.name,
      life: 1000,
    });
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <h5>Vacation Information</h5>
        <DataTable value={[data]} responsiveLayout="scroll">
          <Column field="daysLeft" header="Vacation Days Left" sortable />
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
            setVacationModal(true);
            setMessage("New Vacation");
          }}
        >
          <IoAddOutline /> New Vacation
        </Button>
        <span className="p-input-icon-left">
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
              field="employee.name"
              header="Employee"
              sortable
              body={NameBodyTemplate}
            />
            <Column field="startOn" header="Start On" sortable></Column>
            <Column field="endOn" header="End On" sortable></Column>
            <Column
              className="status"
              field="status"
              header="Status"
              sortable
              body={StatusBodyTemplate}
            ></Column>
            <Column
              header="Actions"
              body={(data, props) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    icon="pi pi-user-edit"
                    className="mr-2"
                    onClick={() => {
                      setVacation(props.props.value[props.rowIndex]);
                      dispatch(setEditMode(true));
                      setMessage("Edit Vacation Information");
                      setVacationModal(true);
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => {
                      setVacation(props.props.value[props.rowIndex]);
                      setDeleteModal(true);
                    }}
                  />
                  <Button icon="pi pi-send" className="p-button-success" />
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
            in={editVacationModal}
            classNames="modals"
            unmountOnExit
            timeout={200}
          >
            <EditEntryModal
              open={editVacationModal}
              message={message}
              editMode={editMode}
              vacation={vacation}
              onClose={() => setVacationModal(false)}
            />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default ExpandableTable;
