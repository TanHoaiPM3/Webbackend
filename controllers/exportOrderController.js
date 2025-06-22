const Product = require('../models/productModel');
const ExportOrder = require('../models/exportOrderModel');

exports.createExportOrder = async (req, res) => {
  try {
    const { code, items } = req.body;

    let exportItems = [];

    for (const item of items) {
      const product = await Product.findOne({ code: item.productCode });

      if (!product) {
        exportItems.push({ ...item, exported: 0 }); // chưa có hàng, chưa xuất được gì
        continue;
      }

      const canExport = Math.min(product.quantity, item.quantity);

      product.quantity -= canExport;
      await product.save();

      exportItems.push({
        productCode: item.productCode,
        quantity: item.quantity,
        exported: canExport
      });
    }

    // check nếu tất cả đã exported đủ thì done
    const isDone = exportItems.every(i => i.exported >= i.quantity);
    const status = isDone ? 'done' : 'doing';

    const order = await ExportOrder.create({ code, items: exportItems, status });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllExportOrders = async (req, res) => {
  try {
    const orders = await ExportOrder.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

exports.getAllExportOrders = async (req, res) => {
  try {
    const orders = await ExportOrder.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateExportOrder = async (req, res) => {
  try {
    const { code, items } = req.body;

    let order = await ExportOrder.findOne({ code });
    if (!order) {
      return res.status(404).json({ message: "Export order not found" });
    }
    let exportItems = [];
    for (const item of items) {
      const product = await Product.findOne({ code: item.productCode });

      if (!product) {
        exportItems.push({ ...item, exported: 0 }); // chưa có hàng, chưa xuất được gì
        continue;
      }

      const canExport = Math.min(product.quantity, item.quantity);

      product.quantity -= canExport;
      await product.save();

      exportItems.push({
        productCode: item.productCode,
        quantity: item.quantity,
        exported: canExport,
      });
    }
    // check nếu tất cả đã exported đủ thì done
    const isDone = exportItems.every((i) => i.exported >= i.quantity);
    const status = isDone ? "done" : "doing";
    order.items = exportItems;
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
exports.deleteExportOrder = async (req, res) => {
  try {
    const { code } = req.body;

    const order = await ExportOrder.findOneAndDelete({ code });
    if (!order) {
      return res.status(404).json({ message: "Export order not found" });
    }
    // Trả lại số lượng hàng đã xuất cho sản phẩm
    for (const item of order.items) {
      const product = await Product.findOne({ code: item.productCode });
      if (product) {
        product.quantity += item.exported;
        await product.save();
      }
    }
    res.json({ message: "Export order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
