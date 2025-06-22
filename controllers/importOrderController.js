const Product = require("../models/productModel");
const ImportOrder = require("../models/importOrderModel");

exports.createImportOrder = async (req, res) => {
  try {
    const { code, items } = req.body;

    // Đảm bảo mỗi item có received = 0 ban đầu
    const newItems = items.map((item) => ({
      ...item,
      received: 0,
    }));

    const order = await ImportOrder.create({
      code,
      items: newItems,
      status: "doing",
    });

    // Tạo sản phẩm nếu chưa có (với số lượng hiện tại = 0)
    for (const item of items) {
      let product = await Product.findOne({ code: item.productCode });
      if (!product) {
        await Product.create({
          code: item.productCode,
          name: item.productName,
          quantity: 0,
        });
      }
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllImportOrders = async (req, res) => {
  try {
    const orders = await ImportOrder.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateImportOrder = async (req, res) => {
  try {
    const { code, items } = req.body;

    const order = await ImportOrder.findOne({ code });
    if (!order) {
      return res.status(404).json({ message: "Import order not found" });
    }

    const updatedItems = order.items.map((existingItem) => {
      const updateItem = items.find(
        (i) => i.productCode === existingItem.productCode
      );
      if (!updateItem) return existingItem;

      // Tính số lượng còn lại được phép nhận
      const remaining = existingItem.quantity - existingItem.received;
      const addAmount = Math.min(updateItem.quantity, remaining);

      if (addAmount > 0) {
        // Cập nhật tồn kho
        Product.findOne({ code: existingItem.productCode }).then((product) => {
          if (product) {
            product.quantity += addAmount;
            product.save();
          }
        });
      }

      return {
        ...existingItem.toObject(),
        received: existingItem.received + addAmount,
      };
    });

    order.items = updatedItems;
    order.status = updatedItems.every((i) => i.received >= i.quantity)
      ? "done"
      : "doing";

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteImportOrder = async (req, res) => {
  try {
    const { _id } = req.body;

    const order = await ImportOrder.findByIdAndDelete(_id);
    if (!order) {
      return res.status(404).json({ message: "Import order not found" });
    }

    res.json({ message: "Import order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
