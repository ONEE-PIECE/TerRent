const { sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define("players", {
    FireId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    FirstName: { type: DataTypes.STRING },
    SecondName: { type: DataTypes.STRING },
    UserName: { type: DataTypes.STRING },
    Email: { type: DataTypes.STRING },
    Points: { type: DataTypes.INTEGER },
    ProfileImage: { type: DataTypes.TEXT("long") },
  });
  return player;
};
