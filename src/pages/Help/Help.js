import "./Help.css";

import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

import { InputText } from "primereact/inputtext";
import React from "react";
import helpPhoto from "../../images/help-center.svg";
import infoIcon from "../../images/information.png";
import loginIcon from "../../images/login-icon.png";
import mapIcon from "../../images/map-icon.png";

const Help = () => {
  return (
    <div className="help-center-container">
      <div className="information-panel">
        <div className="help-header">
          <h1>How can we help?</h1>
        </div>
        <div className="search-bar">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={""} onChange={(e) => e} placeholder="Search..." />
          </span>
        </div>
        <img className="help-vector" src={helpPhoto} alt="Help center photo" />
        <div className="questions">
          <h3 className="popular-questions-header">
            Popular questions <IoChevronDownOutline />
          </h3>
          <div className="questions-set">
            <p>How can I edit employee entries?</p>
            <p>Why are some expense entries pending?</p>
            <p>Can I request changes to approved vacation?</p>
          </div>
          <div className="questions-set">
            <p>Can I request an additional license?</p>
            <p>Is there payroll support?</p>
            <p>Can I contact Employeeasy on telephone?</p>
          </div>
          <h4 className="help-category-header">Help by category</h4>
        </div>
        <div className="categories">
          <div className="system">
            <img className="info-icon" src={infoIcon} alt="Information icon" />
            <h5>About the system</h5>
            <h6>System Purpose</h6>
            <h6>Interface</h6>
            <h6>About Data</h6>
          </div>
          <div className="system">
            <img className="info-icon" src={loginIcon} alt="Login icon" />
            <h5>Login and Logout</h5>
            <h6>Login</h6>
            <h6>Login through employer</h6>
            <h6>Logout</h6>
          </div>
          <div className="system">
            <img className="info-icon" src={mapIcon} alt="Information icon" />
            <h5>Site map</h5>
            <h6>Navigation and Zoom</h6>
            <h6>Accessibility</h6>
            <h6>ESIA</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
