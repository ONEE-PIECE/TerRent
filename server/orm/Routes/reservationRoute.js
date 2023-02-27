const express = require('express');
const router = express.Router();
const { sendAppointment } = require('../Controllers/reservationController.js')

router.post('/player/:playerId/terrain/:terrainId',sendAppointment)

module.exports=router