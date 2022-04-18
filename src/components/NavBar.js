import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import blank from "../images/blank-profile.png";
import {
  IoHomeOutline,
  IoDocumentsOutline,
  IoSettingsOutline,
  IoCardOutline,
  IoChevronUp,
  IoNewspaperOutline,
  IoPeopleCircleOutline,
  IoPersonOutline,
  IoSunnyOutline,
  IoHelpBuoyOutline,
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
          <Link to="/">Dashboard</Link>
        </div>
        <span className="people-divider">People</span>
        <div className="employee-link">
          <IoPersonOutline />
          <Link to="/employees">Employees</Link>
        </div>
        <div className="team-link">
          <IoPeopleCircleOutline />
          <Link to="/employees">Team</Link>
        </div>
        <div className="vacation-link">
          <IoSunnyOutline />
          <Link to="/employees">Vacation</Link>
        </div>
        <div className="expenses-link">
          <IoCardOutline />
          <Link to="/employees">Expenses</Link>
        </div>
        <span className="company-divider">Company</span>
        <div className="company-link">
          <IoHomeOutline />
          <Link to="/employees">Company</Link>
        </div>
        <div className="documents-link">
          <IoDocumentsOutline />
          <Link to="/employees">Documents</Link>
        </div>
        <span></span>
        <div className="settings-link">
          <IoSettingsOutline />
          <Link to="/employees">Settings</Link>
        </div>
        <div className="help-link">
          <IoHelpBuoyOutline />
          <Link to="/employees">Help</Link>
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
