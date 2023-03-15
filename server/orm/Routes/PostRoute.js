const express=require('express');
const router=express.Router();

const Comments=require('../Controllers/PostController.js');

//Sign up for the owner of terrains
router.post('/addComment/:playerFireId/:terrainId', Comments.addComment);
router.get('/getComment/:terrainId', Comments.getComment);

module.exports=router;