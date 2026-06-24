import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './adminpage.css';
import UploadPortfolioItem from './uploadPortfolioItem';
import AdminPortfolioList from '../components/admin/AdminPortfolioList';

const AdminPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="buttons">
          <button
            className="upload-btn"
            onClick={() => setShowUploadForm(true)}
          >
            Upload Portfolio
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">

        {showUploadForm && (
          <div className="modal-overlay">
            <div className="modal-box">

              <div className="modal-header">
                <button
                  className="close-btn"
                  onClick={() => setShowUploadForm(false)}
                >
                  ✕
                </button>
              </div>

              <UploadPortfolioItem />

            </div>
          </div>
        )}

      </div>
        <AdminPortfolioList />
    </div>
  );
};

export default AdminPage;