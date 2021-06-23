const express = require('express');
const { protect, manager, supervisor } = require('../middleware/authMiddleware');

const router = express.Router();

const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../controller/productController');

router.get('/', protect, getProducts);
router.post('/create', protect, createProduct);
router.route('/:id')
    .put(protect,updateProduct)
    .delete(protect,deleteProduct)
    .get(protect, getProductById)
router.post('/:id/supervisor', supervisor, protect)

module.exports = router;