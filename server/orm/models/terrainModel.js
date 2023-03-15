const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const terrain = sequelize.define("terrains", {
    Name: { type: DataTypes.STRING },
    Price: { type: DataTypes.INTEGER },
    Description: { type: DataTypes.STRING },
    lat: { type: DataTypes.DECIMAL(10, 5) },
    long: { type: DataTypes.DECIMAL(10, 5) },
    Region: { type: DataTypes.STRING },
    Category: { type: DataTypes.STRING },
    Img1: { type: DataTypes.TEXT("long") },
    Img2: { type: DataTypes.TEXT("long") },
    Img3: { type: DataTypes.TEXT("long") },
    Capacity: { type: DataTypes.INTEGER },
    Aviabilty: { type: DataTypes.BOOLEAN },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
  return terrain;
};
