import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants/services';
import './ServicesGrid.css';

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="services-section">
      <div className="services-intro">
        <p>Explore our photography categories and collections</p>
      </div>

      <div className="services-masonry">
        {SERVICES.map((service, index) => (
          <div
            key={service.category}
            className="service-card"
            style={{ animationDelay: `${index * 80}ms` }}
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