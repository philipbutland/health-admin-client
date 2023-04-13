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
    setErrorMessage("")
    const requestBody = { email, password, username, role };
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!email || !password || !username) {
      if (!email && !password && !username) {
        setErrorMessage("please provide an e-mail address, user name and password")
      }
      else if (email){
        if (password){
          setErrorMessage("Please provide a user name")
        }
        else if (username) {
          setErrorMessage("Please provide a password")
        }
        else {
          setErrorMessage("Please provide a user name and password")         
        }
      }
      else if (password) {
        if (username) {
          setErrorMessage("Please provide an e-mail address")
        }
        else {
          setErrorMessage("Please provide an e-mail address and user name")
        }
      }
      else {
        setErrorMessage("Please provide an e-mail address and password")       
      }
    }
    else if (!passwordRegex.test(password)) {
      setErrorMessage("Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.")
    }

    else {
      axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        alert("Signup successful");
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        if (errorMessage){
          console.log(errorDescription)
        }
        else {
          setErrorMessage(errorDescription);
        }
      });
    }
};

  return (
    <div className="loginPage">
      <p className="pageHeader">Sign Up</p>

      <form onSubmit={handleSignupSubmit}>
        <label className="loginLabel">Email:</label>
        <input className="loginField" type="email" name="email" value={email} onChange={handleEmail} />

        <label className="loginLabel">Password:</label>
        <input className="loginField" type="password" name="password" value={password} onChange={handlePassword} />

        <label className="loginLabel">Name:</label>
        <input className="loginField" type="text" name="username" value={username} onChange={handleUsername}
        />
        <button className="loginButton" type="submit">Sign up</button>
      </form>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <div className="longMessage">
        <p className="warningMessage">Already have an account?</p>
        <p className="linkMessage"><Link to={"/login"}> <p className="link">Login</p></Link></p>
      </div>

    </div>
  );
}

export default SignupPage;
