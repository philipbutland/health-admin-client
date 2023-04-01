import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { 
    isLoggedIn,
    user,                   
    logOutUser            
  } = useContext(AuthContext);
 
  return (
    <nav className="navbar">
      <Link to="/">
        <button className="navButton">Home</button>
      </Link>

         {isLoggedIn && (
        <>
          <Link to="/doctors">
            <button className="navButton">Doctors</button>
          </Link>
          <Link to="/patients">
            <button className="navButton">Patients</button>
          </Link>
          <Link to="/appointments">
            <button className="navButton">Appointments</button>
          </Link>
          
          <button className="loginButton" onClick={logOutUser}>Logout</button>

          <span className="userName">{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button className="loginButton">Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button className="loginButton">Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
