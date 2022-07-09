import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AllEmployees from "./components/AllEmployees/AllEmployees";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Help from "./pages/Help/Help";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./pages/SignUp/SignUp";
import Team from "./components/Team/Team";
import Vacation from "./components/Vacation/Vacation";
import employeeService from "./services/employees";
import expensesService from "./services/expenses";
import { setEmployees } from "./reducers/employeesReducer";
import { setExpenses } from "./reducers/expensesReducer";
import { setUser } from "./reducers/userReducer";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {user ? (
            <Route path="/" element={<Dashboard user={user} />} />
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <LoginPage user={user} username={username} password={password} />
            }
          />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route
            path="/all-employees"
            element={<AllEmployees dataset={employees} />}
          />
          <Route
            path="/my-team"
            element={<Team dataset={employees} user={user} />}
          />
          <Route path="/expenses" element={<Expenses dataset={expenses} />} />
          <Route path="/vacation" element={<Vacation dataset={vacation} />} />
          <Route path="/help-center" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
