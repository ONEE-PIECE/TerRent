const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define("Admin", {
    FireId:{ type: DataTypes.STRING, primaryKey: true, allowNull: false },
    FirstName: { type: DataTypes.STRING },
    LastName: { type: DataTypes.STRING },
    Email: { type: DataTypes.STRING },
    Password: { type: DataTypes.STRING },
    ProfileImage: { type: DataTypes.TEXT("long")}
  });
  return events;
};
