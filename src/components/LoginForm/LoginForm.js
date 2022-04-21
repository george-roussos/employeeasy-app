import "./LoginForm.css";

import React, { useState } from "react";
import { setPassword, setUser, setUsername } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Message from "../../../src/components/Message/Message";
import employeeService from "../../services/employees";
import loginPhoto from "../../images/login-vector.png";
import loginService from "../../services/login";
import { setNotification } from "../../reducers/messageReducer";
import { setStyle } from "../../reducers/messageStyleReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);
  const [transition, setTransition] = useState(false);

  const [formUsername, setFormUsername] = useState(null);
  const [formPassword, setFormPassword] = useState(null);

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
        navigate("/dashboard");
      } catch (exception) {
        setTransition(true);
        dispatch(setNotification("Wrong username or password", 2));
        dispatch(setStyle("error", 2));
      }
    } else {
      setTransition(true);
      dispatch(
        setNotification(
          "Please enter all required fields marked with asterisk *",
          2
        )
      );
      dispatch(setStyle("error", 2));
      setTransition(false);
    }
  };

  return (
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
            <Message />
            <input
              id="username"
              placeholder="Username *"
              type="text"
              value={props.username}
              name="Username"
              onChange={({ target }) => {
                dispatch(setUsername(target.value));
                setFormUsername(target.value);
              }}
            />
          </div>
          <div>
            <input
              id="password"
              placeholder="Password *"
              type="password"
              value={props.password}
              name="Password"
              onChange={({ target }) => {
                dispatch(setPassword(target.value));
                setFormPassword(target.value);
              }}
            />
          </div>
          <button id="login-button" type="submit">
            SIGN IN
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
  );
};

export default LoginForm;
