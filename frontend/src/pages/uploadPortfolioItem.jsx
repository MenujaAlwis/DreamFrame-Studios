import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './uploadPortfolioItem.css';

const UploadPortfolioItem = () => {
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('wedding');
  const [eventDate, setEventDate] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('category', category);
      formData.append('eventDate', eventDate);
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }

      for (let i = 0; i < media.length; i++) {
        formData.append('media', media[i]);
      }

      await axios.post('http://localhost:5000/api/portfolio', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Upload successful');
      setTitle('');
      setEventDate('');
      setCoverImage(null);
      setMedia([]);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-portfolio-wrapper">
      <div className="upload-portfolio-card">
        <h2 className="upload-portfolio-title">Create Portfolio Event</h2>

        <form onSubmit={handleSubmit} className="upload-portfolio-form">

          <div className="upload-portfolio-field">
            <label>Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="upload-portfolio-field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="wedding">Wedding</option>
              <option value="pre-shoot">Pre-shoot</option>
              <option value="portrait">Portrait</option>
              <option value="event">Event</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="upload-portfolio-field">
            <label>Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <div className="upload-portfolio-field">
            <label>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          <div className="upload-portfolio-field">
            <label>Media Files</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setMedia([...e.target.files])}
            />
          </div>

          <button className="upload-portfolio-submit" type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Event'}
          </button>

          {message && <p className="upload-portfolio-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UploadPortfolioItem;