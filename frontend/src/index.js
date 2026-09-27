import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CVProvider } from "./context/CVContext";
import { ApplicationsProvider } from "./context/ApplicationsContext";
import { JobsProvider } from "./context/JobsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CVProvider>
            <JobsProvider>
              <ApplicationsProvider>
                <App />
              </ApplicationsProvider>
            </JobsProvider>
          </CVProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
