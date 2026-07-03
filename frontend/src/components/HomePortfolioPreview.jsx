import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PORTFOLIO } from "../constants/homePortfolio";
import "./HomePortfolioPreview.css";

const HomePortfolioPreview = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`home-portfolio ${visible ? "show" : ""}`}
    >
      <div className="home-portfolio-header">
        <p className="home-portfolio-subtitle">Explore My Work</p>

        <h2>
          Timeless Photography
          <br />
          for Every Chapter
        </h2>

        <p className="home-portfolio-description">
          From heartfelt moments to life's biggest milestones,
          explore the stories We've had the honor to capture.
        </p>
      </div>

      <div className="home-portfolio-grid">
        {HOME_PORTFOLIO.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.category}
              className="home-portfolio-card"
              style={{ animationDelay: `${index * 120}ms` }}
              onClick={() =>
                navigate(`/portfolio?category=${item.category}`)
              }
            >
              <div className="home-portfolio-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="home-portfolio-icon">
                <Icon />
              </div>

              <div className="home-portfolio-content">
                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <span className="home-portfolio-link">
                  View Gallery →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="home-portfolio-button"
        onClick={() => navigate("/portfolio")}
      >
        View Full Portfolio
      </button>
    </section>
  );
};

export default HomePortfolioPreview;