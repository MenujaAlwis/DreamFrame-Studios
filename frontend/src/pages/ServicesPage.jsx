import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesGrid from '../components/ServicesGrid';
import ServicesHero from './serviceshero';
import './ServicesPage.css';
import ExperienceSection from '../components/ExperienceSection';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <ExperienceSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;