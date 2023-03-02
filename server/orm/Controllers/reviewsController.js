// const db = require("../index");
// const Reviews=db.Reviews

// const getAllreviews = async (req, res) => {
//   try {
//     const { terrainid } = req.params;

//     const reviews = await Reviews.findAll({
//       where: { terrainid: terrainid },
//     });

//     res.status(201).json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// const getrating = async (req, res) => {
//   try {
//     const { terrainId } = req.params;

//     const ratings = await Rating.findAll({ where: { terrainid: terrainId } });

//     res.status(201).json(ratings);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// module.exports = { getAllreviews, getrating };
