import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortfolioGrid from '../components/PortfolioGrid';
import PortfolioHero from './portfoliohero';
import './portfoliopage.css';

const PortfolioPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const gridRef = useRef(null);

  useEffect(() => {
    if (category && gridRef.current) {
      setTimeout(() => {
        gridRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 200);
    }
  }, [category]);

  return (
    <div className="portfolio-page">
      <Header />
      <PortfolioHero />
      <PortfolioGrid sectionRef={gridRef} />
      <Footer />
    </div>
  );
};

export default PortfolioPage;