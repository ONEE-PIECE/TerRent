const express = require("express");
const router = express.Router();
const {
  getAllreviews,
  addStars,
  addreview,
  getAllStars,
} = require("../Controllers/reviewsController");

router.get("/getreview/:id", getAllreviews);
router.post("/addreview/:playerId/:terrainId", addreview);
router.post("/stars/:playerId/:terrainId", addStars);
router.get("/getRating/:id", getAllStars);

module.exports = router;
