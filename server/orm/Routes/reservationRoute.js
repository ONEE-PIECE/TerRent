const express = require("express");
const router = express.Router();
const {
  deleteReservation,
  confirmTheReservationSentByTheUser,
  sendAppointment,
  getAllReservationForAspecialTerrain,
  getAllReservedSlots,
  confirmedReservations,
  pendingResrvation,
  getAllReservations,
} = require("../Controllers/reservationController.js");
router.post("/player/:terrainId/:playerId", sendAppointment);
router.get("/player/:terrainId", getAllReservationForAspecialTerrain);
router.put("/player/:reservationId", confirmTheReservationSentByTheUser);
router.delete("/player/:reservationId", deleteReservation);
router.get("/players/:terrainId", getAllReservedSlots);
router.get("/playerG", getAllReservations);
router.get("/playerss/:playerId/confirmed", confirmedReservations);
router.get("/playerss/:playerId/pending", pendingResrvation);
module.exports = router;
