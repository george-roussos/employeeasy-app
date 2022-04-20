import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../images/logo.png";
import blank from "../../images/blank-profile.png";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoDocumentsOutline,
  IoSettingsOutline,
  IoCardOutline,
  IoChevronUp,
  IoNewspaperOutline,
  IoPeopleCircleOutline,
  IoPersonOutline,
  IoHelpBuoyOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./NavBar.css";

const NavBar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  return (
    <nav>
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>
      {user ? (
        <div className="links">
          <div className="dashboard-link">
            <IoNewspaperOutline />
            <Link to="/">Dashboard</Link>
          </div>
          <span className="people-divider">People</span>
          <div className="employee-link">
            <IoPersonOutline />
            <Link to="/all-employees">Employees</Link>
          </div>
          <div className="team-link">
            <IoPeopleCircleOutline />
            <Link to="/my-team">Team</Link>
          </div>
          <div className="vacation-link">
            <IoCalendarOutline />
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
      ) : null}
      <div className="account-container">
        <img src={user ? user.user.avatar : blank} alt={"photo of user"} />
        <p>{user ? user.user.name.split(" ")[0] : `User`}</p>
        {user ? (
          <Menu
            menuButton={
              <button className="menu-btn">
                <IoChevronUp />
              </button>
            }
            transition
          >
            <MenuItem>Account Settings</MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
