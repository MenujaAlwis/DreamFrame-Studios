import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './adminInquiriesList.css';

const AdminInquiriesList = () => {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState([]);

  const loadInquiries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inquiries', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setInquiries(res.data.inquiries || []);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      loadInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  return (
    <div className="admin-list">
      <h2>Manage Inquiries</h2>

      <div className="admin-grid">
        {inquiries.map((inq) => (
          <div key={inq._id} className="admin-card">
            <div className="admin-info">
              <h3>{inq.fullName}</h3>
              <p>{inq.email}</p>
              <p>{inq.phone}</p>
              <p>{inq.service}</p>
              <p>
                {inq.eventDate
                  ? new Date(inq.eventDate).toDateString()
                  : 'No date'}
              </p>
              <p>{inq.location}</p>
              <p>{inq.message}</p>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteInquiry(inq._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInquiriesList;