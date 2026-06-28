import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsHero from './contactushero';
import './ContactUsPage.css';
import InquiryForm from '../components/InquiryForm';

const ContactUsPage = () => {
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