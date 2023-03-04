const db=require('../index.js')
const Player =db.Player;  



  const  addPlayer =async (req, res)=> {
       const {FireId,FirstName,SecondName,UserName}=req.body
       const user = await Player.create({FireId,FirstName,SecondName,UserName})
        res.status(201).send(user)
     }
    

const updatePlayer = async (req,res) => {
    let onePlayer = {
        UserName: req.body.UserName,
        ProfileImage: req.body.ProfileImage,
    }
    const user = await Player.create(onePlayer)
    res.status(201).send(user)
 }




module.exports = { addPlayer, updatePlayer }
