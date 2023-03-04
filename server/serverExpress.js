const express=require('express')
const db=require('../server/orm/index')
const cors=require('cors');




const app=express()

//requiring routes 


const Owner = require('./orm/Routes/ownerRoutes.js');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/owner',Owner)














const PORT=3000

app.listen(PORT,()=>{
    console.log('http://localhost:3000/');
})


module.exports=app;