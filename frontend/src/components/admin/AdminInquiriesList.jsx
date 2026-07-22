import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './AdminInquiriesList.css';

const AdminInquiriesList = () => {
  const { token, user } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  const menuRef = useRef(null);

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

      setOpenMenuId(null);
      loadInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (token && user?.role === 'admin') {
      loadInquiries();
    }
  }, [token, user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const services = Array.from(
    new Set(inquiries.map((inq) => inq.service).filter(Boolean))
  );

  const filteredInquiries = inquiries.filter((inq) => {
    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !query ||
      inq.fullName?.toLowerCase().includes(query) ||
      inq.email?.toLowerCase().includes(query) ||
      inq.phone?.toLowerCase().includes(query) ||
      inq.location?.toLowerCase().includes(query);

    const matchesService =
      serviceFilter === 'all' || inq.service === serviceFilter;

    return matchesSearch && matchesService;
  });

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
    <div className="admin-list inquiries-list">
      <h2>Manage Inquiries</h2>

      <div className="admin-toolbar">
        <div className="toolbar-search">
          <svg
            className="toolbar-search-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, phone, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="toolbar-filter"
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        >
          <option value="all">All services</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-grid">
        {filteredInquiries.length === 0 ? (
          <p className="empty-state">No inquiries match your search.</p>
        ) : (
          filteredInquiries.map((inq) => (
            <div key={inq._id} className="admin-card">
              <div className="admin-card-menu" ref={openMenuId === inq._id ? menuRef : null}>
                <button
                  className="dots-btn"
                  onClick={() => toggleMenu(inq._id)}
                  aria-label="Open actions menu"
                >
                  &#8942;
                </button>

                {openMenuId === inq._id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-delete"
                      onClick={() => deleteInquiry(inq._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-info">
                <h3 className="inquiry-name">{inq.fullName}</h3>
                <span className="inquiry-service-tag">{inq.service}</span>

                <div className="inquiry-details">
                  <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value">{inq.email}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{inq.phone}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Event date</span>
                    <span className="info-value">
                      {inq.eventDate
                        ? new Date(inq.eventDate).toDateString()
                        : 'No date'}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">Location</span>
                    <span className="info-value">{inq.location}</span>
                  </div>
                </div>

                {inq.message && (
                  <div className="inquiry-message">
                    <span className="info-label">Message</span>
                    <p>{inq.message}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminInquiriesList;