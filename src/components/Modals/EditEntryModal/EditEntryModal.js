import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import "./EditEntryModal.css";
import EmployeeForm from "../../EmployeeForm/EmployeeForm";

const EditEntryModal = ({ open, message, entry, children, onClose }) => {
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
          <EmployeeForm employee={entry} onClose={onClose} />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditEntryModal;