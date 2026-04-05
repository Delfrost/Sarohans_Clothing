const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Cart Routes
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/item/:cartItemId', cartController.updateCartItem);
router.delete('/item/:cartItemId', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);

module.exports = router;
