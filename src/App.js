import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import AllEmployees from "./components/AllEmployees/AllEmployees";
import Team from "./components/Team/Team";

const employees = [
  {
    name: "Eva Exempelsson",
    phone: "+46723333333",
    department: "Tech",
    country: "Sweden",
    startDate: "2019-08-08",
    email: "evaexempelsson@gmail.com",
    contractType: "Permanent",
    manager: "Malin Holmgren",
    avatar:
      "https://media.istockphoto.com/photos/close-up-portrait-of-brunette-woman-picture-id1154642632?k=20&m=1154642632&s=612x612&w=0&h=dQPjQCt_WOKhD0ysSJG6gIsu7xW65vH8Wf_SaqetIqY=",
  },
  {
    name: "Eva-Lena Exempelsson",
    phone: "+46723333333",
    department: "Tech",
    country: "Sweden",
    startDate: "2019-08-08",
    email: "evaexempelsson@gmail.com",
    contractType: "Permanent",
    manager: "Malin Holmgren",
    avatar:
      "https://st.depositphotos.com/1771835/2035/i/600/depositphotos_20355973-stock-photo-portrait-real-high-definition-grey.jpg",
  },
  {
    name: "Test Testsson",
    phone: "+46723333333",
    department: "Finance",
    country: "UK",
    startDate: "2021-08-08",
    email: "testtestsson@gmail.com",
    contractType: "Consultant",
    manager: "Anna Forsberg",
    avatar:
      "https://lifestyle.iloveindia.com/lounge/images/haircuts-for-normal-women.jpg",
  },
  {
    name: "Maria Fernandez",
    phone: "+46723333333",
    department: "Finance",
    country: "Spain",
    startDate: "2021-08-08",
    email: "testtestsson@gmail.com",
    contractType: "Consultant",
    manager: "Anna Forsberg",
    avatar:
      "https://learnopencv.com/wp-content/uploads/2016/05/average-woman-face.jpg",
  },
];

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
