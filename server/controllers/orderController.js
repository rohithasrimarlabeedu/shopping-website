const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const { fullName, phone, address, city, state, pincode } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    cart.products.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    const order = await Order.create({
      user: req.user._id,
      products: cart.products,
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },
      totalPrice,
    });

    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN - ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin only",
      });
    }

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN - UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin only",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.json({
      success: true,
      message: "Order updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};