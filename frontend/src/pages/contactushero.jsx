import { useEffect, useState } from "react";
import "./contactushero.css";
import heroImage from "../assets/contactus.png";
import { useNavigate } from "react-router-dom";

const ContactUsHero = () => {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className={`contactuspage ${heroLoaded ? "loaded" : ""}`}>
        <div
          className="contactuspage-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="contactus-hero-content">
          <p
            className="contactus-hero-subtitle anim-item"
            style={{ "--delay": "0.1s" }}
          >
            Get in Touch
          </p>
          <h1
            className="contactus-hero-title anim-item"
            style={{ "--delay": "0.3s" }}
          >
            We'd Love to Hear From You
          </h1>
          <p
            className="contactus-hero-description anim-item"
            style={{ "--delay": "0.5s" }}
          >
            Have questions or ready to book your session? Reach out and we'll
            get back to you as soon as possible.
          </p>
          <button
            className="contactus-btn anim-item"
            style={{ "--delay": "0.7s" }}
            onClick={() => navigate("/contact-us#inquiry")}
          >
            <span>Book a Session →</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default ContactUsHero;