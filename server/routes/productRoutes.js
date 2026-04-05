const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Category Routes
router.get('/categories', productController.getCategories);
router.get('/categories/:gender', productController.getCategoriesByGender);

// Product Routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router;
