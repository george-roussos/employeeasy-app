import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./NavBar.css";

import {
  IoCalendarOutline,
  IoCardOutline,
  IoChevronUp,
  IoDocumentsOutline,
  IoHelpBuoyOutline,
  IoHomeOutline,
  IoNewspaperOutline,
  IoPeopleCircleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Menu, MenuItem } from "@szhsin/react-menu";

import { Link } from "react-router-dom";
import blank from "../../images/blank-profile.png";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  return (
    <nav>
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>
      <div>
        {user ? (
          <ul className="links-list">
            <li>
              <IoNewspaperOutline />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <span className="people-divider">People</span>
            <li>
              <IoPersonOutline />
              <Link to="/all-employees">Employees</Link>
            </li>
            <li>
              <IoPeopleCircleOutline />
              <Link to="/my-team">Team</Link>
            </li>
            <li>
              <IoCalendarOutline />
              <Link to="/vacation">Vacation</Link>
            </li>
            <li>
              <IoCardOutline />
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <IoPeopleCircleOutline />
              <Link to="/my-team">Team</Link>
            </li>
            <span className="company-divider">Company</span>
            <li>
              <IoHomeOutline />
              <Link to="/employees">Company</Link>
            </li>
            <li>
              <IoDocumentsOutline />
              <Link to="/employees">Documents</Link>
            </li>
            <span></span>
            <span></span>
            <li>
              <IoSettingsOutline />
              <Link to="/employees">Settings</Link>
            </li>
            <li>
              <IoHelpBuoyOutline />
              <Link to="/help-center">Help</Link>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="account-container">
        <img src={user ? user.user.avatar : blank} alt={"photo of user"} />
        <p>{user ? user.user.name.split(" ")[0] : null}</p>
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
                navigate("/login");
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
