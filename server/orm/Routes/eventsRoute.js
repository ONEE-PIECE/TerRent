const express = require('express');
const router = express.Router();
  const {addEvent,getEventsForAterrain}=require('../Controllers/eventsController')
  router.post('/:terrainId',addEvent)
  router.get('/:terrainId',getEventsForAterrain)


  module.exports=router