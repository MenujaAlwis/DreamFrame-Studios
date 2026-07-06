import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants/services';
import './ServicesGrid.css';

const ServicesGrid = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-intro">
        <p>
          Explore our photography categories and collections
        </p>
      </div>

      <div className={`services-masonry ${isVisible ? 'show' : ''}`}>
        {SERVICES.map((service, index) => (
          <div
            key={service.category}
            className={`service-card ${isVisible ? 'show' : ''}`}
            style={{ transitionDelay: `${index * 80}ms` }}
            onClick={() =>
              navigate(`/portfolio?category=${service.category}`)
            }
          >
            <div className="image-wrapper">
              <img src={service.image} alt={service.title} />
            </div>

            <div className="service-text">
              <p className="service-title">{service.title}</p>
              <p className="service-arrow">→</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;