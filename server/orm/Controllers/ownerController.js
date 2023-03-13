const db = require("../index.js");
const Owner = db.Owner;
module.exports = {
  CreateOwner: async (req, res) => {
    const {
      Fireid,
      Email,
      FirstName,
      LastName,
      PhoneNumber,
      patentImage,
      ProfileImage,
    } = req.body;
    try {
      const owner = await Owner.create({
        Fireid,
        Email,
        FirstName,
        LastName,
        PhoneNumber,
        patentImage,
        ProfileImage,
        AccountConfirmation: false,
      });
      res.status(200).json(owner);
    } catch (err) {
      console.log(err);
    }
  },
  getOwner: async (req, res) => {
    const { Fireid } = req.params;
    console.log("fire id:", req.params);
    try {
      const owner = await Owner.findAll({
        where: {
          Fireid: Fireid,
        },
      });
      res.status(201).json(owner);
    } catch (err) {
      console.log(err);
    }
  },
  getOwnerByEmailForAuthorization: async (req, res) => {
    const { Email } = req.params;
    try {
      const owner = await Owner.findOne({
        where: {
          Email: Email,
        },
      });
      res.status(201).json(owner);
    } catch (err) {
      console.log(err);
    }
  },
};
