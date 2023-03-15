const express = require('express');
const router = express.Router();
  const {addEvent,getEventsForAterrain, deleteEvent, updateEvent}=require('../Controllers/eventsController')
  router.post('/:terrainId',addEvent)
  router.get('/:terrainId',getEventsForAterrain)
  router.delete('/:id',deleteEvent)
  router.patch('/:id',updateEvent)


  module.exports=router