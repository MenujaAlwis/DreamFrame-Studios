import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPortfolioItems } from '../services/api';
import { CATEGORIES } from '../constants';
import Button from './UI/Button';
import Spinner from './UI/Spinner';
import Alert from './UI/Alert';
import RevealCard from './RevealCard';
import './portfolioGrid.css';

const PortfolioGrid = ({ sectionRef }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const animationRef = useRef(null);

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

    const el = sectionRef?.current || animationRef.current;

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

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
    <section
      id="collections"
      ref={sectionRef || animationRef}
      className="portfoliogrid-section"
    >
      <p className={`portfolio-intro-line ${isVisible ? 'show' : ''}`}>
        A curated collection of timeless stories captured through light,
        emotion, and detail
      </p>

      <div className={`filter-container ${isVisible ? 'show delay-1' : ''}`}>
        <div className="filter-pills">
          {CATEGORIES.map((category, i) => (
            <span
              key={category.value || 'all'}
              className="filter-pill-wrap"
              style={{ '--pill-delay': `${0.4 + i * 0.06}s` }}
            >
              <Button
                variant={
                  selectedCategory === category.value
                    ? 'filter-active'
                    : 'filter'
                }
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.value);

                  if (category.value) {
                    navigate(`/portfolio?category=${category.value}`);
                  } else {
                    navigate('/portfolio');
                  }
                }}
              >
                <span>{category.label}</span>
              </Button>
            </span>
          ))}
        </div>
      </div>

      {error && <Alert type="error">{error}</Alert>}

      {loading ? (
        <div className="loading-state show">
          <Spinner size="md" />
          <p>Loading portfolio...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state show">
          <h3>No portfolios found</h3>
          <p>
            {selectedCategory
              ? 'No projects available in this category yet.'
              : 'No portfolio items have been uploaded yet.'}
          </p>
        </div>
      ) : (
        <div className={`portfolio-grid ${isVisible ? 'show delay-2' : ''}`}>
          {items.map((item, index) => (
            <RevealCard key={item._id} delay={(index % 3) * 120}>
              <div
                className="portfolio-card"
                onClick={() => navigate(`/portfolio/${item._id}`)}
              >
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
                      ? `${new Date(item.eventDate).toLocaleDateString(
                          'en-GB',
                          {
                            day: 'numeric',
                            month: 'long',
                          }
                        )}, ${new Date(item.eventDate).getFullYear()}`
                      : ''}
                  </p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;