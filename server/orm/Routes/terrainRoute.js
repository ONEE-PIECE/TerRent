const express = require('express');
const router = express.Router();
const {addTerrain , getTerrainsForSpecialOwner,deleteTerrainForAnOwner,updateTerrain, getAll,getAllCat,getOne} = require('../Controllers/terrainController.js')


// router.post('/:ownerId',addTerrain)
// router.get('/terrain/:ownerId',getTerrainsForSpecialOwner)
// router.delete('/:id',deleteTerrainForAnOwner)
// router.patch('/:id',updateTerrain)
router.get("/");
router.get("/terrain/:location", getAll);
router.get("/terrain/:categorie", getAllCat);
router.get("/terrain/:terrainid", getOne);



module.exports = router;
