import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { 
    isLoggedIn,
    role = localStorage.getItem('role'),              
    logOutUser            
  } = useContext(AuthContext);
 
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      
         {isLoggedIn && (
        <>
       
        {role === "doctor" && (
          <>          
          <Link to="/patients">
            <button className="navButton">Patients</button>
          </Link>
          <Link to="/doctors">
            <button className="navButton">My Profile</button>
          </Link>
          <Link to="/appointments">
            <button className="navButton">Appointments</button>
          </Link>
          </>
      )} 
      {role === "patient" && (
        <>          
          <Link to="/patients">
            <button className="navButton">My Profile</button>
          </Link>
          <Link to="/appointments">
            <button className="navButton">Appointments</button>
          </Link>
          </>
      )}  
      {role === "admin" && (
        <>          
          <Link to="/patients">
            <button className="navButton">Patients</button>
          </Link>
          <Link to="/doctors">
            <button className="navButton">Doctors</button>
          </Link>
          <Link to="/appointments">
            <button className="navButton">Appointments</button>
          </Link>
          </>
      )}         
             <button onClick={logOutUser}>Logout</button>
          {/* <span>{user && user.name}</span> */}
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}
 
export default Navbar;