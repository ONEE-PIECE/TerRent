const { where } = require("sequelize");
const db = require("../index.js");
const Event = db.Event;

const addEvent = async (req, res) => {
  try {
    const { EventName, Description, Date, Price, Media } = req.body;
    const { terrainId } = req.params;
    const event = await Event.create({
      EventName,
      Description,
      Date,
      Price,
      Media,
      terrainId: terrainId,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};
const getEventsForAterrain = async (req, res) => {
  try {
    const { terrainId } = req.params;
    const event = await Event.findAll({ where: { terrainId: terrainId } });
    res.status(200).send(event);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};
module.exports = { addEvent, getEventsForAterrain };
