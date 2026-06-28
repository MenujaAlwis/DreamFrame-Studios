import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsHero from './contactushero';
import InquiryForm from '../components/InquiryForm';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#inquiry') {
      const el = document.getElementById('inquiry');

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="contact-us-page">
      <Header />
      <ContactUsHero />
      <InquiryForm />
      <Footer />
    </div>
  );
};

export default ContactUsPage;