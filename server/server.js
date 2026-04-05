require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
const authController = require('./controllers/authController');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Auth routes
app.post('/api/auth/signup', authController.signup);
app.post('/api/auth/login', authController.login);

// Product & Category routes
app.use('/api', productRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running perfectly!' });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});