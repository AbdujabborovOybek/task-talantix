import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./Assets/Global.css";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <Router />
    </SnackbarProvider>
  </BrowserRouter>
);
