import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  const [isShowNav, setIsShowNav] = useState(true);

  let location = useLocation().pathname;

  useEffect(() => {
    // let session = sessionStorage.getItem("accoutn");

    // if (session) {
    //   setIsShowNav(true);
    // }
    if (location === "/login") {
      setIsShowNav(false);
    }
  }, [location]);
  return (
    <div>
      {isShowNav && (
        <div className="topnav">
          <NavLink className="" to="/home" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </div>
  );
}

export default Nav;
