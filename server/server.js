require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // This ensures the DB connects on startup

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
// We need to link your authController here so the server knows what to do
const authController = require('./controllers/authController');

app.post('/api/auth/signup', authController.signup);
app.post('/api/auth/login', authController.login);

// A simple test route to make sure the server is alive
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running perfectly!' });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});