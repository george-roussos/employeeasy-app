import "./SignUp.css";

import React, { useRef, useState } from "react";
import { setPassword, setUser, setUsername } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Message from "../../../src/components/Message/Message";
import { Toast } from "primereact/toast";
import employeeService from "../../services/employees";
import loginPhoto from "../../images/login-vector.png";
import { setNotification } from "../../reducers/messageReducer";
import { setStyle } from "../../reducers/messageStyleReducer";
import { useNavigate } from "react-router-dom";
import userService from "../../services/users";

const SignupForm = () => {
  const [formFullname, setFormFullName] = useState(null);
  const [formUsername, setFormUsername] = useState(null);
  const [formPassword, setFormPassword] = useState(null);
  const [formPasswordConfirm, setFormPasswordConfirm] = useState(null);
  const [formEmail, setFormEmail] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toast = useRef(null);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (
      formUsername &&
      formPassword &&
      formEmail &&
      formPassword &&
      formPasswordConfirm
    ) {
      try {
        const newUser = {
          name: formFullname,
          username: formUsername,
          email: formEmail,
          password: formPassword,
          passwordConfirmation: formPasswordConfirm,
        };
        await userService.createUser(newUser);
        toast.current.show({
          severity: "info",
          summary: `Account succesfully created!`,
          detail: "Taking you to log in page...",
          life: 2000,
        });
        setTimeout(() => navigate("/login"), 2000);
      } catch (exception) {
        dispatch(setNotification("Please try again", 10));
        dispatch(setStyle("error", 10));
      }
    } else {
      dispatch(setNotification("Please enter all required fields", 10));
      dispatch(setStyle("error", 10));
    }
  };

  return (
    <div className="signup-form">
      <Toast ref={toast} />
      <div className="signup-form-elements">
        <div className="form-decor">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <p>Sign Up</p>
        </div>
        <div className="form">
          <form onSubmit={handleSignUp}>
            <div>
              <input
                id="fullname"
                placeholder="Full Name *"
                type="text"
                name="fullname"
                onChange={({ target }) => {
                  setFormFullName(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <div>
              <input
                id="username"
                placeholder="Username *"
                type="text"
                name="username"
                onChange={({ target }) => {
                  setFormUsername(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <div>
              <input
                id="email"
                placeholder="Email address *"
                type="text"
                name="email"
                onChange={({ target }) => {
                  setFormEmail(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <div>
              <input
                id="password"
                placeholder="Password *"
                type="password"
                name="password"
                onChange={({ target }) => {
                  setFormPassword(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <div>
              <input
                id="passwordConfirm"
                placeholder="Confirm Password *"
                type="password"
                name="passwordConfirm"
                onChange={({ target }) => {
                  setFormPasswordConfirm(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <Message />
            <button id="signup-button" type="submit">
              SIGN UP
            </button>
          </form>
          <Link
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "rgb(72, 72, 183)",
              textDecoration: "underline",
              marginTop: "10px",
            }}
            className="signup-message"
            to="/login"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
      <div className="signup-photo">
        <img src={loginPhoto} alt="Two people sitting on table" />
      </div>
    </div>
  );
};

export default SignupForm;
