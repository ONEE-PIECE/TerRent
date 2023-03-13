const db = require("../index");
const Reviews = db.Reviews;

const getAllreviews = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Reviews.findAll({
      where: { terrainId: id },
    });

    res.status(201).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const addreview = async (req, res) => {
  try {
    const { playerId, terrainId } = req.params;
    const { Comments, Rating } = req.body;

    const review = await Reviews.create({
      Comments,
      Rating,
      playerId: playerId,
      terrainId: terrainId,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { getAllreviews, addreview };
