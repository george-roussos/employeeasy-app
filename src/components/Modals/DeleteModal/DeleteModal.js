import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import "./DeleteModal.css";
import { removeEmployee } from "../../../reducers/employeesReducer";
import { CSSTransition } from "react-transition-group";

const Modal = ({ open, employee, children, onClose }) => {
  const toast = useRef(null);
  const dispatch = useDispatch();

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Message Content",
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: "Message Content",
      life: 3000,
    });
  };

  const clear = () => {
    toast.current.clear();
  };

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
            <p>Employee will be removed from database. Proceed?</p>
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
