import Header from '../components/Header';
import HomePage from './HomePage';
import Mission from '../components/Mission';
import Feedbacks from '../components/Feedbacks';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InstagramGallery from '../components/InstagramGallery';
import HomePortfolioPreview from '../components/HomePortfolioPreview';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#feedbacks') {
      const el = document.getElementById('feedbacks');

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  return (
    <>
      <Header />

      <HomePage />

      <Mission />

      <Feedbacks />
      <HomePortfolioPreview />
      <InstagramGallery />
      <Footer />
    </>
  );
};

export default Home;