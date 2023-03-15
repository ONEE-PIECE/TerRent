const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define("events", {
    EventName: { type: DataTypes.STRING },
    Description: { type: DataTypes.STRING },
    Date: { type: DataTypes.DATE },
    Price: { type: DataTypes.DECIMAL },
    EventImage: { type: DataTypes.TEXT("long") },
  });
  return events;
};
