import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";

import "./authentication.css";

const Authentication = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/main");
    }
  });
  return (
    <div className="authentication">
      <SignIn />
      {/* <SignUp/> */}
    </div>
  );
};

export default Authentication;
