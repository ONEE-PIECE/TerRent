const express = require("express");
const router = express.Router();
const Owner = require("../Controllers/ownerController");
//Sign up for the owner of terrains
router.post("/signUpOwner", Owner.CreateOwner);
router.get("/signInOwner/:Fireid", Owner.getOwner);
router.get(
  "/signInOwner/Authorization/:Email",
  Owner.getOwnerByEmailForAuthorization
);
module.exports = router;
