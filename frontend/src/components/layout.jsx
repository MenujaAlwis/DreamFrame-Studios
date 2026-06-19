import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';
import { useEffect, useRef, useState } from 'react';

const Layout = () => {
  return (
    <div className="layout">
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;    
          
