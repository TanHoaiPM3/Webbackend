const mongoose = require('mongoose');

const exportOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  items: [
    {
      productCode: String,
      productName: String,
      quantity: Number,
      exported: { type: Number, default: 0 }, // thêm để theo dõi đã xuất bao nhiêu
    }
  ],
  status: { type: String, enum: ['doing', 'done'], default: 'doing' },
});

module.exports = mongoose.model('ExportOrder', exportOrderSchema);
