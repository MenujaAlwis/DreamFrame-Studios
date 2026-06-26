import './serviceshero.css';
import bg from '../assets/serviceshero.png';

const ServicesHero = () => {
  return (
    <div
      className="services-hero"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="services-hero-content">
        <h1 className="services-title">Collections</h1>
        <p className="services-subtitle">
          Stories told through timeless frames and authentic moments
        </p>
      </div>
    </div>
  );
};

export default ServicesHero;