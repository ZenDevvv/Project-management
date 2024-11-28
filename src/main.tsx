import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./router/Router";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </AuthProvider>
);
