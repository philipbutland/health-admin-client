import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { 
    user,
    isLoggedIn,
    role = localStorage.getItem('role'),              
    logOutUser            
  } = useContext(AuthContext);

  console.log("user", user)
  return (
    <nav className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      
         {isLoggedIn && (
        <>
       
        {role === "doctor" && (
          <> 
          {user._id && 
          <Link to={`/doctors/${user._id}`}>          
            <button className="navButton">My Profile</button>
          </Link>
          }
               
          <Link to="/appointments">
            <button className="navButton">Appointments</button>
          </Link>
          </>
      )} 
      {role === "patient" && (
        <>          

          {user._id && 
          <Link to={`/patients/${user._id}`}>          
            <button className="navButton">My Profile</button>
          </Link>
          }

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
             <span className="userName">{user && user.username}</span>
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
