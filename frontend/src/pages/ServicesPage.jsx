import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesGrid from '../components/ServicesGrid';
import ServicesHero from './serviceshero';
import './ServicesPage.css';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <Footer />
    </div>
  );
};

export default ServicesPage;