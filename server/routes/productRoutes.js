const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Admin
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;