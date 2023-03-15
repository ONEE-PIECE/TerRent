const express = require("express");
const router = express.Router();

const {
  addTerrain,
  getTerrainsForSpecialOwner,
  deleteTerrainForAnOwner,
  updateTerrain,
  getAll,
  getAllCat,
  getOne,
} = require("../Controllers/terrainController.js");
router.post("/:ownerId", addTerrain);
router.get("/:ownerId", getTerrainsForSpecialOwner);
router.delete("/:id", deleteTerrainForAnOwner);
router.patch("/:id", updateTerrain);

router.get("/");
router.get("/terrains/region/:region", getAll);
router.get("/terrains/category/:Category", getAllCat);
router.get("/terrains/oneterrains/:id", getOne);

module.exports = router;
