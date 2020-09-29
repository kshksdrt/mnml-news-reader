import React, { useContext } from "react";
import "./assets/App.css";

import Header from "./components/Header";
import MainView from "./components/MainView";
import Footer from "./components/Footer";

import { GlobalContext } from "./state/Store";

function App() {
  const [state] = useContext(GlobalContext);

  return (
    <div className={"app " + state.theme}>
      <div className="home">
        <Header />
        <MainView />
        <Footer />
      </div>
    </div>
  );
}

export default App;
