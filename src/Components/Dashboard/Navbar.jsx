import React from "react";
import dashboardStyle from "./Dashboard.module.css"

const Navbar = () => {
  return (
    <>
      <div className={dashboardStyle.heading}>QUIZZIE</div>
      <div className={dashboardStyle.nav_items}>
        <h1>Dashboard</h1>
        <h1>Analytics</h1>
        <h1>Create Quiz</h1>
      </div>
      <div className={dashboardStyle.logout}>
        <hr />
        <h1>Logout</h1>
      </div>
    </>
  );
};

export default Navbar;
