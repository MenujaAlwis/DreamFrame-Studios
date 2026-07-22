import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Alert, Button, Card, Input } from '../components/UI';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);

      const result = await loginUser({ email, password });

      if (!result.user || result.user.role !== 'admin') {
        setError('Access denied');
        return;
      }

      login(result.token, result.user);
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <section className="login-page">
      <div className="login-panel">
        <div className="login-copy">
          <span className="login-eyebrow">Admin access</span>
          <h1>Sign in to DreamFrame-Studios</h1>
          <p>Only authorized admins can access this panel.</p>
        </div>

        <Card className="login-card" hover>
          <form className="login-form" onSubmit={handleSubmit}>

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
            >
              Sign in
            </Button>

            {error && <Alert type="error">{error}</Alert>}
          </form>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;