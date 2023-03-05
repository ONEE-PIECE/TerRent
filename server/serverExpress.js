    const express = require('express');
    // const http = require('http');
    // const socketIO = require('socket.io');
    const cors = require('cors');
    const reviewsRoute = require("./orm/Routes/reviewsRoute");
    const reservationRouter = require('./orm/Routes/reservationRoute');
    const terrainRouter = require('./orm/Routes/terrainRoute');
    const db = require('../server/orm/index');

    const app = express();
    const PORT = 3000;
    // const server = http.createServer(app);
    // const io = socketIO(server);


    app.use(express.json());
    app.use('/api/reservation', reservationRouter);
    app.use('/api/terrain', terrainRouter);
    app.use("/api/reviews", reviewsRoute);
    app.use(cors());

    // io.on('connection', (socket) => {
    // console.log('A user connected');
    
   
    // socket.on('newReservation', async (reservation) => {
    //     try {
   
    //     const savedReservation = await db.saveReservation(reservation);
        
  
    //     io.emit('reservationAdded', savedReservation);
    //     io.emit('notification', {
    //         message: `You have a new reservation at ${savedReservation.time}:00 on ${savedReservation.day}`,
    //         ownerId: savedReservation.terrain.ownerId,
    //     });
    //     } catch (error) {
    //     console.error(error);
    //     }
    // });
    
    // socket.on('disconnect', () => {
    //     console.log('A user disconnected');
    // });
    // });

   

app.listen(PORT, () => {
  console.log("server working");
});

