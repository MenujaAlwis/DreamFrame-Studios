import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPortfolioItemById } from '../services/api';
import Spinner from '../components/UI/Spinner';
import Alert from '../components/UI/Alert';
import RevealCard from '../components/RevealCard';
import './portfolioDetailsPage.css';

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxClosing, setLightboxClosing] = useState(false);

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

  const imageMedia =
    item?.media?.filter(
      media => media.mediaType === 'image'
    ) || [];

  const closeLightbox = () => {
    setLightboxClosing(true);
    setTimeout(() => {
      setLightboxOpen(false);
      setLightboxClosing(false);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      }

      if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev =>
          prev === imageMedia.length - 1 ? 0 : prev + 1
        );
      }

      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev =>
          prev === 0 ? imageMedia.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
  }, [lightboxOpen, imageMedia.length]);

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
          <span className="back-arrow">←</span> Back to Portfolio
        </button>

        <div className="portfolio-detail-content">
          <RevealCard>
            <div className="portfolio-detail-info">
              <span className="portfolio-detail-category">
                {item.category?.toUpperCase() || 'PORTFOLIO'}
              </span>

              <h1 className="portfolio-detail-title">
                {item.title}
              </h1>

              {item.eventDate && (
                <p className="portfolio-detail-date">
                  {new Date(item.eventDate).toLocaleDateString(
                    'en-GB',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                </p>
              )}
            </div>
          </RevealCard>

          <RevealCard delay={200}>
            <div className="portfolio-detail-image-wrapper">
              <img
                src={item.coverImage?.url}
                alt={item.title}
                className="portfolio-detail-image"
              />
            </div>
          </RevealCard>
        </div>
      </section>

      <section className="portfolio-detail-gallery-section">
        <div className="portfolio-detail-gallery">
          {item.media?.map((media, index) => {
            const imageIndex = imageMedia.findIndex(
              img => img.url === media.url
            );

            return (
              <RevealCard
                key={index}
                delay={(index % 4) * 120}
              >
                <div className="portfolio-detail-gallery-item">
                  {media.mediaType === 'image' ? (
                    <img
                      src={media.url}
                      alt={`gallery-${index}`}
                      onClick={() => {
                        setCurrentImageIndex(imageIndex);
                        setLightboxOpen(true);
                      }}
                    />
                  ) : (
                    <video controls preload="metadata">
                      <source src={media.url} />
                    </video>
                  )}
                </div>
              </RevealCard>
            );
          })}
        </div>
      </section>

      {lightboxOpen && (
        <div
          className={`lightbox-overlay ${lightboxClosing ? 'closing' : ''}`}
          onClick={closeLightbox}
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
          >
            ×
          </button>

          <button
            className="lightbox-arrow left"
            onClick={e => {
              e.stopPropagation();

              setCurrentImageIndex(prev =>
                prev === 0
                  ? imageMedia.length - 1
                  : prev - 1
              );
            }}
          >
            ‹
          </button>

          <img
            key={currentImageIndex}
            src={imageMedia[currentImageIndex]?.url}
            alt=""
            className="lightbox-image"
            onClick={e => e.stopPropagation()}
          />

          <button
            className="lightbox-arrow right"
            onClick={e => {
              e.stopPropagation();

              setCurrentImageIndex(prev =>
                prev === imageMedia.length - 1
                  ? 0
                  : prev + 1
              );
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetailPage;