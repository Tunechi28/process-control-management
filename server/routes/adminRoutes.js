const express = require('express');
const { protect, manager } = require('../middleware/authMiddleware');

const router = express.Router()

const { authAdmin, createAdmin, getAdmins, getAdminById, deleteAdmin, updateAdmin } = require('../controller/adminController');

router.post('/login', authAdmin);
router.post('/create', protect, manager, createAdmin);
router.get('/', protect, manager, getAdmins)
router.route('/:id')
    .get(protect, getAdminById)
    .delete(protect, deleteAdmin)
    .put(protect,updateAdmin);

module.exports = router;