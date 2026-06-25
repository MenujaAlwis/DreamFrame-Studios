import PortfolioGrid from '../components/PortfolioGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortfolioHero from './portfoliohero';
import { useSearchParams } from 'react-router-dom';
import './portfoliopage.css';

const PortfolioPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  return (
    <div className="portfolio-page">
        <Header />
        <PortfolioHero />
        <PortfolioGrid initialCategory={category} />
        <Footer />
    </div>
  );
};

export default PortfolioPage;