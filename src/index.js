import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from "react-router-dom";

const app = (
  //   <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //   </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
