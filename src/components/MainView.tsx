import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import Home from "./MainView/Home";
import Sources from "./MainView/Sources";
import About from "./MainView/About";
import BottomNav from "./BottomNav";
import { AppState, View } from "../types";
import { setView } from "../redux/actionCreator";

type Props = ConnectedProps<typeof connector>;

const MainView: React.FC<Props> = (props) => {
  const [bottomNavState, setBottomNavState] = useState(true);
  const { view, setView } = props;

  function handleWheel(e: React.WheelEvent) {
    if (e.deltaY > 0) setBottomNavState(false);
    if (e.deltaY < 0) setBottomNavState(true);
  }

  return (
    <div className="home-content" onWheel={handleWheel}>
      {view === "home" && <Home />}
      {view === "sources" && <Sources />}
      {view === "about" && <About />}
      <BottomNav visibility={bottomNavState} view={view} setView={setView} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    view: state.app.view,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setView: (view: View) => dispatch(setView(view)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MainView);
