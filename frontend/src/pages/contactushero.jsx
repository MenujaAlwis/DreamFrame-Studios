/*import './contactushero.css';
import bg from '../assets/contactushero.png';

const ContactUsHero = ({ onOpenInquiry }) => {
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

        <button className="contact-us-inquiry-btn" onClick={onOpenInquiry}>
          Send Us an Inquiry
        </button>
      </div>
    </div>
  );
};

export default ContactUsHero;*/

import "./contactushero.css";
import heroImage from "../assets/contactus.png";
import { useNavigate } from "react-router-dom";

const ContactUsHero = () => {
const navigate = useNavigate();
  return (
    <>
    <section
      className="contactuspage"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="contactus-hero-content">
        <p className="contactus-hero-subtitle">Get in Touch</p>
        <h1 className="contactus-hero-title">We'd Love to Hear From You</h1>
        <p className="contactus-hero-description">Have questions or ready to book your session? Reach out and we'll get back to you as soon as possible.</p>
        <button
          className="contactus-btn"
          onClick={() => navigate("/contact-us#inquiry")}
        >
          Book a Session →
        </button>
      </div>
    </section>
    </>
  );
};

export default ContactUsHero;