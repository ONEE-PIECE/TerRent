    const express = require('express');
    const http = require('http');
    const socketIO = require('socket.io');
    const cors = require('cors');
    const db = require('../server/orm/index');

    const app = express();
    const PORT = 3000;
    const server = http.createServer(app);
    const io = socketIO(server);

    const reservationRouter = require('./orm/Routes/reservationRoute');
    const terrainRouter = require('./orm/Routes/terrainRoute');

    app.use(express.json());
    app.use('/api/reservation', reservationRouter);
    app.use('/api/terrain', terrainRouter);
    app.use(cors());

    io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for a new reservation event
    socket.on('newReservation', async (reservation) => {
        try {
        // Save the reservation to the database
        const savedReservation = await db.saveReservation(reservation);
        
        // Emit a reservation added event to all connected clients
        io.emit('reservationAdded', savedReservation);
        
        // Emit a notification event to the owner of the terrain
        io.emit('notification', {
            message: `You have a new reservation at ${savedReservation.time}:00 on ${savedReservation.day}`,
            ownerId: savedReservation.terrain.ownerId,
        });
        } catch (error) {
        console.error(error);
        }
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    });

    server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
