require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle unexpected crashes
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION:', err);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (err) => {
      console.error('UNCAUGHT EXCEPTION:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();