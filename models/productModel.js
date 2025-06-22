const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);

/* Model -> tao len db -> bang product
// tao sp tren postman 
//http://localhost:5670/api/products
// tao 1 sp trong body postman

{
      "code": "P001",
      "name": "Sp1",
      "quantity": 100
}

*/