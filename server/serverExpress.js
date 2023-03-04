const express = require("express");
const PORT = 3000;
const db = require("../server/orm/index");
const cors = require("cors");
const app = express();
const reservationRouter = require("./orm/Routes/reservationRoute");
const reviewsRoute = require("./orm/Routes/reviewsRoute");
const terrainRouter = require("./orm/Routes/terrainRoute");
console.log("hiiiiiiiiiiiiiiiiii");

app.use(express.json());
app.use("/api/reservation", reservationRouter);
app.use("/api/terrain", terrainRouter);
app.use("/api/reviews", reviewsRoute);
app.use(cors());

app.listen(PORT, () => {
  console.log("server working");
});
