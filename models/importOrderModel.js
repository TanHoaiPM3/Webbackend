const mongoose = require('mongoose');

const importOrderSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  items: [
    {
      productCode: String,
      productName: String,
      quantity: Number,
      received: { type: Number, default: 0 },
    }
  ],
  status: { type: String, enum: ['doing', 'done'], default: 'doing' },
});

module.exports = mongoose.model('ImportOrder', importOrderSchema);
