import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP, FaYoutube } from "react-icons/fa";
import logofooter from "../assets/header-logo.png";
import "./Footer.css";
import footericon from "../assets/footer-icon.png";

const Footer = () => {

  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFooterVisible(true);
      }
    }, { threshold: 0.15 });

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>

      <div className={`footer-wrapper ${footerVisible ? "show" : ""}`}>

        <div className="footer-grid">

          <div className="footer-about footer-col" style={{ "--col-delay": "0s" }}>

            <img src={logofooter} alt="DreamFrame Studios" className="footer-logo" />

            <p className="footer-description">
              Timeless photography for the moments that matter most.
            </p>

            <div className="footer-socials">

              <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ "--icon-delay": "0.1s" }}>
                <FaInstagram />
              </a>

              <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ "--icon-delay": "0.18s" }}>
                <FaFacebookF />
              </a>

              <a href="#" target="_blank" rel="noreferrer" aria-label="Pinterest" style={{ "--icon-delay": "0.26s" }}>
                <FaPinterestP />
              </a>

              <a href="#" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ "--icon-delay": "0.34s" }}>
                <FaYoutube />
              </a>

            </div>

          </div>

          <div className="footer-links-column footer-col" style={{ "--col-delay": "0.1s" }}>

            <h4>Quick Links</h4>

            <Link to="/">Home</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/services">Services</Link>
            <Link to="/our-team">Our Team</Link>
            <Link to="/contact">Contact</Link>

          </div>

          <div className="footer-links-column footer-col" style={{ "--col-delay": "0.18s" }}>

            <h4>Portfolio</h4>

            <Link to="/portfolio?category=weddings">Weddings</Link>
            <Link to="/portfolio?category=pre-shoots">Pre Shoots</Link>
            <Link to="/portfolio?category=portraits">Portraits</Link>
            <Link to="/portfolio?category=events">Events</Link>
            <Link to="/portfolio?category=commercials">Commercials</Link>

          </div>

          <div className="footer-links-column footer-col" style={{ "--col-delay": "0.26s" }}>

            <h4>Services</h4>

            <Link to="/services">Wedding Photography</Link>
            <Link to="/services">Pre Wedding Shoots</Link>
            <Link to="/services">Portrait Photography</Link>
            <Link to="/services">Event Photography</Link>
            <Link to="/services">Commercial Photography</Link>

          </div>

          <div className="footer-newsletter footer-col" style={{ "--col-delay": "0.34s" }}>

            <h4>Let's Stay Connected</h4>

            <p>
              Get inspiration, special offers and updates straight to your inbox.
            </p>

            <form className="newsletter-form">

              <input className="newsletter-input"
                type="email"
                placeholder="Your email address"
              />

              <button type="submit">
                <span>Subscribe</span>
              </button>

            </form>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} DreamFrame Studios. All Rights Reserved.
          </p>

          <img src={footericon} alt="Footer Icon" className="footer-icon" />
          <p className="footer-tagline">
            Capturing Moments. Creating Memories.
          </p>

          <div className="footer-bottom-links">

            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>

          </div>

        </div>

      </div>

    </footer>
  );

};

export default Footer;