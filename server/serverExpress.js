const express = require("express");

const cors = require("cors");
const Owner = require("./orm/Routes/ownerRoutes.js");

const reviewsRoute = require("./orm/Routes/reviewsRoute");
const reservationRouter = require("./orm/Routes/reservationRoute");
const terrainRouter = require("./orm/Routes/terrainRoute");
const EventRouter = require("./orm/Routes/eventsRoute");
const PlayerRouter = require("./orm/Routes/playerRoute");
const db = require("../server/orm/index");

const app = express();
const PORT = 3000;
// const server = http.createServer(app);
// const io = socketIO(server);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use("/owner", Owner);
app.use("/api/reservation", reservationRouter);
app.use("/api/terrain", terrainRouter);
app.use("/api/reviews", reviewsRoute);
app.use("/api/events", EventRouter);
app.use("/api/player", PlayerRouter);

app.listen(PORT, () => {
  console.log("server working");
});
