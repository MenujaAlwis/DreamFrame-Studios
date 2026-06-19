import { useEffect, useState } from 'react';
import { getPortfolioItems } from '../services/api';
import { CATEGORIES } from '../constants';
import Button from './UI/Button';
import Spinner from './UI/Spinner';
import Alert from './UI/Alert';
import './portfolioGrid.css';

const PortfolioGrid = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPortfolioItems(selectedCategory);
        setItems(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedCategory]);

  return (
    <section className="portfoliogrid-section">
      <p className="portfolio-intro-line">
      A curated collection of timeless stories captured through light, emotion, and detail
    </p>
      <div className="filter-container">
        <div className="filter-pills">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value || 'all'}
              variant={selectedCategory === category.value ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {error && <Alert type="error">{error}</Alert>}

      {loading ? (
        <div className="loading-state">
          <Spinner size="md" />
          <p>Loading portfolio...</p>
        </div>
      ) : (
        <div className="portfolio-grid">

          {items.map((item) => (
            <div key={item._id} className="portfolio-card">

              <img
                className="portfolio-image"
                src={item.coverImage?.url}
                alt={item.title}
              />

              <div className="portfolio-overlay"></div>

              <div className="portfolio-center">
                <h2>{item.title}</h2>
                <p className="portfolio-date">
                  {item.eventDate
                  ? `${new Date(item.eventDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                    })}, ${new Date(item.eventDate).getFullYear()}`
                  : ''}
                </p>
                <div className="arrow-wrapper">
                  <span className="arrow">→</span>
                </div>
              </div>

            </div>
          ))}

        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;