const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Routes for CRUD operations
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
