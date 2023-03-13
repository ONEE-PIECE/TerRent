const db = require("../index");
const Terrain = db.Terrain;
const getAll = async (req, res) => {
  try {
    const { region } = req.params;

    const terrain = await Terrain.findAll({
      where: { Region: region },
    });
    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllCat = async (req, res) => {
  const { Category } = req.params;
  try {
    const terrain = await Terrain.findAll({
      where: { Category: Category },
    });

    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const terrain = await Terrain.findOne({ where: { id } });

    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addTerrain = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const {
      Name,
      Price,
      Description,
      lat,
      long,
      Region,
      Category,
      Images,
      Capacity,
      Aviability,
    } = req.body;

    // Create a new reservation record
    const terrain = await Terrain.create({
      Name,
      Price,
      Description,
      lat,
      long,
      Region,
      Category,
      Images,
      Capacity,
      Aviability,

      ownerId: ownerId,
    });
    res.status(201).json(terrain);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getTerrainsForSpecialOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const query = await Terrain.findAll({ where: { ownerFireid: ownerId } });
    res.status(200).json(query);
  } catch (err) {
    console.log(err);
  }
};

const deleteTerrainForAnOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await Terrain.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting terrain");
  }
};

const updateTerrain = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Price, Description, Images, Capacity, Availability } =
      req.body;

    // Find the terrain record by id
    const terrain = await Terrain.findByPk(id);

    // Update the terrain record with the new values
    terrain.Name = Name;
    terrain.Price = Price;
    terrain.Description = Description;
    terrain.Images = Images;
    terrain.Capacity = Capacity;
    terrain.Availability = Availability;

    // Save the changes to the database
    await terrain.save();

    res.status(200).send("Terrain updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating terrain");
  }
};

module.exports = {
  addTerrain,
  getTerrainsForSpecialOwner,
  deleteTerrainForAnOwner,
  updateTerrain,
  getAll,
  getOne,
  getAllCat,
};
