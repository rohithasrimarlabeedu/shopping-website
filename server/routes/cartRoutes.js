const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

// Add product to cart
router.post("/add", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update cart quantity
router.put("/update", protect, updateCart);

// Remove product from cart
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;