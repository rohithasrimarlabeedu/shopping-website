const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Customer
router.post("/place", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);

// Admin
router.get("/", protect, getAllOrders);
router.put("/:id", protect, updateOrderStatus);

module.exports = router;