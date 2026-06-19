import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PortfolioPage from './pages/PortfolioPage';

const  App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App
