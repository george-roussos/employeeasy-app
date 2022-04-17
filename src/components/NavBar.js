import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import blank from "../images/blank-profile.png";
import {
  IoChevronUp,
  IoNewspaperOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>
      <div className="dashboard-container">
        <IoNewspaperOutline />
        <Link to="/" className="dashboard-router">
          Dashboard
        </Link>
      </div>
      <div className="employee-container">
        <IoPersonAddOutline />
        <Link to="/employee" className="dashboard-router">
          Add Employee
        </Link>
      </div>
      <div className="account-container">
        <img src={blank} alt={"photo of user"} />
        <p>User</p>

        <Menu
          menuButton={
            <button className="menu-btn">
              <IoChevronUp />
            </button>
          }
          transition
        >
          <MenuItem>Account Settings</MenuItem>
          <MenuItem onClick={() => console.log("will log out")}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default NavBar;
