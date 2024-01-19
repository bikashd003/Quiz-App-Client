import React from "react";
import dashboardStyle from "./Dashboard.module.css"
import {useNavigate} from "react-router-dom"

const Navbar = ({dasboardState,popup}) => {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className={dashboardStyle.heading}>QUIZZIE</div>
      <div className={dashboardStyle.nav_items}>
        <h1 onClick={()=>dasboardState("dashboard")}>Dashboard</h1>
        <h1 onClick={()=>dasboardState("analytics")}>Analytics</h1>
        <h1 onClick={()=>popup(true)}>Create Quiz</h1>
      </div>
      <div className={dashboardStyle.logout}>
        <hr />
        <h1 onClick={handleLogout}>Logout</h1>
      </div>
    </>
  );
};

export default Navbar;
