import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import MyShift from "./components/panel/MyShift";
import Month from "./components/panel/Month";
import LocationLog from "./components/dashboardComponents/LocationLog";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/*Authentication Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-shifts" element={<MyShift />} />
        <Route path="/monthly-report" element={<Month />} />
        <Route path="/location" element={<LocationLog />} />
      </Routes>
    </div>
  );
};

export default App;
