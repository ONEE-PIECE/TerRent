const { Reservation } = require('../models/reservationModel');

const sendAppointment = async (req, res) => {
  try {
    const { Day, Hour, Reserved } = req.body;
    const { playerId, terrainId } = req.params;

    const result = await Reservation.create({
      Day,
      Hour,
      Reserved,
      PlayerId: playerId,
      TerrainId: terrainId,
    });
    if (result) {
      res.send("reservation sent");
    } else {
      res.status(500).send("Failed to make a reservation.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to make a reservation.");
  }
};

module.exports = { sendAppointment };
