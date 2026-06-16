import { NavLink, Outlet } from 'react-router-dom';
import Feedbacks from '../components/Feedbacks';
import Mission from '../components/Mission';
import './layout.css';

import logo from '../assets/logo.png';

const Layout = () => {
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

      <footer className="site-footer">
        <div className="footer-content">

          <div className="footer-section">
            <h4>DreameFrame-Studios</h4>
            <p>Premium event photography and videography for your special moments.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <p className="footer-muted">hello@dreameframe.com</p>
          </div>

        </div>

        <hr className="horizontal-line" />

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DreameFrame-Studios. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Layout;