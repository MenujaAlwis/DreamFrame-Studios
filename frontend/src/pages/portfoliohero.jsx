import { useEffect, useState } from "react";
import "./portfoliohero.css";
import heroImage from "../assets/portfolio1.png";
import heroImageMobile from "../assets/portfolio1-mobile.png";
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
      </section>
    </>
  );
};

export default PortfolioHero;