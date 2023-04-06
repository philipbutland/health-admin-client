// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    let role = "patient";
    const requestBody = { email, password, username, role };
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
    }

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log("Signup successful");
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <button type="submit">Sign up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="warningMessage">Already have account?</p>
      <p className="linkMessage"><Link to={"/login"}> <p className="link">Login</p></Link></p>
    </div>
  );
}

export default SignupPage;
