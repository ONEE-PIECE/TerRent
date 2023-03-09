const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{

  const Reservation = sequelize.define('reservations', {
    Day: { type: DataTypes.DATE },
    Hour: { type: DataTypes.TIME },
    Reserved: { type: DataTypes.BOOLEAN },

  })
  return Reservation;
};
