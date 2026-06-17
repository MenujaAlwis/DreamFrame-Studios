import { NavLink, Outlet } from 'react-router-dom';
import Feedbacks from '../components/Feedbacks';
import Mission from '../components/Mission';
import './layout.css';
import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import logofooter from '../assets/logofooter.png';
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Layout = () => {
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div className="layout">

      <header className='site-header'>
        <div className="header-content">
          <img className="logo" src={logo} alt="Logo" />

          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Portfolio</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Services</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="page-content">
        <Outlet />

        <Mission />
        <Feedbacks />
      </main>

      <footer className="site-footer" ref={footerRef}>
        <hr className="horizontal-line" />
        <div className={`footer-content ${footerVisible ? 'show' : ''}`}>
          <img className="logofooter" src={logofooter} alt="Logo" />
          {/* quick-links */}
          <div className="footer-section">
            <h4>Discover More</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          {/* Social media icons section */}
          <div className="social-section">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>

              <a href="https://wa.me/yourNumber" target="_blank" rel="noreferrer">
                <FaWhatsapp />
              </a>

              <a href="https://facebook.com/yourprofile" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <hr className="horizontal-line" />

        <div className={`footer-bottom ${footerVisible ? 'show' : ''}`}>
          <p>&copy; {new Date().getFullYear()} DreameFrame-Studios. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;