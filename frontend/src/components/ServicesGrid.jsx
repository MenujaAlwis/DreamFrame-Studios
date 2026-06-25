import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants/services';
import './ServicesGrid.css';

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="services-grid">
      {SERVICES.map((service) => (
        <div
          key={service.category}
          className="service-card"
          onClick={() =>
            navigate(`/portfolio?category=${service.category}`)
          }
        >
          <img src={service.image} alt={service.title} />
          <div className="overlay">
            <h2>{service.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;