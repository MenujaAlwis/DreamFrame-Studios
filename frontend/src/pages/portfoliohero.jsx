import './portfoliohero.css';
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

export default PortfolioHero;