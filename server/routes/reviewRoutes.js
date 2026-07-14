const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

router.post(
  "/",
  authMiddleware,
  addReview
);

router.get(
  "/:productId",
  getReviews
);

module.exports = router;