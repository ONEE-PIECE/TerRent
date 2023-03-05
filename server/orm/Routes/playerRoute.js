const express = require('express');
const router = express.Router();
const controller=require('../Controllers/playerController')



router.post('/playerSignUp',controller.addPlayer )
router.put('/updatePlayer',controller.updatePlayer)



module.exports = router;
