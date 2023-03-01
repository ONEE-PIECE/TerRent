const express = require("express");
const router = express.Router();
const {
  getAllreviews,
  getrating,
} = require("../Controllers/reviewsController");
router.get("/");
router.get("/reviews/:terrainid", getAllreviews);
router.get("/ratings/:terrainid", getrating);

module.exports = router;
