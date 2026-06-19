import PortfolioGrid from '../components/PortfolioGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortfolioHero from './portfoliohero';
import './portfoliopage.css';

const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
        <Header />
        <PortfolioHero />
        <PortfolioGrid />
        <Footer />
    </div>
  );
};

export default PortfolioPage;