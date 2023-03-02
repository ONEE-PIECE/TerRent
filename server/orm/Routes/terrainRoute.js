const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  getAllCat,
} = require("../Controllers/terrainController");
router.get("/");
router.get("/terrain/:location", getAll);
router.get("/terrain/:categorie", getAllCat);
router.get("/terrain/:terrainid", getOne);

module.exports = router;
