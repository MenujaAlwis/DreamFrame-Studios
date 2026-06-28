import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './adminInquiriesList.css';

const AdminInquiriesList = () => {
  const { token, user } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadInquiries = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError('');

      const res = await axios.get('http://localhost:5000/api/inquiries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInquiries(res.data.inquiries || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  // IMPORTANT FIX: wait for token
  useEffect(() => {
    if (token && user?.role === 'admin') {
      loadInquiries();
    }
  }, [token, user]);

  if (!token) {
    return <p style={{ color: 'white' }}>Not logged in</p>;
  }

  if (loading) {
    return <p style={{ color: 'white' }}>Loading inquiries...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="admin-list">
      <h2>Manage Inquiries</h2>

      <div className="admin-grid">
        {inquiries.length === 0 ? (
          <p style={{ color: 'white' }}>No inquiries found</p>
        ) : (
          inquiries.map((inq) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default AdminInquiriesList;