import PortfolioGrid from '../components/PortfolioGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
        <Header />
        <PortfolioGrid />
        <Footer />
    </div>
  );
};

export default PortfolioPage;