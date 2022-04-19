import { BrowserRouter, Route, Routes } from "react-router-dom";
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

// const employees = [
//   {
//     name: "Eva Exempelsson",
//     phone: "+46723333333",
//     department: "Tech",
//     country: "Sweden",
//     startDate: "2019-08-08",
//     email: "evaexempelsson@gmail.com",
//     contractType: "Permanent",
//     manager: "Malin Holmgren",
//     avatar:
//       "https://media.istockphoto.com/photos/close-up-portrait-of-brunette-woman-picture-id1154642632?k=20&m=1154642632&s=612x612&w=0&h=dQPjQCt_WOKhD0ysSJG6gIsu7xW65vH8Wf_SaqetIqY=",
//   },
//   {
//     name: "Eva-Lena Exempelsson",
//     phone: "+46723333333",
//     department: "Tech",
//     country: "Sweden",
//     startDate: "2019-08-08",
//     email: "evaexempelsson@gmail.com",
//     contractType: "Permanent",
//     manager: "Malin Holmgren",
//     avatar:
//       "https://st.depositphotos.com/1771835/2035/i/600/depositphotos_20355973-stock-photo-portrait-real-high-definition-grey.jpg",
//   },
//   {
//     name: "Test Testsson",
//     phone: "+46723333333",
//     department: "Finance",
//     country: "UK",
//     startDate: "2021-08-08",
//     email: "testtestsson@gmail.com",
//     contractType: "Consultant",
//     manager: "Anna Forsberg",
//     avatar:
//       "https://lifestyle.iloveindia.com/lounge/images/haircuts-for-normal-women.jpg",
//   },
//   {
//     name: "Maria Fernandez",
//     phone: "+46723333333",
//     department: "Finance",
//     country: "Spain",
//     startDate: "2021-08-08",
//     email: "testtestsson@gmail.com",
//     contractType: "Consultant",
//     manager: "Anna Forsberg",
//     avatar:
//       "https://learnopencv.com/wp-content/uploads/2016/05/average-woman-face.jpg",
//   },
// ];

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
        <NavBar />
        <Routes>
          <Route
            path="/"
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
