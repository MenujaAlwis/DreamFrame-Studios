import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PortfolioPage from './pages/PortfolioPage';
import ScrollToTop from './components/ScrollToTop';
import PortfolioDetailsPage from './pages/PortfolioDetailsPage';

const  App = () => {
  return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<PortfolioDetailsPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App
