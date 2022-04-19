import React from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import "./NewEmployee.css";

const NewEmployee = ({ open, children, onClose }) => {
  if (!open) return null;
  return createPortal(
    <>
      <div className="modal--overlay" onClick={onClose}>
        <div className="modal">
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
            <h1>Delete entry from database?</h1>
          </div>
          <div className="body">
            <p>Employee will be removed from database. Proceed?</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                onClose();
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button id="confirmBtn">Continue</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default NewEmployee;
