import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminPage.css';

import UploadPortfolioItem from './UploadPortfolioItem';
import AdminPortfolioList from '../components/admin/AdminPortfolioList';
import AdminInquiriesList from '../components/admin/AdminInquiriesList';

const AdminPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');

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

      <div className="admin-tabs">
        <button
          className={activeTab === 'portfolio' ? 'active' : ''}
          onClick={() => setActiveTab('portfolio')}
        >
          Manage Portfolios
        </button>

        <button
          className={activeTab === 'inquiries' ? 'active' : ''}
          onClick={() => setActiveTab('inquiries')}
        >
          Manage Inquiries
        </button>
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

        {activeTab === 'portfolio' && <AdminPortfolioList />}

        {activeTab === 'inquiries' && <AdminInquiriesList />}
      </div>
    </div>
  );
};

export default AdminPage;