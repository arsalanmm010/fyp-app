import { Link } from "react-router-dom";
import "../App.css";

export default function Header({ handleLogout }) {
  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <Link to="/">
          <h2 className="title">IOT Based Health Monitoring System</h2>
        </Link>
      </nav>
      <button onClick={handleLogout} className="logOut">
        Logout
      </button>
    </div>
  );
}
