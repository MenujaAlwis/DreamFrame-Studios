import { useEffect, useState } from "react";
import "./ContactUsHero.css";
import heroImage from "../assets/contactus1.webp";
import heroImageMobile from "../assets/contactus-mobile1.webp";
import { useNavigate } from "react-router-dom";

const ContactUsHero = () => {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className={`contactuspage ${heroLoaded ? "loaded" : ""}`}>
        <div
          className="contactuspage-bg contactuspage-bg-desktop"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className="contactuspage-bg contactuspage-bg-mobile"
          style={{ backgroundImage: `url(${heroImageMobile})` }}
        />

        <div className="contactus-hero-content">
          <p
            className="contactus-hero-subtitle anim-item"
            style={{ "--delay": "0.1s" }}
          >
            Get in Touch
          </p>
          <h1
            className="contactus-hero-title anim-item"
            style={{ "--delay": "0.3s" }}
          >
            We'd Love to Hear From You
          </h1>
          <p
            className="contactus-hero-description anim-item"
            style={{ "--delay": "0.5s" }}
          >
            Have questions or ready to book your session? Reach out and we'll
            get back to you as soon as possible.
          </p>
          <button
            className="contactus-btn anim-item"
            style={{ "--delay": "0.7s" }}
            onClick={() => navigate("/contact-us#inquiry")}
          >
            <span>Book a Session →</span>
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-dot"></div>
          </div>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="hero-socials">
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTAGRAM
          </a>

          <span>•</span>

          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            FACEBOOK
          </a>
        </div>
      </section>
    </>
  );
};

export default ContactUsHero;