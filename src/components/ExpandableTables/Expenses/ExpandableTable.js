import "../ExpandableTable.css";

import React, { useRef, useState } from "react";
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
import expensesService from "../../../services/expenses";
import { setEditMode } from "../../../reducers/modalReducer";
import { setExpenses } from "../../../reducers/expensesReducer";

const ExpandableTable = ({ dataset }) => {
  const toast = useRef(null);

  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [renderedDataset, setRenderedDataset] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editExpenseModal, setExpenseModal] = useState(false);
  const [message, setMessage] = useState("");
  const [expense, setExpense] = useState({});

  const editMode = useSelector((state) => state.modal);

  const matches = !renderedDataset
    ? dataset
    : dataset
        .filter((expense) =>
          expense.merchant
            .toLowerCase()
            .split(" ")[0]
            .includes(globalFilterValue.toLowerCase())
        )
        .reverse(); // Reverse in order to display latest entries;

  const handleDelete = async (event) => {
    event.preventDefault();
    // This is not elegant, but is the easiest way to
    // show the correct toast. It avoids re-rendering
    // the toast while the table is updating and it
    // only relies on the kind of response.
    try {
      await expensesService.remove(expense._id);
      const expenses = await expensesService.getAllExpenses();
      dispatch(setExpenses(expenses));
      showSuccess(toast, "Removed entry");
    } catch (error) {
      showError(toast, "Unauthorized action");
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setRenderedDataset(
      dataset.filter((expense) =>
        expense.merchant
          .toLowerCase()
          .split(" ")[0]
          .includes(globalFilterValue.toLowerCase())
      )
    );
  };

  const NameBodyTemplate = (rowData) => {
    const expense = rowData.employee.name;
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt={expense}
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
          <span className="image-text">{expense}</span>
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
            status === "Approved"
              ? { backgroundColor: "rgb(64, 163, 67)", fontSize: "1.3rem" }
              : status === "Pending"
              ? { backgroundColor: "rgb(215, 213, 54)", fontSize: "1.3rem" }
              : status === "Rejected"
              ? { backgroundColor: "rgb(200, 44, 44)", fontSize: "1.3rem" }
              : null
          }
          className="status-text"
        >
          {status}
        </span>
      </React.Fragment>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div>
        <h4>Expense Information</h4>
        <DataTable value={[data]} responsiveLayout="scroll">
          <Column
            field="employee"
            header="Employee"
            sortable
            body={NameBodyTemplate}
          />
          <Column
            field="status"
            header="Status"
            sortable
            body={StatusBodyTemplate}
          />
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
            // Reset expense so the form will re-render.
            // This way the form comes up empty after an edit
            // is abandoned.
            setExpense({});
            setExpenseModal(true);
            setMessage("New Expense");
          }}
        >
          <div className="new-entry">
            <div className="plus-icon" style={{ display: "flex" }}>
              <IoAddOutline />
            </div>
            <span className="new-entry-text">New Expense</span>
          </div>
        </Button>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by merchant"
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
            <Column field="date" header="Date" sortable></Column>
            <Column field="merchant" header="Merchant" sortable></Column>
            <Column field="amount" header="Amount" sortable></Column>
            <Column field="currency" header="Currency" sortable></Column>
            <Column
              header="Actions"
              body={(data, props) => (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    icon="pi pi-user-edit"
                    className="mr-2"
                    onClick={() => {
                      setExpense(props.props.value[props.rowIndex]);
                      dispatch(setEditMode(true));
                      setMessage("Edit Expense Information");
                      setExpenseModal(true);
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => {
                      setExpense(props.props.value[props.rowIndex]);
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
            in={editExpenseModal}
            classNames="modals"
            unmountOnExit
            timeout={200}
          >
            <EditEntryModal
              open={editExpenseModal}
              message={message}
              editMode={editMode}
              entry={expense}
              onClose={() => setExpenseModal(false)}
              type={"expense"}
            />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default ExpandableTable;
