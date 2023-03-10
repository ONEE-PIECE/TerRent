const express = require("express");
const router = express.Router();
const controller=require('../Controllers/playerController')



router.post('/playerSignUp',controller.addPlayer )
router.get('/:FireId',controller.getPlayer)
router.put('/updatePlayer',controller.updatePlayer)
router.put('/updatePlayerPoints',controller.updatePlayerPoints)


router.post("/playerSignUp", controller.addPlayer);
router.put("/updatePlayer", controller.updatePlayer);

module.exports = router;
