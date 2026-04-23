import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>🏨 Hotel</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/details">Details</Link>
        <Link to="/about">About</Link>
        <Link to="/checkin">Check-In</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
export default Navbar;