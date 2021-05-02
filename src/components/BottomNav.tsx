import React from "react";

import { ReactComponent as Home } from "../assets/icons/home.svg";
import { ReactComponent as Sources } from "../assets/icons/sources.svg";
import { ReactComponent as About } from "../assets/icons/about.svg";

import { View } from "../types";

interface Props {
  view: View;
  setView: Function;
  visibility: boolean;
}

const BottomNav: React.FC<Props> = (props) => {
  const { visibility, view, setView } = props;

  return (
    <div className={!visibility ? "nav-bottom-hide nav-bottom" : " nav-bottom"}>
      <div
        onClick={() => setView("home")}
        className={`nav-bottom-item ${view === "home" && "nav-tab-active"}`}
      >
        <Home />
      </div>
      <div
        onClick={() => setView("sources")}
        className={`nav-bottom-item ${view === "sources" && "nav-tab-active"}`}
      >
        <Sources />
      </div>
      <div
        onClick={() => setView("about")}
        className={`nav-bottom-item ${view === "about" && "nav-tab-active"}`}
      >
        <About />
      </div>
    </div>
  );
};

export default BottomNav;
