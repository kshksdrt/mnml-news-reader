import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import Store from "./state/Store";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
