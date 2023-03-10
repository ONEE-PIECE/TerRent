const express = require("express");


    
    const cors = require('cors');
    const Owner = require('./orm/Routes/ownerRoutes.js');
    const player = require('./orm/Routes/playerRoute.js');
    const reviewsRoute = require("./orm/Routes/reviewsRoute");
    const reservationRouter = require('./orm/Routes/reservationRoute');
    const terrainRouter = require('./orm/Routes/terrainRoute');
    const EventRouter=require('./orm/Routes/eventsRoute')
    const db = require('../server/orm/index');

const app = express();
const PORT = 3000;
// const server = http.createServer(app);
// const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/owner", Owner);

    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({extended: true,
      limit: '50mb'}));
    app.use(cors());
    app.use('/owner',Owner)
    app.use('/api/player',player)
    app.use('/api/reservation', reservationRouter);
    app.use('/api/terrain', terrainRouter);
    app.use("/api/reviews", reviewsRoute);
    app.use('/api/events',EventRouter)   

app.listen(PORT, () => {
  console.log("server working");
});
