/*import './portfoliohero.css';
import bg from '../assets/portfoliohero.png';

const PortfolioHero = () => {
  return (
    <div
      className="portfolio-hero"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="portfolio-hero-content">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-subtitle">
          A collection of timeless moments captured with passion
        </p>
      </div>
    </div>
  );
};

export default PortfolioHero;*/


import "./portfoliohero.css";
import heroImage from "../assets/portfolio.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
const navigate = useNavigate();
  return (
    <>
    <section
      className="portfoliopage"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="portfolio-hero-content">
        <p className="portfolio-hero-subtitle">Featured Collections</p>
        <h1 className="portfolio-hero-title">Capturing Life's Precious Moments</h1>
        <p className="portfolio-hero-description">Explore our featured collections <br /> A curated glimpse into our dedicated work</p>
        <button
          className="portfolio-hero-btn"
          onClick={() => navigate("/")}
        >
          Explore Work →
        </button>
      </div>
    </section>
    </>
  );
};

export default HomePage;