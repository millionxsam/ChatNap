import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import ProfileSetup from "./Components/ProfileSetup.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profilesetup" element={<ProfileSetup />} />
      </Routes>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
