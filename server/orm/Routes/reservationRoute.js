const express = require('express');
const router = express.Router();
const { deleteReservation,confirmTheReservationSentByTheUser,sendAppointment,getAllReservationForAspecialTerrain } = require('../Controllers/reservationController.js')

router.post('/player/:terrainId/:playerId',sendAppointment)
router.get('/player/:terrainId',getAllReservationForAspecialTerrain)
router.put('/player/:reservationId',confirmTheReservationSentByTheUser)
router.delete('/player/:reservationId',deleteReservation)


module.exports=router
