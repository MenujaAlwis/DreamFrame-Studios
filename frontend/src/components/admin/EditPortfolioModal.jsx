import { useState } from 'react';
import axios from 'axios';
import './editModal.css';

const EditPortfolioModal = ({ item, token, onClose, onUpdated }) => {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [eventDate, setEventDate] = useState(item.eventDate?.split('T')[0]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('eventDate', eventDate);

    await axios.put(
      `http://localhost:5000/api/portfolio/${item._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    onUpdated();
    onClose();
  };

  return (
    <div className="edit-portfolio-overlay">
      <div className="edit-portfolio-box">
        <button className="edit-portfolio-close" onClick={onClose}>
          ×
        </button>

        <form onSubmit={handleUpdate} className="edit-portfolio-form">
          <h2>Edit Portfolio</h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="wedding">Wedding</option>
            <option value="pre-shoot">Pre-shoot</option>
            <option value="portrait">Portrait</option>
            <option value="event">Event</option>
            <option value="commercial">Commercial</option>
          </select>

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolioModal;