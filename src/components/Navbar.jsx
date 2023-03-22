import { Link } from "react-router-dom";
 
function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/doctors">
        <button>Doctors</button>
      </Link>
      <Link to="/patients">
        <button>Patients</button>
      </Link>
      <Link to="/appointments">
        <button>Appointments</button>
      </Link>
    </nav>
  );
}
 
export default Navbar;