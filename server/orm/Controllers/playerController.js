const db = require("../index.js");
const Player = db.Player;
const addPlayer = async (req, res) => {
  const { FireId, FirstName, SecondName, Email, UserName } = req.body;
  const user = await Player.create({
    FireId,
    FirstName,
    SecondName,
    Email,
    Points: 5,
    UserName,
  });
  res.status(201).send(user);
};
const updatePlayer = async (req, res) => {
  let onePlayer = {
    UserName: req.body.UserName,
    ProfileImage: req.body.ProfileImage,
  };
  const user = await Player.create(onePlayer);
  res.status(201).send(user);
};
const getPlayer = async (req, res) => {
  const player = await Player.findAll({ where: { FireId: req.params.FireId } });
  res.status(200).json(player);
};
const updatePlayerPoints = async (req, res) => {
  const user = await Player.update(
    { Points: req.body.Points },
    { where: { FireId: req.body.FireId } }
  );
  res.status(201).send(user);
};
module.exports = { getPlayer, addPlayer, updatePlayer, updatePlayerPoints };
