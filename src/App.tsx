import React, { useContext, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import "./assets/App.css";

import Header from "./components/Header";
import MainView from "./components/MainView";
import Footer from "./components/Footer";

import { AppState } from "./types";

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = (props) => {
  return (
    <div className={"app " + props.theme}>
      <div className="home">
        <Header />
        <MainView />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    theme: state.theme,
  };
};

const connector = connect(mapStateToProps);

export default connector(App);
