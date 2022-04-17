import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import EmployeePage from "./pages/EmployeePage";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route
            path="/ticket/:id"
            element={<EmployeePage editMode={true} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
