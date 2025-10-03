import React, { useState } from "react";
import { Tab, Tabs, Collapse } from "@mui/material";
import logo from "@/assets/icons/logo.svg";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

const LoginAuthentication = () => {
  const [tab, setTab] = useState(0);
  const [showReset, setShowReset] = useState(false);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setShowReset(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 p-10">
      <div className="auth-container bg-white">
        <img src={logo} alt="logo" className="logo w-20" />

        <div>
          <p variant="h5" className="fs-30 fw-600 mt-20">
            {tab === 0 ? "Log in to your account" : "Create an account"}
          </p>
          <p className="fs-16 text-gray fw-400 mt-5 mb-20">
            {tab === 0
              ? "Welcome back! Please enter your details."
              : "Join us for a new experience"}
          </p>
        </div>
        <LoginForm switchToSignUp={() => setTab(1)} />

        {/* <div className="tab-switcher mt-20 w-100">
          
          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            <Tab label="Log in" />
            <Tab label="Sign up" />
          </Tabs>
        </div>

        <div className="form-section">
          <div className="form-wrapper">
            <Collapse in={tab === 0 && !showReset} >
            </Collapse>

            <Collapse in={tab === 1 && !showReset}>
              <SignUpForm switchToLogin={() => setTab(0)} />
            </Collapse>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginAuthentication;
