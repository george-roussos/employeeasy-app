import "./LoginPage.css";

import React, { useState } from "react";
import { setPassword, setUser, setUsername } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import { CSSTransition } from "react-transition-group";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import LoadingIcons from "react-loading-icons";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Message from "../../components/Message/Message";
import employeeService from "../../services/employees";
import loginPhoto from "../../images/login-vector.svg";
import loginService from "../../services/login";
import { setNotification } from "../../reducers/messageReducer";
import { setStyle } from "../../reducers/messageStyleReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const message = useSelector((state) => state.message);

  const [formUsername, setFormUsername] = useState(null);
  const [formPassword, setFormPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (formUsername && formPassword) {
      try {
        setLoading(true);
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
        setLoading(false);
        navigate("/dashboard");
      } catch (exception) {
        setLoading(false);
        dispatch(setNotification("Wrong username or password", 3));
        dispatch(setStyle("error", 3));
      }
    } else {
      dispatch(setNotification("Please enter all required fields", 3));
      dispatch(setStyle("error", 3));
    }
  };

  return (
    <div className="login-form-container">
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
            <CSSTransition
              in={message}
              classNames="error-message"
              unmountOnExit
              timeout={200}
            >
              <Message />
            </CSSTransition>
            <button id="login-button" type="submit">
              {loading ? (
                <LoadingIcons.Circles width={"1.4rem"} height={"1.4rem"} />
              ) : (
                <IoPersonOutline />
              )}
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>
          <Link
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "rgb(72, 72, 183)",
              textDecoration: "underline",
              marginTop: "1rem",
              fontSize: "1.2rem",
            }}
            className="signup-message"
            to="/signup"
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
