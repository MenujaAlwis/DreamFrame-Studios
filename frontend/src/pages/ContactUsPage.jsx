import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsHero from './contactushero';
import './ContactUsPage.css';

const ContactUsPage = () => {
  return (
    <div className="contact-us-page">
      <Header />
      <ContactUsHero />
      <Footer />
    </div>
  );
};

export default ContactUsPage;