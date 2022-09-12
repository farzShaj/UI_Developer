import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ setTitle }) => {

  useEffect(() => {
    if (window.location) {
      const path = window.location.pathname;
      if (path === "/") {
        setTitle("Reward Points");
      } else {
        setTitle("Upload Purchase History");
      }
    }
  }, [])

  return (
    <ul className="navbar-nav bg-gradient-primary-2 sidebar sidebar-dark accordion" id="accordionSidebar" style={{ fontSize: '14px' }}>
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" onClick={() => setTitle("Reward Points")} to={"/"}>
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Account</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <Link className="nav-link" onClick={() => setTitle("Reward Points")} to={"/"}>
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span style={{ fontSize: '17px' }}>Reward</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" onClick={() => setTitle("Upload Purchase History")} to={"/upload"}>
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span style={{ fontSize: '17px' }}>Add Transcetion</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
