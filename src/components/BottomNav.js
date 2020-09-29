import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as Home } from "../assets/icons/home.svg";
import { ReactComponent as Sources } from "../assets/icons/sources.svg";
import { ReactComponent as About } from "../assets/icons/about.svg";

export default function BottomNav({ visibility }) {
  let location = useLocation();

  return (
    <div className={!visibility ? "nav-bottom-hide nav-bottom" : " nav-bottom"}>
      <Link
        to="/"
        className={`nav-bottom-item ${
          location.pathname === "/" && "nav-tab-active"
        }`}
      >
        <Home />
      </Link>
      <Link
        to="/sources"
        className={`nav-bottom-item ${
          location.pathname === "/sources" && "nav-tab-active"
        }`}
      >
        <Sources />
      </Link>
      <Link
        to="/about"
        className={`nav-bottom-item ${
          location.pathname === "/about" && "nav-tab-active"
        }`}
      >
        <About />
      </Link>
    </div>
  );
}
