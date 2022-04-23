import "./LoginPage.css";

import React, { useRef, useState } from "react";
import { setPassword, setUser, setUsername } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Message from "../../components/Message/Message";
import { Toast } from "primereact/toast";
import employeeService from "../../services/employees";
import loginPhoto from "../../images/login-vector.svg";
import loginService from "../../services/login";
import { setNotification } from "../../reducers/messageReducer";
import { setStyle } from "../../reducers/messageStyleReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const [formUsername, setFormUsername] = useState(null);
  const [formPassword, setFormPassword] = useState(null);

  const toast = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (formUsername && formPassword) {
      try {
        const user = await loginService.login({
          username,
          password,
        });
        window.localStorage.setItem(
          "loggedEmployeeasyUser",
          JSON.stringify(user)
        );
        employeeService.setToken(user.accessToken);
        dispatch(setUser(user));
        dispatch(setUsername(user.username));
        dispatch(setPassword(""));
        toast.current.show({
          severity: "info",
          summary: `Welcome ${user.user.name.split(" ")[0]}!`,
          detail: "You are being redirected to the environment",
          life: 1000,
        });
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (exception) {
        dispatch(setNotification("Wrong username or password", 10));
        dispatch(setStyle("error", 10));
      }
    } else {
      dispatch(setNotification("Please enter all required fields", 10));
      dispatch(setStyle("error", 10));
    }
  };

  return (
    <div className="login-form-container">
      <Toast ref={toast} />
      <div className="login-form">
        <div className="form-decor">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <p>Sign In</p>
        </div>
        <div className="form">
          <form onSubmit={handleLogin}>
            <div>
              <input
                id="username"
                placeholder="Username *"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => {
                  dispatch(setUsername(target.value));
                  setFormUsername(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <div>
              <input
                id="password"
                placeholder="Password *"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => {
                  dispatch(setPassword(target.value));
                  setFormPassword(target.value);
                  dispatch(setNotification(null));
                }}
              />
            </div>
            <Message />
            <button id="login-button" type="submit">
              <IoPersonOutline /> SIGN IN
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
            to="/sign-up"
          >
            Don't have an account? Sign up
          </Link>
        </div>
        <div className="login-photo">
          <img src={loginPhoto} alt="Two people sitting on table" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
