{/*import { useEffect, useState } from 'react';
import './homepage.css';

import img1 from '../assets/homepage-img11.png';
import img2 from '../assets/homepage-img2.png';
import img3 from '../assets/homepage-img3.png';
import img4 from '../assets/homepage-img4.png';

const backgroundImages = [img1, img2, img3, img4];

const taglines = ["Forever Begins Here", "Proud Moments Forever", "Cherish Every Moment", "Joy In Frames"];

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
                setFade(false);
            }, 300);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage" style={{backgroundImage: `url(${backgroundImages[currentImageIndex]})`,}}>
            <div className="hero-content">
                <h1 className={`hero-title ${fade ? "fade" : ""}`}>{taglines[currentImageIndex]}</h1>
                <p className="hero-subtitle">Capture your timeless moments with us</p>
            </div>
        </div>
    );
};

export default HomePage;*/}

import "./homepage.css";
import heroImage from "../assets/home.jpg";
import { useNavigate } from "react-router-dom";
import { HOME_PORTFOLIO } from "../constants/homeportfolio";

const HomePage = () => {
const navigate = useNavigate();
  return (
    <section
      className="homepage"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <p className="hero-subtitle">Timeless Photography</p>
        <h1 className="hero-title">Preserve What Matters Most</h1>
        <p className="hero-description">Natural, Authentic, and Timeless<br />images that tell your story beautifully.</p>
        <button
          className="portfolio-btn"
          onClick={() => navigate("/portfolio")}
        >
          Explore Portfolio →
        </button>
      </div>
      <div className="hero-bottom-card">
        {HOME_PORTFOLIO.map((item) => {
          const Icon = item.icon;

          return (
            <div className="home-service-card" key={item.category}>
              <div className="home-service-icon">
                <Icon />
              </div>

              <h3>{item.title.toUpperCase()}</h3>

              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;