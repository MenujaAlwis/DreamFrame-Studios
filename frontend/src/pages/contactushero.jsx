import './contactushero.css';
import bg from '../assets/contactushero.png';

const ContactUsHero = () => {
  return (
    <div
      className="contact-us-hero"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="contact-us-hero-content">
        <h1 className="contact-us-title">Contact Us</h1>
        <p className="contact-us-subtitle">
          Get in touch with us
        </p>
      </div>
    </div>
  );
};

export default ContactUsHero;