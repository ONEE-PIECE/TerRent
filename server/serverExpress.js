const express=require('express')
const PORT=3000
const db=require('../server/orm/index')
const cors = require('cors');
const app=express()
const reservationRouter=require('./orm/Routes/reservationRoute')
console.log("hiiiiiiiiiiiiiiiiii");

app.use(express.json())
app.use('/api/reservation',reservationRouter)
app.use(cors())

app.listen(PORT,()=>{
    console.log('server working');
})

