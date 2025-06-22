const express = require('express');
const router = express.Router();
const { createExportOrder, getAllExportOrders, deleteExportOrder, updateExportOrder } = require('../controllers/exportOrderController');

router.post('/', createExportOrder);
router.get('/', getAllExportOrders);
router.put('/', updateExportOrder);
router.delete('/', deleteExportOrder);

module.exports = router;
