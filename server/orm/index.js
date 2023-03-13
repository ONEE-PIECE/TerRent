const { Sequelize, DataTypes } = require("sequelize");
const config = require("../orm/config.js");
const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  HOST: "localhost",
  dialect: "mysql",
});
const defaultTimestampValue = {
  type: DataTypes.DATE,
  defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
};
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Owner = require("../orm/models/ownerModel")(sequelize, DataTypes); // require the owner model
db.Player = require("../orm/models/playerModel")(sequelize, DataTypes); // require the pplayer model
db.Terrain = require("../orm/models/terrainModel")(sequelize, DataTypes); // require the terrain model
db.Reservation = require("../orm/models/reservationModel")(
  sequelize,
  DataTypes
); // require the reservation model
db.Event = require("../orm/models/eventsModel")(sequelize, DataTypes); // require the event model
db.Reviews = require("../orm/models/reviewsModel")(sequelize, DataTypes); // require the Reviews model
db.sequelize
  .sync({ force: false })
  .then(() => console.log("All models were synchronized successfully"))
  .catch((err) => console.log(err));
//relations
//many to many relation events with players
db.Event.belongsToMany(db.Player, {
  through: "eventsHasPlayers",
  as: "players",
  foreignKey: "eventId",
});
db.Player.belongsToMany(db.Event, {
  through: "eventsHasPlayers",
  as: "events",
  foreignKey: "playerFireId",
});
// 1 to many relation BETWEEN OWNER and TERRAINS
db.Owner.hasMany(db.Terrain);
db.Terrain.belongsTo(db.Owner, {
  foreignKey: "ownerFireid",
});
//1 to many relation BETWEEN  terrains and reservation
db.Terrain.hasMany(db.Reservation);
db.Reservation.belongsTo(db.Terrain, {
  foreignKey: "terrainId",
});
//1 to many relation BETWEEN  terrain and reviews
db.Terrain.hasMany(db.Reviews);
db.Reviews.belongsTo(db.Terrain, {
  foreignKey: "terrainId",
});
//1 to many relation BETWEEN  PLAYERS and RESERVATION
db.Player.hasMany(db.Reservation);
db.Reservation.belongsTo(db.Player, {
  foreignKey: "playerFireId",
});
//1 to many relation BETWEEN  Player and reviews
db.Player.hasMany(db.Reviews);
db.Reviews.belongsTo(db.Player, {
  foreignKey: "playerFireId",
});
// 1 to many relation BETWEEN events and TERRAINS
db.Terrain.hasMany(db.Event);
db.Event.belongsTo(db.Terrain, {
  foreignKey: "terrainId",
});
//authentification
sequelize
  .authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
module.exports = db;
