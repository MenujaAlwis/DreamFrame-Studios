import { NavLink } from "react-router-dom";
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
          {scrolledPastHero ? (<div className="brand-text">DreamFrame Studios</div>) : (<img className="logo" src={logo} alt="Logo" />)}
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Portfolio</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Services</NavLink>
            <NavLink to="/our-team" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Our Team</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;