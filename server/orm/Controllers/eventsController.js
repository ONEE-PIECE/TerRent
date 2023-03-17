// const { event } = require("react-native-reanimated");
// const { where } = require("sequelize");
const db = require("../index.js");
const Event = db.Event;
const Player = db.Player;
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
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { EventName, Description, Date, Price, EventImage } = req.body;
    const event = await Event.update(
      {
        EventName,
        Description,
        Date,
        Price,
        EventImage,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(404).send("Server Error");
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: `Event with id ${id} has been deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to delete event",
    });
  }
};
const joinPlayerToEvent = async (req, res) => {
  try {
    const { eventId, playerId } = req.params;
    const event = await db.Event.findByPk(eventId);
    const player = await db.Player.findByPk(playerId);
    event.addPlayer(player);
    res.status(200).json(`${player} joined${event}`);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports = {
  addEvent,
  getEventsForAterrain,
  updateEvent,
  deleteEvent,
  joinPlayerToEvent,
};
