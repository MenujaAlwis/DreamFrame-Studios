import { useEffect, useState } from "react";
import "./PortfolioHero.css";
import heroImage from "../assets/portfolio3.png";
import heroImageMobile from "../assets/portfolio2-mobile.png";
import { useNavigate } from "react-router-dom";

const PortfolioHero = () => {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className={`portfoliopage ${heroLoaded ? "loaded" : ""}`}>
        <div
          className="portfoliopage-bg portfoliopage-bg-desktop"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className="portfoliopage-bg portfoliopage-bg-mobile"
          style={{ backgroundImage: `url(${heroImageMobile})` }}
        />

        <div className="portfolio-hero-content">
          <p
            className="portfolio-hero-subtitle anim-item"
            style={{ "--delay": "0.1s" }}
          >
            Featured Collections
          </p>
          <h1
            className="portfolio-hero-title anim-item"
            style={{ "--delay": "0.3s" }}
          >
            Capturing Life's Precious Moments
          </h1>
          <p
            className="portfolio-hero-description anim-item"
            style={{ "--delay": "0.5s" }}
          >
            Explore our featured collections <br /> A curated glimpse into our
            dedicated work
          </p>
          <button
            className="portfolio-hero-btn anim-item"
            style={{ "--delay": "0.7s" }}
            onClick={() => {
              document.getElementById("collections")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <span>Explore Work →</span>
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

export default PortfolioHero;