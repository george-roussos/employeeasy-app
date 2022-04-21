import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { Toast } from "primereact/toast";
import "./DeleteModal.css";

const Modal = ({ open, handleDelete, children, onClose }) => {
  const toast = useRef(null);

  if (!open) return null;
  return createPortal(
    <>
      <Toast ref={toast} />
      <div className="delete-modal--overlay" onClick={onClose}>
        <div className="delete-modal">
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
            <p>Entry will be removed from database. Proceed?</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                onClose();
              }}
              id="delete-cancelBtn"
            >
              Cancel
            </button>
            <button id="delete-confirmBtn" onClick={handleDelete}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
