import { useEffect, useState } from "react";
import "./ServicesHero.css";
import heroImage from "../assets/services2.png";
import heroImageMobile from "../assets/services-mobile1.png";
import { useNavigate } from "react-router-dom";

const ServicesHero = () => {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className={`servicespage ${heroLoaded ? "loaded" : ""}`}>
        <div
          className="servicespage-bg servicespage-bg-desktop"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className="servicespage-bg servicespage-bg-mobile"
          style={{ backgroundImage: `url(${heroImageMobile})` }}
        />

        <div className="services-hero-content">
          <p
            className="services-hero-subtitle anim-item"
            style={{ "--delay": "0.1s" }}
          >
            Photography Services
          </p>
          <h1
            className="services-hero-title anim-item"
            style={{ "--delay": "0.3s" }}
          >
            Timeless Images. Meaningful Stories
          </h1>
          <p
            className="services-hero-description anim-item"
            style={{ "--delay": "0.5s" }}
          >
            Thoughtfully crafted sessions to capture the moments <br /> that
            matter most. Choose the experience that's right for you.
          </p>
          <button
            className="services-portfolio-btn anim-item"
            style={{ "--delay": "0.7s" }}
            onClick={() => navigate("/")}
          >
            <span>View Packages →</span>
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

export default ServicesHero;