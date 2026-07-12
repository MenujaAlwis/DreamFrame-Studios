import { useState, useEffect } from "react";
import { submitInquiry } from "../services/api";
import "./inquiryForm.css";

const SERVICE_OPTIONS = [
  { value: "wedding", label: "Wedding" },
  { value: "pre-shoot", label: "Pre-shoot" },
  { value: "portrait", label: "Portrait" },
  { value: "event", label: "Event" },
  { value: "commercial", label: "Commercial" },
];

const InquiryForm = ({ onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "wedding",
    eventDate: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 250);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceSelect = (value) => {
    setForm((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await submitInquiry(form);

      setSuccess(true);

      setForm({
        fullName: "",
        email: "",
        phone: "",
        service: "wedding",
        eventDate: "",
        location: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      requestClose();
    }
  };

  return (
    <div
      className={`inquiry-overlay ${closing ? "closing" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`inquiry-container ${closing ? "closing" : ""}`}>

        <button
          className="inquiry-close-btn"
          onClick={requestClose}
          aria-label="Close"
        >
          ×
        </button>

        <span className="inquiry-tag">
          LET'S CREATE SOMETHING BEAUTIFUL
        </span>

        <h2>Send an Inquiry</h2>

        <p className="inquiry-subtitle">
          Share a few details about your event. Nothing needs to be finalized—
          we'll personally get in touch to discuss your plans.
        </p>

        <form className="inquiry-form" onSubmit={handleSubmit}>

          <div className="inquiry-field">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />

          </div>

          <div className="inquiry-field">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="inquiry-field">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+94 7X XXX XXXX"
              value={form.phone}
              onChange={handleChange}
              required
            />

          </div>

          <div className="inquiry-field">

            <label>
              What type of session are you looking for?
            </label>

            <div
              className="service-options"
              role="radiogroup"
              aria-label="Select a service"
            >

              {SERVICE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="service-radio"
                >
                  <input
                    type="radio"
                    name="service"
                    value={option.value}
                    checked={form.service === option.value}
                    onChange={() =>
                      handleServiceSelect(option.value)
                    }
                  />

                  <span className="service-radio-dot"></span>

                  <span className="service-radio-label">
                    {option.label}
                  </span>

                </label>
              ))}

            </div>

          </div>

          <div className="inquiry-field">

            <label htmlFor="eventDate">
              When are you planning your event?
            </label>

            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={form.eventDate}
              onChange={handleChange}
            />

          </div>

          <div className="inquiry-field">

            <label htmlFor="location">
              Event Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="City / Venue"
              value={form.location}
              onChange={handleChange}
            />

          </div>
                    <div className="inquiry-field">

            <label htmlFor="message">
              Tell us a little about your plans
            </label>

            <textarea
              id="message"
              name="message"
              placeholder="Share anything you'd like us to know about your event, vision, or ideas..."
              value={form.message}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            <span className="submit-btn-label">
              {loading ? (
                <span className="submit-loading">
                  <span className="submit-dot" />
                  <span className="submit-dot" />
                  <span className="submit-dot" />
                </span>
              ) : (
                "Send Inquiry"
              )}
            </span>
          </button>

          {success && (
            <p className="success show">
              Thank you! Your inquiry has been received. We'll be in touch as soon as possible.
            </p>
          )}

          {error && (
            <p className="error show">
              {error}
            </p>
          )}

        </form>

      </div>
    </div>
  );
};

export default InquiryForm;