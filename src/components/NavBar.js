import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import blank from "../images/blank-profile.png";
import {
  IoChevronUp,
  IoNewspaperOutline,
  IoPeopleCircleOutline,
  IoPersonOutline,
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
      <div className="links">
        <div className="dashboard-link">
          <IoNewspaperOutline />
          <Link to="/" className="dashboard-router">
            Dashboard
          </Link>
        </div>
        <span className="people-divider">People</span>
        <div className="employee-link">
          <IoPersonOutline />
          <Link to="/employees" className="dashboard-router">
            Employees
          </Link>
        </div>
        <div className="team-link">
          <IoPeopleCircleOutline />
          <Link to="/employees" className="dashboard-router">
            Team
          </Link>
        </div>
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
