const express=require('express')
const PORT=3000
const db=require('../server/orm/index')
const app=express()
app.listen(PORT,()=>{
    console.log('server working');
})