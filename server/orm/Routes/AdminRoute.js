const express = require('express');

const router = express.Router();
const {CreateAdmin} = require('../Controllers/AdminController')

  router.post("/signUpAdmin", CreateAdmin);


  module.exports=router