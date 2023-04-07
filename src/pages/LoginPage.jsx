// src/pages/LoginPage.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    console.log("REQUEST INFO", email, password)
    setErrorMessage("")

    if(!email) {
      setErrorMessage("Please enter an e-mail address")
    }

    else if (!password) {
      setErrorMessage("Please enter a password")
    }

    else {
      console.log("!!!")
      axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("§§", response.data)
        storeToken(response.data.authToken);
        authenticateUser();
        console.log("roleFromServer:" + response.data.role);
        localStorage.setItem("role", response.data.role);
  
        if (response.data.role === "doctor") {
          console.log("save role as:", response.data.role);
          localStorage.setItem("role", response.data.role);
          if (response.data.login) {
            // navigate(`/doctors/${response.data.login._id}`);
            navigate("/")
          } 
        } else if (response.data.role === "patient") {
          console.log("save role as:", response.data.role);
          localStorage.setItem("role", response.data.role);
          if (response.data.login) {
            // navigate(`/patients/${response.data.login._id}`);
            navigate("/")
          }
        } else if (response.data.role === "admin") {
          console.log("save role as:", response.data.role);
          localStorage.setItem("role", response.data.role);
          if (response.data.login) {
            navigate(`/`);
          }
        }
      })
      .catch((error) => {
        console.log("error", error)
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
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="errorMessage">{errorMessage}</p> }

      <p className="warningMessage">Don't have an account yet?</p>
      <p className="linkMessage"><Link to={"/signup"}> <p className="link">Sign Up</p></Link></p>
      
    </div>
  )
}

export default LoginPage;
