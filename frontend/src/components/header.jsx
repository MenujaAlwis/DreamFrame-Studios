import { NavLink, Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/header-logo.png";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">

        <div className="brand-logo">
          <img src={logo} alt="DreamFrame Studios Logo" />
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
            <NavLink to="/services" className="nav-link">Services</NavLink>
            <NavLink to="/our-team" className="nav-link">Our Team</NavLink>
            <NavLink to="/contact-us" className="nav-link">Contact</NavLink>
          </nav>

          <Link to="/contact-us#inquiry" className="book-session-btn">
            Book a Session
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;