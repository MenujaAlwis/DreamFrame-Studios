import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPortfolioItemById } from '../services/api';
import Spinner from '../components/UI/Spinner';
import Alert from '../components/UI/Alert';
import './portfolioDetailsPage.css';

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPortfolioItemById(id);
        setItem(data.item);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (loading) return <Spinner size="md" />;
  if (error) return <Alert type="error">{error}</Alert>;
  if (!item) return <p>Portfolio not found</p>;

  return (
    <div className="portfolio-detail-page">
      <section className="portfolio-detail-hero">
        <div
          className="portfolio-detail-bg"
          style={{
            backgroundImage: `url(${item.coverImage?.url})`,
          }}
        />

        <div className="portfolio-detail-overlay" />

        <button
          className="portfolio-detail-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back to Portfolio
        </button>

        <div className="portfolio-detail-content">
          <div className="portfolio-detail-info">
            <span className="portfolio-detail-category">
              {item.category?.toUpperCase() || 'PORTFOLIO'}
            </span>

            <h1 className="portfolio-detail-title">
              {item.title}
            </h1>

            {item.eventDate && (
              <p className="portfolio-detail-date">
                {new Date(item.eventDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>

          <div className="portfolio-detail-image-wrapper">
            <img
              src={item.coverImage?.url}
              alt={item.title}
              className="portfolio-detail-image"
            />
          </div>
        </div>
      </section>

      <section className="portfolio-detail-gallery-section">
        <div className="portfolio-detail-gallery">
          {item.media?.map((media, index) =>
            media.mediaType === 'image' ? (
              <div key={index} className="portfolio-detail-gallery-item">
                <img
                  src={media.url}
                  alt={`gallery-${index}`}
                />
              </div>
            ) : (
              <div key={index} className="portfolio-detail-gallery-item">
                <video controls preload="metadata">
                  <source src={media.url} />
                </video>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetailPage;