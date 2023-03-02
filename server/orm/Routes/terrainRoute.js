const express = require('express');
const router = express.Router();
const {addTerrain , getTerrainsForSpecialOwner,deleteTerrainForAnOwner,updateTerrain} = require('../Controllers/terrainController.js')


router.post('/:ownerId',addTerrain)
router.get('/:ownerId',getTerrainsForSpecialOwner)
router.delete('/:id',deleteTerrainForAnOwner)
router.patch('/:id',updateTerrain)


module.exports=router
