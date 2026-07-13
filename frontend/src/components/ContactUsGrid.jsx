import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import "./contactUsGrid.css";

const CONTACT_METHODS = [
  {
    icon: FaPhoneAlt,
    label: "Call Us",
    value: "+94 77 123 4567",
    href: "tel:+94771234567",
    cta: "Call Now",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+94 77 123 4567",
    href: "https://wa.me/94771234567",
    cta: "Chat With Us",
    external: true,
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "hello@dreamframestudios.com",
    href: "mailto:hello@dreamframestudios.com",
    cta: "Send an Email",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Studio Location",
    value: "24 Ward Place, Colombo 07, Sri Lanka",
    href: "https://maps.google.com/?q=24+Ward+Place+Colombo+07",
    cta: "Get Directions",
    external: true,
  },
];

const WORKING_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
  { day: "Sunday", hours: "By Appointment Only" },
];

const ContactUsGrid = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section
      className={`contact-grid-section ${isVisible ? "show" : ""}`}
      ref={sectionRef}
    >
      <span className="contact-grid-tag">Get In Touch</span>
      <h2 className="contact-grid-title">Let's Start a Conversation</h2>
      <p className="contact-grid-description">
        Whether you have a question, a booking in mind, or just want to say
        hello — we'd love to hear from you.
      </p>

      <div className="contact-grid">
        {CONTACT_METHODS.map((method, index) => {
          const Icon = method.icon;
          return (
            <div
              key={method.label}
              className="contact-card"
              style={{ "--card-delay": `${0.3 + index * 0.12}s` }}
            >
              <div className="contact-card-icon">
                <Icon />
              </div>

              <h3>{method.label}</h3>
              <p className="contact-card-value">{method.value}</p>

              
                <a href={method.href}
                className="contact-card-link"
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noreferrer" : undefined}
              >
                <span>{method.cta} →</span>
              </a>
            </div>
          );
        })}
      </div>

      <div className="contact-grid-lower">
        <div
          className="contact-hours"
          style={{ "--card-delay": "0.75s" }}
        >
          <div className="contact-hours-header">
            <FaClock />
            <h3>Studio Hours</h3>
          </div>

          <ul className="contact-hours-list">
            {WORKING_HOURS.map((item) => (
              <li key={item.day}>
                <span className="contact-hours-day">{item.day}</span>
                <span className="contact-hours-time">{item.hours}</span>
              </li>
            ))}
          </ul>

          <div className="contact-socials">
            <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

        <div
          className="contact-map"
          style={{ "--card-delay": "0.85s" }}
        >
          <iframe
            title="Studio Location"
            src="https://www.google.com/maps?q=24+Ward+Place+Colombo+07&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <button
        className="contact-grid-btn"
        onClick={() =>
          document
            .getElementById("inquiry")
            ?.scrollIntoView({ behavior: "smooth" }) ||
          navigate("/contact-us#inquiry")
        }
      >
        <span>Send a Detailed Inquiry →</span>
      </button>
    </section>
    </>
  );
};

export default ContactUsGrid;