const express=require('express')
const PORT=3000
const db=require('../server/orm/index')
const app=express()
const reservationRouter=require('./orm/Routes/reservationRoute')

app.use(express.json())
app.use('/api/reservation',reservationRouter)


app.listen(PORT,()=>{
    console.log('server working');
})