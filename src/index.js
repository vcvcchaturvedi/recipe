import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import {api} from "./App.js";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
