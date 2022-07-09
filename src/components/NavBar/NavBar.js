/* eslint-disable jsx-a11y/img-redundant-alt */
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./NavBar.css";

import {
  IoCalendarOutline,
  IoCardOutline,
  IoChevronUp,
  IoHelpBuoyOutline,
  IoLogOutOutline,
  IoNewspaperOutline,
  IoPeopleCircleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Menu, MenuItem } from "@szhsin/react-menu";

import { Link } from "react-router-dom";
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
              <Link className="link-icon" to="/dashboard">
                <IoNewspaperOutline />
              </Link>
              <Link className="link-text" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <span className="people-divider divider">People</span>
            <li>
              <Link className="link-icon" to="/all-employees">
                <IoPersonOutline />
              </Link>
              <Link className="link-text" to="/all-employees">
                Employees
              </Link>
            </li>
            <li>
              <Link className="link-icon" to="/my-team">
                <IoPeopleCircleOutline />
              </Link>
              <Link className="link-text" to="/my-team">
                Team
              </Link>
            </li>
            <span className="empty-span"></span>
            <span className="people-divider divider">Events</span>
            <li>
              <Link className="link-icon" to="/vacation">
                <IoCalendarOutline />
              </Link>
              <Link className="link-text" to="/vacation">
                Vacation
              </Link>
            </li>
            <li>
              <Link className="link-icon" to="/expenses">
                <IoCardOutline />
              </Link>
              <Link className="link-text" to="/expenses">
                Expenses
              </Link>
            </li>
            <span className="empty-span"></span>
            <span className="empty-span"></span>
            <span className="empty-span"></span>
            <span className="empty-span"></span>
            <span className="empty-span"></span>
            <span className="empty-span"></span>
            <span className="empty-span"></span>
            <span className="control-panel-divider">Control Panel</span>
            <li className="settings-link">
              <Link className="link-icon" to="/employees">
                <IoSettingsOutline />
              </Link>
              <Link className="link-text" to="/employees">
                Settings
              </Link>
            </li>
            <li className="help-link">
              <Link className="link-icon" to="/help-center">
                <IoHelpBuoyOutline />
              </Link>
              <Link className="link-text" to="/help-center">
                Help
              </Link>
            </li>
            <li className="logout-icon">
              <Link className="link-icon" to="/login">
                <IoLogOutOutline
                  className="link-icon"
                  onClick={() => {
                    handleLogout();
                  }}
                />
              </Link>
              <Link className="link-text" to="/login">
                Logout
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="account-container">
        {user ? <img src={user.user.avatar} alt={"photo of user"} /> : null}
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
