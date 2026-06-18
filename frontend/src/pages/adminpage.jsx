import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './adminpage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <button onClick={handleLogout}>
        Logout
      </button>

      <h1 className="admin-title">Admin Dashboard</h1>
    </div>
  );
};

export default AdminPage;