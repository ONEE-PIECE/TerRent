const express = require("express");
const router = express.Router();
const {
  getAllreviews,

  addreview,
} = require("../Controllers/reviewsController");

router.get("/getreview/:id", getAllreviews);

router.post("/addreview/:id", addreview);

module.exports = router;
