import { useState } from 'react';
import { submitInquiry } from '../services/api';
import './inquiryForm.css';

const InquiryForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'wedding',
    eventDate: '',
    location: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitInquiry(form);

      setSuccess(true);

      setForm({
        fullName: '',
        email: '',
        phone: '',
        service: 'wedding',
        eventDate: '',
        location: '',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inquiry" className="inquiry-container">
      <h2>Send Us an Inquiry</h2>
      <p>Tell us about your event and we will get back to you soon.</p>

      <form onSubmit={handleSubmit} className="inquiry-form">

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select
          name="service"
          value={form.service}
          onChange={handleChange}
        >
          <option value="wedding">Wedding</option>
          <option value="pre-shoot">Pre-shoot</option>
          <option value="portrait">Portrait</option>
          <option value="event">Event</option>
          <option value="commercial">Commercial</option>
        </select>

        <input
          name="eventDate"
          type="date"
          value={form.eventDate}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>

        {success && (
          <p className="success">
            Your inquiry has been submitted successfully!
          </p>
        )}

        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
};

export default InquiryForm;