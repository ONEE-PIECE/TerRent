const db = require('../index.js');
const comments = db.Comments;


module.exports = {

addComment: async (req,res) => {
const {Comment}= req.body;
   try {
const owner = await comments.create({
      Comment,
      playerFireId: req.params.playerFireId,
      terrainId : req.params.terrainId
    }) 
    res.status(200).json(owner);
} catch (err) {console.log("You cannot add more than one Comment ");}
}, 
getComment: async (req, res) => {
console.log(req.body)
   const {terrainId}=req.params;
   try {
   const com = await comments.findAll({
      where:{
         terrainId:terrainId
      },
   }
   )
   res.status(200).json(com);
}catch (err) {console.log(err)};
},


}


getComment: async (req, res) => {
   console.log(req.body)
      const {terrainId}=req.params;
      try {
      const terrain = await Terrain.findByPk(terrainId, {
         include: [
            {
              model: comments,
              include: [
                { 
                  model: Player,
                  attributes: ['playerFireId']
                }
              ]
            },
            {
              model: Player,
              attributes: ['playerFireId']
            }
          ]
        })
      
         const com = terrain.comments;
         const players = com.map(comment => comment.player);
         console.log(players);
         res.status(200).json(players,com);
       }
       catch(error) {console.error(error)};
       }