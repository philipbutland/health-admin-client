import { Link } from "react-router-dom";
 
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <button className="navButton">Home</button>
      </Link>
      <Link to="/doctors">
        <button className="navButton">Doctors</button>
      </Link>
      <Link to="/patients">
        <button className="navButton">Patients</button>
      </Link>
      <Link to="/appointments">
        <button className="navButton">Appointments</button>
      </Link>
    </nav>
  );
}
 
export default Navbar;