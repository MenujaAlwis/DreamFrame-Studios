/*import './serviceshero.css';
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

export default ServicesHero;*/

import "./serviceshero.css";
import heroImage from "../assets/services.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
const navigate = useNavigate();
  return (
    <>
    <section
      className="servicespage"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="services-hero-content">
        <p className="services-hero-subtitle">Photography Services</p>
        <h1 className="services-hero-title">Timeless Images. Meaningful Stories</h1>
        <p className="services-hero-description">Every session is crafted with care to capture the moments <br /> that matter most. Choose the experience that's right for you.</p>
        <button
          className="services-portfolio-btn"
          onClick={() => navigate("/")}
        >
          View Packages →
        </button>
      </div>
    </section>
    </>
  );
};

export default HomePage;