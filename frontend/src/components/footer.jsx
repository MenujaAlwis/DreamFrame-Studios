import { useEffect, useRef, useState } from 'react';
import logofooter from '../assets/logofooter.png';
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import './footer.css';

const Footer = () => {
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
    <footer className="site-footer" ref={footerRef}>
      <hr className="horizontal-line" />

      <div className={`footer-content ${footerVisible ? 'show' : ''}`}>
        <img className="logofooter" src={logofooter} alt="Logo" />

        <div className="footer-section">
          <h4>Discover More</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/our-team">Our Team</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="social-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://wa.me/yourNumber" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <hr className="horizontal-line" />

      <div className={`footer-bottom ${footerVisible ? 'show' : ''}`}>
        <p>&copy; {new Date().getFullYear()} DreamFrame-Studios. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;