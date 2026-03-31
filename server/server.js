const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');
const { createUsersTable } = require('./config/migrations');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database schema
createUsersTable();

// Auth Routes
app.use('/api/auth', authRoutes);

app.get('/health', async (req, res) => {
  try {
    // Attempt a simple query to ensure the DB is responsive
    await pool.query('SELECT 1');
    res.status(200).json({ 
      status: 'Sarohans Backend is live!',
      database: 'Connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Sarohans Backend is live, but DB is down!',
      database: 'Disconnected',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});