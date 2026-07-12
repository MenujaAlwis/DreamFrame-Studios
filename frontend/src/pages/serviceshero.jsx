import { useEffect, useState } from "react";
import "./serviceshero.css";
import heroImage from "../assets/services.png";
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
          className="servicespage-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
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
      </section>
    </>
  );
};

export default ServicesHero;