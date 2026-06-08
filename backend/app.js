const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DreameFrame Studios API is running'
  });
});

module.exports = app;