const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEventsForAterrain,
  deleteEvent,
  updateEvent,
  joinPlayerToEvent,
  getPlayerIdsForEvent,
} = require("../Controllers/eventsController");
router.post("/:terrainId", addEvent);
router.get("/:terrainId", getEventsForAterrain);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);
router.post("/:eventId/players/:playerId", joinPlayerToEvent);
module.exports = router;
