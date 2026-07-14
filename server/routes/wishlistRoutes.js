const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// Add to wishlist
router.post("/add", protect, addToWishlist);

// Get wishlist
router.get("/", protect, getWishlist);

// Remove one product
router.delete("/:id", protect, removeWishlist);

// Clear wishlist
router.delete("/", protect, clearWishlist);

module.exports = router;