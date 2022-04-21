import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import AllEmployees from "./components/AllEmployees/AllEmployees";
import Team from "./components/Team/Team";
import employeeService from "./services/employees";
import expensesService from "./services/expenses";
import vacationService from "./services/vacation";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "./reducers/employeesReducer";
import { setUser, setUsername, setPassword } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUp from "./components/SignUp/SignUp";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import { setExpenses } from "./reducers/expensesReducer";
import { setVacation } from "./reducers/vacationReducer";
import Expenses from "./components/Expenses/Expenses";
import Vacation from "./components/Vacation/Vacation";

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
      console.log(vacation);
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
