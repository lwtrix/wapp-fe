import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/actions/userActions";
const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(null);

  const handleChange = (value, fieldToSet) => {
    setCredentials({
      ...credentials,
      [fieldToSet]: value,
    });
  };

  const handleSignIn = async () => {
    if (credentials.email && credentials.password) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };

      const baseEndpoint = process.env.REACT_APP_BE_DEV;
      const res = await fetch(`${baseEndpoint}/auth/signin`, options);

      if (res.ok) {
        const response = await res.json();
        dispatch(setUser(response.token));
        navigate("/main");
      }
    }
  };

  return (
    <>
      <div className="sign-in my-3 mx-2">
        <h2 className="title mb-4" style={{ fontWeight: "300" }}>
          Sign In
        </h2>
        <div className="inputs-container mb-2">
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => handleChange(e.target.value, "email")}
              placeholder="johndoe@gmail.com"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => handleChange(e.target.value, "password")}
              placeholder="***********"
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-end">
          <Button className="sign-in-btn mt-2" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
};
export default SignInForm;
