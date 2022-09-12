import React from "react";

const Navbar = ({ title })=>{
    return (
      <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow bg-gradient-primary ">
        <div>
          <h6 style={{ color: '#fff' }}>{title}</h6>
        </div>
      </nav>
    );
}

export default Navbar;