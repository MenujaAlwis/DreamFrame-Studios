import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import heroImage from "../assets/home2.jpeg";
import heroImage2 from "../assets/home3.png";
import heroImageMobile from "../assets/home-mobile1.png";
import { useNavigate } from "react-router-dom";
import { HOME_PORTFOLIO } from "../constants/HomePortfolio";
import { FaAward, FaCamera } from "react-icons/fa";

const BACKGROUND_IMAGES = [
  { desktop: heroImage, mobile: heroImageMobile },
  { desktop: heroImage2, mobile: heroImageMobile },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className={`homepage ${heroLoaded ? "loaded" : ""}`}>
        {BACKGROUND_IMAGES.map((img, index) => (
          <div key={index} className={`homepage-bg-wrapper ${index === currentBg ? "active" : ""}`}>
            <div
              className="homepage-bg homepage-bg-desktop"
              style={{ backgroundImage: `url(${img.desktop})` }}
            />
            <div
              className="homepage-bg homepage-bg-mobile"
              style={{ backgroundImage: `url(${img.mobile})` }}
            />
          </div>
        ))}

        <div className="hero-content">
          <p className="hero-subtitle anim-item" style={{ "--delay": "0.1s" }}>
            Timeless Photography
          </p>
          <h1 className="hero-title anim-item" style={{ "--delay": "0.3s" }}>
            Preserve
            <br />
            What Matters Most
          </h1>
          <p className="hero-description anim-item" style={{ "--delay": "0.5s" }}>
            Natural, Authentic, and Timeless
            <br />
            images that tell your story beautifully.
          </p>
          <button
            className="portfolio-btn anim-item"
            style={{ "--delay": "0.7s" }}
            onClick={() => navigate("/portfolio")}
          >
            <span>Explore Portfolio →</span>
          </button>
        </div>

        {/*<div className="hero-bottom-card">
          {HOME_PORTFOLIO.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                className="home-service-card anim-item"
                style={{ "--delay": `${0.9 + i * 0.12}s` }}
                key={item.category}
                onClick={() => navigate(`/portfolio?category=${item.category}`)}
              >
                <div className="home-service-icon">
                  <Icon />
                </div>
                <h3>{item.title.toUpperCase()}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>*/}
      </section>

      {/*<div className="stats-section" ref={statsRef}>
        <div className={`stat-title ${statsVisible ? "reveal" : ""}`}>
          More Than Photos, It's Your Legacy.
        </div>
        <div className="stat-subsection">
          <div
            className={`stat-item ${statsVisible ? "reveal" : ""}`}
            style={{ "--delay": "0.15s" }}
          >
            <div className="stat-icon-circle">
              <FaAward />
            </div>
            <div className="stat-text">
              <div className="stat-number-row">
                <span className="stat-number">
                  <CountUp target={5} suffix="+" trigger={statsVisible} />
                </span>
                <span className="stat-label">
                  YEARS OF
                  <br />
                  EXCELLENCE
                </span>
              </div>
            </div>
          </div>

          <div className="stat-divider" />

          <div
            className={`stat-item ${statsVisible ? "reveal" : ""}`}
            style={{ "--delay": "0.3s" }}
          >
            <div className="stat-icon-circle">
              <FaCamera />
            </div>
            <div className="stat-text">
              <div className="stat-number-row">
                <span className="stat-number">
                  <CountUp target={500} suffix="+" trigger={statsVisible} />
                </span>
                <span className="stat-label">
                  PROJECTS
                  <br />
                  COMPLETED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </>
  );
};

const CountUp = ({ target, suffix = "", trigger, duration = 1200 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return <>{value}{suffix}</>;
};

export default HomePage;