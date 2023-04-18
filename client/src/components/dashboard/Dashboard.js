import React from "react";
import { Outlet } from "react-router-dom";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar } from "./components";
import "./Dashboard.css";

import { useStateContext } from "../../contexts/DashboardContextProvider";

const Dashboard = ({
  sidebarLinks,
  notificationData,
  userProfileData,
  userProfPic,
}) => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar links={sidebarLinks} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar
              notificationData={notificationData}
              userProfileData={userProfileData}
              userProfPic={userProfPic}
            />
          </div>

          <Outlet />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
