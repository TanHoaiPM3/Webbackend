const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
exports.createProduct = async (req, res) => {
  const { code, name, quantity } = req.body;

  const product = new Product({
    code,
    name,
    quantity
  });

  await product.save();
  res.status(201).json(product);
}

exports.updateProduct = async (req, res) => {
  const { code, name, quantity } = req.body;

  const product = await Product.findOneAndUpdate(
    { code },
    { name, quantity },
    { new: true }   // cho 1 record moi theo findoneandupdate
  );

/* POSTMAN GET/POST/PUT
{
    "code": "P001",
    "name": "Sp1",
    "quantity": 110
}   

//delete theo code
{
    "code": "P003"
}
*/




  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

exports.deleteProduct = async (req, res) => {
  const { code } = req.body;

  const product = await Product.findOneAndDelete({ code });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product deleted successfully' });
}