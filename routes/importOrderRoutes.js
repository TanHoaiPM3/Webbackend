const express = require('express');
const router = express.Router();
const { createImportOrder, getAllImportOrders, updateImportOrder, deleteImportOrder } = require('../controllers/importOrderController');

router.post('/', createImportOrder);
router.get('/', getAllImportOrders);
router.put('/', updateImportOrder);
router.delete('/', deleteImportOrder);

module.exports = router;
