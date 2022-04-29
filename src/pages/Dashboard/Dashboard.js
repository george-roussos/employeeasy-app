import "./Dashboard.css";

import Budget from "../../components/Widgets/TimeInMeetings";
import { Button } from "primereact/button";
import { IoCarOutline } from "react-icons/io5";
import LatestRequests from "../../components/Widgets/LatestRequests";
import { Menu } from "@szhsin/react-menu";
import TasksProgress from "../../components/Widgets/TasksProgress";
import Timeline from "../../components/Widgets/Timeline";
import TotalCustomers from "../../components/Widgets/OutsideRequests";
import TotalProfit from "../../components/Widgets/AvgLogoutTime";

const Dashboard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="top-header">
        <div className="header-icon">
          <IoCarOutline />
        </div>
        <div className="top-header-text">
          <h2>Hi {user ? user.user.name.split(" ")[0] : "there"}!</h2>
          <h3>Here's what's happening this week.</h3>
        </div>
        <div className="header-buttons">
          <Menu
            menuButton={
              <Button
                icon="pi pi-bell"
                className="p-button-rounded p-button-warning p-button-text p-button-lg"
                aria-label="Notification"
              />
            }
            transition
          >
            <p className="notification-window-message">No new notifications!</p>
          </Menu>
          <Button
            type="button"
            label="Emails"
            badge="8"
            onClick={() => window.open("http://gmail.com", "_blank")}
          />
        </div>
      </div>
      <div className="overview-widgets">
        <Budget />
        <TotalCustomers />
        <TasksProgress />
        <TotalProfit />
      </div>
      <div className="card-widgets">
        <LatestRequests />
        <Timeline />
      </div>
    </div>
  );
};

export default Dashboard;
