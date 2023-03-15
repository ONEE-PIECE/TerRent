const db = require("../index.js");
const Admins = db.Admin;
module.exports = {
  CreateAdmin: async (req, res) => {
    const {
       FireId,
        FirstName,
        LastName,
        Email,
        ProfileImage
    } = req.body;
    try {
      const Admin = await Admins.create({
        FireId,
        FirstName,
        LastName,
        Email,
      ProfileImage
      });
      res.status(200).send(Admin);
    } catch (err) {
      console.log(err);
    }
  }
}