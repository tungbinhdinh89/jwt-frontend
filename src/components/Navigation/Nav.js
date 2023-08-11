import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  return (
    <div>
      <div className="topnav">
        <NavLink className="" to="/home" exact>
          Home
        </NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
  );
}

export default Nav;
