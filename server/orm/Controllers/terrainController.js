const db = require("../index");
const Terrain = db.Terrain;
const getAll = async (req, res) => {
  try {
    const { terrainLocation } = req.body.terrainlocation;

    const terrain = await Terrain.findAll({
      where: { terrainlocation: terrainLocation },
    });

    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAllCat = async (req, res) => {
  try {
    const { terrainCategorie } = req.body.terraincategorie;

    const terrain = await Terrain.findAll({
      where: { terraincategorie: terrainCategorie },
    });

    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getOne = async (req, res) => {
  try {
    const { terrainId } = req.body.terrainid;

    const terrain = await Terrain.findOne({ where: { terrainid: terrainId } });

    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { getAll, getOne, getAllCat };
