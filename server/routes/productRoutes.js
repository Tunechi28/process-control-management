const express = require('express');
const { protect, manager, supervisor } = require('../middleware/authMiddleware');

const router = express.Router();

const { getProducts, createProduct, updateProduct, deleteProduct, getProductById, supervisorUpdate, productsPendingSupervisorApproval } = require('../controller/productController');

router.get('/', protect, getProducts);
router.post('/create', protect, createProduct);
router.get('/pendingSupervisor', protect,productsPendingSupervisorApproval)
router.route('/:id')
    .put(protect,updateProduct)
    .delete(protect,deleteProduct)
    .get(protect, getProductById)
router.post('/:id/supervisor', protect, supervisor, supervisorUpdate)


module.exports = router;