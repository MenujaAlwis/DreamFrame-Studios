const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

app.use(cors({
  /*origin: 'http://localhost:5173',*/
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DreamFrame Studios API is running'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

module.exports = app;