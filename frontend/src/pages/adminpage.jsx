import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './adminpage.css';
import UploadPortfolioItem from './uploadPortfolioItem';

const AdminPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        <UploadPortfolioItem />
      </div>

    </div>
  );
};

export default AdminPage;