import { useEffect, useState } from 'react';
import { getPortfolioItems } from '../services/api';
import { CATEGORIES } from '../constants';
import Button from './UI/Button';
import Card from './UI/Card';
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
    <section className="portfolio-section">

      <div className="portfolio-header">
        <h1>Portfolio</h1>
        <p className="portfolio-subtitle">
          Browse event highlights across different categories.
        </p>
      </div>

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
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>No portfolio events found.</p>
        </div>
      ) : (
        <div className="portfolio-grid">

          {items.map((item) => (
            <Card key={item._id} hover className="portfolio-card">

              {/* COVER IMAGE (main preview) */}
              {item.coverImage?.url && (
                <div className="portfolio-cover">
                  <img
                    src={item.coverImage.url}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              )}

              {/* TITLE + CATEGORY */}
              <div className="portfolio-card-body">
                <h3>{item.title}</h3>
                <p className="portfolio-category">{item.category}</p>
              </div>

              {/* MEDIA GALLERY */}
              {item.media?.length > 0 && (
                <div className="portfolio-media-strip">
                  {item.media.slice(0, 3).map((m, index) => (
                    <div key={index} className="media-thumb">
                      {m.mediaType === 'video' ? (
                        <video src={m.url} />
                      ) : (
                        <img src={m.url} alt="media" />
                      )}
                    </div>
                  ))}
                </div>
              )}

            </Card>
          ))}

        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;