import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesGrid from '../components/ServicesGrid';
import ServicesHero from './ServicesHero';
import './ServicesPage.css';
import ExperienceSection from '../components/ExperienceSection';
import AwardsSection from '../components/AwardsSection';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <ExperienceSection />
      <AwardsSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;