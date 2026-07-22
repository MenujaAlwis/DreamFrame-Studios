import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsHero from './ContactUsHero';
import InquiryForm from '../components/InquiryForm';
import './ContactUsPage.css';
import ContactUsGrid from '../components/ContactUsGrid';

const ContactUsPage = () => {
  const location = useLocation();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    if (location.hash === '#inquiry') {
      setIsInquiryOpen(true);
    }
  }, [location]);

  return (
    <div className="contact-us-page">
      <Header />
      <ContactUsHero onOpenInquiry={() => setIsInquiryOpen(true)} />
      <ContactUsGrid />
      <Footer />

      {isInquiryOpen && (
        <InquiryForm onClose={() => setIsInquiryOpen(false)} />
      )}
    </div>
  );
};

export default ContactUsPage;