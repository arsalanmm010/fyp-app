import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <Link to="/">
          <h2>IOT Based Health Monitoring System</h2>
        </Link>
      </nav>
    </div>
  );
}
