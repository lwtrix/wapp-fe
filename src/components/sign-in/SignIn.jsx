import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/actions/userActions";

import "./sign-in.css";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
      className=" position-relative"
    >
      <div
        style={{ height: "25vh", backgroundColor: "#00A884" }}
        className="w-100 d-flex justify-content-center"
      >
        <div className="w-50 p-3 text-light " style={{ fontSize: "1rem" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png"
            style={{ width: "2.5vw", marginRight: "5px" }}
          />
          WhatsApp Web
        </div>
      </div>
      <div
        style={{ height: "75vh", backgroundColor: "#111B21" }}
        className="w-100"
      >
        <div
          className="bg-light main-div d-flex justify-content-center align-content-center"
          style={{ width: "1000px", height: "100%" }}
        >
          <div className="sign-in-position">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
