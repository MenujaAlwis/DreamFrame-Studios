/*import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import './header.css';


const Header = () => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;

      setScrolledPastHero(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`site-header ${
        scrolledPastHero ? "header-white" : "header-transparent"
      }`}
    >
      <div className='header-wrapper'>
        <div className="header-content">
          {scrolledPastHero ? (<div className="brand-text">DreamFrame Studios</div>) : (<div className="brand-text-default">DreamFrame Studios</div>)}
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Portfolio</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Services</NavLink>
            <NavLink to="/our-team" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Our Team</NavLink>
            <NavLink to="/contact-us" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;*/

import { NavLink } from "react-router-dom";
import "./header.css";
import logo from "../assets/header-logo.png";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">

        <div className="brand-logo">
          <img src={logo} alt="DreamFrame Studios Logo" />
        </div>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
          <NavLink to="/services" className="nav-link">Services</NavLink>
          <NavLink to="/our-team" className="nav-link">Our Team</NavLink>
          <NavLink to="/contact-us" className="nav-link">Contact</NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Header;

