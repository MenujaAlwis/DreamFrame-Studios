import { useEffect, useRef, useState } from 'react';
import logofooter from '../assets/logofooter.png';
import { FaInstagram, FaWhatsapp, FaFacebookF,  FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, } from "react-icons/fa";
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
        
        <div className="footer-column contact-section">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt className="contact-icon" /> 123 Main Street, Colombo, Sri Lanka</p>
          <p><FaPhoneAlt className="contact-icon" /> +94 11 123 4567</p>
          <p><FaWhatsapp className="contact-icon" /> +94 77 123 4567</p>
          <p><FaEnvelope className="contact-icon" /> info@dreamframe-studios.com</p>
        </div>

        <div className="footer-column footer-section">
          <img className="logofooter" src={logofooter} alt="Logo" />
          <ul className="footer-links">
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/our-team">Our Team</a></li>
          </ul>
        </div>

        <div className="footer-column social-section">
          <h4>Explore</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="facebook-icon">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
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