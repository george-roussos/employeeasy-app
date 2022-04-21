import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setPassword, setUser, setUsername } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import AllEmployees from "./components/AllEmployees/AllEmployees";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import LoginForm from "./components/LoginForm/LoginForm";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/SignUp/SignUp";
import Team from "./components/Team/Team";
import Vacation from "./components/Vacation/Vacation";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import employeeService from "./services/employees";
import expensesService from "./services/expenses";
import loginService from "./services/login";
import { setEmployees } from "./reducers/employeesReducer";
import { setExpenses } from "./reducers/expensesReducer";
import { setVacation } from "./reducers/vacationReducer";
import { useEffect } from "react";
import vacationService from "./services/vacation";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const employees = useSelector((state) => state.employees);
  const expenses = useSelector((state) => state.expenses);
  const vacation = useSelector((state) => state.vacation);

  useEffect(() => {
    if (user) {
      employeeService
        .getAllEmployees()
        .then((employees) => dispatch(setEmployees(employees)));
      expensesService
        .getAllExpenses()
        .then((expenses) => dispatch(setExpenses(expenses)));
      vacationService
        .getAllVacation()
        .then((vacation) => dispatch(setVacation(vacation)));
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
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <LoginForm user={user} username={username} password={password} />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/all-employees"
            element={<AllEmployees dataset={employees} />}
          />
          <Route path="/my-team" element={<Team dataset={employees} />} />
          <Route path="/expenses" element={<Expenses dataset={expenses} />} />
          <Route path="/vacation" element={<Vacation dataset={vacation} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
