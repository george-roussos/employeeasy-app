import "./EditEntryModal.css";

import EmployeeForm from "../../Forms/components/EmployeeForm/EmployeeForm";
import ExpenseForm from "../../Forms/components/ExpenseForm/ExpenseForm";
import { IoCloseOutline } from "react-icons/io5";
import React from "react";
import VacationForm from "../../Forms/components/VacationForm/VacationForm";
import { createPortal } from "react-dom";

const EditEntryModal = ({ open, message, entry, children, onClose, type }) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className="edit-modal--overlay">
        <div className="edit-modal">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                onClose();
              }}
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className="title">
            <h1>{message}</h1>
          </div>
          {type === "employee" ? (
            <EmployeeForm employee={entry} onClose={onClose} />
          ) : type === "expense" ? (
            <ExpenseForm expense={entry} onClose={onClose} />
          ) : (
            <VacationForm vacation={entry} onClose={onClose} />
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditEntryModal;
