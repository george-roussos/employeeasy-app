import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import AllEmployees from "./components/AllEmployees/AllEmployees";
import Team from "./components/Team/Team";
import employeeService from "./services/employees";
import userService from "./services/users";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "./reducers/employeesReducer";
import { setUser, setUsername, setPassword } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUp from "./components/SignUp/SignUp";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem(
        "loggedEmployeeasyUser",
        JSON.stringify(user)
      );
      employeeService.setToken(user.accessToken);
      dispatch(setUser(user));
      dispatch(setUsername(user.username));
      dispatch(setPassword(""));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    if (user) {
      employeeService
        .getAllEmployees()
        .then((employees) => dispatch(setEmployees(employees)));
    } else return undefined;
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedEmployeeasyUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      employeeService.setToken(user.accessToken);
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <NavBar handleLogout={handleLogOut} />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <LoginForm
                user={user}
                username={username}
                password={password}
                handleLogin={handleLogin}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/all-employees"
            element={<AllEmployees employees={employees} />}
          />
          <Route path="/my-team" element={<Team employees={employees} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
