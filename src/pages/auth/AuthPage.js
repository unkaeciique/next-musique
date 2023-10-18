import React, { useState } from "react";
import "./AuthPage.scss";
import LoginForm from "../../../src/components/Forms/LoginForm";
import RegisterForm from "../../../src/components/Forms/RegisterForm";

import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

const Login = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="body">
      <div className={containerClass} id="container">
        <RegisterForm />
        <LoginForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome back friend</h1>
              <p className="text-lg">
                If you already have an account, login here and have fun
              </p>
              <button
                className="ghost my-6 flex flex-row justify-center items-center"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Login this way
                <PiArrowRightBold style={{ fill: "white", marginLeft: 6 }} />
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Join in with others now</h1>
              <p className="text-lg">
                If you don't have an account yet, create one now
              </p>
              <button
                className="ghost my-6 flex flex-row justify-center items-center"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                <PiArrowLeftBold style={{ fill: "white", marginRight: 6 }} />
                Register this way
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
