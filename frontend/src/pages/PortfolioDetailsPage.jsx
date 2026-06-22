import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPortfolioItemById } from '../services/api';
import Spinner from '../components/UI/Spinner';
import Alert from '../components/UI/Alert';
import './portfolioDetailsPage.css';

const PortfolioDetailPage = () => {
  const { id } = useParams();
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
    <div className="portfolio-detail">
      <div className="portfolio-header">
        <h1>{item.title}</h1>
        <p className="portfolio-date">
          {item.eventDate &&
            new Date(item.eventDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
        </p>
      </div>

      <div className="portfolio-cover">
        <img src={item.coverImage?.url} alt={item.title} />
      </div>

      <div className="portfolio-gallery">
        {item.media?.map((m, index) =>
          m.mediaType === 'image' ? (
            <img key={index} src={m.url} alt={`media-${index}`} />
          ) : (
            <video key={index} controls src={m.url} />
          )
        )}
      </div>
    </div>
  );
};

export default PortfolioDetailPage;