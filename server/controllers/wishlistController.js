const Wishlist = require("../models/Wishlist");

// ===============================
// Add Product To Wishlist
// ===============================
const addToWishlist = async (req, res) => {
  try {
    const user = req.user.id;
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get Wishlist
// ===============================
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Remove From Wishlist
// ===============================
const removeWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Clear Wishlist
// ===============================
const clearWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({
      user: req.user.id,
    });

    res.json({
      success: true,
      message: "Wishlist cleared",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
  clearWishlist,
};